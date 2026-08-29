"use client";

import { useState } from "react";
import { bioIntro, bioExpanded, bioEyebrow, unmissablesBanner } from "../data/about";

export default function AboutBio() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-charcoal pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[720px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-8 text-center">
          {bioEyebrow}
        </div>

        {bioIntro.map((p, i) => (
          <p
            key={i}
            className={`text-lg leading-[1.75] max-[700px]:text-[16px] max-[700px]:leading-[1.45] mb-6 ${
              i === 0 ? "text-cream" : "text-cream/[0.82]"
            }`}
          >
            {p}
          </p>
        ))}

        <div
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: expanded ? 3200 : 0 }}
        >
          {bioExpanded.map((p, i) => (
            <p key={i} className="text-lg leading-[1.75] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/[0.82] mb-6">
              {p}
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="bg-transparent border-none cursor-pointer text-[15px] font-extrabold tracking-[0.12em] uppercase text-cherish border-b border-cherish pb-[2px] font-body min-h-11 inline-flex items-center"
        >
          {expanded ? "Show less ←" : "Read full bio →"}
        </button>

        <p className="text-base leading-[1.6] text-cream/60 mt-8 mb-3">{unmissablesBanner.text}</p>
        <a
          href={unmissablesBanner.href}
          target="_blank"
          rel="noopener"
          className="text-[15px] font-extrabold tracking-[0.12em] uppercase text-cherish border-b border-cherish pb-[2px] min-h-11 inline-flex items-center"
        >
          {unmissablesBanner.ctaLabel} →
        </a>
      </div>
    </section>
  );
}
