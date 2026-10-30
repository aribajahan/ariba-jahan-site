"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { caseStudies as allCaseStudies } from "../data/work-with-me";
import wwmContent from "../../content/pages/work-with-me.json";

const CARD_GAP = 32;

const workFilters = [
  { id: "all", label: "All work", hash: "case-studies" },
  { id: "strategy-sessions", label: "Executive AI advisory", hash: "case-studies-strategy-sessions" },
  { id: "ambition-sprint", label: "Experience-Led Growth", hash: "case-studies-ambition-sprint" },
  { id: "ai-adoption", label: "AI adoption & orchestration", hash: "case-studies-ai-adoption" },
];

export default function CaseStudies({ filterable = false }: { filterable?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [testiOpen, setTestiOpen] = useState<Record<number, boolean>>({});
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState("all");
  const caseStudies = filterable && filter !== "all"
    ? allCaseStudies.filter(c => c.engagements?.includes(filter))
    : allCaseStudies;

  useEffect(() => {
    if (!filterable) return;
    const syncFilter = () => {
      const match = workFilters.find(f => `#${f.hash}` === window.location.hash);
      if (!match) return;
      setFilter(match.id);
      setActive(0);
      setFlippedIndex(null);
      setTestiOpen({});
      scrollRef.current?.scrollTo({ left: 0, behavior: "instant" });
    };
    syncFilter();
    window.addEventListener("hashchange", syncFilter);
    return () => window.removeEventListener("hashchange", syncFilter);
  }, [filterable]);

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
      className={`relative scroll-mt-16 bg-cream ${filterable ? "pt-16 max-[700px]:pt-12" : "pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24"} pb-20 max-[700px]:pb-14 px-[clamp(24px,5vw,80px)] overflow-hidden`}
    >
      {filterable && workFilters.filter(f => f.id !== "all").map(f => <span key={f.id} id={f.hash} aria-hidden="true" className="absolute top-0 scroll-mt-16" />)}
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-14">
          {wwmContent.caseStudiesSection.eyebrow && (
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
              {wwmContent.caseStudiesSection.eyebrow}
            </div>
          )}
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] text-charcoal mb-[14px]">
            {wwmContent.caseStudiesSection.heading}
          </h2>
          <p className="text-body max-[700px]:text-body-sm text-charcoal max-w-[640px]">
            {wwmContent.caseStudiesSection.intro}
          </p>
        </div>

        {filterable && <div className="mb-5">
          <nav aria-label="Case studies by engagement" className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-extrabold uppercase tracking-[0.06em]">
            {workFilters.map(f => <a key={f.id} href={`#${f.hash}`} aria-current={filter === f.id ? "true" : undefined} className={`py-2 underline-offset-8 ${filter === f.id ? "font-extrabold underline text-charcoal" : "text-charcoal/70 hover:underline"}`}>{f.label}</a>)}
          </nav>
          <p aria-live="polite" className="text-[13px] text-charcoal/70 mt-3">{caseStudies.length} {caseStudies.length === 1 ? "project" : "projects"}</p>
        </div>}

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
                  className="group relative flex-none w-[560px] h-[800px] max-[1024px]:w-[440px] max-[1024px]:h-[720px] max-[700px]:w-[92vw] max-[700px]:h-[580px] [perspective:2000px]"
                >
                  <div
                    className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] [transform:rotateY(var(--flip,0deg))_rotateY(var(--peek,0deg))] ${
                      !flipped ? "group-hover:[--peek:-7deg] motion-reduce:group-hover:[--peek:0deg]" : ""
                    }`}
                    style={{ ["--flip" as string]: flipped ? "180deg" : "0deg", transitionDelay: flipped ? "50ms" : "0ms" }}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] bg-cream border border-charcoal/[0.09] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.15)] p-[30px_30px_34px] max-[700px]:p-5 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label="See case study details"
                      onClick={() => toggleFlip(i)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleFlip(i);
                        }
                      }}
                    >
                      <span
                        className="mark-tape absolute -top-[18px] left-1/2 px-6 py-[5px] max-[700px]:px-4 max-[700px]:py-[4px] font-display text-[13px] max-[700px]:text-[11px] font-extrabold tracking-[0.06em] uppercase text-charcoal whitespace-nowrap z-[5] pointer-events-none"
                        style={{ transform: `translateX(-50%) rotate(${c.tagRotationDeg}deg)`, ["--tape-color" as string]: "var(--femme-pink)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" }}
                      >
                        Case Study {i + 1}
                      </span>
                      <div className="relative h-[460px] max-[1024px]:h-[380px] max-[700px]:h-[300px] mb-6 max-[700px]:mb-3 overflow-hidden">
                        <Image
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
                      <p className="text-card max-[700px]:text-[13px] max-[700px]:leading-[1.35] text-charcoal/65">{c.summary}</p>
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
                      <span
                        aria-hidden="true"
                        className="absolute bottom-[18px] right-[18px] max-[700px]:bottom-3 max-[700px]:right-3 w-9 h-9 max-[1024px]:w-11 max-[1024px]:h-11 rounded-full bg-charcoal text-cream flex items-center justify-center cursor-pointer shadow-[0_8px_18px_-6px_rgba(0,0,0,0.35)] transition-transform duration-[180ms] group-hover:scale-[1.1] hover:scale-[1.08] active:scale-95 text-[15px] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      >
                        ⇄
                      </span>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] bg-cream border border-charcoal/[0.09] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.15)] flex flex-col justify-center gap-[18px] max-[700px]:gap-[10px] p-10 max-[700px]:p-5"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <span
                        className="mark-tape absolute -top-[18px] left-1/2 px-6 py-[5px] font-display text-[13px] font-extrabold tracking-[0.06em] uppercase text-charcoal whitespace-nowrap z-[5] pointer-events-none"
                        style={{ transform: `translateX(-50%) rotate(${c.tagRotationDeg}deg)`, ["--tape-color" as string]: "var(--femme-pink)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" }}
                      >
                        Case Study {i + 1}
                      </span>

                      <div className="flex gap-3 max-[700px]:flex-col max-[700px]:gap-[2px] text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-auto font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px] max-[700px]:pt-0">
                          Challenge
                        </span>
                        <span className="text-charcoal/70">{c.challenge}</span>
                      </div>
                      <div className="flex gap-3 max-[700px]:flex-col max-[700px]:gap-[2px] text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-auto font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px] max-[700px]:pt-0">
                          Solution
                        </span>
                        <span className="text-charcoal/70">{c.solution}</span>
                      </div>
                      <div className="flex gap-3 max-[700px]:flex-col max-[700px]:gap-[2px] text-[15px] max-[700px]:text-[12.5px] leading-[1.55] max-[700px]:leading-[1.4]">
                        <span className="flex-none w-[120px] max-[700px]:w-auto font-bold text-cherish uppercase text-xs max-[700px]:text-[10px] tracking-[0.06em] pt-[2px] max-[700px]:pt-0">
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
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/70 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next case study"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 flex items-center justify-center text-lg text-charcoal/70 cursor-pointer transition-[color,transform] duration-150 hover:text-charcoal active:text-charcoal active:scale-90"
          >
            →
          </button>
        </div>

        <div className="flex gap-[5px] justify-center mt-5">
          {caseStudies.map((_, i) => (
            <span
              key={i}
              className="h-[2px] transition-[width] duration-200"
              style={{ width: i === active ? 24 : 10, background: i === active ? "var(--charcoal)" : "rgba(45,45,45,0.2)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
