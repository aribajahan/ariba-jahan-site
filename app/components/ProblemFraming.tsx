"use client";

import { useState } from "react";
import Image from "next/image";
import wwmContent from "../../content/pages/work-with-me.json";

// The section argues that the same forces act on customers and inside the
// organization. Both views are rendered into the HTML and switched with CSS
// rather than mounted on click, so search engines and anyone linking to the
// page get the whole argument, not just the default view.
export default function ProblemFraming() {
  const { problemFraming } = wwmContent;
  const views = problemFraming.views;

  const [activeView, setActiveView] = useState(0);
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  const toggleCard = (key: string) => setOpenCards((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-14 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-cherish mb-[14px]">
          {problemFraming.eyebrow}
        </div>
        <h2 className="uppercase font-display text-[clamp(24px,3.4vw,48px)] font-black tracking-[-0.01em] leading-[1.05] text-charcoal mb-5 max-[700px]:whitespace-normal whitespace-nowrap">
          {problemFraming.heading}
        </h2>
        <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/65 max-w-[640px] mb-8">
          {problemFraming.intro}
        </p>

        {/* The switch and the sentence it controls share a row, so the
            relationship reads without explanation and the band beside the
            switch isn't left empty. Square edges to match the cards, images and
            buttons on the rest of the page. */}
        <div className="flex items-center gap-7 max-[900px]:items-start max-[700px]:flex-col max-[700px]:gap-4 flex-wrap pb-[26px] border-b border-charcoal/[0.14] mb-[30px]">
          <div
            role="tablist"
            aria-label="Who this applies to"
            className="inline-flex flex-none border-[1.5px] border-charcoal max-[700px]:w-full"
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
                  className={`px-5 py-3 max-[700px]:flex-1 max-[700px]:px-2 border-r-[1.5px] border-charcoal last:border-r-0 text-[13px] max-[700px]:text-[12px] font-bold tracking-[0.02em] transition-colors duration-150 min-h-11 whitespace-nowrap ${
                    active ? "bg-charcoal text-cream" : "text-charcoal/60 hover:text-charcoal"
                  }`}
                >
                  {view.label}
                </button>
              );
            })}
          </div>

          {views.map((view, i) => (
            <p
              key={view.label}
              id={`framing-intro-${i}`}
              hidden={activeView !== i}
              className="flex-1 min-w-[320px] max-w-[620px] max-[700px]:min-w-0 text-[17px] leading-[1.5] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/65 m-0"
            >
              {view.intro}
            </p>
          ))}
        </div>

        {views.map((view, viewIndex) => (
          <div
            key={view.label}
            role="tabpanel"
            id={`framing-panel-${viewIndex}`}
            aria-labelledby={`framing-tab-${viewIndex}`}
            aria-describedby={`framing-intro-${viewIndex}`}
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
                        {open ? "\u2212" : "+"}
                      </span>
                    </button>
                    <div
                      className="overflow-hidden transition-[max-height] duration-300 ease-in-out min-[701px]:!max-h-none"
                      style={{ maxHeight: open ? 400 : 0 }}
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
                      <p className="text-[12.5px] leading-[1.55] text-charcoal/60">{card.description}</p>
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
