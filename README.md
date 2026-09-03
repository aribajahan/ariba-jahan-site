# aribajahan.com

My site, and the CMS I built to run it.

Live at [aribajahan.com](https://aribajahan.com).

## How it works

Content is JSON in this repo. Every page and collection is edited through an admin panel at `/admin`, which writes back to those files. There's no external CMS and no database.

**Pages** (Home, About, Speaking, Work With Me) each hold their own copy, section by section. SEO metadata is stored separately from page content so it can be edited without touching the copy.

**Collections** are repeatable and reorderable: articles, case studies and quests, testimonials, speaking logos, the speaking gallery, the reading room, the story timeline, and forms.

**Articles** render through one shared template. Publishing a new piece is filling in a form, never adding a coded page. This is the native blog and it's separate from Unmissables, which lives at [unmissables.xyz](https://unmissables.xyz).

**The media library** holds every uploaded image regardless of which page uses it. Alt text is drafted by a vision model on upload and always reviewed before saving. Each image tracks which page and section it appears on, so anything unused gets flagged as safe to delete.

**Forms** share one template. Each form defines its own fields, accent color, and submit behavior. The contact form has category-conditional follow-up questions, inline validation, and a honeypot field. Submissions email a notification rather than waiting to be found.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The admin panel is at `/admin`.

Built with Next.js and TypeScript. Deployed on Vercel.
