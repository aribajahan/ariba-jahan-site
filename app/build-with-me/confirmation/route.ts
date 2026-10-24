import confirmation from "../../../content/pages/build-with-me-confirmation.json";

export const dynamic = "force-static";

// This page explains next steps; Stripe receipts remain the payment confirmation.
export function GET() {
  return new Response(confirmation.document.join("\n"), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
