import workshop from "../../../content/pages/build-with-me.json";
import { siteUrl } from "../../../lib/seoMeta";
import { googleAnalyticsId } from "../../../lib/analytics";

export const dynamic = "force-static";

// Version C review treatment: Version A's identity with selected lessons from Version B.
export function GET() {
  const canonical = `<link rel="canonical" href="${siteUrl}/build-with-me">`;
  const analytics = `<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
</script>`;
  const waitlistForm = `<details id="next-cohort" class="waitlist-details"><summary>Join the waitlist for the next round<span aria-hidden="true">+</span></summary><p>Leave your name and email and I’ll let you know when the next cohort opens. It goes straight to my inbox.</p><form class="waitlist-form" action="https://docs.google.com/forms/d/e/1FAIpQLScdn6CI7w_CuxZqRmDPaUhxOrRoQr0WwEWoU9O9w_TdTp7uoA/formResponse" method="post" target="waitlist-response"><label for="waitlist-name">Name</label><input id="waitlist-name" name="entry.1829639436" type="text" autocomplete="name" required><label for="waitlist-email">Email</label><input id="waitlist-email" name="entry.1074651146" type="email" autocomplete="email" required><button class="button red" type="submit">Join the waitlist</button></form><iframe name="waitlist-response" title="Waitlist submission" hidden></iframe><p class="waitlist-success" aria-live="polite" hidden>You’re on the list. I’ll keep you posted.</p></details>`;
  const html = workshop.document
    .join("\n")
    .replace("<body>", '<body class="version-c">')
    .replace(
      '<link rel="stylesheet" href="/build-with-me/style.css">',
      '<link rel="stylesheet" href="/build-with-me/style.css"><link rel="stylesheet" href="/build-with-me/version-c.css">',
    )
    .replace(
      'Bring your best work out of old decks, notes, and project folders. We’ll use Claude Code or Codex to build the site, then organize the files and instructions that help you keep it current.',
      'Turn the work scattered across old decks, notes, and project folders into a site you’re proud to share and can keep current as your work grows.',
    )
    .replace(
      '<div class="section-heading"><div><h2>What you’ll build</h2></div></div>',
      '<div class="section-heading"><div><h2>What you’ll leave with</h2></div></div>',
    )
    .replace(
      '</div>\n    </div>\n    <div class="hero-art"',
      '</div><p class="version-c-waitlist"><a href="#next-cohort">Can’t make this round? Join the waitlist for the next one.</a></p>\n    </div>\n    <div class="hero-art"',
    )
    .replace(
      'href="mailto:ariba@aribajahan.com?subject=Website+workshop+%E2%80%94+next+cohort&amp;body=Hi+Ariba%2C%0A%0AI%E2%80%99d+love+to+hear+about+the+next+website+workshop+cohort.+Please+keep+me+posted+when+you+have+dates.%0A%0AA+little+about+me+and+the+website+I%E2%80%99d+like+to+build%3A%0A%0A"',
      'href="https://docs.google.com/forms/d/e/1FAIpQLScdn6CI7w_CuxZqRmDPaUhxOrRoQr0WwEWoU9O9w_TdTp7uoA/viewform?usp=publish-editor"',
    )
    .replace(/<details id="next-cohort">[\s\S]*?<\/details>/, waitlistForm)
    .replace("</head>", `${canonical}${analytics}</head>`);
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
