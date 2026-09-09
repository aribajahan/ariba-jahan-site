#!/usr/bin/env node
// Layer A of the site eval — the automated checks in eval/RUBRIC.md.
//
// Reads the prerendered HTML that `next build` writes to .next/server/app/ and
// the JSON under content/. No server, no browser, no network.
//
// Run: npm run check        (add --json for machine-readable output)
//
// Every finding carries the rubric ID it came from, so the output and the
// rubric stay in step. Adding a check here means adding it to RUBRIC.md too.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildCopyMarkdown } from '../lib/copyExport.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BUILD_DIR = join(ROOT, '.next/server/app')

const findings = []
const add = (id, severity, where, message) => findings.push({ id, severity, where, message })

// ---------------------------------------------------------------- input

// Pages to check: every prerendered HTML file that isn't an admin screen or an
// internal Next.js page.
function loadPages() {
  if (!existsSync(BUILD_DIR)) return null
  return readdirSync(BUILD_DIR)
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !f.startsWith('_') && f !== 'admin.html')
    .map((f) => ({ route: f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''), html: readFileSync(join(BUILD_DIR, f), 'utf8') }))
}

function loadContent() {
  const files = {}
  for (const dir of ['pages', 'collections']) {
    const abs = join(ROOT, 'content', dir)
    if (!existsSync(abs)) continue
    for (const name of readdirSync(abs)) {
      if (name.endsWith('.json')) files[`content/${dir}/${name}`] = readFileSync(join(abs, name), 'utf8')
    }
  }
  return files
}

// Walk every string in a JSON tree, yielding [path, value].
function* strings(node, path = '') {
  if (typeof node === 'string') yield [path, node]
  else if (Array.isArray(node)) for (const [i, v] of node.entries()) yield* strings(v, `${path}[${i}]`)
  else if (node && typeof node === 'object')
    for (const [k, v] of Object.entries(node)) yield* strings(v, path ? `${path}.${k}` : k)
}

const publicFileExists = (p) => existsSync(join(ROOT, 'public', p.split('?')[0].replace(/^\//, '')))

// ---------------------------------------------------------- HTML checks

// Strip <head> so page-title checks don't collide with body content, and drop
// inline scripts, whose contents are data rather than markup.
const withoutScripts = (html) => html.replace(/<script[\s\S]*?<\/script>/gi, '')

function checkMetadata(route, html) {
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim()
  if (!title) add('A1', 'error', route, 'no <title>')

  const description = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i.exec(html)?.[1]?.trim()
  if (!description) add('A2', 'error', route, 'no meta description')

  for (const prop of ['og:title', 'og:description', 'og:image']) {
    const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i')
    if (!re.test(html)) add('A3', 'warn', route, `missing ${prop}`)
  }
}

function checkImages(route, html) {
  const imgs = withoutScripts(html).match(/<img\b[^>]*>/gi) || []
  for (const tag of imgs) {
    if (!/\salt=/i.test(tag)) {
      const src = /src=["']([^"']+)["']/i.exec(tag)?.[1] ?? '(no src)'
      add('A4', 'error', route, `<img> without alt: ${src.slice(0, 80)}`)
    }
  }
}

function checkHeadings(route, html) {
  const levels = [...withoutScripts(html).matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]))
  const h1s = levels.filter((l) => l === 1).length
  if (h1s === 0) add('A5', 'warn', route, 'no <h1>')
  else if (h1s > 1) add('A5', 'warn', route, `${h1s} <h1> elements — expected 1`)

  let previous = 0
  for (const level of levels) {
    if (previous && level > previous + 1) {
      add('A6', 'warn', route, `heading jumps from h${previous} to h${level}`)
      break // one report per page is enough to act on
    }
    previous = level
  }
}

function checkLinks(route, html, routes) {
  const hrefs = [...withoutScripts(html).matchAll(/href=["'](\/[^"'#?]*)["']/gi)].map((m) => m[1])
  for (const href of new Set(hrefs)) {
    if (href.startsWith('/_next/')) continue
    const clean = href.replace(/\/$/, '') || '/'
    if (routes.has(clean)) continue
    if (publicFileExists(href)) continue
    add('A7', 'error', route, `link to a route that does not exist: ${href}`)
  }
}

// ------------------------------------------------------- content checks

const ASSET_KEYS = new Set(['photoSrc', 'photoSrcMobile', 'logoSrc', 'src', 'imageSrc', 'poster', 'videoSrc'])

function checkContent(files, routes) {
  for (const [path, raw] of Object.entries(files)) {
    let data
    try {
      data = JSON.parse(raw)
    } catch (error) {
      add('A9', 'error', path, `invalid JSON: ${error.message}`)
      continue
    }

    for (const [key, value] of strings(data)) {
      const field = key.split('.').pop().replace(/\[\d+\]$/, '')

      // A9 — empty copy
      if (value.trim() === '') add('A9', 'error', path, `empty field: ${key}`)

      // A8 — referenced assets exist
      if (ASSET_KEYS.has(field) && value.startsWith('/') && !publicFileExists(value))
        add('A8', 'error', path, `asset not found in public/: ${value} (${key})`)

      // A10 — testimonial routing
      if (key.includes('showOn') && !routes.has(value === 'home' ? '/' : `/${value}`))
        add('A10', 'error', path, `showOn names an unknown page: "${value}" (${key})`)

      // A11 — a clause repeated back to back
      const repeated = findRepeatedClause(value)
      if (repeated) add('A11', 'error', path, `repeated text in ${key}: "${repeated.slice(0, 60)}…"`)
    }
  }
}

// Looks for the same clause twice in a row, the shape a paste error leaves.
// Only clauses of real length count, so legitimate repetition ("very, very")
// doesn't trip it.
function findRepeatedClause(value) {
  const parts = value.split(/\s*[|·—]\s*/).map((p) => p.trim()).filter(Boolean)
  for (let i = 1; i < parts.length; i++) {
    if (parts[i] === parts[i - 1] && parts[i].length > 15) return parts[i]
  }
  const sentences = value.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean)
  for (let i = 1; i < sentences.length; i++) {
    if (sentences[i] === sentences[i - 1] && sentences[i].length > 25) return sentences[i]
  }
  return null
}

// A12 — the same project described in both case study collections.
function checkCrossCollectionDrift(files) {
  const wwmRaw = files['content/collections/wwm-case-studies.json']
  const homeRaw = files['content/collections/case-studies-quests.json']
  if (!wwmRaw || !homeRaw) return

  const wwm = JSON.parse(wwmRaw)
  const home = JSON.parse(homeRaw).filter((e) => e.tag === 'Case Study')

  for (const entry of home) {
    const headline = (entry.headline || '').toLowerCase()
    const lead = headline.split('—')[0].trim()
    const match = wwm.find((c) => {
      const client = (c.client || '').toLowerCase()
      return client && (headline.startsWith(client) || client.startsWith(lead) || client.includes(lead))
    })
    if (!match) {
      add('A12', 'review', 'case-studies-quests.json', `"${entry.headline}" has no matching Work With Me case study`)
      continue
    }
    if (!entry.headline.includes(match.title) && !match.title.startsWith(entry.headline.split('—').pop().trim()))
      add('A12', 'review', match.client, 'title differs between the home strip and the Work With Me card')
    if (entry.description.trim() !== match.summary.trim())
      add('A12', 'review', match.client, 'summary differs between the home strip and the Work With Me card')
  }
}

// A13 — COPY.md matches what the generator produces from content/.
function checkCopySnapshot(files) {
  const path = join(ROOT, 'COPY.md')
  if (!existsSync(path)) return add('A13', 'error', 'COPY.md', 'missing — run npm run copy')
  const onDisk = readFileSync(path, 'utf8')
  const dateOnDisk = /_Last generated: (\d{4}-\d{2}-\d{2})_/.exec(onDisk)?.[1]
  // Regenerate with the committed date so a stale date isn't reported as drift.
  if (buildCopyMarkdown(files, dateOnDisk) !== onDisk)
    add('A13', 'error', 'COPY.md', 'out of date — run npm run copy and commit the result')
}

// A14 — copy hardcoded in app/data instead of living in content/.
function checkCopyLocation() {
  const dir = join(ROOT, 'app/data')
  if (!existsSync(dir)) return
  for (const name of readdirSync(dir)) {
    if (!name.endsWith('.ts')) continue
    const source = readFileSync(join(dir, name), 'utf8')
    for (const [, literal] of source.matchAll(/"((?:[^"\\\n]|\\.){120,})"/g)) {
      add('A14', 'warn', `app/data/${name}`, `long string literal — copy belongs in content/: "${literal.slice(0, 50)}…"`)
    }
  }
}

// ------------------------------------------------------------- routes

function knownRoutes() {
  const routes = new Set()
  const walk = (dir, prefix) => {
    for (const name of readdirSync(dir)) {
      const abs = join(dir, name)
      if (!statSync(abs).isDirectory()) continue
      if (name.startsWith('_') || name === 'api' || name === 'admin') continue
      const segment = name.startsWith('[') ? null : name
      if (existsSync(join(abs, 'page.tsx'))) routes.add(segment ? `${prefix}/${segment}` : prefix)
      if (segment) walk(abs, `${prefix}/${segment}`)
    }
  }
  const appDir = join(ROOT, 'app')
  if (existsSync(join(appDir, 'page.tsx'))) routes.add('/')
  walk(appDir, '')
  return routes
}

// --------------------------------------------------------------- main

const pages = loadPages()
if (!pages) {
  console.error('No build found. Run `npm run build` first.')
  process.exit(2)
}

const files = loadContent()
const routes = knownRoutes()

for (const { route, html } of pages) {
  checkMetadata(route, html)
  checkImages(route, html)
  checkHeadings(route, html)
  checkLinks(route, html, routes)
}
checkContent(files, routes)
checkCrossCollectionDrift(files)
checkCopySnapshot(files)
checkCopyLocation()

// ------------------------------------------------------------- report

const counts = { error: 0, warn: 0, review: 0 }
findings.forEach((f) => counts[f.severity]++)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ counts, findings }, null, 2))
} else {
  const order = { error: 0, warn: 1, review: 2 }
  const icon = { error: '✗', warn: '!', review: '?' }
  findings
    .sort((a, b) => order[a.severity] - order[b.severity] || a.id.localeCompare(b.id))
    .forEach((f) => console.log(`${icon[f.severity]} ${f.id}  ${f.where}\n   ${f.message}`))

  if (findings.length) console.log('')
  console.log(
    `${pages.length} pages, ${Object.keys(files).length} content files — ` +
      `${counts.error} error, ${counts.warn} warn, ${counts.review} to review`
  )
  if (!findings.length) console.log('Everything in eval/RUBRIC.md Layer A passes.')
}

process.exit(counts.error > 0 ? 1 : 0)
