# Ariba Jahan — Design System

Reference this at the start of any new page/chat so it matches the homepage without re-deriving decisions.

## Palette
Use ONLY these — no new hues.

**Primary (majority of the design):**
- `#FFFBF3` — off-white (primary background)
- `#2D2D2D` — charcoal (primary text, dark section background)
- `#8EF942` — tennis ball green (primary color — reserved for Unmissables tags/chips only, not tape)
- `#E73131` — cherish red (primary brand color, not just a CTA accent — use freely as a section background alongside cream/charcoal)

**Accent (graphics/small moments only, ≤30% of visual space):**
- `#F5A8D5` — femme pink — reserved for Work With Me / case studies (Home's "Case Study" tag)
- `#FF6D24` — tangerine orange — reserved for "Quest" tags (Home's Case Studies & Quests cards)
- `#F3FF00` — highlighter yellow — reserved for About's story-timeline tape motif
- `#0F0FF4` — outerspace blue — not currently in use; hold in reserve rather than introducing a 5th accent

White text on charcoal/red uses `#FFFBF3`, not pure white.

**Rhythm rule:** three-way rotation across off-white, charcoal, and red as section backgrounds — no more than 2 same-tone sections in a row, and red should show up at least once per page beyond just CTAs/credentials. Don't add a third neutral (no tan/cream). Still keep CTA buttons and "the ask" moments in red so they read as action — but red-as-background is now also a legitimate rhythm beat, not reserved.

**Testimonial category coding:** cards are color-coded by relationship type, not randomly alternated — Leadership = off-white/border, Speaking = charcoal, Client = red. Cards are interleaved (not grouped) for visual rhythm across the scroll.

## Pages
- `home.dc.html`, `about.dc.html`, `speaking.dc.html`, `work-with-me.dc.html`, `reading-room.dc.html` — all 5 live pages, kebab-case filenames.

## Type
- **Headlines/numerals:** 'Big Shoulders Display', weight 900 (700/800 for smaller labels), uppercase, tight letter-spacing (-0.01 to -0.02em), line-height ~0.9-1.
- **Body:** 'Barlow', regular/500/600 weights, line-height 1.6-1.75. Floor: 16px minimum anywhere on the site.
- **Eyebrow labels:** 11px (locked), weight 800, letter-spacing 0.2-0.22em, uppercase, usually red or a muted tint of the section's text color.
- **Section H2s:** locked to a fixed **48px** (was a `clamp(30px,4vw,48px)` fluid range — now fixed so it doesn't feel small at typical viewport widths). Mobile override via `[data-mq="section-h2"] { font-size: 32px !important; }` in each page's existing 700px media query — don't reintroduce a clamp.
- **Hero H1s:** 36-40px minimum at small viewports (was collapsing smaller before this was locked in). Reading Room's hero/section headers use their own bespoke fluid scale (still WIP, not yet folded into the shared H2 standard).
- **"Important copy" tier — 19px:** for pre-CTA / decision-relevant paragraphs (offer descriptions, the line right before an ask) — sits above the 16-17px body floor so the reading that leads to a click doesn't feel like filler. Don't apply it to every paragraph, only ones setting up an action.
- **CTA buttons/links — locked to 15px, 700-800 weight.** Previously 11-13px, which read as smaller than eyebrow labels and undersold the ask. Applies to: nav "Contact" pills, hero CTAs, "Learn more →" / "See all →" / "View all →" links, offer-card CTAs, and the small action line under each Closing-CTA card (e.g. "Speaker inquiry →").
- Google Fonts import: `Big+Shoulders+Display:wght@700;800;900` + `Barlow:ital,wght@0,400;0,500;0,600;1,400`

## Layout
- Section max-width: **1400px**, centered, `padding: 0 clamp(24px,5vw,80px)` — every section shares this so left edges align across the page.
- **Section top padding — two tiers, don't mix them up:**
  - **Tier A ("eyebrow + headline + content" openers)** — any section that leads with an eyebrow label followed by a real Big Shoulders Display headline before its content (testimonials, case studies, story sections, close/CTA sections, etc.). These must ALL use **120px top padding**, no exceptions, so headline start-points align in the site's rhythm as you scroll. Bottom padding can vary with what follows.
  - **Tier B (utility/texture, no headline)** — logo marquees/tickers, stat strips, thin divider rows, trust bars. These don't carry a full headline, so their own tighter padding (40-90px) is fine and doesn't need to match Tier A.
  - Split image+text layout sections (e.g. Home's Speaking/Recognition halves) are a separate structural pattern — padding lives on the text column, not the section — and form their own consistent sub-group rather than matching Tier A's 120px directly.
- Grid gaps: 24px (cards), 3-4px (photo grids / color-blocked panels — intentionally tight, almost seamless).

## Components / patterns
- **Tape / tag pills (rotated label motif):** `display:inline-block; transform:rotate(-1 to -1.5deg); padding:2-3px 7-10px`. Color is now assigned per context, not one universal pink:
  - About's story-timeline photo captions → `#F3FF00` (yellow)
  - Home's Case Studies & Quests cards → `#F5A8D5` (pink) for Case Study entries, `#FF6D24` (orange) for Quest entries
  - Unmissables grid chips → `#8EF942` (green) — flat chip, not rotated tape
  - Work With Me and Speaking currently have no tape.
- **Cards (Work With Me):** off-white on red, `border-top:3px solid #E73131`, hover: `translateY(-5px)` + shadow lift.
- **Ghost numerals/text:** oversized (80-220px) Big Shoulders Display at 5-15% opacity, absolutely positioned behind real content — used in Unmissables tiles and Testimonials cards as background texture/category signal. No small duplicate eyebrow label needed alongside it.
- **Testimonials:** full-width horizontally-scrollable cards (native drag/scroll-snap, not click-only), color-coded by category (see Palette rhythm rule above) and interleaved, cards ~540px wide so a sliver of the next card always peeks at the edge. Arrow buttons sit BELOW the row (aligned under the row's own left/right edges, not overlapping card text) + a dot indicator above them that live-syncs to scroll position (via onScroll handler, not click-only).
- **Image slots:** use the `<image-slot>` component (drag-and-drop editable) for all real photography — never a flat `background-image` div — so images stay swappable in the editor. Prefill `src` with the current photo so nothing looks blank.
- **Logo marquee:** continuous CSS `@keyframes` scroll, pauses on hover, small labeled column pinned left ("Spoken at" / "Featured in" / "Worked with").
- **Links:** default color inherits text color; hover → `#E73131`.
- **Press feedback:** every clickable button/icon-arrow/lift-card carries a `style-active` alongside its `style-hover` — press state is hover state pulled in ~60% (e.g. hover `translateY(-6px)` → active `translateY(-2px)`) plus `transform:scale(0.92)` on icon-only buttons. No element should rely on hover alone for feedback.

## Motion & Scroll Patterns
- **Scroll-snap carousels** (testimonials, case studies): `overflow-x:scroll (or auto); scroll-snap-type:x mandatory; scrollbar-width:none` + `::-webkit-scrollbar{display:none}` on the container id/class. Each card gets `scroll-snap-align:start; flex:0 0 min(540px,76vw)`. Paired with a `data-mq`-free prev/next arrow pair (44×44px circular buttons, `border:1.5px solid rgba(45,45,45,0.25)`) below the row and a dot-indicator row that live-syncs to scroll position via an `onScroll` handler (`handleCarouselScroll` / `handleCaseScroll` pattern) — never click-only, always draggable/scrollable.
- **Logo marquee:** `@keyframes logoScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }`, duplicate the logo list once so the loop is seamless, `animation: logoScroll 100-145s linear infinite` (vary duration/direction per row), pause via `style-hover="animation-play-state:paused;"`.
- **Story-timeline subtle scroll motion (About page):** not a reveal — it's a continuous, always-live effect. Each photo-pair wrapper holds a ref; a `scroll` listener (`updateTransforms`) recomputes a 0-1 progress value from `getBoundingClientRect().top` vs viewport height on every scroll tick, nudging rotation/translateX/translateY slightly as the photo moves through the viewport (photos are already visible, this just adds a small settle/drift, not a fade/slide-in entrance). Reused per-chapter via a `baseRot` map keyed by chapter index — extend the same map/ref-count when adding a chapter rather than hand-rolling new logic.
- **Flip cards (Work With Me case studies):** `.wwm-flipcard`/`.wwm-flipinner` with `transform-style:preserve-3d; transition:transform .6s`, `.is-flipped .wwm-flipinner{transform:rotateY(180deg)}`, two `.wwm-face` children (front/back) each `position:absolute;inset:0;backface-visibility:hidden`. A round 36px `.wwm-flip-btn` (⇄ front, ← back, red on the back face) toggles the flip via a class add/remove on click, not a hover-flip.
- **My Experiments sticky-stack (Home page):** `position:sticky` polaroid cards pinning and stacking as you scroll. CRITICAL constraints (see CLAUDE.md) — `overflow-x:hidden` must live on `body` only, never `html` or a wrapper div (kills sticky); the sticky wrapper's own background must stay transparent (a solid fill blocks the card underneath during the stack transition). Reference copy: `reference/Home Page - Experiments Section (KNOWN GOOD).md`.
- **Press feedback:** every clickable button/icon/lift-card pairs a `style-hover` with a `style-active` pulled to ~60% of the hover value (e.g. hover `translateY(-6px)` → active `translateY(-2px)`), plus `transform:scale(0.92)` on icon-only buttons.

## Card Systems
- **Case study / quest cards (Home "Select Work" strip):** rotated polaroid-style cards in a scroll-snap row, `391px` wide, `box-shadow:0 16px 32px -12px rgba(0,0,0,0.28)`, alternating rotation (`i % 2 === 0 ? deg : -deg`) generated per-index in `renderVals()`, not hand-placed per card.
- **Testimonial cards:** `min(540px,76vw)` wide, `min-height:400px`, background rotates through off-white/charcoal/red per the category-coding rule (Leadership/Speaking/Client — see Palette), with an oversized (90px) near-invisible category ghost-word (`rgba(...,.06-.1)`) absolutely positioned top-left as texture, no separate eyebrow label needed alongside it.
- **Work With Me case-study flip cards:** front face = title (24px Big Shoulders) + 15px summary + flip button; back face = role/context line (11.5px italic) + a "Read testimonial" toggle (12px underline) that expands an inline 13px italic quote. Same scroll-snap row pattern as testimonials.
- **Offer cards (CX Sprint / 1:1 Strategy, etc.):** off-white on red or charcoal, `border-top:3px solid #E73131`, headline (26-36px clamp) → 19px offer-description copy → 15px CTA link. Hover `translateY(-5px)` + shadow lift, matching active state per the press-feedback rule above.
- **Tape / tag pills:** `display:inline-block; transform:rotate(-1 to -1.5deg); padding:2-3px 7-10px`, color assigned per context (see Palette) — About's story-timeline tape now always mirrors its row's headline text verbatim (added this session), Home's case-study/quest tags read `{tag} · {index}`.


- Speaking section's talk-title list was removed; no replacement copy yet if one is wanted.
- "Get in Touch" CTA has no destination yet — plain mailto is scraper-exposed; use a lightly-obscured mailto or a contact form once an email is chosen.
- Positioning section is intentionally photo-free — large pull-quote text only (a photo there read as orphaned/weak; don't re-add without a real reason).
- Unmissables grid: 4 of 10 tiles (1 essay, 3 podcasts) are still placeholders — need real titles + links.
- "Learn more →" links on Opportunity Sprint / CX Ambition Sprint, and "Book a session →" on 1:1 Advisory, all point to "#" — no destinations set.
- "View all recognition →" and recognition list items link to About.dc.html / "#".
- Case Study 7 on Work With Me is still placeholder (title/summary/pills).
- Reading Room needs a bigger content pass — still WIP.
- All 4 main pages (home, about, speaking, work-with-me) now have real structure and content — none are placeholder stubs anymore. Remaining gap across all of them is photography: image-slot placeholders still need real photos (case study cards, community strip, About timeline).

## Recently resolved
- Full typography standardization pass across all 4 pages (see Type section above): eyebrows locked to 11px, H2s unified to one clamp, hero H1 floors raised, body floor raised to 16px.
- Color sequencing pass: no more than 2 same-tone sections in a row anywhere on the site. Added full dark/red sections to break up monotony — Home's Close (dark, bookends Hero), Work With Me's CX Sprint (red), Speaking's Close (red); fixed About's stray gray hero to charcoal.
- Footer restructured: wordmark + credit line grouped together, socials beside them, copyright dropped to true bottom; added full tool-stack credit line.
- Speaking page's scroll-reveal system removed entirely (was getting stuck invisible) — now static/always-visible like other pages.
- Home's Case Studies & Quests card stack tightened: 950px width, 440px photo height, PEEK 3, tighter wrapper padding — reads as a true stacked deck now.
- Pulled real case study copy (Ally, WeightWatchers, Stagwell) from Work With Me into Home's first 3 experiment cards.
- Speaking section decluttered: shortened headline to "PEOPLE + TECHNOLOGY", cleaned pasted-in markup artifacts, gave the 3 body paragraphs real spacing, removed a duplicate subhead and a dead empty div.
- Added an intro paragraph under the Work With Me headline; rewrote all three offering descriptions (Opportunity Sprint, CX Ambition Sprint, 1:1 Advisory) to a "for when..." framing.
- Replaced the one-line Unmissables tagline with a fuller intro paragraph.

## Voice
Direct, credential-forward but not braggy — years/numbers frame expertise, not flex. Section intros are short (1-2 sentences) then get concrete (talk titles, offering names, quotes) fast. No filler paragraphs.

## Content reference
See `site-content.md` for the actual current copy/links/images — update that file (or ask in chat) when content changes; this doc is style/pattern only.

## Responsive / Mobile Rules
- **Current breakpoints:** each page has one `@media (max-width: 700px)` block using `data-mq="..."` attribute selectors (e.g. `[data-mq="section-h2"]`) to override styles at phone width. This covers phones in portrait well.
- **Gap to close:** there's no tablet-range breakpoint. Screens between ~700px and desktop width (iPad portrait/landscape, small laptops) currently get the full desktop layout, which isn't broken but isn't tuned either. Add a second `@media (max-width: 1024px)` tier (tablet) that sits between the existing 700px phone tier and desktop — tighten multi-column grids to 2-up, ease side padding, and adjust type sizes that were set assuming desktop width.
- **Touch targets:** minimum 44×44px on any tappable element at phone/tablet widths (nav links, flip-card buttons, arrows, accordion toggles).
- **Nav-burger pattern:** already built (`toggleMobileNav` + `[data-mq="nav-burger"]`/`[data-mq="nav-links"]`) — reuse this exact pattern rather than inventing a new mobile nav approach.
- **Sticky-stack section (Home's "My Experiments"):** extremely fragile across breakpoints — see CLAUDE.md's permanent rules before touching it for responsive work. In short: `overflow-x:hidden` must stay on `body` only (never `html` or a wrapper div), and the sticky wrapper's background must stay transparent. Diff against `reference/Home Page - Experiments Section (KNOWN GOOD).md` if it breaks.
- **Scroll-snap carousels** (testimonials, case studies, community strip): these already scroll natively on touch — verify drag/swipe still works post-breakpoint changes, don't replace with click-only pagination.

## Building a new page
1. Copy the nav + footer verbatim.
2. Alternate off-white/charcoal per section; only use red for a CTA-strip or offer section.
3. Match max-width/padding rhythm above so nav/hero/sections all align.
4. Use image-slot for any photo.
5. Reuse the tape mark only if this page has a genuine "look here" moment — don't default to it everywhere.
