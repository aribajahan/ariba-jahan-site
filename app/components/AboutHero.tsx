import Image from "next/image";
import { aboutHero } from "../data/about";

export default function AboutHero() {
  return (
    <section className="bg-charcoal relative overflow-hidden">
      {/* Desktop/tablet: photo + text overlay, matches the design reference. */}
      <div className="hidden min-[701px]:block relative min-h-[min(88vh,760px)]">
        <Image
          src={aboutHero.photoSrc}
          alt="Ariba Jahan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          className="absolute inset-0"
        />
        <div className="relative z-[2] max-w-[1300px] mx-auto h-full px-[clamp(24px,5vw,80px)] pt-[170px] pb-20 flex flex-col justify-center pointer-events-none">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[18px]">
            {aboutHero.eyebrow}
          </div>
          <div className="font-display text-[clamp(38px,4vw,58px)] font-black text-charcoal leading-[0.98] tracking-[-0.02em] max-w-[520px]">
            {aboutHero.headline}
          </div>
        </div>
      </div>

      {/* Mobile (<=700px): the reference has no mobile treatment for this hero.
          A full-bleed overlay at the desktop's tall section height either hid
          the subject or overlapped her face with the headline. This keeps the
          same full-bleed-background-with-text-overlay composition as desktop,
          just at a much shorter section height, using a wider mobile crop
          that keeps blank backdrop behind the text and her fully in frame on
          the right. */}
      <div className="min-[701px]:hidden relative min-h-[260px] pt-[130px] pb-8">
        <Image
          src="/assets/about-hero-photo-mobile-v2.jpg"
          alt="Ariba Jahan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
          className="absolute inset-0"
        />
        <div className="relative z-[2] px-6">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[12px]">
            {aboutHero.eyebrow}
          </div>
          <div className="font-display text-[26px] font-black text-charcoal leading-[1.05] tracking-[-0.02em] max-w-[220px]">
            {aboutHero.headline}
          </div>
        </div>
      </div>
    </section>
  );
}
