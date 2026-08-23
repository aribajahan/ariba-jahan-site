import Image from "next/image";
import { strategySessionBestFor } from "../data/work-with-me";

export default function StrategySessions() {
  return (
    <section
      id="strategy-sessions"
      className="bg-charcoal pt-[120px] max-[700px]:pt-20 max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">
          02 · I Work With Individual Leaders
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1.02] text-cream mb-9">
          1:1 CX Strategy Sessions
        </h2>

        <div className="grid grid-cols-[440px_1fr] max-[1024px]:grid-cols-1 gap-12 max-[1024px]:gap-7 items-stretch">
          <div className="h-[560px] max-[700px]:h-[320px] overflow-hidden relative">
            <Image
              src="/uploads/IMG_4434-opt.jpg"
              alt="1:1 Strategy Sessions"
              fill
              sizes="(max-width: 1024px) 100vw, 440px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="max-w-[640px]">
            <p className="text-[19px] leading-[1.65] text-cream/[0.82] mb-5 font-bold">
              A focused session for leaders working through a product, customer experience,
              growth, or AI-related decision.
            </p>
            <div className="text-[17px] leading-[1.65] text-cream/70 mb-6 flex flex-col gap-4">
              <p>
                Sometimes you don&rsquo;t need a full sprint. You need a clear outside
                perspective, a thoughtful working session, and enough room to think through a
                problem without rushing to the wrong answer.
              </p>
              <p>
                These sessions are for leaders who want to pressure-test a direction, work through
                friction in an existing experience, evaluate a product or GTM shift, or make sense
                of how changing technology and customer behavior should shape their next move.
              </p>
              <p>
                In 60 minutes, we&rsquo;ll get to the heart of the issue, identify what matters
                most, and map out a practical next step.
              </p>
            </div>

            <div className="text-[17px] leading-[1.6] text-cream/75 mb-[14px]">
              <b className="text-cream">Best for:</b>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                {strategySessionBestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <p className="text-[17px] leading-[1.6] text-cream/75 mb-7">
              <b className="text-cream">What you get:</b> A 60-minute live working session and a
              concise recommendation memo with key observations, priorities, and next steps.
            </p>

            <a
              href="mailto:ariba@aribajahan.com?subject=1:1%20Strategy%20Session%20Inquiry"
              className="inline-block bg-cherish text-cream px-7 py-[15px] text-[15px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
            >
              Book a Session →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
