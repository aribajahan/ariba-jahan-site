import Image from "next/image";
import homeContent from "../../content/pages/home.json";

export default function Speaking() {
  const { speakingTeaser } = homeContent;
  const photos = speakingTeaser.photos;

  return (
    <section id="speaker" className="bg-cream overflow-hidden">
      <div className="flex flex-wrap min-h-[640px] max-w-[1400px] mx-auto">
        <div className="flex-[1_1_420px] px-[clamp(24px,5vw,80px)] pt-[120px] pb-[72px] max-[1024px]:pt-24 max-[1024px]:pb-11 max-[700px]:pt-[70px] flex flex-col justify-start">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-5">
            {speakingTeaser.eyebrow}
          </div>
          <div className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase text-charcoal leading-[0.88] tracking-[-0.02em]">
            {speakingTeaser.heading}
          </div>

          <div className="hidden max-[1024px]:grid grid-cols-2 gap-[3px] mt-7 mb-2">
            <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[280px] max-[700px]:h-[220px]">
              <Image quality={90} src={photos[0]} alt="Ariba Jahan speaking on stage" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image quality={90} src={photos[1]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="min-w-0 min-h-0 overflow-hidden relative h-[165px] max-[700px]:h-[130px]">
              <Image quality={90} src={photos[2]} alt="Ariba Jahan speaking on stage" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
          </div>

          {speakingTeaser.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-base leading-[1.62] text-charcoal/75 ${i === 0 ? "mt-7 max-[1024px]:mt-2" : ""} ${
                i === speakingTeaser.paragraphs.length - 1 ? "mb-9" : "mb-[18px]"
              }`}
            >
              {p}
            </p>
          ))}
          <a
            href={speakingTeaser.ctaHref}
            className="inline-block bg-cherish text-cream px-[30px] py-[14px] max-[700px]:px-[22px] text-xs font-extrabold tracking-[0.1em] uppercase w-fit transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_12px_-6px_rgba(231,49,49,0.6)]"
          >
            {speakingTeaser.ctaLabel} →
          </a>
        </div>

        <div className="max-[1024px]:hidden flex-[1_1_480px] grid grid-cols-2 grid-rows-3 gap-[3px] min-h-[min(500px,88vw)]">
          <div className="row-span-2 min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px] max-[700px]:row-span-1">
            <Image quality={90} src={photos[0]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: "center 20%" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={photos[1]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={photos[2]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={photos[3]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
          <div className="min-w-0 min-h-0 overflow-hidden relative max-[700px]:h-[300px]">
            <Image quality={90} src={photos[4]} alt="Ariba Jahan speaking on stage" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
