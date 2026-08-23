# Handoff: Ariba Jahan Personal Website (5 pages)

## Overview
A personal portfolio/business site for Ariba Jahan across 5 pages: Home, About, Speaking, Work With Me, Reading Room. Built and refined as HTML design prototypes. This package hands those designs off for implementation as a real, deployable site.

## About the Design Files
The `.dc.html` files in this bundle are **design references**, not production code to paste as-is. They were built in a design tool (hence some non-standard markup patterns like `<image-slot>` custom elements and `{{ }}` template placeholders left over from that tool — ignore/strip those, they are not real syntax). Your job is to **recreate these designs pixel-accurately** in a real framework — not redesign, restructure, simplify, or "improve" anything that wasn't explicitly asked for. If something is ambiguous or you think a change would help, ASK before deviating.

**The designer may change her mind on details once working in Claude Code — when she gives new direction, follow her latest instruction over the original HTML.** The HTML is the accurate starting baseline, not an unchangeable spec once she's actively steering.

## Fidelity
**High-fidelity.** Exact colors, typography, spacing, and copy are final. Recreate pixel-accurately using the target framework's conventions (components, etc.) rather than copying raw inline styles verbatim, but the *rendered result* should match.

## Recommended Stack
- **Framework:** Next.js (App Router) + React, deployed to **Vercel** with the designer's existing custom domain connected via Vercel's domain settings.
- **Styling:** Tailwind CSS or CSS Modules — translate the inline styles into a proper stylesheet/token system using `design-system.md` as the source of truth (see below), not copy-pasted inline styles.
- **CMS:** the designer wants to edit copy/images/ordering later without touching code. Recommended: a headless, git-friendly CMS that pairs well with Next.js —
  - **Sanity.io** (generous free tier, great image handling, real-time preview) — best default choice.
  - **Contentful** — solid alternative, more enterprise-flavored.
  - **Simplest option:** MDX/JSON content files in the repo + a lightweight visual editor like **TinaCMS** (git-based, no separate hosted backend) if she wants to avoid a third-party service entirely.
  Ask her which she prefers if unclear; Sanity is the safe default for a portfolio site with photos, testimonials, and case studies.

## Design System — source of truth
Read `design-system.md` FIRST and treat it as the single source of truth for:
- Color palette (exact hex values — do not introduce new colors)
- Typography scale (locked pixel sizes — do not reintroduce fluid clamps where the doc says fixed)
- Spacing/layout rhythm (section padding tiers, max-widths, grid gaps)
- Component patterns (tape/tag pills, card systems, testimonial carousel, flip cards, logo marquee)
- The new **Responsive / Mobile Rules** section — current 700px phone breakpoint, the tablet breakpoint gap to close (~1024px), touch target minimums, and the fragile sticky-stack section

## Critical rules — read before touching anything
Read `PROJECT_RULES.md` in full before starting (this is the project's CLAUDE.md, renamed for this bundle since that filename is reserved). It contains permanent, hard-won rules from past mistakes on this exact project:
- **Never delete an original image without a verified backup** (resize/compress workflow: save new file under a new name, confirm, then replace reference — never delete-then-regenerate).
- **The Home page's "My Experiments" sticky-stacking section is fragile** — specific CSS rules must be followed exactly (`overflow-x:hidden` on `body` only, never `html`/wrapper divs; the sticky wrapper background must be transparent) or the stacking effect breaks. A known-good reference is described in the file.
- Don't bulk-rewrite any single "state" file that holds many independent pieces of user content at once — edit narrowly.

## Content reference
`site-content.md` — full structured copy per page/section, including all links/CTAs and current image file references. Use this alongside the HTML to confirm exact copy (some copy was edited directly in the visual editor after the HTML was first drafted, so `site-content.md` was re-extracted from the live files and is current as of this handoff).

## Screens / Pages
1. **Home** (`home.dc.html`) — hero, positioning statement, Work With Me teaser, Unmissables teaser, credentials stats, Speaking teaser, sticky-stacking "My Experiments" case study cards (fragile — see above), Recognition, Press, Testimonials carousel, Community photo marquee, Closing CTA + footer.
2. **About** (`about.dc.html`) — hero, intro, polaroid-style "My Story" scroll-motion timeline (11 chapters + a 4-photo "Right Now" finale), long-form Bio with expand/collapse, Career Advisory offer (red section), Recognition & Features two-column list, Closing CTA + footer.
3. **Speaking** (`speaking.dc.html`) — hero, 5 Speaking Themes (each with its own bg image), static testimonials list, Trusted By logo strip, Selected Engagements gallery + tag list, Closing CTA + footer.
4. **Work With Me** (`work-with-me.dc.html`) — hero, Trusted By, 4 "why now" problem-framing cards, CX Ambition Sprint offer (red, with 2 expandable accordions), 1:1 Strategy Sessions offer, testimonials carousel, 6 flip-card case studies (front/back), Closing CTA + footer.
5. **Reading Room** (`reading-room.dc.html`) — still WIP per the designer, expect a revised version to be handed off separately later. Build the other 4 pages first; treat Reading Room as lower priority / may change.

Nav and footer are near-identical across all 5 pages — see `site-content.md`'s note under Home; build them as one shared component.

## Interactions & Behavior (recurring patterns — build these as reusable components)
- **Scroll-snap carousels** (testimonials, case studies, community strip): draggable/swipeable, native `scroll-snap-type: x mandatory`, prev/next arrow buttons below the row, dot indicator synced to scroll position via scroll listener — not click-only pagination.
- **Flip cards** (Work With Me case studies): 3D flip via `transform-style: preserve-3d` + `rotateY(180deg)` on a toggle class, front/back faces with `backface-visibility: hidden`.
- **Accordions** (CX Sprint deliverables/breakdown, Reading Room FAQ): max-height transition on toggle, plain click handler.
- **Sticky-stacking cards** (Home "My Experiments"): `position: sticky` cards that stack visually as the user scrolls past — see the critical rules above.
- **Mobile nav:** hamburger toggle swaps a horizontal nav for a stacked dropdown below 700px — same pattern on every page.
- **Logo marquee:** continuous CSS keyframe horizontal scroll, pauses on hover, list duplicated once for a seamless loop.
- Every hover state has a corresponding, slightly-reduced active/press state (~60% of the hover transform) — don't rely on hover alone.

## Assets
Photos and logos live in this project's `assets/` and `uploads/` folders (not duplicated into this handoff bundle — pull directly from the project). `assets/` holds finalized/organized images (logos, story-timeline photos, case study photos). `uploads/` holds the designer's raw drops, including some already-referenced working files (e.g. `now-1-opt.jpg` through `now-4-opt.jpg`, `IMG_9539-opt.jpg`) mixed in with unrelated screenshots and drafts — cross-reference against the exact filenames used in the `.dc.html` `src=` attributes and `site-content.md`'s Images lists; don't assume every file in `uploads/` belongs in the final site.

## Files in this bundle
- `home.dc.html`, `about.dc.html`, `speaking.dc.html`, `work-with-me.dc.html`, `reading-room.dc.html` — design reference HTML
- `design-system.md` — visual system source of truth
- `site-content.md` — full copy/links/images reference
- `PROJECT_RULES.md` — permanent critical rules (the project's CLAUDE.md), read first

## First prompt to give Claude Code
> "Read PROJECT_RULES.md and design-system.md fully before writing any code. Recreate these 5 HTML pages pixel-accurately as a Next.js site using [Sanity CMS / your choice] for content, styled with [Tailwind/CSS Modules]. Treat design-system.md as the single source of truth for all colors, type, and spacing — don't introduce new values. Treat the .dc.html files as the exact layout/copy reference, and site-content.md as backup for exact copy and links. Do not restructure, redesign, or improve anything I haven't explicitly asked for — ask me first if something is ambiguous. I may give you new direction as we go; when I do, follow my latest instruction over the original HTML."
