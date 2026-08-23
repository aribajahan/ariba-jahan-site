"use client";

import { useRef } from "react";
import { speakingTestimonials } from "../data/speaking";

const CARD_WIDTH = 420;
const GAP = 24;

export default function SpeakingTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_WIDTH + GAP), behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="bg-cream pt-[120px] max-[700px]:pt-20 max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-9">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
              Testimonials
            </div>
            <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] text-charcoal">
              What People Say
            </h2>
          </div>
          <div className="flex gap-[10px]">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 rounded-full border border-charcoal/25 bg-transparent text-charcoal text-base cursor-pointer transition-colors duration-150 hover:border-charcoal active:border-charcoal active:scale-[0.92]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollBy(1)}
              className="w-11 h-11 rounded-full border border-charcoal/25 bg-transparent text-charcoal text-base cursor-pointer transition-colors duration-150 hover:border-charcoal active:border-charcoal active:scale-[0.92]"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-scroll [scroll-snap-type:x_mandatory] pb-3"
        >
          {speakingTestimonials.map((t, i) => (
            <div
              key={i}
              className="relative overflow-hidden bg-charcoal py-9 px-8 flex flex-col justify-between"
              style={{
                scrollSnapAlign: "start",
                flex: `0 0 min(${CARD_WIDTH}px, 80vw)`,
                minHeight: 340,
              }}
            >
              <div
                className="absolute -top-[10px] left-4 font-display text-[100px] font-black leading-none pointer-events-none"
                style={{ color: "rgba(255,251,243,.1)" }}
              >
                &quot;
              </div>
              <p className="relative text-lg leading-[1.5] text-cream/[0.88]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="relative mt-4">
                <div className="text-xs font-bold text-cream">{t.name}</div>
                <div className="text-[11px] text-cream/55">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
