import Image from "next/image";
import { aboutHero } from "../data/about";

export default function AboutHero() {
  return (
    <section className="bg-charcoal min-h-[min(88vh,760px)] relative overflow-hidden">
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
    </section>
  );
}
