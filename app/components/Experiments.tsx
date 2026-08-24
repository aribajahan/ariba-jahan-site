"use client";

import Image from "next/image";
import { useRef } from "react";
import { experiments } from "../data/home";

const CARD_WIDTH = 391;
const CARD_ROTATIONS = [-1.2, 1, -0.8, 1.2, -1, 0.9];

export default function Experiments() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * (CARD_WIDTH + 36), behavior: "smooth" });
  };

  return (
    <section id="experiments" className="bg-cream border-t border-charcoal/[0.08]">
      <div className="max-w-[1400px] mx-auto pt-[120px] max-[700px]:pt-20 px-[clamp(24px,5vw,80px)] pb-[100px]">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
          Select Work
        </div>
        <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] text-charcoal mb-8">
          Projects &amp; Quests
        </div>

        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-9 overflow-x-auto [scroll-snap-type:x_mandatory] py-5 px-1 pb-8 cursor-grab active:cursor-grabbing"
        >
          {experiments.map((entry, i) => {
            const tagBg = entry.tag === "Case Study" ? "#F5A8D5" : "#FF6D24";
            return (
              <div
                key={entry.headline}
                className="flex-[0_0_391px] max-[700px]:flex-[0_0_82vw]"
                style={{
                  scrollSnapAlign: "start",
                  transform: `rotate(${CARD_ROTATIONS[i % CARD_ROTATIONS.length]}deg)`,
                  boxShadow: "0 16px 32px -12px rgba(0,0,0,0.28)",
                  background: "var(--color-cream)",
                  padding: "16px 16px 20px",
                }}
              >
                <span
                  className="inline-block -rotate-1 text-[10px] font-extrabold tracking-[0.1em] uppercase text-charcoal px-[9px] py-[3px] mb-3"
                  style={{ background: tagBg }}
                >
                  {entry.tag} · {entry.tagIndex}
                </span>
                <div className="w-full h-[253px] max-[700px]:h-[300px] overflow-hidden mb-[18px] relative bg-charcoal/[0.06]">
                  {entry.photoSrc ? (
                    <Image quality={90}
                      src={entry.photoSrc}
                      alt={entry.headline}
                      fill
                      sizes="391px"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/40 text-xs font-semibold uppercase tracking-[0.1em]">
                      Photo coming soon
                    </div>
                  )}
                </div>
                <div className="font-display text-[22px] max-[700px]:text-[21px] font-black uppercase text-charcoal leading-[1.05] mb-[9px]">
                  {entry.headline}
                </div>
                <p className="text-[15px] leading-[1.5] text-charcoal/60">
                  {entry.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between max-w-[120px]">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
