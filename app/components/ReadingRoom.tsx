import type { CSSProperties } from "react";
import homeContent from "../../content/pages/home.json";
import EventWindow from "./EventWindow";
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
      <section id="reading-room" aria-labelledby="reading-room-heading" className={styles.section} style={style}>
        <svg width="0" height="0" aria-hidden="true" className={styles.filter}>
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
        <div className={styles.inner}>
          <div className={styles.series}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h2 id="reading-room-heading">{content.heading}</h2>
            <p className={styles.description}>{content.description}</p>
            <p className={styles.body}>{content.body}</p>
            <p className={styles.host}>{content.host}</p>
          </div>
          <div className={styles.stock}>
            <div className={styles.card}>
              <div className={styles.catalogue}><span>{content.sessionLabel}</span><span>{content.cardLabel}</span></div>
              <h3>{content.sessionTitle}</h3>
              <p className={styles.subtitle}>{content.sessionSubtitle}</p>
              <p className={styles.logistics}><time dateTime={content.startsAt}>{content.dateLabel}</time><br />{content.formatLabel}</p>
              <a href={content.ctaHref} target="_blank" rel="noopener" className={styles.join}>{content.ctaLabel}</a>
            </div>
          </div>
        </div>
      </section>
    </EventWindow>
  );
}
