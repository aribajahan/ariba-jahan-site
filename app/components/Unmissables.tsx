"use client";

import { useState } from "react";
import Image from "next/image";
import SubstackEmbed from "./SubstackEmbed";
import SocialIcon from "./SocialIcon";

const links = [
  {
    label: "Read on Substack",
    icon: "Substack" as const,
    href: "https://www.unmissables.xyz/",
  },
  {
    label: "Listen on Spotify",
    icon: "Spotify" as const,
    href: "https://open.spotify.com/show/3ufd57tWYngjUI9LlQGXkD?si=8cc7f819c9384315",
  },
  {
    label: "Apple Podcasts",
    icon: "Apple Podcasts" as const,
    href: "https://podcasts.apple.com/ph/podcast/unmissables-with-ariba-jahan/id1707384312",
  },
];

type Tile = {
  id: string;
  photoSrc: string;
  bg: string;
  kind: "Essay" | "Podcast";
  title: string;
  href: string;
  overlay: "dark" | "light";
  hidden?: boolean; // titles visually revealed only on hover/focus in source (visually-hidden pattern)
};

const tiles: Tile[] = [
  { id: "unmissables-1", photoSrc: "/assets/unmissables-1.jpg", bg: "#2D2D2D", kind: "Essay", title: "Reclaiming Our Agency in the Age of AI", href: "https://www.unmissables.xyz/p/cognitive-endurance-2", overlay: "dark" },
  { id: "unmissables-2", photoSrc: "/assets/unmissables-2.jpg", bg: "#E73131", kind: "Podcast", title: "Ep. 15: Hard Problems, with Daniel Burka", href: "https://www.unmissables.xyz/p/ep-15-hard-problems", overlay: "dark", hidden: true },
  { id: "unmissables-3", photoSrc: "/assets/unmissables-3.jpg", bg: "#F5A8D5", kind: "Essay", title: "Behavior Design in AI #2: When Agreement Is the Product", href: "https://www.unmissables.xyz/p/behavior-design-in-ai-agreement", overlay: "light" },
  { id: "unmissables-6", photoSrc: "/assets/unmissables-6.jpg", bg: "#F5A8D5", kind: "Podcast", title: "Episode title goes here", href: "#", overlay: "dark", hidden: true },
  { id: "unmissables-4", photoSrc: "/assets/unmissables-4.jpg", bg: "#2D2D2D", kind: "Essay", title: "Behavior Design in AI #1: When the Interface Is the Response", href: "https://www.unmissables.xyz/p/behavior-design-in-ai-1-when-the", overlay: "dark" },
  { id: "unmissables-7", photoSrc: "/assets/unmissables-7.jpg", bg: "#2D2D2D", kind: "Podcast", title: "Episode title goes here", href: "#", overlay: "dark", hidden: true },
  { id: "unmissables-5", photoSrc: "/assets/unmissables-5.jpg", bg: "#E73131", kind: "Essay", title: "ChatGPT Has Ads Now. Here's What They're Doing to You", href: "https://www.unmissables.xyz/p/chatgpt-has-ads-now-heres-what-theyre", overlay: "dark" },
  { id: "unmissables-9", photoSrc: "/assets/unmissables-9.jpg", bg: "#E73131", kind: "Podcast", title: "Episode title goes here", href: "#", overlay: "dark", hidden: true },
  { id: "unmissables-8", photoSrc: "/assets/unmissables-8.jpg", bg: "#F5A8D5", kind: "Essay", title: "The Data Pipeline You Never Consented To", href: "https://www.unmissables.xyz/p/the-data-pipeline-you-never-consented", overlay: "light" },
  { id: "unmissables-10", photoSrc: "/assets/unmissables-10.jpg", bg: "#2D2D2D", kind: "Podcast", title: "Episode title goes here", href: "#", overlay: "dark", hidden: true },
];

export default function Unmissables() {
  const [showAll, setShowAll] = useState(false);
  const previewCount = 4;

  return (
    <section
      id="unmissables"
      className="bg-cream pt-[120px] max-[1024px]:pt-24 max-[700px]:pt-[70px] pb-[120px] max-[1024px]:pb-24 max-[700px]:pb-20 border-t border-charcoal/[0.08]"
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex items-baseline justify-between mb-9 flex-wrap gap-3">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
              Writing and Thinking
            </div>
            <div className="font-display text-[clamp(32px,5vw,64px)] font-black uppercase tracking-[-0.02em] leading-none text-charcoal">
              Unmissables
            </div>
          </div>
        </div>

        <div
          className={`grid gap-x-10 gap-y-4 mb-9 [grid-template-columns:1fr_auto] [grid-template-areas:'para_embed'_'links_links'] max-[1024px]:grid-cols-1 max-[1024px]:[grid-template-areas:'para'_'links'_'embed']`}
        >
          <p className="[grid-area:para] text-[19px] leading-[1.62] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/65 max-w-[720px]">
            Unmissables explores the unexpected connections between technology, business, creativity, science, and human behavior, and the ideas those intersections reveal about how we think, build, and create value. Each essay and conversation is built around something worth noticing, questioning, or bringing into your own work.
          </p>

          {/* Icon links: mobile + tablet, where the embed sits full-width below */}
          <div className="[grid-area:links] min-[1025px]:hidden flex gap-5 self-start mt-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener"
                aria-label={l.label}
                className="text-charcoal/70 transition-colors duration-150 hover:text-cherish active:text-cherish"
              >
                <SocialIcon name={l.icon} className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Text links: desktop, where the embed sits beside the paragraph */}
          <div className="[grid-area:links] hidden min-[1025px]:flex gap-x-6 gap-y-2 flex-wrap self-start">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="text-xs font-bold tracking-[0.1em] uppercase text-charcoal border-b border-charcoal/25 pb-[2px] w-fit transition-colors duration-150 hover:text-cherish hover:border-cherish active:text-cherish active:border-cherish"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="[grid-area:embed] self-start max-[1024px]:mt-2">
            <SubstackEmbed />
          </div>
        </div>

        <div className="flex flex-wrap gap-1 items-stretch mb-1">
          <div className="relative flex-[1_1_340px] bg-cherish p-9 flex flex-col justify-end overflow-hidden min-h-[340px]">
            <Image quality={90}
              src="/assets/unmissables-ce.jpg"
              alt="Cognitive Endurance framework"
              fill
              sizes="(max-width: 700px) 100vw, 400px"
              style={{ objectFit: "cover" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(20,12,12,0.72), rgba(20,12,12,0.15) 55%)",
              }}
            />
            <div className="absolute -bottom-5 -right-2 font-display text-[220px] font-black text-cream/[0.07] leading-none pointer-events-none">
              CE
            </div>
            <div className="relative z-[1] text-[9px] font-extrabold tracking-[0.2em] uppercase text-cream/50 mb-[10px]">
              Original Framework
            </div>
            <div className="relative z-[1] font-display text-[clamp(28px,3vw,42px)] font-black uppercase text-cream leading-[0.92] tracking-[-0.01em] mb-[14px]">
              Cognitive
              <br />
              Endurance
            </div>
            <p className="relative z-[1] text-sm leading-[1.5] text-cream/[0.78] italic mb-5">
              &ldquo;It&rsquo;s to stay the kind of person who still decides what belongs in your mind palace, what belongs in the machine, and what deserves to be created by both.&rdquo;
            </p>
            <a
              href="https://www.unmissables.xyz/p/cognitive-endurance"
              target="_blank"
              rel="noopener"
              className="relative z-[1] text-[15px] font-extrabold tracking-[0.12em] uppercase text-cream border-b border-cream/45 pb-[2px] w-fit"
            >
              Read the framework →
            </a>
          </div>

          <div className="flex-[1.6_1_420px] bg-charcoal p-9 flex flex-col justify-center min-h-[160px]">
            <div className="text-[9px] font-extrabold tracking-[0.18em] uppercase text-cream/[0.22] mb-[10px]">
              From the research
            </div>
            <div className="font-display text-[clamp(16px,1.8vw,22px)] font-bold text-cream leading-[1.3] tracking-[-0.01em]">
              MIT study: participants using AI showed{" "}
              <span className="bg-tennis text-charcoal px-1 [box-decoration-break:clone]">
                55% lower cognitive engagement
              </span>{" "}
              and depended on AI for subsequent tasks.
            </div>
          </div>
        </div>

        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] min-[701px]:max-[1024px]:grid-cols-3 [grid-auto-rows:240px] gap-1">
          {tiles.map((tile, i) => (
            <a
              key={tile.id}
              href={tile.href}
              target={tile.href !== "#" ? "_blank" : undefined}
              rel={tile.href !== "#" ? "noopener" : undefined}
              className={`relative overflow-hidden block min-w-0 min-h-0 ${
                i >= previewCount && !showAll ? "max-[700px]:hidden" : ""
              } ${i === tiles.length - 1 ? "min-[701px]:max-[1024px]:hidden" : ""}`}
              style={{ background: tile.bg }}
            >
              <Image quality={90}
                src={tile.photoSrc}
                alt={tile.hidden ? "" : tile.title}
                fill
                sizes="(max-width: 700px) 50vw, 220px"
                style={{ objectFit: "cover" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    tile.overlay === "dark"
                      ? "linear-gradient(to top, rgba(20,12,12,0.88), rgba(20,12,12,0.1) 60%)"
                      : "linear-gradient(to top, rgba(20,12,12,0.6), rgba(20,12,12,0.05) 60%)",
                }}
              />
              {tile.hidden ? (
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                  <span className="relative z-[1] bg-tennis text-charcoal text-[9px] font-extrabold tracking-[0.1em] uppercase px-[9px] py-1 w-fit">
                    {tile.kind}
                  </span>
                  <span className="sr-only">{tile.title}</span>
                </div>
              ) : (
                <>
                  <span className="absolute top-4 left-4 z-[1] bg-tennis text-charcoal text-[9px] font-extrabold tracking-[0.1em] uppercase px-[9px] py-1 w-fit">
                    {tile.kind}
                  </span>
                  <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
                    <span className="font-display text-xl font-extrabold uppercase tracking-[-0.01em] text-cream leading-[1.12] relative z-[1]">
                      {tile.title}
                    </span>
                  </div>
                </>
              )}
            </a>
          ))}
        </div>

        <div className="hidden max-[700px]:flex justify-center mt-5">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs font-bold tracking-[0.1em] uppercase text-cherish border-b border-cherish pb-[2px]"
          >
            {showAll ? "See less" : "See more"}
          </button>
        </div>
      </div>
    </section>
  );
}
