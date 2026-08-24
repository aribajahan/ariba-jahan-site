"use client";

import { useState } from "react";
import Image from "next/image";
import { speakingLogos } from "../data/speaking";

const INITIAL_ROWS = 7;
const COLS = 4;
const INITIAL_COUNT = INITIAL_ROWS * COLS;

export default function TrustedByLogos() {
  const [expanded, setExpanded] = useState(false);
  const visibleLogos = expanded ? speakingLogos : speakingLogos.slice(0, INITIAL_COUNT);

  return (
    <section
      id="logos"
      className="bg-charcoal pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)] border-t border-cream/[0.08]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[14px]">
          Trusted By
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-none text-cream mb-8 max-w-[800px]">
          Spoken at 200+ Gatherings at Conferences, Companies, and Universities
        </h2>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))] max-[1024px]:[grid-template-columns:repeat(4,1fr)] max-[700px]:!grid-cols-4 gap-11 gap-x-8 max-[1024px]:gap-y-8 max-[700px]:gap-y-6 max-[700px]:gap-x-4 items-center">
          {visibleLogos.map((logo) => (
            <Image quality={90}
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={logo.heightPx}
              style={{ height: logo.heightPx, width: "auto", maxWidth: "100%" }}
              className="object-contain opacity-[0.92] max-[1024px]:max-h-[30px] max-[1024px]:w-auto max-[700px]:max-h-[24px]"
            />
          ))}
        </div>
        {speakingLogos.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[13px] font-bold tracking-[0.1em] uppercase text-cherish border-b border-cherish pb-[2px] cursor-pointer"
            >
              {expanded ? "Show less" : "Show more →"}
            </button>
          </div>
        )}
        <div className="flex justify-center mt-14">
          <a
            href="#close"
            className="inline-block bg-cherish text-cream px-[30px] py-4 max-[700px]:px-[22px] max-[700px]:py-[14px] text-xs font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
          >
            Bring Ariba to Your Event →
          </a>
        </div>
      </div>
    </section>
  );
}
