# Site Eval Rubric

Every check the site is held to, in one list. Each has an ID, a severity, and a
statement of what passing looks like.

**Layer A — automated.** `npm run check` runs these against the built site. They
are deterministic: same input, same result, no judgment. Run it before publishing.

**Layer J — judgment.** These need a person or a model looking at rendered pages
at two widths. They are run one page at a time, because trying to hold the whole
site at once is how a review gets shallow. Not automated.

Severities: **error** blocks a publish · **warn** should be fixed · **review**
means a human decides, and it is normal for some to stay open.

---

## Layer A — automated

Run: `npm run check` (builds if needed, then reads the prerendered HTML in
`.next/server/app/` plus the JSON in `content/`).

### Metadata

**A1 · Title** — error
Every public page has a non-empty `<title>`.

**A2 · Description** — error
Every public page has a non-empty `<meta name="description">`.

**A3 · Social cards** — warn
Every public page has `og:title`, `og:description`, and an `og:image`. Without
these a shared link renders as a bare URL.

### Accessibility

**A4 · Image alt text** — error
Every `<img>` has a non-empty `alt`. Decorative images are the exception and must
say so with `alt=""` explicitly, which this check accepts.

**A5 · One h1** — warn
Each page has exactly one `<h1>`. Zero leaves the page unnamed to screen readers
and search engines; more than one leaves the hierarchy meaningless.

**A6 · Heading order** — warn
Heading levels descend without skipping — no `<h4>` directly under an `<h2>`.

### Links and assets

**A7 · Internal links resolve** — error
Every internal `href` points at a route that exists or a file present in
`public/`. Catches a link to a page that was renamed or never built.

**A15 · External links still work** — warn · needs network
Every off-site link returns 200. Redirects are reported, not failed, so a site
that moved is visible without blocking a publish. Skipped by default; run with
`npm run check -- --links`. Kept out of the default run so a slow third-party
site can't stop a typo fix from shipping.

**A16 · Links go where the label promises** — error
Destinations for the handful of links that carry weight — Unmissables, the
podcast, booking, LinkedIn — are pinned in `eval/destinations.json`. The check
fails when one changes. Nothing can infer that "Read Unmissables" belongs on
Substack; it has to be stated once and then held.

**A8 · Referenced assets exist** — error
Every `photoSrc`, `logoSrc`, and `src` in `content/` resolves to a real file in
`public/`. Catches a card pointing at an image that was never uploaded.

### Content integrity

**A9 · No empty copy fields** — error
No string field in `content/` is empty or whitespace. An empty field renders as a
gap on the page.

**A10 · Testimonial routing is valid** — error
Every `showOn` value names a real page. A typo here silently hides a testimonial.

**A11 · Duplicated titles** — error
No field repeats the same clause twice in a row — the signature of a paste error.
Added after a role line published reading "Head of Transformation, North America
at Anomaly | Head of Transformation, North America at Anomaly | …".

**A12 · Cross-collection drift** — review
Projects appearing in both `wwm-case-studies` and `case-studies-quests` are
listed side by side so the wording can be compared. The two are deliberately
different lengths — the home strip is a narrower card — so a difference is not a
failure. What this catches is one being edited and the other forgotten.

**A13 · Copy snapshot is current** — error
Regenerating `COPY.md` from `content/` produces no change. Fails if someone hand
-edited the snapshot or committed content without regenerating it.

**A14 · Copy lives in content** — warn
No long string literals in `app/data/*.ts`. Copy belongs in `content/` where the
Studio can reach it. Added after the Work With Me case studies sat hardcoded in
`app/data/work-with-me.ts` and could only be changed by an engineer.

### Language

**A17 · Spelling** — error
Every word appears in the system dictionary or in `eval/dictionary.txt`, the
site's own word list — Unmissables, Anomaly, WeightWatchers, Stagwell, Huntsman,
Myllylä, and every other name the site uses. Adding a real word to that list is
part of the fix, not a workaround. Written after "Mira Myllälä" and "Mira
Myllylä" both sat on the live site.

**A18 · One spelling per name** — error
Each proper noun has a single canonical form, listed in `eval/dictionary.txt`.
WeightWatchers is never Weight Watchers; Ad Council is never AdCouncil. The check
compares against the canonical form, so a second spelling fails even when both
are dictionary-valid.

**A19 · Punctuation hygiene** — warn
No missing apostrophe in a possessive, no double spaces, no space before a comma
or period, no straight quotes mixed with curly ones inside the same field. From
"customers financial goals", which published without its apostrophe.

**A20 · No accidental repetition** — warn
No doubled word ("the the"). No sentence appearing on two different pages. Where
the same testimonial is stored in a long and a short cut, both are listed so an
edit to one surfaces the other. Multiple cuts are legitimate — seven testimonials
have them by design — so this reports rather than fails.

**A21 · Numbers agree** — error
A count about Ariba's record — talks, awards, years, books — reads the same
everywhere it appears. "215+ talks" on Home and a different number on Speaking is
a failure, because a claim about her own record drifting between pages does more
damage than a typo.

**A22 · Dates haven't expired** — warn
No year in the copy is in the past, and no date range has ended. Catches a stale
copyright line and a credential that has quietly aged out.

---

## Layer J — judgment, one page at a time

Run per page, at 1440px and at 375px. Not automated.

**J1 · Nothing overflows** — No horizontal scroll at 375px. Wide content — tables,
long titles, tag rows — stays inside its container.

**J2 · Text is legible** — No text under 12px. Nothing clipped mid-word. Line
lengths stay readable at both widths.

**J3 · Images crop well** — Faces and subjects survive the mobile crop. No
stretching, no empty letterboxing.

**J4 · Interactive things work** — Flip cards flip, accordions open, carousels
scroll, forms submit and show a result. Every control is reachable by keyboard
and has a visible focus state.

**J5 · The console is clean** — No errors or React warnings on load or on
interaction.

**J6 · The first screen makes its case** — Above the fold, at both widths, the
page says what it is and gives one clear next action.

**J7 · Copy sounds like Ariba** — Checked against the voice canon, which lives
outside this repo. Watch for the recurring tropes rather than reading for general
quality.

**J9 · Grammar reads correctly** — Beyond the mechanical punctuation in A19.
Deliberately left to a reader rather than a tool: automated grammar checking
flags fragments and one-line paragraphs as errors, and those are voice choices
here, not mistakes.

**J8 · The page loads fast** — Largest Contentful Paint under 2.5s on a throttled
mobile connection. Images sized and lazy-loaded below the fold.

---

## Adding a check

A check earns a place here when something broke and a rule would have caught it.
A11, A12, A14, A17, and A19 were all written that way on Sept 9 2026, after a
session that found each one by hand. Note what it was, so a later reader knows
the rule came from a real failure rather than from a general idea about quality.

A16, A18, A21, and A22 came from Ariba the same day, from asking what else the
site should be held to. They haven't caught anything yet.

Two files carry judgment the checks can't derive and have to be kept by hand:
`eval/dictionary.txt` (the site's proper nouns and their canonical spelling) and
`eval/destinations.json` (where the links that matter are supposed to point).
