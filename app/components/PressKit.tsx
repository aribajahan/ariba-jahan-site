"use client";

import { useState } from "react";
import Image from "next/image";
import siteSettings from "../../content/site-settings.json";
import { recognitionItems, bioIntro, bioExpanded } from "../data/about";
import { speakingLogos } from "../data/speaking";
import { wwmTrustedByLogos } from "../data/work-with-me";

const speakingTopics = [
  { title: "Cognitive Endurance", question: "How do we preserve human judgment in the age of AI?" },
  { title: "Leading with Momentum Through Uncertainty", question: "How do leaders create momentum when the path isn’t clear?" },
  { title: "Brand Utility as a Moat", question: "What earns an organization a lasting place in people’s lives?" },
  { title: "Experience Design at the Edge of Expectation", question: "How is AI reshaping what people expect from products and experiences?" },
  { title: "Ethical & Responsible AI", question: "Who is accountable when AI gets it wrong?" },
];

const currentlyItems = [
  {
    index: "01",
    title: "Experience-Led Growth Strategist",
    chip: "bg-tennis",
    body: "Helping organizations build products, services, and experiences that earn a lasting place in people’s lives.",
    cta: "Work With Me →",
    href: "https://aribajahan.com/work-with-me",
  },
  {
    index: "02",
    title: "Unmissables",
    chip: "bg-femme-pink",
    body: "Her podcast and newsletter on technology, business, and human behavior.",
    cta: "Read & Subscribe →",
    href: "https://www.unmissables.xyz/",
  },
  {
    index: "03",
    title: "Cognitive Endurance",
    chip: "bg-cream",
    body: "Her original framework for judgment and agency in an AI-shaped world, now in two parts.",
    cta: "Read the essay →",
    href: "https://www.unmissables.xyz/p/cognitive-endurance",
    secondaryCta: "+ Reclaiming Our Agency in the Age of AI →",
    secondaryHref: "https://www.unmissables.xyz/p/cognitive-endurance-2",
  },
];

// Full real galleries (Studio-editable), not a hand-picked subset -- same
// source of truth as the Speaking and Work With Me pages. Every logo renders
// pure white via a filter (not the mixed color/invert treatment those pages
// use) for a uniform look here, and heights are each logo's own real
// heightPx scaled down by the same factor, so the relative sizing already
// tuned for legibility (see PROJECT_STATUS.md's logo-asset-quality note)
// carries over instead of being re-guessed.
const LOGO_SCALE = 0.5;
const clientLogos = wwmTrustedByLogos.map((l) => ({ src: l.src, alt: l.alt, heightPx: l.heightPx * LOGO_SCALE }));
const speakingStageLogos = speakingLogos.map((l) => ({ src: l.src, alt: l.alt, heightPx: l.heightPx * LOGO_SCALE }));

const headshotOptions = [
  { src: "/uploads/press-headshot-editorial.jpg", label: "Editorial headshot" },
  { src: "/uploads/press-headshot-blue.jpg", label: "Studio headshot" },
  { src: "/uploads/press-headshot-red-wall.jpg", label: "Personal headshot" },
];

const PRESS_SOCIAL_LABELS = ["LinkedIn", "Instagram", "Substack", "YouTube", "Spotify"];
const socialLinksForPress = siteSettings.socialLinks.filter((s) => PRESS_SOCIAL_LABELS.includes(s.label));

const OFFICIAL_TITLE = "Experience-Led Growth Strategist, Speaker & Advisor";
const SHORT_BIO = bioIntro.join(" ");
const LONG_BIO = [bioIntro[1], bioExpanded[0], bioExpanded[1], bioExpanded[3]];

function LogoRow({ label, logos }: { label: string; logos: { src: string; alt: string; heightPx: number }[] }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/40 mb-6">{label}</div>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
        {logos.map((logo, i) => (
          <Image
            quality={90}
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            width={160}
            height={logo.heightPx}
            style={{ height: logo.heightPx, width: "auto" }}
            className="object-contain opacity-90 brightness-0 invert"
          />
        ))}
      </div>
    </div>
  );
}

export default function PressKit() {
  const [bioExpandedOpen, setBioExpandedOpen] = useState(false);

  return (
    <div className="bg-cream font-body text-lg leading-[1.6]">
      {/* Header */}
      <section className="bg-charcoal pt-[150px] pb-16 max-[700px]:pt-[110px] max-[700px]:pb-12 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 min-[701px]:grid-cols-[1.2fr_0.8fr] gap-[60px] items-end">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">Press Kit</div>
            <h1 className="font-display text-[clamp(40px,5.5vw,72px)] font-black uppercase tracking-[-0.01em] leading-[0.92] text-cream mb-6">
              Ariba Jahan
            </h1>
            <p className="text-[17px] leading-[1.6] text-cream/70 max-w-[480px] mb-7">{OFFICIAL_TITLE}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinksForPress.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="text-xs font-bold tracking-[0.1em] uppercase text-cream/70 border-b border-cream/25 pb-[2px] w-fit transition-colors duration-150 hover:text-cream hover:border-cream"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="relative w-[240px] justify-self-start min-[701px]:justify-self-end">
            <span
              className="absolute -top-4 -left-4 z-[2] inline-block -rotate-[3deg] bg-femme-pink text-charcoal text-[11px] font-extrabold tracking-[0.08em] uppercase px-[14px] py-[7px] shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
            >
              Press Kit
            </span>
            <div className="relative aspect-[4/5] w-[240px] overflow-hidden">
              <Image
                quality={90}
                src="/uploads/press-headshot-editorial.jpg"
                alt="Ariba Jahan"
                fill
                sizes="240px"
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-14 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[720px] mx-auto relative">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">About</div>
          <p className="text-[15px] text-charcoal/55 mb-8 max-w-[520px]">
            Headshot, bio, speaking topics, and current work for media, event organizers, and collaborators.
          </p>
          <div className="relative">
            <div
              className="absolute -top-[18px] -left-2 font-display text-[110px] font-black leading-none pointer-events-none select-none"
              style={{ color: "rgba(45,45,45,0.06)" }}
            >
              &ldquo;
            </div>
            <p className="relative text-lg leading-[1.75] text-charcoal mb-4">{SHORT_BIO}</p>
          </div>

          <div
            className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: bioExpandedOpen ? 1200 : 0 }}
          >
            {LONG_BIO.map((p, i) => (
              <p key={i} className="text-lg leading-[1.75] text-charcoal/[0.68] mb-6">
                {p}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setBioExpandedOpen((v) => !v)}
            aria-expanded={bioExpandedOpen}
            className="bg-transparent border-none cursor-pointer text-[15px] font-extrabold tracking-[0.12em] uppercase text-cherish border-b border-cherish pb-[2px] font-body min-h-11 inline-flex items-center"
          >
            {bioExpandedOpen ? "Show less ←" : "Read full bio →"}
          </button>
        </div>
      </section>

      {/* Speaking Topics + Recognition */}
      <section className="pb-16 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 min-[701px]:grid-cols-2 gap-16">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-6">Speaking Topics</div>
            <div className="flex flex-col">
              {speakingTopics.map((t, i) => (
                <div
                  key={t.title}
                  className={`py-4 ${i === speakingTopics.length - 1 ? "" : "border-b border-charcoal/10"}`}
                >
                  <div className="font-display text-xl font-extrabold uppercase text-charcoal leading-[1.1]">{t.title}</div>
                  <div className="text-[14px] text-charcoal/55 italic mt-1">{t.question}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-6">Recognition</div>
            <div className="flex flex-col">
              {recognitionItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`py-[14px] text-base text-charcoal ${i === recognitionItems.length - 1 ? "" : "border-b border-charcoal/10"}`}
                >
                  {item.label}
                  {item.year && <span className="text-[13px] text-charcoal/40 ml-2">{item.year}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="bg-charcoal pt-16 pb-16 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-8">Currently</div>
          <div className="grid gap-6 min-[701px]:grid-cols-3">
            {currentlyItems.map((item) => (
              <div key={item.title} className="bg-cream p-8 border-t-[3px] border-cherish flex flex-col">
                <div className="text-[11px] font-extrabold tracking-[0.2em] text-cherish mb-4">{item.index}</div>
                <div className="font-display text-2xl font-black uppercase tracking-[-0.01em] leading-[1.05] mb-4">
                  <span className={`inline-block -rotate-[1.5deg] ${item.chip} px-[10px] py-[3px] text-charcoal`}>{item.title}</span>
                </div>
                <p className="text-[15px] leading-[1.55] text-charcoal/65 mb-6 flex-1">{item.body}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="text-[13px] font-extrabold tracking-[0.08em] uppercase text-cherish border-b-2 border-cherish pb-[2px] w-fit"
                >
                  {item.cta}
                </a>
                {item.secondaryCta && (
                  <a
                    href={item.secondaryHref}
                    target="_blank"
                    rel="noopener"
                    className="text-[11px] font-bold text-charcoal/50 mt-3 w-fit border-b border-charcoal/25 pb-[1px]"
                  >
                    {item.secondaryCta}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="bg-charcoal pt-16 pb-16 px-[clamp(24px,5vw,80px)] border-t border-cream/[0.08]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
          <LogoRow label="Clients & Partners" logos={clientLogos} />
          <LogoRow label="Invited to Speak At" logos={speakingStageLogos} />
        </div>
      </section>

      {/* Download kit for organizers */}
      <section className="pb-16 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1200px] mx-auto bg-[#f2efe6] p-10 max-[700px]:p-6">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-2">For Media &amp; Event Organizers</div>
          <h2 className="font-display text-3xl font-black uppercase tracking-[-0.01em] text-charcoal mb-8">Download Kit</h2>

          <div className="grid grid-cols-1 min-[701px]:grid-cols-[auto_1fr] gap-12">
            <div className="flex gap-5 flex-wrap">
              {headshotOptions.map((h) => (
                <div key={h.src} className="w-[130px]">
                  <div className="relative aspect-[4/5] w-[130px] overflow-hidden mb-3">
                    <Image quality={90} src={h.src} alt={h.label} fill sizes="130px" style={{ objectFit: "cover" }} />
                  </div>
                  <a
                    href={h.src}
                    download
                    className="text-[11px] font-extrabold tracking-[0.06em] uppercase text-cherish border-b border-cherish pb-[1px]"
                  >
                    Download →
                  </a>
                </div>
              ))}
            </div>

            <div>
              <div className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-charcoal/50 mb-2">Official Title</div>
              <p className="text-[15px] text-charcoal">{OFFICIAL_TITLE}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / booking */}
      <section className="bg-charcoal pt-16 pb-16 px-[clamp(24px,5vw,80px)]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block -rotate-[2deg] bg-femme-pink text-charcoal text-[10px] font-extrabold tracking-[0.08em] uppercase px-[10px] py-[5px]">
              Book Me
            </span>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/60">For Bookings &amp; Inquiries</div>
          </div>
          <a href="mailto:ariba@aribajahan.com" className="font-display text-3xl font-black text-cream">
            ariba@aribajahan.com
          </a>
        </div>
      </section>
    </div>
  );
}
