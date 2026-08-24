"use client";

import { useState } from "react";
import Image from "next/image";
import { problemCards } from "../data/work-with-me";

export default function ProblemFraming() {
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({});

  const toggleCard = (i: number) => {
    setOpenCards((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-14 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-cherish mb-[14px]">
          Why Experience-Led Growth Is Needed Now More Than Ever
        </div>
        <h2 className="uppercase font-display text-[clamp(24px,3.4vw,48px)] font-black tracking-[-0.01em] leading-[1.05] text-charcoal mb-5 max-[700px]:whitespace-normal whitespace-nowrap">
          From Share Of Attention To Share Of Life
        </h2>
        <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/65 max-w-[640px] mb-11">
          I think more organizations need to shift from chasing attention to earning a real place
          in people&rsquo;s lives. That&rsquo;s what I mean by Experience-Led Growth: creating
          business value by becoming more useful, more relevant, and more worth returning to over
          time.
        </p>
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] max-[1024px]:!grid-cols-2 max-[700px]:!grid-cols-1 gap-8 max-[700px]:gap-1">
          {problemCards.map((card, i) => {
            const open = !!openCards[i];
            return (
              <div key={card.title} className="max-[700px]:border-b max-[700px]:border-charcoal/[0.1] max-[700px]:py-3">
                <button
                  type="button"
                  onClick={() => toggleCard(i)}
                  aria-expanded={open}
                  className="flex items-center justify-between gap-4 w-full text-left max-[700px]:cursor-pointer min-h-11"
                >
                  <span className="font-display text-lg font-extrabold uppercase text-charcoal leading-[1.2]">
                    {card.title}
                  </span>
                  <span className="hidden max-[700px]:inline-block flex-none text-xl text-cherish font-light">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out min-[701px]:!max-h-none"
                  style={{ maxHeight: open ? 400 : 0 }}
                >
                  <div className="relative h-40 mt-4 max-[700px]:mt-3 mb-[14px] max-[700px]:mb-2">
                    <Image quality={90}
                      src={card.photoSrc}
                      alt={card.title}
                      fill
                      sizes="(max-width: 700px) 92vw, (max-width: 1024px) 45vw, 22vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="text-[12.5px] leading-[1.55] text-charcoal/60">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
