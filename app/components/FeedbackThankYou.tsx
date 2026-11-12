"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export default function FeedbackThankYou() {
  const firstName = useSyncExternalStore(
    subscribe,
    () => window.sessionStorage.getItem("ai-advisory-feedback-first-name") ?? "",
    () => "",
  );

  return (
    <main className="min-h-screen bg-cream text-charcoal">
      <div className="mx-auto max-w-[1240px] px-5 pb-8 pt-7 sm:px-10 sm:pb-12 sm:pt-10 lg:px-12 lg:pb-16 lg:pt-12">
        <Link
          href="/"
          className="font-display text-[19px] font-black uppercase tracking-[-0.02em] text-charcoal"
        >
          Ariba Jahan
        </Link>

        <section className="pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
          <h1 className="max-w-[1050px] font-display text-[clamp(60px,10vw,124px)] font-black uppercase leading-[0.84] tracking-[-0.03em]">
            <span className="block">Thank you{firstName ? "," : "."}</span>
            {firstName && <span className="block text-cherish">{firstName}.</span>}
          </h1>
          <p className="mt-8 max-w-[700px] text-[18px] leading-[1.6] text-charcoal/72 sm:mt-10 sm:text-[21px]">
            I appreciate you taking the time to share this. I’ll read your feedback closely and use it to make future AI advisory sessions better.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 md:gap-5">
          <a
            href="https://www.unmissables.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[360px] flex-col justify-between bg-charcoal p-7 text-cream transition-transform duration-300 hover:-translate-y-1 sm:min-h-[410px] sm:p-10 lg:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-cream/55">
                Writing
              </span>
              <span
                aria-hidden="true"
                className="text-[30px] leading-none text-cherish transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
            <div>
              <h2 className="max-w-[470px] font-display text-[clamp(42px,6vw,68px)] font-black uppercase leading-[0.9] tracking-[-0.025em]">
                Read Unmissables
              </h2>
              <p className="mt-6 max-w-[470px] text-[16px] leading-[1.6] text-cream/68 sm:text-[18px]">
                Essays on AI, human judgment, changing customer expectations, and what organizations should build next.
              </p>
            </div>
          </a>

          <Link
            href="/work-with-me#strategy-sessions"
            className="group flex min-h-[360px] flex-col justify-between bg-cherish p-7 text-charcoal transition-transform duration-300 hover:-translate-y-1 sm:min-h-[410px] sm:p-10 lg:p-12"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-charcoal/60">
                Work together
              </span>
              <span
                aria-hidden="true"
                className="text-[30px] leading-none transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
            <div>
              <h2 className="max-w-[500px] font-display text-[clamp(42px,6vw,68px)] font-black uppercase leading-[0.9] tracking-[-0.025em]">
                Keep building your AI fluency
              </h2>
              <p className="mt-6 max-w-[490px] text-[16px] leading-[1.6] text-charcoal/72 sm:text-[18px]">
                One-to-one sessions to work through a question or build a workflow, agent, skill, or operating system around your own work.
              </p>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
