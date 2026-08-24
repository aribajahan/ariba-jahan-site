"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { caseStudies } from "../data/work-with-me";

const CARD_GAP = 32;

export default function CaseStudies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [testiOpen, setTestiOpen] = useState<Record<number, boolean>>({});
  const [active, setActive] = useState(0);

  const cardStep = () => {
    const el = scrollRef.current;
    const card = el?.querySelector<HTMLElement>("[data-flipcard]");
    return (card?.getBoundingClientRect().width ?? 560) + CARD_GAP;
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / cardStep());
    setActive(Math.max(0, Math.min(idx, caseStudies.length - 1)));
  };

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const toggleFlip = (i: number) => {
    setFlippedIndex((prev) => (prev === i ? null : i));
  };

  const toggleTesti = (i: number) => {
    setTestiOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section
      id="case-studies"
      className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-20 max-[700px]:pb-14 px-[clamp(24px,5vw,80px)] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-14">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
            Some Of My Work
          </div>
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] text-charcoal mb-[14px]">
            Case Studies
          </h2>
          <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal max-w-[640px]">
            A few examples of what this looks like in practice, from rethinking customer value to
            shaping products, experiences, and AI-enabled services.
          </p>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar overflow-x-auto cursor-grab -mx-[clamp(24px,5vw,80px)] px-[clamp(24px,5vw,80px)]"
        >
          <div className="flex gap-8 py-8 pb-6 w-max">
            {caseStudies.map((c, i) => {
              const flipped = flippedIndex === i;
              return (
                <div
                  key={c.client + c.title}
                  data-flipcard
                  className="relative flex-none w-[560px] h-[800px] max-[1024px]:w-[440px] max-[1024px]:h-[720px] max-[700px]:w-[92vw] max-[700px]:h-[580px] [perspective:2000px]"
                >
                  <div
                    className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
                    style={{ transform: flipped ? "rotateY(180deg)" : "none", transitionDelay: flipped ? "50ms" : "0ms" }}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-cream shadow-[0_14px_28px_-12px_rgba(0,0,0,0.15)] p-[30px_30px_34px] max-[700px]:p-5">
                      <span
                        className="absolute -top-[18px] left-1/2 px-6 py-[9px] max-[700px]:px-4 max-[700px]:py-[6px] font-display text-[13px] max-[700px]:text-[11px] font-extrabold tracking-[0.06em] uppercase text-charcoal bg-femme-pink shadow-[0_4px_8px_rgba(0,0,0,0.15)] whitespace-nowrap z-[5] pointer-events-none"
                        style={{ transform: `translateX(-50%) rotate(${c.tagRotationDeg}deg)` }}
                      >
                        Case Study {i + 1}
                      </span>
                      <div className="relative h-[460px] max-[1024px]:h-[380px] max-[700px]:h-[300px] mb-6 max-[700px]:mb-3 overflow-hidden">
                        <Image quality={90}
                          src={c.photoSrc}
                          alt={`${c.client} case study`}
                          fill
                          sizes="(max-width: 700px) 92vw, (max-width: 1024px) 440px, 560px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="text-[11px] max-[700px]:text-[10px] font-extrabold tracking-[0.15em] uppercase text-cherish mb-2 max-[700px]:mb-1">
                        {c.client}
                      </div>
                      <div className="font-display text-2xl max-[700px]:text-base font-black uppercase leading-[1.05] text-charcoal mb-[14px] max-[700px]:mb-[6px]">
                        {c.title}
                      </div>
                      <p className="text-[15px] leading-[1.55] max-[700px]:text-[13px] max-[700px]:leading-[1.35] text-charcoal/65">{c.summary}</p>
                      <div className="flex flex-wrap gap-[6px] mt-[14px] max-[700px]:mt-2">
                        {c.pills.map((pill, pillIdx) => (
                          <span
                            key={pill}
                            className={`text-[11px] max-[700px]:text-[10px] font-bold tracking-[0.03em] uppercase text-charcoal bg-charcoal/[0.08] px-[10px] py-[5px] max-[700px]:px-2 max-[700px]:py-1 rounded-full ${
                              pillIdx >= 2 ? "max-[700px]:hidden" : ""
                            }`}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleFlip(i)}
                        aria-label="See case study details"
                        title="See details"
                        className="absolute bottom-[18px] right-[18px] max-[700px]:bottom-3 max-[700px]:right-3 w-9 h-9 max-[1024px]:w-11 max-[1024px]:h-11 rounded-full bg-charcoal text-cream flex items-center justify-center cursor-pointer shadow-[0_8px_18px_-6px_rgba(0,0,0,0.35)] transition-transform duration-[180ms] hover:scale-[1.08] active:scale-95 text-[15px]"
                      >
                        ⇄
                      </button>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] bg-cream shadow-[0_14px_28px_-12px_rgba(0,0,0,0.15)] flex flex-col justify-center gap-[18px] max-[700px]:gap-[10px] p-10 max-[700px]:p-5"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span
                        className="absolute -top-[18px] left-1/2 px-6 py-[9px] font-display text-[13px] font-extrabold tracking-[0.06em] uppercase text-charcoal bg-femme-pink shadow-[0_4px_8px_rgba(0,0,0,0.15)] whitespace-nowrap z-[5] pointer-events-none"
                        style={{ transform: `translateX(-50%) rotate(${c.tagRotationDeg}deg)` }}
                      >
                        Case Study {i + 1}
                      </span>

                      <div className="flex gap-3 text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-[80px] font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px]">
                          Challenge
                        </span>
                        <span className="text-charcoal/70">{c.challenge}</span>
                      </div>
                      <div className="flex gap-3 text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-[80px] font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px]">
                          Solution
                        </span>
                        <span className="text-charcoal/70">{c.solution}</span>
                      </div>
                      <div className="flex gap-3 text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-[80px] font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px]">
                          Impact
                        </span>
                        <span className="text-charcoal/70">{c.impact}</span>
                      </div>

                      <div className="border-t border-charcoal/[0.12] pt-3 text-[11.5px] italic text-charcoal/45">
                        Role &amp; Context: {c.roleContext}
                      </div>

                      {c.testimonial && (
                        <>
                          <button
                            type="button"
                            onClick={() => toggleTesti(i)}
                            aria-expanded={!!testiOpen[i]}
                            className="flex items-center gap-[6px] cursor-pointer min-h-11 -my-2 text-left w-fit"
                          >
                            <span className="text-xs font-bold text-cherish underline">
                              Read what {c.testimonial.name} said
                            </span>
                            <span className="text-sm text-cherish">{testiOpen[i] ? "−" : "+"}</span>
                          </button>
                          <div
                            className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                            style={{ maxHeight: testiOpen[i] ? 220 : 0 }}
                          >
                            <p className="text-[13px] leading-[1.5] text-charcoal/65 italic">
                              &ldquo;{c.testimonial.quote}&rdquo;
                            </p>
                            <div className="text-[11.5px] font-bold text-charcoal mt-2">
                              {c.testimonial.name}
                            </div>
                            <div className="text-[11px] text-charcoal/50">{c.testimonial.role}</div>
                          </div>
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleFlip(i)}
                        aria-label="Back to case study summary"
                        title="Back"
                        className="absolute bottom-[18px] right-[18px] w-9 h-9 max-[1024px]:w-11 max-[1024px]:h-11 rounded-full bg-cherish text-cream flex items-center justify-center cursor-pointer shadow-[0_8px_18px_-6px_rgba(0,0,0,0.35)] transition-transform duration-[180ms] hover:scale-[1.08] active:scale-95 text-[15px]"
                      >
                        ←
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            aria-label="Previous case study"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/50 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            →
          </button>
        </div>

        <div className="flex gap-[5px] justify-center mt-5">
          {caseStudies.map((_, i) => (
            <span
              key={i}
              className="h-[2px] transition-[width] duration-200"
              style={{ width: i === active ? 24 : 10, background: i === active ? "#2D2D2D" : "rgba(45,45,45,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
