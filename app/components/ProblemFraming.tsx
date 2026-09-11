"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import wwmContent from "../../content/pages/work-with-me.json";

// The section argues that the same forces act on customers and inside the
// organization. Both views are rendered into the HTML and switched with CSS
// rather than mounted on click, so search engines and anyone linking to the
// page get the whole argument, not just the default view.
//
// Reading order is deliberate: the intro names the two things that close the
// distance, the switch offers exactly those two in the same order, and the
// cards evidence whichever one is selected.
export default function ProblemFraming() {
  const { problemFraming } = wwmContent;
  const views = problemFraming.views;

  const [activeView, setActiveView] = useState(0);
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  const toggleCard = (key: string) => setOpenCards((prev) => ({ ...prev, [key]: !prev[key] }));

  // Measured rather than capped, so a longer card description never clips on
  // mobile. Above 700px the cap is overridden in CSS and every card is open.
  const bodyRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-14 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-cherish mb-[14px]">
          {problemFraming.eyebrow}
        </div>
        <h2 className="uppercase font-display text-[clamp(24px,3.4vw,48px)] font-black tracking-[-0.01em] leading-[1.05] text-charcoal mb-6 max-[700px]:whitespace-normal whitespace-nowrap">
          {problemFraming.heading}
        </h2>
        <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/65 max-w-[760px] mb-6">
          {problemFraming.intro}
        </p>

        {/* The two things the intro promises. A rule on the left marks them as
            the section's claim rather than more prose. */}
        <div className="grid gap-[14px] max-w-[900px] mb-9">
          {problemFraming.points.map((point) => (
            <p
              key={point.label}
              className="pl-[18px] border-l-2 border-cherish text-[17px] leading-[1.55] max-[700px]:text-[16px] text-charcoal m-0"
            >
              <b className="font-bold">{point.label}</b> — {point.text}
            </p>
          ))}
        </div>

        {/* Full-width switch, square-edged to match the cards, images and
            buttons elsewhere on the page. It offers the two things just named,
            in the same order. */}
        <div
          role="tablist"
          aria-label="Who this applies to"
          className="flex w-full border-[1.5px] border-charcoal mb-9 max-[620px]:flex-col"
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            e.preventDefault();
            setActiveView((v) =>
              e.key === "ArrowRight" ? (v + 1) % views.length : (v - 1 + views.length) % views.length
            );
          }}
        >
          {views.map((view, i) => {
            const active = activeView === i;
            return (
              <button
                key={view.label}
                type="button"
                role="tab"
                id={`framing-tab-${i}`}
                aria-selected={active}
                aria-controls={`framing-panel-${i}`}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveView(i)}
                className={`flex-1 flex items-center justify-center gap-[10px] px-5 py-4 min-h-[58px] border-r-[1.5px] last:border-r-0 border-charcoal max-[620px]:border-r-0 max-[620px]:border-b-[1.5px] max-[620px]:last:border-b-0 text-[15px] max-[700px]:text-[13px] font-bold tracking-[0.02em] transition-colors duration-150 ${
                  active ? "bg-charcoal text-cream" : "text-charcoal/60 hover:text-charcoal"
                }`}
              >
                <span className="font-display font-extrabold text-[13px] opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {view.label}
              </button>
            );
          })}
        </div>

        {views.map((view, viewIndex) => (
          <div
            key={view.label}
            role="tabpanel"
            id={`framing-panel-${viewIndex}`}
            aria-labelledby={`framing-tab-${viewIndex}`}
            hidden={activeView !== viewIndex}
          >
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] max-[1024px]:!grid-cols-2 max-[700px]:!grid-cols-1 gap-8 max-[700px]:gap-1">
              {view.cards.map((card, i) => {
                const key = `${viewIndex}-${i}`;
                const open = !!openCards[key];
                return (
                  <div key={card.title} className="max-[700px]:border-b max-[700px]:border-charcoal/[0.1] max-[700px]:py-3">
                    <button
                      type="button"
                      onClick={() => toggleCard(key)}
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
                      ref={(el) => {
                        bodyRefs.current[key] = el;
                      }}
                      className="overflow-hidden transition-[max-height] duration-300 ease-in-out min-[701px]:!max-h-none"
                      style={{ maxHeight: open ? bodyRefs.current[key]?.scrollHeight ?? 600 : 0 }}
                    >
                      {/* A card with no photo yet holds the same space as one
                          with an image, so the grid doesn't shift when a photo
                          is added in the Studio. */}
                      <div className="relative h-40 mt-4 max-[700px]:mt-3 mb-[14px] max-[700px]:mb-2 bg-charcoal/[0.06]">
                        {card.photoSrc ? (
                          <Image
                            quality={90}
                            src={card.photoSrc}
                            alt={card.title}
                            fill
                            sizes="(max-width: 700px) 92vw, (max-width: 1024px) 45vw, 22vw"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-charcoal/35 text-[10px] font-semibold uppercase tracking-[0.14em]">
                            Image
                          </div>
                        )}
                      </div>
                      <p className="text-[14px] leading-[1.6] text-charcoal/70">{card.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
