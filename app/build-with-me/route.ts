import workshop from "../../content/pages/build-with-me.json";
import { siteUrl } from "../../lib/seoMeta";
import { googleAnalyticsId } from "../../lib/analytics";

export const dynamic = "force-static";

// Serve this self-contained marketing document without sharing page-specific
// styles or DOM interactions with the site's React layouts.
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
    .replace("</head>", `${canonical}${analytics}</head>`);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
