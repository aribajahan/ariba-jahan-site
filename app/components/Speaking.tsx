import Image from "next/image";
import homeContent from "../../content/pages/home.json";
import { BTN_PRIMARY } from "./buttonStyles";

export default function Speaking() {
  const { speakingTeaser } = homeContent;
  const photos = speakingTeaser.photos;

  return (
    <section id="speaker" className="bg-cream overflow-hidden">
      <div className="reveal flex flex-wrap min-h-[640px] max-w-[1400px] mx-auto">
        <div className="flex-[1_1_420px] px-[clamp(24px,5vw,80px)] pt-[120px] pb-[72px] max-[1024px]:pt-24 max-[1024px]:pb-11 max-[700px]:pt-[70px] flex flex-col justify-start">
          {speakingTeaser.eyebrow && (
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">
              {speakingTeaser.eyebrow}
            </div>
          )}
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase text-charcoal leading-[0.88] tracking-[-0.02em]">
            {speakingTeaser.heading}
          </h2>

          <div className="hidden max-[1024px]:grid grid-cols-2 gap-[3px] mt-7 mb-2">
            <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[280px] max-[700px]:h-[220px]">
              <Image src={photos[0]} alt="Ariba Jahan speaking on stage" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image src={photos[1]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image src={photos[2]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>

          {speakingTeaser.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-body text-charcoal/75 ${i === 0 ? "mt-7 max-[1024px]:mt-2" : ""} ${
                i === speakingTeaser.paragraphs.length - 1 ? "mb-9" : "mb-[18px]"
              }`}
            >
              {p}
            </p>
          ))}
          <a
            href={speakingTeaser.ctaHref}
            className={BTN_PRIMARY}
          >
            {speakingTeaser.ctaLabel} →
          </a>
        </div>

        <div className="max-[1024px]:hidden flex-[1_1_480px] grid grid-cols-2 grid-rows-3 gap-[3px] min-h-[min(500px,88vw)]">
          <div className="row-span-2 min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px] max-[700px]:row-span-1">
            <Image src={photos[0]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image src={photos[1]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image src={photos[2]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image src={photos[3]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image src={photos[4]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
