"use client";

import { useRef, useState } from "react";
import { speakingTestimonials } from "../data/speaking";
import speakingContent from "../../content/pages/speaking.json";

const CARD_WIDTH = 420;
const GAP = 24;
// One quote is a clear outlier (127 chars vs ~270+ for the rest), so it
// can't stand in as an unclamped "shortest" reference — clamp every card
// for guaranteed uniform height instead.
const MOBILE_TRUNCATE_AT = 0;

export default function SpeakingTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_WIDTH + GAP), behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-9">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
              {speakingContent.testimonialsSection.eyebrow}
            </div>
            <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] text-charcoal">
              {speakingContent.testimonialsSection.heading}
            </h2>
          </div>
          <div className="flex gap-[10px]">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 flex items-center justify-center bg-transparent text-charcoal/50 text-base cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollBy(1)}
              className="w-11 h-11 flex items-center justify-center bg-transparent text-charcoal/50 text-base cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div
          ref={scrollRef}
          className="no-scrollbar flex items-start gap-6 overflow-x-scroll [scroll-snap-type:x_mandatory] pb-3"
        >
          {speakingTestimonials.map((t, i) => {
            const isExpanded = !!expanded[i];
            const needsTruncation = t.quote.length > MOBILE_TRUNCATE_AT;
            return (
              <div
                key={i}
                className="relative overflow-hidden bg-charcoal py-9 px-8 flex flex-col justify-between min-h-[446px] max-[1024px]:min-h-0"
                style={{
                  scrollSnapAlign: "start",
                  flex: `0 0 min(${CARD_WIDTH}px, 80vw)`,
                }}
              >
                <div
                  className="absolute -top-[10px] left-4 font-display text-[100px] max-[700px]:text-[45px] font-black leading-none pointer-events-none"
                  style={{ color: "rgba(255,251,243,.1)" }}
                >
                  &quot;
                </div>
                <p
                  className={`relative text-lg leading-[1.5] text-cream/[0.88] ${
                    needsTruncation && !isExpanded
                      ? "max-[1024px]:line-clamp-8 max-[1024px]:min-h-[216px]"
                      : ""
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                {needsTruncation && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
                    className="hidden max-[1024px]:block relative text-xs font-bold text-cream/70 underline mt-3 cursor-pointer w-fit"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
                <div className="relative mt-4">
                  <div className="text-xs font-bold text-cream">{t.name}</div>
                  <div className="text-[11px] text-cream/55">{t.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
