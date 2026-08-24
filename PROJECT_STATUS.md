# Project Status

Living wrap-up doc for the Ariba Jahan site build. Updated at the end of each work session so a new session can pick up context fast. Read this first before starting new work.

Last updated: 2026-08-24

## What's built

Next.js 14 (App Router) + Tailwind v4 site, scaffolded from the `design-reference/` bundle. Four of five pages are live and pixel-accurate to the reference:

- **Home** (`/`) — hero, logo marquee, positioning statement, Work With Me teaser, Unmissables, credentials strip, Speaking teaser ("People + Technology"), Projects & Quests carousel, Recognition, Press & Bylines, testimonials, Community marquee, closing CTA
- **Speaking** (`/speaking`) — hero, speaking themes, testimonials, Trusted By logos, Selected Engagements gallery, closing CTA
- **Work With Me** (`/work-with-me`) — hero, Trusted By, problem-framing cards, CX Ambition Sprint (accordions), 1:1 Strategy Sessions, testimonials, flip-card case studies, closing CTA
- **About** (`/about`) — hero, intro, scroll-drift story timeline (11 chapters + Right Now finale), expandable bio, Career Advisory, Recognition & Features, closing CTA
- **Reading Room** (`/reading-room`) — **not built.** On hold — Ariba is designing it separately in Claude Design. Do not start this until she says go.

GitHub: [aribajahan/ariba-jahan-site](https://github.com/aribajahan/ariba-jahan-site) (public). Not yet deployed anywhere live — no Vercel setup, so the only ways to view it are `localhost:3000` or same-WiFi phone access (see Process Notes below).

This session (2026-08-24, second pass) did a full round of Home page polish:

- **Hero mobile sizing** — CTA links 15px→12px with tighter tracking, wordmark capped at 80% width on mobile, intro paragraph leading tightened, text stack shifted down to clear her face in the photo.
- **Home whitespace/layout pass** — tightened padding under the logo marquee and around Press/Testimonials; shrank credential stat numbers and gave every stat label a consistent two-line wrap (explicit line breaks, not width-based wrapping); lowered the "People + Technology" photo crop so her head is in frame; reduced the gap under the Projects & Quests carousel and centered its arrow nav as a pair; moved the Recognition eyebrow/headline above the photo on mobile stacking.
- **Testimonials redesign** — desktop shows full quotes at natural (varying) height, same as original. Mobile clamps every card to roughly Lauren Lavalle's quote length (~260 chars, the shortest testimonial) with a "Read more/Show less" toggle that grows the card in place — no internal scrolling.
- **Case study "tape" treatment** — the Case Study/Quest tag on Experiments cards is now a rotated washi-tape strip overlapping the top edge of the card (was a small badge inside the photo). Case Study and Quest entries now alternate in display order instead of all Case Studies first, all Quests after.
- **Quest cards filled in** — Asha, Women In Innovation, and Daboodle now have real images (`public/assets/quest-*-v1.*`, sourced from files Ariba dropped in `design-reference/assets/`). Asha and Daboodle have real copy; **Women In Innovation still needs a blurb** (still shows "Full write-up coming soon").
- **Mobile padding audit (Home only)** — found and fixed three sections that kept full desktop-sized padding on mobile with no reduction: WorkWithMe (Home teaser), Speaking's text column, Recognition's content column. Also tightened the CX Ambition Sprint / 1:1 Strategy Sessions teaser cards on Home for mobile (padding and inter-card gap were flat desktop values, making the stacked cards read as long and sparse).
- **One reverted experiment**: tried letting the "People + Technology" photo grid bleed flush against the red Credentials bar above it. On review this read as a misalignment (photos flush, text column still padded) rather than a deliberate edge — reverted to a modest gap.

## Outstanding work, in priority order

1. **CX Ambition Sprint / 1:1 Strategy Sessions boxes on the actual `/work-with-me` page** — still open. The original complaint (`CXSprint.tsx` / `StrategySessions.tsx`: two bordered accordions stacked in the content column next to a 560px photo makes the section feel long and "box in a box") was never resolved — only the simpler Home teaser cards got fixed this session. Two options on the table: (a) drop the accordion pattern, lay deliverables/week-breakdown out as an always-visible two-column list, or (b) keep the accordion behavior but arrange the two accordions side-by-side instead of stacked. Needs Ariba's call before touching code.
2. **Carry the Home fixes to the other two pages** — not yet done, flagged as likely needed:
   - Testimonials card-sizing fix (mobile truncate + Read more, desktop full/natural height) → `SpeakingTestimonials.tsx` and `WwmTestimonials.tsx` still use the original pattern (fixed `min-h`, no truncation, uneven card heights).
   - Mobile padding audit → only Home was audited this session. About and Speaking/Work-With-Me haven't been checked for the same "flat desktop padding, no mobile override" issue.
3. **Women In Innovation quest blurb** — Asha and Daboodle have real copy now; WII still needs a sentence from Ariba.
4. **About page hero vs. other pages' hero** — reviewed this session, decision made: keep About's bright, flat-lit studio photo as a deliberate quieter/editorial register rather than forcing it to match the other three moody action-photo heroes. One small leftover: on mobile, a strand of her hair crosses through the word "hope," in the About headline — minor, worth a look if the photo crop or headline position gets touched again.
5. **Reading Room** — not started, on hold per above.
6. **Deployment** — no live URL yet. Recommended stack (from the original handoff doc) is Vercel with Ariba's custom domain connected via Vercel's domain settings.
7. **Known placeholder gaps** (predate the mobile UX work, not rechecked recently):
   - Some CTA links still point at `#` (e.g. a few "Learn more" links)
   - "Get in Touch" CTA uses a plain mailto — was flagged as scraper-exposed, meant to be obscured or replaced with a form
8. **No CMS** — content lives in code (`app/data/*.ts` per page). The original handoff doc suggested Sanity, Contentful, or TinaCMS if Ariba wants to edit copy/images without touching code. Never discussed since scaffolding began — needs a decision if/when she wants that.

## Key decisions to carry forward

- **Never overwrite an image file in place.** Always save crops/edits under a brand-new filename. We got burned once this session by the browser caching stale bytes under a reused filename even after the file on disk had changed — a fresh filename sidesteps the whole question.
- **Tailwind v4 cascade gotcha:** any plain CSS rule added to `app/globals.css` that targets a bare HTML tag (like `a`) must be wrapped in `@layer base { ... }`. Unlayered CSS beats ALL layered utility classes regardless of selector specificity — this silently broke every `text-cherish` link on Home early on and cost real time to trace.
- **Mobile typography can deviate from desktop-locked values when it doesn't make sense at small sizes.** The design system originally locked things like "CTA text always 15px" as a sitewide rule assuming desktop contexts; mobile gets its own scale (16px body floor, tighter leading, smaller CTA text where it makes sense) rather than force-fitting the desktop lock everywhere. Reinforced this session with the CX/Strategy teaser card padding, which needed real mobile-specific reduction, not just a smaller font.
- **Testimonial truncation is mobile-only.** Desktop testimonials always show the full quote at natural (varying) height — no clamping, no "Read more," matching the original design. Only mobile clamps to a consistent visible length (~Lauren Lavalle's quote, the shortest, ~260 chars) with a toggle. Don't apply desktop-style capping/scrolling to mobile cards — internal scroll inside a small card reads as unintuitive; letting the card grow in place on expand is the right behavior.
- **A "full bleed to the edge" layout fix should still respect sibling alignment.** When one column in a row goes edge-to-edge but a sibling column keeps its own padding, the flush edge reads as a mistake, not a deliberate design choice. Prefer a smaller deliberate gap over a hard 0px bleed unless the whole row is flush.
- **Case Study / Quest cards alternate in display order** (not grouped by type) and use a rotated tape-strip tag overlapping the card's top edge — this is now the reference treatment for that carousel.
- **Dropped source images live in `design-reference/assets/`, not `public/assets/`.** Files Ariba drops in as new source material need to be copied into `public/assets/` under a distinct filename before they'll actually render on the site — the two folders are not symlinked.
- **Git author for this repo** is set at the repo level to `4304091+aribajahan@users.noreply.github.com` (Ariba's GitHub-issued noreply address) — this is what makes commits count on her contribution graph. Don't let this drift back to a hostname-based auto-detected email.
- **Reading Room stays untouched** until Ariba explicitly says to start it.

## Process notes for next session

- A dev server may already be running on port 3000 locally — check with `lsof -iTCP:3000 -sTCP:LISTEN -n -P` before starting a new one.
- `.claude/launch.json` is configured to attach the preview tool to `http://localhost:3000`.
- To view on a phone: same WiFi, visit `http://<mac-local-ip>:3000` (get the IP via `ipconfig getifaddr en0`, it can change between sessions/networks).
- The in-app Browser pane tool is still flaky — `computer` click/screenshot calls periodically time out after 30s with the pane apparently stuck. The fix that worked reliably this session: `tabs_close` the stuck tab, then `preview_start` again to open a fresh one. Don't keep retrying the same click on a stuck tab.
- For scrolling to a specific section reliably (given the flakiness above), use `javascript_tool` with `document.querySelectorAll` + text match + `getBoundingClientRect()` + `window.scrollTo()` rather than visual scroll gestures — much more reliable for verification screenshots.
- Large multi-file changes were delegated to background `Agent` tool calls with detailed, itemized prompts (one agent per logical group of files to avoid edit conflicts), then visually verified on mobile viewport in the Browser pane before committing. This pattern worked well for the 20-item mobile UX batch and is worth repeating for similarly-scoped work.
