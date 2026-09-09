// Builds COPY.md — a readable snapshot of every word of site copy — from the
// JSON under content/. Shared by scripts/export-copy.mjs (CLI) and the Studio
// publish route, so both produce byte-identical output.
//
// Plain .mjs so the CLI can run it with bare node and the TS route can import it.

// Keys that hold assets, layout, or routing — not copy.
const SKIP_KEYS = new Set([
  'photoSrc', 'photoSrcMobile', 'src', 'image', 'imageSrc', 'logoSrc', 'icon',
  'href', 'url', 'link', 'slug', 'id', 'align', 'baseRot', 'wrapperHeight',
  'width', 'height', 'order', 'variant', 'color', 'className', 'showOn',
  'alt', 'video', 'videoSrc', 'poster', 'anchor', 'tagRotationDeg', 'heightPx',
  'tagIndex', 'external',
])

const PAGE_ORDER = ['home', 'about', 'work-with-me', 'speaking']

// Section names that titleize can't work out on its own — acronyms, and the
// collections whose filename doesn't say which surface they feed.
const SECTION_NAMES = {
  'home': 'Home',
  'about': 'About',
  'work-with-me': 'Work With Me',
  'speaking': 'Speaking',
  'wwm-case-studies': 'Case Studies (Work With Me)',
  'wwm-trusted-by': 'Trusted By Logos (Work With Me)',
  'case-studies-quests': 'Select Work (Home)',
  'speaking-gallery-photos': 'Speaking Gallery Photos',
  'speaking-logos': 'Speaking Logos',
  'story-timeline': 'Story Timeline',
  'reading-room-books': 'Reading Room Books',
}

// Words titleize would otherwise sentence-case into something wrong.
const ACRONYMS = { cta: 'CTA', ctas: 'CTAs', ai: 'AI', ux: 'UX', ui: 'UI', seo: 'SEO', faq: 'FAQ', wwm: 'WWM', cx: 'CX' }

// Fields that identify an item well enough to title its section.
const LABEL_KEYS = ['client', 'headline', 'name', 'outlet', 'title', 'heading', 'label', 'question', 'value', 'caption', 'year']

const isCopy = (v) =>
  typeof v === 'string' && v.trim() !== '' && !/^[/#]|^https?:\/\//.test(v.trim())

const titleize = (k) =>
  k
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((w) => {
      const lower = w.toLowerCase()
      if (ACRONYMS[lower]) return ACRONYMS[lower]
      return w.charAt(0).toUpperCase() + w.slice(1)
    })
    .join(' ')

const heading = (depth, text) => `${'#'.repeat(Math.min(depth, 6))} ${text}`

// Short strings (nav labels, logo names, tags) read best as a bullet list.
// Full sentences read better as paragraphs, the way they appear on the page.
const PROSE_LENGTH = 180

function renderStrings(values, out) {
  const prose = values.some((v) => v.length > PROSE_LENGTH)
  values.forEach((v) => out.push(prose ? v : `- ${v}`, ...(prose ? [''] : [])))
  if (!prose) out.push('')
}

// Longest a field may be and still stand in as an item's heading. Anything
// longer stays a field, so no copy is ever shortened into a heading.
const MAX_LABEL_LENGTH = 60

// Short identifying line for an array item, used as its heading so the reader
// sees "Ally" rather than "Wwm case studies 1". Returns the key used, so the
// walker can skip re-printing it as a field.
function itemLabel(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return null
  for (const key of LABEL_KEYS) {
    const value = item[key]
    if (isCopy(value)) {
      const text = value.trim()
      if (text.length <= MAX_LABEL_LENGTH) return { key, text }
    }
  }
  return null
}

// Walk any shape and emit markdown. Objects become headings, arrays of objects
// become sections titled by their own content, string arrays become bullets.
function walk(node, depth, label, out, skipKey) {
  if (Array.isArray(node)) {
    if (node.length && node.every(isCopy)) {
      renderStrings(node.map((v) => v.trim()), out)
      return
    }
    node.forEach((item, i) => {
      if (item && typeof item === 'object') {
        const named = itemLabel(item)
        out.push('', heading(depth, named ? `${i + 1}. ${named.text}` : `${label} ${i + 1}`), '')
        walk(item, depth + 1, label, out, named?.key)
      }
    })
    return
  }

  if (node && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      if (SKIP_KEYS.has(key) || key === skipKey) continue
      if (isCopy(value)) {
        out.push(`**${titleize(key)}** — ${value}`, '')
      } else if (Array.isArray(value) && value.length && value.every(isCopy)) {
        out.push(`**${titleize(key)}**`, '')
        renderStrings(value.map((v) => v.trim()), out)
      } else if (value && typeof value === 'object') {
        out.push(heading(depth, titleize(key)), '')
        walk(value, depth + 1, titleize(key), out)
      }
    }
  }
}

function section(name, raw, out) {
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return // a malformed file should never block a publish
  }
  if (Array.isArray(data) ? data.length === 0 : Object.keys(data || {}).length === 0) return
  const title = SECTION_NAMES[name] || titleize(name)
  out.push(`## ${title}`, '')
  walk(data, 3, title, out)
}

const baseName = (p) => p.split('/').pop().replace(/\.json$/, '')

/**
 * @param {Record<string, string>} files  content/**\/*.json path -> raw JSON string
 * @param {string} [today]  ISO date (YYYY-MM-DD); defaults to now
 * @returns {string} markdown
 */
export function buildCopyMarkdown(files, today) {
  const date = today || new Date().toISOString().slice(0, 10)

  const pages = Object.keys(files)
    .filter((p) => p.startsWith('content/pages/') && p.endsWith('.json'))
    .sort((a, b) => {
      const ia = PAGE_ORDER.indexOf(baseName(a))
      const ib = PAGE_ORDER.indexOf(baseName(b))
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b)
    })

  const collections = Object.keys(files)
    .filter((p) => p.startsWith('content/collections/') && p.endsWith('.json'))
    .sort()

  const out = [
    '# Site Copy',
    '',
    '_Generated from `content/` on every Studio publish. Do not edit this file — edit the page JSON or use Studio._',
    '',
    `_Last generated: ${date}_`,
    '',
  ]

  if (pages.length) {
    out.push('---', '', '# Pages', '')
    pages.forEach((p) => section(baseName(p), files[p], out))
  }

  if (collections.length) {
    out.push('---', '', '# Collections', '')
    collections.forEach((p) => section(baseName(p), files[p], out))
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n'
}
