import workshop from "../../content/pages/build-with-me.json";
import { siteUrl } from "../../lib/seoMeta";

export const dynamic = "force-static";

// Serve this self-contained marketing document without sharing page-specific
// styles or DOM interactions with the site's React layouts.
export function GET() {
  const canonical = `<link rel="canonical" href="${siteUrl}/build-with-me">`;
  const html = workshop.document.join("\n").replace("</head>", `${canonical}</head>`);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
