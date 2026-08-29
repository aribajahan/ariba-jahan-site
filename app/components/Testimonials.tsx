"use client";

import { useRef, useState } from "react";
import { testimonials } from "../data/home";
import homeContent from "../../content/pages/home.json";

const CARD_WIDTH = 540;
const GAP = 24;
// Lauren Lavalle's quote (the shortest) is the reference length mobile cards
// truncate to; anything longer gets a "Read more" toggle on mobile only.
const MOBILE_TRUNCATE_AT = 260;

const categoryStyles: Record<string, { bg: string; text: string; sub: string; border?: string }> = {
  LEADERSHIP: { bg: "var(--color-cream)", text: "#2D2D2D", sub: "rgba(45,45,45,0.5)", border: "2px solid #2D2D2D" },
  SPEAKING: { bg: "#2D2D2D", text: "#FFFBF3", sub: "rgba(255,251,243,0.5)" },
  CLIENT: { bg: "#E73131", text: "#FFFBF3", sub: "rgba(255,251,243,0.75)" },
};

const ghostOpacity: Record<string, string> = {
  LEADERSHIP: "rgba(45,45,45,.05)",
  SPEAKING: "rgba(255,251,243,.06)",
  CLIENT: "rgba(255,251,243,.1)",
};

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (CARD_WIDTH + GAP));
    setActive(Math.max(0, Math.min(idx, testimonials.length - 1)));
  };

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_WIDTH + GAP), behavior: "smooth" });
  };

  return (
    <section className="bg-cream pt-[120px] max-[1024px]:pt-24 max-[700px]:pt-[70px] pb-[120px] max-[1024px]:pb-24 max-[700px]:pb-20 border-t border-charcoal/10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex items-baseline justify-between mb-9 flex-wrap gap-4">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
              {homeContent.testimonialsSection.eyebrow}
            </div>
            <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em]">
              {homeContent.testimonialsSection.heading}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex items-start gap-6 overflow-x-scroll [scroll-snap-type:x_mandatory] pb-3"
        >
          {testimonials.map((t, i) => {
            const style = categoryStyles[t.category];
            const isExpanded = !!expanded[i];
            const needsTruncation = t.quote.length > MOBILE_TRUNCATE_AT;
            return (
              <div
                key={i}
                className="relative overflow-hidden py-7 px-7 flex flex-col justify-end min-h-[360px] max-[1024px]:min-h-0"
                style={{
                  scrollSnapAlign: "start",
                  flex: `0 0 min(${CARD_WIDTH}px, 76vw)`,
                  background: style.bg,
                  border: style.border,
                }}
              >
                <div
                  className="absolute top-5 -left-1.5 font-display text-[90px] max-[700px]:text-[45px] font-black leading-none pointer-events-none"
                  style={{ color: ghostOpacity[t.category] }}
                >
                  {t.category}
                </div>
                <p
                  className={`relative text-lg max-[1024px]:text-base leading-[1.5] max-[1024px]:leading-[1.45] mb-4 ${
                    needsTruncation && !isExpanded ? "max-[1024px]:line-clamp-8" : ""
                  }`}
                  style={{ color: style.text }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                {needsTruncation && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                    className="hidden max-[1024px]:block relative text-xs font-bold underline mb-4 -mt-2 cursor-pointer w-fit"
                    style={{ color: style.text }}
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
                <div
                  className="relative text-[13px] font-bold mb-[2px]"
                  style={{ color: style.text }}
                >
                  {t.name}
                </div>
                <div className="relative text-xs" style={{ color: style.sub }}>
                  {t.role}
                </div>
              </div>
            );
          })}
          <div className="flex-[0_0_12px]" />
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex gap-[5px] justify-center mt-5">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className="w-[6px] h-[6px] rounded-full transition-colors duration-150"
            style={{ background: i === active ? "#2D2D2D" : "rgba(45,45,45,0.2)" }}
          />
        ))}
      </div>
    </section>
  );
}
