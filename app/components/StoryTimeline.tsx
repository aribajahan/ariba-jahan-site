"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  storyChapters,
  rightNowPhotos,
  rightNowCopy,
  type StoryChapter,
} from "../data/about";

// Reused per-chapter base rotation, keyed by chapter index (1-10) plus the "Right Now"
// finale at 11 -- mirrors design-system.md's baseRot map so the scroll-drift effect below
// stays keyed the same way if a chapter is ever added.
const BASE_ROT: Record<number, number> = {
  1: -2,
  2: 2,
  3: -1.5,
  4: 2,
  5: -2.2,
  6: 1.8,
  7: -1.8,
  8: 2.3,
  9: -2,
  10: 2,
  11: 0,
};

function PhotoPair({
  chapter,
  setRef,
}: {
  chapter: StoryChapter;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={setRef}
      className={`relative w-full max-w-[420px] max-[1024px]:max-w-[340px] max-[700px]:max-w-none will-change-transform ${
        chapter.align === "photo-left"
          ? "justify-self-end mr-6"
          : "justify-self-start ml-6"
      } max-[700px]:justify-self-stretch max-[700px]:mx-0`}
      style={{ height: chapter.wrapperHeight, transform: `rotate(${chapter.baseRot}deg)` }}
    >
      {[chapter.photoA, chapter.photoB].map((photo, i) => (
        <div
          key={i}
          className="absolute bg-cream p-[9px] pb-[30px] shadow-[0_14px_26px_-10px_rgba(20,12,12,0.35)]"
          style={
            photo.side === "left"
              ? {
                  left: 0,
                  top: photo.top,
                  width: `${photo.widthPct}%`,
                  transform: `rotate(${photo.rotate}deg)`,
                  zIndex: photo.z,
                }
              : {
                  right: 0,
                  top: photo.top,
                  width: `${photo.widthPct}%`,
                  transform: `rotate(${photo.rotate}deg)`,
                  zIndex: photo.z,
                }
          }
        >
          <div className="relative w-full h-40">
            <Image
              src={photo.src}
              alt={chapter.headline}
              fill
              sizes="210px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      ))}
      <span
        className={`absolute left-1/2 inline-block bg-highlighter px-[18px] py-[5px] text-[13px] font-extrabold tracking-[0.04em] uppercase text-charcoal whitespace-nowrap z-[3] ${
          chapter.tapeShadow ? "shadow-[3px_3px_0_rgba(45,45,45,0.3)]" : ""
        }`}
        style={{ top: chapter.tapeTop, transform: `translateX(-50%) rotate(${chapter.tapeRotate}deg)` }}
      >
        {chapter.headline}
      </span>
    </div>
  );
}

function ChapterText({ chapter, align }: { chapter: StoryChapter; align: "left" | "right" }) {
  return (
    <div
      className={`max-w-[460px] max-[1024px]:max-w-[380px] max-[700px]:max-w-none max-[700px]:mx-0 max-[700px]:text-left ${
        align === "right"
          ? "justify-self-end mr-6 text-right max-[700px]:justify-self-stretch"
          : "justify-self-start ml-6 max-[700px]:justify-self-stretch"
      }`}
    >
      <div className="text-xs font-bold tracking-[0.1em] uppercase text-charcoal/40 mb-[14px]">
        {chapter.headline}
      </div>
      <p className="text-[17px] leading-[1.6] text-charcoal/[0.68]">{chapter.body}</p>
    </div>
  );
}

export default function StoryTimeline() {
  const refs = useRef<Record<number, HTMLDivElement | null>>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // TODO: the scroll-drift is a purely decorative, always-live nudge (photos are already
    // visible, this just adds settle/drift as they pass through the viewport). design-system.md
    // doesn't specify mobile behavior, so as a performance call this is skipped below 480px
    // (extra scroll-tick work for an effect that reads as noise on small screens) and whenever
    // the user has requested reduced motion.
    const isVerySmall = typeof window !== "undefined" && window.innerWidth < 480;
    if (prefersReduced || isVerySmall) return;

    const update = () => {
      const vh = window.innerHeight || 800;
      for (let i = 1; i <= 11; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const base = BASE_ROT[i];
        const rect = el.getBoundingClientRect();
        let t = (vh - rect.top) / (vh * 0.9);
        t = Math.max(0, Math.min(1, t));
        const extraRot = (1 - t) * -5;
        const translateY = (1 - t) * 26;
        const translateX = (1 - t) * -8 * (base < 0 ? 1 : -1);
        el.style.transform = `rotate(${(base + extraRot).toFixed(2)}deg) translateY(${translateY.toFixed(1)}px) translateX(${translateX.toFixed(1)}px)`;
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-20 max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)] border-t border-charcoal/[0.08]">
      <div className="max-w-[640px] mx-auto mb-14 text-center">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
          My Story
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1] text-charcoal">
          Here are some chapters of my life. <br />
          Excited for what&rsquo;s next.
        </h2>
      </div>

      <div className="max-w-[1280px] mx-auto bg-cream p-10 max-[1024px]:p-6 max-[700px]:p-0 relative">
        <div className="hidden min-[701px]:block absolute left-1/2 top-10 bottom-10 w-[2px] bg-charcoal/[0.15] -translate-x-1/2" />

        {storyChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="grid grid-cols-[minmax(0,1fr)_70px_minmax(0,1fr)] max-[1024px]:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)] max-[700px]:!grid-cols-1 items-center mb-16 max-[700px]:gap-5"
          >
            {chapter.align === "photo-left" ? (
              <>
                <PhotoPair
                  chapter={chapter}
                  setRef={(el) => {
                    refs.current[chapter.id] = el;
                  }}
                />
                <div className="hidden min-[701px]:block w-4 h-4 rounded-full bg-cherish justify-self-center" />
                <ChapterText chapter={chapter} align="left" />
              </>
            ) : (
              <>
                <ChapterText chapter={chapter} align="right" />
                <div className="hidden min-[701px]:block w-4 h-4 rounded-full bg-cherish justify-self-center" />
                <PhotoPair
                  chapter={chapter}
                  setRef={(el) => {
                    refs.current[chapter.id] = el;
                  }}
                />
              </>
            )}
          </div>
        ))}

        <div className="h-[143px] max-[700px]:h-0" />
      </div>

      {/* RIGHT NOW finale */}
      <div className="max-w-[1100px] mx-auto -mt-10 max-[700px]:mt-0 px-10 max-[700px]:px-0">
        <div
          ref={(el) => {
            refs.current[11] = el;
          }}
          className="relative flex justify-center items-end w-full flex-wrap will-change-transform max-[700px]:gap-3"
        >
          {rightNowPhotos.map((photo) => (
            <div
              key={photo.src}
              className="w-[220px] max-w-[23%] max-[700px]:max-w-[46%] min-w-[150px] max-[700px]:min-w-0 mr-[-36px] max-[700px]:mr-0 bg-cream p-[9px] pb-[26px] shadow-[0_14px_26px_-10px_rgba(20,12,12,0.35)]"
              style={{
                transform: `rotate(${photo.rotate}deg) translateY(${photo.translateY}px)`,
                zIndex: photo.z,
              }}
            >
              <div className="relative w-full h-40">
                <Image
                  src={photo.src}
                  alt="Ariba Jahan, right now"
                  fill
                  sizes="220px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
          <span className="absolute -top-[46px] left-1/2 -translate-x-1/2 -rotate-2 inline-block bg-highlighter px-[18px] py-[5px] text-[13px] font-extrabold tracking-[0.04em] uppercase text-charcoal whitespace-nowrap shadow-[3px_3px_0_rgba(45,45,45,0.3)] z-[3]">
            Now
          </span>
        </div>
        <div className="max-w-[600px] mx-auto mt-12 text-center">
          <div className="text-xs font-bold tracking-[0.1em] uppercase text-charcoal/40 mb-[14px]">
            Right Now
          </div>
          <p className="text-[17px] leading-[1.6] text-charcoal/[0.68]">{rightNowCopy}</p>
        </div>
      </div>
    </section>
  );
}
