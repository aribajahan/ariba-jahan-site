# CMS Content Model — read alongside `CMS Concept Preview.dc.html`

This defines what the Sanity (or chosen CMS) schema should look like. The linked preview file is a **clickable UX mockup**, not final content — only Home's Hero section and a few collections are built out in detail; that's intentional (proving the pattern once, not redrawing every page). Apply the same pattern to every other section/page by reading its real HTML in the other handoff files.

## Editing granularity rule ("mixed")
- **Its own field**: anything that's a card, list item, headline, CTA, or photo — things edited/reordered independently (see Hero's CTA list in the mockup).
- **One block field**: stable prose you'd rewrite as a whole, not sentence-by-sentence (e.g. footer credit line).
- Apply this section-by-section across Home, Speaking, Work With Me, About as you build their schemas — don't ask per-field, extrapolate from the Hero example.

## Pages (singleton documents)
- Home, Speaking, Work With Me, About, Reading Room — one doc per page, each holding its non-collection fields (headlines, intro copy, etc.) split into per-section fields per the granularity rule.
- Reading Room is modeled now even though the live page isn't finished — don't skip its schema.
- **SEO lives separately per page**: title, meta description, social share image — not mixed into page content fields.

## Collections (repeatable, reorderable)
- **Testimonials** — quote, author, title/org, category (Leadership/Speaking/Client — drives card color per design-system.md's palette rule). Referenced from Home, Speaking, Work With Me.
- **Speaking Logos** — name, image, display size (S/M/L), reorderable — powers the Engagements section logo wall.
- **Speaking Gallery Photos** — separate collection from logos, powers the photo grid.
- **Work With Me Offer Cards** — title, tag/category, description, CTA.
- **Case Studies & Quests** — title, tag type (Case Study = pink / Quest = orange, per design-system.md), photo, description, link. Powers Home's Select Work strip.
- **Articles** — a real native blog on the site (separate from Unmissables, which is external at unmissables.xyz): title, slug, cover image, body (rich text), excerpt, tags, published date, draft/published status. One shared Article template renders every entry — **publishing a new article is a CMS form, never a new coded page.**
- **Media Library** — every uploaded image lives here regardless of which page uses it. Fields: image, alt text (AI-drafted via a "Generate Alt Text" vision-model call, always human-reviewed before save, never auto-published), tags (AI-suggested on upload from image content + which section it was dropped into, editable), and a computed "used on [page → section]" reference list. Untagged/unused images are flagged so they're safe to delete.
- **Forms** — one shared, brand-styled form template; each entry here is a distinct form (Contact Form is the default, live at `contact.dc.html`) with its own reorderable field list (type: text/email/textarea/dropdown, required flag), accent color, and "On Submit" behavior (thank-you message vs. redirect). Submissions should land in the CMS AND trigger an email notification — don't make her check two places. `contact.dc.html` (built) has category-conditional sub-questions (Speaking/Advisory/Press each surface extra fields), inline field validation, and a honeypot spam field — replicate that pattern for any new form.

## What's still a Claude Code/Claude Design job, not a CMS job
New page **types** (a new layout/template — a photo essay format, an interactive piece) require real code, same as today. The CMS only removes code-touching for *content within existing templates*. Articles solve "I want to keep publishing writing" without needing a new page each time; a structurally new kind of page still doesn't.

## Per-page settings (not just site-wide)
Every page needs its own settings panel — modeled on Squarespace's Page Settings (see the mockup's ⚙ icon next to each page in the sidebar): **General** (page title, nav title, URL slug, **Availability**: Public / Unlisted (live but hidden from nav — for direct-link sharing before an announcement) / Password-protected / Draft, optional password), **Navigation** (show/hide in nav, show/hide footer for that page), **SEO** (page title, meta description — separate from the site-wide SEO doc, with a live search-result preview), **Social Image** (per-page share image, with a live social-card preview), **Advanced** (page-specific code injection, e.g. a future booking widget or tracking pixel). Site-wide SEO settings remain the fallback when a page doesn't override them.

## Site Settings (site-wide, not per-page)
Nav links (reorderable, add/remove), Social Links, Footer credit line + copyright year, **Favicon**, **Social Sharing default image** (fallback when a page has no per-page override), **Blog Preferences** (tag management + RSS feed toggle, now that Articles exists). Skip Site Languages, Regional Settings, Pinterest Save Buttons, and Cookies/Privacy consent for now — none apply until multi-language, e-commerce, or analytics tracking actually get added; Import/Export is native to Sanity Studio already, no custom UI needed.

## Domains & subdomains
Domains are a hosting/DNS concern (managed in Vercel), not CMS content — the CMS just needs a read-only **Domains** screen listing the primary domain and any subdomains (e.g. a future `blog.aribajahan.com` or a course/community subdomain) so it's visible without digging into Vercel. Don't build actual DNS management into the CMS.

## Marketing Tools (grows with the business)
A **site-wide Announcement Bar** (message + link, toggle on/off) — the lowest-effort way to promote a new cohort, article, or offer without editing every page. Model the toggle now; leave a **Promotional Pop-Up** as a documented-but-unbuilt placeholder until there's an actual lead magnet to justify it.

## Room to grow (flag now, don't build yet)
As the business evolves, these are the likely next additions — call them out to Claude Code as intentional gaps, not oversights:
- **Digital product delivery** — still being decided (free email-gate vs. Gumroad/Stan Store vs. custom Stripe checkout); don't build a product/download page until she confirms the model, since the technology choice changes the page structure.
- **Analytics summary** (page views, top content) surfaced in the Studio itself, not just in Vercel/Google Analytics
- **E-commerce readiness** if she ever sells a course or digital product directly
- **Integrations** — auto-cross-posting Articles to Substack/Unmissables, or a booking calendar embed
- **Multi-user roles** — not needed now (single editor), but the schema shouldn't fight it if a VA or collaborator joins later

## Editing UX expectations
- **Live vs. Draft preview toggle** on every page-level editor (see Home in the mockup) — Draft shows unpublished changes, Live shows what visitors currently see.
- **Autosave** with a visible "Saved Xs ago" timestamp — don't rely on manual save alone.
- **Publish → Undo** — a dismissible toast for ~10s after publishing, plus **Version History** per document so any earlier save can be restored, not just the last one.
- **Delete needs a confirmation step**, especially in Media Library — no single-click destructive actions.
- **Empty states** should guide, not just show blank ("No testimonials yet — click + New"), once collections can genuinely be empty.
- Single-user editing (just the site owner) — no role/permission system needed for v1.
