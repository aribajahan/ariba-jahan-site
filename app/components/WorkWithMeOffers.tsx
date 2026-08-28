"use client";

import { useState } from "react";
import Image from "next/image";
import {
  cxSprintContent,
  cxSprintDeliverables,
  cxSprintFitPoints,
  cxSprintWeeks,
  strategySessionBestFor,
  strategySessionsContent,
} from "../data/work-with-me";

export default function WorkWithMeOffers() {
  const [openOffer, setOpenOffer] = useState<"cx" | "strategy" | null>(null);
  const [deliverablesOpen, setDeliverablesOpen] = useState(false);
  const [weeksOpen, setWeeksOpen] = useState(false);

  const cxOpen = openOffer === "cx";
  const strategyOpen = openOffer === "strategy";

  return (
    <>
      {/* CX Ambition Sprint */}
      <section
        id="cx-sprint"
        className="bg-cherish pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-20 max-[700px]:pb-9 px-[clamp(24px,5vw,80px)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-charcoal mb-3">
            {cxSprintContent.eyebrow}
          </div>
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1.02] text-cream mb-9">
            {cxSprintContent.heading}
          </h2>

          <div className="grid grid-cols-[440px_1fr] max-[1024px]:grid-cols-1 gap-12 max-[1024px]:gap-7 items-stretch">
            <div className="h-[560px] max-[700px]:h-[240px] overflow-hidden relative">
              <Image quality={90}
                src={cxSprintContent.photoSrc}
                alt="CX Ambition Sprint"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="max-w-[640px]">
              <p className="text-[19px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/90 mb-[14px] font-bold">
                {cxSprintContent.intro}
              </p>

              <button
                type="button"
                onClick={() => setOpenOffer((v) => (v === "cx" ? null : "cx"))}
                aria-expanded={cxOpen}
                className="hidden max-[700px]:flex items-center gap-2 cursor-pointer min-h-11 -ml-1 mb-2"
              >
                <span className="text-[13px] font-extrabold tracking-[0.06em] uppercase text-cream underline">
                  {cxOpen ? "Show less" : "Read the full sprint details"}
                </span>
                <span className="text-lg text-cream font-light">{cxOpen ? "−" : "+"}</span>
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out min-[701px]:!max-h-none"
                style={{ maxHeight: cxOpen ? 4000 : 0 }}
              >
                <div className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/85 mb-6 flex flex-col gap-4 max-[700px]:pt-2">
                  {cxSprintContent.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="flex flex-col gap-[10px] mb-6">
                  <p className="text-[15px] font-bold text-cream mb-[2px]">This is a good fit if:</p>
                  {cxSprintFitPoints.map((point) => (
                    <div key={point} className="flex gap-[14px] items-start">
                      <span className="text-cream font-extrabold text-base leading-[1.5]">•</span>
                      <span className="text-base leading-[1.5] text-cream/85">{point}</span>
                    </div>
                  ))}
                </div>

                <p className="text-base leading-[1.5] text-cream/85 mb-6">
                  <span className="font-bold text-cream">What comes out of it:</span> {cxSprintContent.outcome}
                </p>

                <div className="border-t border-cream/25 pt-[18px]">
                  <button
                    type="button"
                    onClick={() => setDeliverablesOpen((v) => !v)}
                    aria-expanded={deliverablesOpen}
                    className="flex items-center justify-between cursor-pointer max-w-[400px] w-full min-h-11 text-left"
                  >
                    <span className="text-[13px] font-extrabold tracking-[0.06em] uppercase text-cream">
                      Typical deliverables &amp; artifacts
                    </span>
                    <span className="text-lg text-charcoal font-light">
                      {deliverablesOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{ maxHeight: deliverablesOpen ? 640 : 0 }}
                  >
                    <div className="pt-4 flex flex-col gap-[14px] max-w-[460px]">
                      <p className="text-[13px] leading-[1.5] text-cream/75 italic">
                        {cxSprintContent.deliverablesNote}
                      </p>
                      {cxSprintDeliverables.map((d) => (
                        <p key={d.title} className="text-base leading-[1.55] text-cream/85">
                          <b className="text-cream">{d.title}</b> {d.description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-cream/25 pt-[18px] mb-7">
                  <button
                    type="button"
                    onClick={() => setWeeksOpen((v) => !v)}
                    aria-expanded={weeksOpen}
                    className="flex items-center justify-between cursor-pointer max-w-[400px] w-full min-h-11 text-left"
                  >
                    <span className="text-[13px] font-extrabold tracking-[0.06em] uppercase text-cream">
                      Week-by-week breakdown
                    </span>
                    <span className="text-lg text-charcoal font-light">{weeksOpen ? "−" : "+"}</span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{ maxHeight: weeksOpen ? 400 : 0 }}
                  >
                    <div className="pt-4 flex flex-col gap-[10px] max-w-[460px]">
                      {cxSprintWeeks.map((w) => (
                        <p key={w.title} className="text-base leading-[1.55] text-cream/85">
                          <b className="text-cream">{w.title}</b> {w.description}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={cxSprintContent.ctaHref}
                  className="inline-block bg-charcoal text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.4)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(0,0,0,0.4)]"
                >
                  {cxSprintContent.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1:1 CX Strategy Sessions */}
      <section
        id="strategy-sessions"
        className="bg-charcoal pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">
            {strategySessionsContent.eyebrow}
          </div>
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1.02] text-cream mb-9">
            {strategySessionsContent.heading}
          </h2>

          <div className="grid grid-cols-[440px_1fr] max-[1024px]:grid-cols-1 gap-12 max-[1024px]:gap-7 items-stretch">
            <div className="h-[560px] max-[700px]:h-[240px] overflow-hidden relative">
              <Image quality={90}
                src={strategySessionsContent.photoSrc}
                alt="1:1 Strategy Sessions"
                fill
                sizes="(max-width: 1024px) 100vw, 440px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="max-w-[640px]">
              <p className="text-[19px] leading-[1.65] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/[0.82] mb-5 font-bold">
                {strategySessionsContent.intro}
              </p>

              <button
                type="button"
                onClick={() => setOpenOffer((v) => (v === "strategy" ? null : "strategy"))}
                aria-expanded={strategyOpen}
                className="hidden max-[700px]:flex items-center gap-2 cursor-pointer min-h-11 -ml-1 mb-2"
              >
                <span className="text-[13px] font-extrabold tracking-[0.06em] uppercase text-cherish underline">
                  {strategyOpen ? "Show less" : "Read the full session details"}
                </span>
                <span className="text-lg text-cherish font-light">{strategyOpen ? "−" : "+"}</span>
              </button>

              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out min-[701px]:!max-h-none"
                style={{ maxHeight: strategyOpen ? 4000 : 0 }}
              >
                <div className="text-[17px] leading-[1.65] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/70 mb-6 flex flex-col gap-4 max-[700px]:pt-2">
                  {strategySessionsContent.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/75 mb-[14px]">
                  <b className="text-cream">Best for:</b>
                  <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                    {strategySessionBestFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/75 mb-7">
                  <b className="text-cream">What you get:</b> {strategySessionsContent.whatYouGet}
                </p>

                <a
                  href={strategySessionsContent.ctaHref}
                  className="inline-block bg-cherish text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
                >
                  {strategySessionsContent.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
