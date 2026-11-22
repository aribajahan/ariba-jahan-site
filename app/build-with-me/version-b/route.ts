import workshop from "../../../content/pages/build-with-me.json";
import { siteUrl } from "../../../lib/seoMeta";
import { googleAnalyticsId } from "../../../lib/analytics";

export const dynamic = "force-static";

// Version B is a review-only experiment. Version A remains the production page.
export function GET() {
  const canonical = `<link rel="canonical" href="${siteUrl}/build-with-me">`;
  const analytics = `<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
</script>`;
  const html = workshop.document
    .join("\n")
    .replace("<body>", '<body class="version-b">')
    .replace(
      '<link rel="stylesheet" href="/build-with-me/style.css">',
      '<link rel="stylesheet" href="/build-with-me/style.css"><link rel="stylesheet" href="/build-with-me/version-b.css">',
    )
    .replace(
      '<p class="eyebrow">FOR SOLOPRENEURS AND PROFESSIONALS</p>',
      '<p class="eyebrow">WORKSHOP SERIES · FOR SOLOPRENEURS AND PROFESSIONALS</p>',
    )
    .replace(
      'Bring your best work out of old decks, notes, and project folders. We’ll use Claude Code or Codex to build the site, then organize the files and instructions that help you keep it current.',
      'Turn the work scattered across old decks, notes, and project folders into a site you’re proud to share and can keep current as your work grows.',
    )
    .replace(
      '<div class="section-heading"><div><h2>What you’ll build</h2></div></div>',
      '<div class="section-heading"><div><h2>What you’ll leave with</h2></div><p>A site you’re proud to share, a visual system that feels like you, and controls that make it easy to keep current.</p></div>',
    )
    .replace("</head>", `${canonical}${analytics}</head>`);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
