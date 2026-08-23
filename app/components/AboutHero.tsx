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

      {/* Mobile (<=700px): the reference has no mobile treatment for this hero,
          and the wide 2400x1000 source photo has no crop that both keeps the
          subject in frame and leaves room for the headline in an overlay at
          mobile's tall/narrow aspect. Stacking text above a shorter photo
          panel avoids that conflict instead of fighting it with a scrim. */}
      <div className="min-[701px]:hidden">
        <div className="bg-cream px-6 pt-[130px] pb-8">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[14px]">
            {aboutHero.eyebrow}
          </div>
          <div className="font-display text-[38px] font-black text-charcoal leading-[0.98] tracking-[-0.02em]">
            {aboutHero.headline}
          </div>
        </div>
        <div className="relative w-full aspect-[4/5]">
          <Image
            src="/assets/about-hero-photo-mobile.jpg"
            alt="Ariba Jahan"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </section>
  );
}
