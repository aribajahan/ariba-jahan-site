"use client";

import { useState } from "react";
import Image from "next/image";
import { cxSprintDeliverables, cxSprintFitPoints, cxSprintWeeks } from "../data/work-with-me";

export default function CXSprint() {
  const [deliverablesOpen, setDeliverablesOpen] = useState(false);
  const [weeksOpen, setWeeksOpen] = useState(false);

  return (
    <section
      id="cx-sprint"
      className="bg-cherish pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-20 max-[700px]:pb-14 px-[clamp(24px,5vw,80px)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-charcoal mb-3">
          01 · I Work With Teams &amp; Organizations
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1.02] text-cream mb-9">
          CX Ambition Sprint
        </h2>

        <div className="grid grid-cols-[440px_1fr] max-[1024px]:grid-cols-1 gap-12 max-[1024px]:gap-7 items-stretch">
          <div className="h-[560px] max-[700px]:h-[320px] overflow-hidden relative">
            <Image quality={90}
              src="/uploads/vox1-copy-opt.jpg"
              alt="CX Ambition Sprint"
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="max-w-[640px]">
            <p className="text-[19px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/90 mb-[14px] font-bold">
              A 6-week sprint for teams that need a sharper point of view on how their product,
              service, or experience should evolve.
            </p>
            <div className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/85 mb-6 flex flex-col gap-4">
              <p>
                This is for organizations at an inflection point: when customer expectations are
                changing, engagement has flattened, the market is shifting, or new technology is
                creating pressure to respond. The issue usually isn&rsquo;t a lack of ideas.
                It&rsquo;s that the real opportunity is still blurry, or the current experience no
                longer matches the value the organization wants to create.
              </p>
              <p>
                The sprint helps you step back, see the experience more clearly, and make better
                decisions about where growth, relevance, and differentiation can come from next.
                Together, we look at customer behavior, business priorities, category movement,
                and the role technology should or shouldn&rsquo;t play.
              </p>
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
              <span className="font-bold text-cream">What comes out of it:</span> A clearer
              opportunity space, a stronger strategic direction, and a concrete set of concepts,
              priorities, or prototypes to help your team move forward.
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
                    Tailored based on your product maturity and project scope
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
              href="mailto:ariba@aribajahan.com?subject=CX%20Ambition%20Sprint%20Inquiry"
              className="inline-block bg-charcoal text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.4)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(0,0,0,0.4)]"
            >
              Book an intro call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
