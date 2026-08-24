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

## Outstanding work, in priority order

1. **Hero CTA/wordmark/line-height mobile sizing (Home)** — recommended but not yet built:
   - CTA links ("Work With Me" / "Read Unmissables"): 15px → 12px on mobile, tracking 0.12em → 0.08em
   - Wordmark image: cap at ~80% width on mobile instead of full-bleed
   - Intro paragraph line-height: tighten to ~1.35 on mobile (currently 1.58)
   - Push the text stack down slightly so it clears her face in the photo (upper-middle of frame)
2. **About page hero vs. other pages' hero** — deliberately deferred design decision. Home/Speaking/Work With Me all use a full-bleed moody action photo + dark scrim + white text overlay. About uses a bright, flat-lit studio photo with no scrim — quieter, more editorial. This wasn't a decision, it was a side effect of the photo's lighting not supporting the same treatment. Worth deciding on purpose now that the rest of the mobile pass is done: does About stay deliberately quieter, or does it need a different (moodier) photo to match the other three heroes?
3. **Reading Room** — not started, on hold per above.
4. **Deployment** — no live URL yet. Recommended stack (from the original handoff doc) is Vercel with Ariba's custom domain connected via Vercel's domain settings.
5. **Known placeholder gaps** (predate the mobile UX work, not rechecked recently):
   - 3 Quest cards on Home (Asha, Women In Innovation, Daboodle) have no real copy or photos — flagged with a `// TODO` in `app/data/home.ts`
   - Some CTA links still point at `#` (e.g. a few "Learn more" links)
   - "Get in Touch" CTA uses a plain mailto — was flagged as scraper-exposed, meant to be obscured or replaced with a form
6. **No CMS** — content lives in code (`app/data/*.ts` per page). The original handoff doc suggested Sanity, Contentful, or TinaCMS if Ariba wants to edit copy/images without touching code. Never discussed since scaffolding began — needs a decision if/when she wants that.

## Key decisions to carry forward

- **Never overwrite an image file in place.** Always save crops/edits under a brand-new filename. We got burned once this session by the browser caching stale bytes under a reused filename even after the file on disk had changed — a fresh filename sidesteps the whole question.
- **Tailwind v4 cascade gotcha:** any plain CSS rule added to `app/globals.css` that targets a bare HTML tag (like `a`) must be wrapped in `@layer base { ... }`. Unlayered CSS beats ALL layered utility classes regardless of selector specificity — this silently broke every `text-cherish` link on Home early on and cost real time to trace.
- **Mobile typography can deviate from desktop-locked values when it doesn't make sense at small sizes.** The design system originally locked things like "CTA text always 15px" as a sitewide rule assuming desktop contexts; this session established that mobile gets its own scale (16px body floor, tighter leading ~1.45, and now CTA links even smaller in the hero specifically) rather than force-fitting the desktop lock everywhere.
- **Git author for this repo** is set at the repo level to `4304091+aribajahan@users.noreply.github.com` (Ariba's GitHub-issued noreply address) — this is what makes commits count on her contribution graph. Don't let this drift back to a hostname-based auto-detected email.
- **Reading Room stays untouched** until Ariba explicitly says to start it.

## Process notes for next session

- A dev server may already be running on port 3000 locally — check with `lsof -iTCP:3000 -sTCP:LISTEN -n -P` before starting a new one.
- `.claude/launch.json` is configured to attach the preview tool to `http://localhost:3000`.
- To view on a phone: same WiFi, visit `http://<mac-local-ip>:3000` (get the IP via `ipconfig getifaddr en0`, it can change between sessions/networks).
- The in-app Browser pane tool had some flaky moments this session — stale screenshot frames after `window.scrollTo` with smooth-scroll enabled, and images occasionally getting stuck in a perpetual "pending" load state that didn't reflect the real server (confirmed via direct `fetch()`/`curl` both succeeding instantly). If something in a screenshot looks broken, verify via DOM measurement (`getBoundingClientRect`, computed styles) or a fresh tab before reporting it as a real bug — several apparent "bugs" this session turned out to be tool artifacts, not real issues.
- Large multi-file changes were delegated to background `Agent` tool calls with detailed, itemized prompts (one agent per logical group of files to avoid edit conflicts), then visually verified on mobile viewport in the Browser pane before committing. This pattern worked well for the 20-item mobile UX batch and is worth repeating for similarly-scoped work.
