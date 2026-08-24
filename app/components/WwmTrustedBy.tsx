import Image from "next/image";
import { wwmTrustedByLogos } from "../data/work-with-me";

export default function WwmTrustedBy() {
  return (
    <section className="bg-charcoal py-10 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/40 mb-[22px]">
          Trusted By
        </div>
        <div className="no-scrollbar flex flex-wrap items-center gap-10 max-[1024px]:gap-8 max-[700px]:flex-nowrap max-[700px]:overflow-x-auto max-[700px]:gap-7 max-[700px]:-mx-6 max-[700px]:px-6">
          {wwmTrustedByLogos.map((logo) => (
            <Image quality={90}
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={logo.heightPx}
              style={{ height: logo.heightPx, width: "auto", maxWidth: "100%" }}
              className="object-contain opacity-[0.88] grayscale brightness-0 invert flex-shrink-0 max-[700px]:max-h-[24px] max-[700px]:w-auto"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
