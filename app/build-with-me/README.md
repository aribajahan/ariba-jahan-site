# Build with me

The workshop landing page is a self-contained HTML document served by a static
Next.js route handler at `/build-with-me`. Its scripts and styles stay isolated
from the site's React layouts. It uses the existing build and hosting.

Edit the document lines in `content/pages/build-with-me.json`; assets and the
browser-only editor demo live in `public/build-with-me/`. Content is versioned
with the rest of the site. The Studio currently has no editing screen for this
document. The copy exporter includes its visible text in generated `COPY.md`.

The CMS example is illustrative. It changes only the visitor's browser and does
not publish a real site or save participant information.
