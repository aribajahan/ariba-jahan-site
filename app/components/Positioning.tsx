import homeContent from "../../content/pages/home.json";
import type { ReactNode } from "react";

// Highlight owned ideas/claims (Marks pattern) — not generic emphasis.
// Pairs with "unmissable" in the Work With Me band so the page carries two
// marks, never a lone one (a single highlight reads as a glitch).
const MARK_PHRASES = ["outrunning the operating model"];

function markPhrases(text: string): ReactNode {
  const pattern = new RegExp(`(${MARK_PHRASES.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    MARK_PHRASES.some((ph) => ph.toLowerCase() === part.toLowerCase()) ? (
      <mark key={i} className="mark-hl bg-transparent">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function Positioning() {
  const { positioning } = homeContent;

  return (
    <section id="positioning" className="bg-cream pt-14 px-[clamp(24px,5vw,80px)] pb-14">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-6">
        {positioning.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[26px] max-[1024px]:text-[21px] max-[700px]:text-[16px] leading-[1.6] max-[700px]:leading-[1.45] text-charcoal"
          >
            {markPhrases(p)}
          </p>
        ))}
      </div>
    </section>
  );
}
