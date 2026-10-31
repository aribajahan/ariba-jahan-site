import Image from "next/image";
import speakingContent from "../../content/pages/speaking.json";
import { BTN_PRIMARY } from "./buttonStyles";

export default function SpeakingHero() {
  const { hero } = speakingContent;

  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-ink min-h-[85vh] max-[700px]:min-h-[85vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.photoSrc}
          alt="Ariba Jahan speaking on stage"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "54% 40%" }}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(20,12,12,0.85) 0%, rgba(20,12,12,0.55) 30%, rgba(20,12,12,0.05) 62%), linear-gradient(to bottom, rgba(20,12,12,0.05) 0%, rgba(20,12,12,0.25) 45%, rgba(20,12,12,0.9) 100%)",
        }}
      />
      <div className="relative z-[2] max-w-[1400px] mx-auto w-full px-[clamp(24px,5vw,80px)] pb-20 pt-[210px] pointer-events-none max-[700px]:pt-[130px] max-[700px]:pb-14 max-[1024px]:pt-[160px]">
        {hero.eyebrow && (
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/60 mb-[18px]">
            {hero.eyebrow}
          </div>
        )}
        <div className="font-display text-[clamp(38px,4vw,60px)] font-black text-cream leading-none tracking-[-0.02em] max-w-[1040px] mb-9">
          {hero.headline}
        </div>
        <a
          href={hero.ctaHref}
          className={`pointer-events-auto ${BTN_PRIMARY}`}
        >
          {hero.ctaLabel} →
        </a>
      </div>
    </section>
  );
}
