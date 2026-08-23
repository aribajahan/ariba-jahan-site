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
          A full-bleed overlay either hid the subject or overlapped her face
          with the headline, so instead this mirrors the desktop's side-by-side
          composition (text left, photo right) at a compact, scaled-down size
          rather than a tall full-width photo. */}
      <div className="min-[701px]:hidden bg-cream flex items-start gap-4 px-6 pt-[130px] pb-8">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[14px]">
            {aboutHero.eyebrow}
          </div>
          <div className="font-display text-[28px] font-black text-charcoal leading-[1.02] tracking-[-0.02em]">
            {aboutHero.headline}
          </div>
        </div>
        <div className="relative w-[38%] flex-shrink-0 aspect-[3/4] mt-6">
          <Image
            src="/assets/about-hero-photo-mobile.jpg"
            alt="Ariba Jahan"
            fill
            sizes="40vw"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </section>
  );
}
