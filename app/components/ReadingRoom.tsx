import type { CSSProperties } from "react";
import homeContent from "../../content/pages/home.json";
import EventWindow from "./EventWindow";
import { BTN_PRIMARY } from "./buttonStyles";
import styles from "./ReadingRoom.module.css";

export default function ReadingRoom() {
  const content = homeContent.readingRoom;
  if (!content.enabled) return null;
  const style = {
    "--rr-background": `url(${JSON.stringify(content.backgroundSrc)})`,
    "--rr-ink-opacity": Math.max(0, Math.min(20, content.redInkPercent)) / 100,
  } as CSSProperties;

  return (
    <EventWindow endsAt={content.endsAt}>
      <section
        id="reading-room"
        aria-labelledby="reading-room-heading"
        style={style}
        className={`${styles.section} relative overflow-hidden bg-cream text-charcoal scroll-mt-[100px] max-[600px]:scroll-mt-20`}
      >
        {/* Turns the background photograph red. Referenced by .section::before. */}
        <svg width="0" height="0" aria-hidden="true" className="absolute pointer-events-none">
          <defs>
            <filter id="home-reading-room-ink" colorInterpolationFilters="sRGB">
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.09412" intercept="0.90588" />
                <feFuncG type="linear" slope="0.79216" intercept="0.19216" />
                <feFuncB type="linear" slope="0.76078" intercept="0.19216" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>

        <div className="relative max-w-[1400px] mx-auto grid grid-cols-2 gap-16 items-center px-[clamp(24px,5vw,80px)] py-[52px] max-[900px]:grid-cols-1 max-[900px]:gap-7 max-[900px]:py-9 max-[600px]:flex max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-0 max-[600px]:px-6 max-[600px]:py-9">
          <div className={styles.series}>
            {content.eyebrow && (
              <p className={`${styles.eyebrow} text-[11px] font-extrabold tracking-[0.22em] leading-[1.4] uppercase mb-5`}>
                {content.eyebrow}
              </p>
            )}
            <h2
              id="reading-room-heading"
              className={`${styles.heading} font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-[0.88] tracking-[-0.02em] mb-4`}
            >
              {content.heading}
            </h2>
            <p className={`${styles.description} text-[22px] leading-[1.35] max-w-[460px] mb-[18px] max-[700px]:text-[20px]`}>
              {content.description}
            </p>
            <p className={`${styles.body} text-body max-w-[490px] max-[900px]:max-w-none max-[600px]:mt-[22px]`}>
              {content.body}
            </p>
            <p className={`${styles.host} font-typewriter text-[11px] tracking-[0.08em] mt-6`}>{content.host}</p>
          </div>

          <div className={`${styles.stock} min-w-0 drop-shadow-[2px_4px_3px_#0003] max-[600px]:mt-2`}>
            <div className={`${styles.card} relative bg-cream border-[0.5px] border-[#8c8880] pt-[30px] px-8 pb-11 max-[600px]:px-[22px] max-[600px]:pt-[22px]`}>
              <div className="font-typewriter flex justify-between flex-wrap gap-[14px] text-[10px] tracking-[0.05em] uppercase border-b border-charcoal/[0.22] pb-[13px] mb-[17px] max-[600px]:text-[9px]">
                <span className="text-cherish-deep">{content.sessionLabel}</span>
                <span>{content.cardLabel}</span>
              </div>
              <h3 className="font-display text-[clamp(29px,3vw,40px)] font-extrabold leading-[1.03] tracking-[-0.015em] mb-[13px] max-[600px]:text-[32px]">
                {content.sessionTitle}
              </h3>
              <p className="text-body mb-4">{content.sessionSubtitle}</p>
              <p className="font-typewriter text-xs leading-[1.8] mb-5">
                <time dateTime={content.startsAt}>{content.dateLabel}</time>
                <br />
                {content.formatLabel}
              </p>
              <a href={content.ctaHref} target="_blank" rel="noopener" className={BTN_PRIMARY}>
                {content.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </EventWindow>
  );
}
