import Image from "next/image";
import { careerAdvisory } from "../data/about";

export default function CareerAdvisory() {
  return (
    <section id="career-advisory" className="bg-cherish flex flex-wrap items-stretch">
      <div className="flex-[1_1_440px] max-[1024px]:flex-[1_1_360px] min-w-[320px] px-[clamp(24px,5vw,80px)] py-[120px] max-[700px]:py-20 max-[1024px]:py-24 flex flex-col justify-center">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-charcoal mb-5">
          {careerAdvisory.eyebrow}
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-[1.02] text-cream mb-6">
          {careerAdvisory.headline}
        </h2>
        <p className="text-[17px] leading-[1.65] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/85 mb-5">
          <b className="text-cream">{careerAdvisory.lead}</b>
        </p>
        <p className="text-[19px] leading-[1.65] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/80 mb-8">{careerAdvisory.body}</p>
        <a
          href={careerAdvisory.href}
          className="inline-block w-fit bg-charcoal text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(0,0,0,0.4)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(0,0,0,0.4)]"
        >
          {careerAdvisory.cta}
        </a>
      </div>
      <div className="flex-[1_1_420px] max-[1024px]:flex-[1_1_340px] min-w-[320px] min-h-[520px] max-[700px]:min-h-[320px] relative">
        <Image quality={90}
          src={careerAdvisory.photoSrc}
          alt="Ariba Jahan"
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
