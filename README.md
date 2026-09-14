# aribajahan.com

The source code for [aribajahan.com](https://aribajahan.com), my personal site, writing archive, and content studio.

I built it as a public platform for my work in product, experience, and AI strategy: case studies, writing, speaking, and ways to work with me. The site is designed to be edited without needing to open the codebase.

## What's included

- A public site for my work, writing, speaking, and consulting
- A built-in Studio for editing page copy, case studies, articles, testimonials, forms, SEO, and site settings
- JSON-based content stored in the repository
- A media library with alt text and usage tracking
- A native article system, separate from [Unmissables](https://unmissables.xyz), my newsletter and podcast
- Built-in search metadata, sitemap, robots.txt, and JSON-LD structured data

## How content works

Content lives in `content/` as structured JSON.

Each main page has its own content file. Repeatable material such as articles, case studies, testimonials, speaking engagements, and reading-room entries live in collections. The Studio provides an interface for editing and publishing that content.

The result is a site I can keep current without treating every update as a development project.

## Technical build

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Vercel

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The admin panel is at `/admin`.

## Repository structure

```text
app/             Pages, components, routes, and Studio
content/         Editable page content and collections
lib/             Content, SEO, media, and site helpers
public/          Images and static assets
```
