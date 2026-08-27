import Image from "next/image";
import { wwmTrustedByLogos } from "../data/work-with-me";
import wwmContent from "../../content/pages/work-with-me.json";

export default function WwmTrustedBy() {
  return (
    <section className="bg-charcoal py-10 px-[clamp(24px,5vw,80px)] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/40 mb-[22px]">
          {wwmContent.wwmTrustedBy.eyebrow}
        </div>
        <div className="relative overflow-hidden">
          <div
            className="flex items-center gap-10 max-[1024px]:gap-8 max-[700px]:gap-7 w-max [animation-play-state:running] hover:[animation-play-state:paused]"
            style={{ animation: "logoScroll 32s linear infinite" }}
          >
            {[...wwmTrustedByLogos, ...wwmTrustedByLogos].map((logo, i) => (
              <Image quality={90}
                key={`${logo.alt}-${i}`}
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
      </div>
    </section>
  );
}
