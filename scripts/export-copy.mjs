#!/usr/bin/env node
// Regenerates COPY.md from the content/ JSON on this machine.
//
// The Studio publish route does this automatically on every save, so COPY.md is
// normally already current. Run this after editing content/*.json by hand, or to
// check what the generator produces before shipping a change to it.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { buildCopyMarkdown } from '../lib/copyExport.mjs'

const ROOT = join(import.meta.dirname, '..')

const files = {}
for (const dir of ['pages', 'collections']) {
  const abs = join(ROOT, 'content', dir)
  if (!existsSync(abs)) continue
  for (const name of readdirSync(abs)) {
    if (name.endsWith('.json')) {
      files[`content/${dir}/${name}`] = readFileSync(join(abs, name), 'utf8')
    }
  }
}

const md = buildCopyMarkdown(files)
writeFileSync(join(ROOT, 'COPY.md'), md)
console.log(`Wrote COPY.md — ${md.split(/\s+/).length.toLocaleString()} words from ${Object.keys(files).length} files`)
