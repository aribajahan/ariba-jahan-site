import Image from "next/image";
import { engagementFormats, galleryPhotos, speakingLogos } from "../data/speaking";

export default function SpeakingEngagements() {
  return (
    <section
      id="logos"
      className="bg-charcoal pt-[120px] max-[700px]:pt-[70px] max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)] border-t border-cream/[0.08]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[14px]">
          Selected Speaking Engagements
        </div>
        <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-none text-cream mb-5 max-w-[800px]">
          Spoken At 200+ Gatherings
        </h2>
        <p className="text-[19px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/80 max-w-[720px] mb-9">
          I&rsquo;ve had the privilege of speaking at more than 200 conferences, leadership
          events, executive offsites, universities, and workshops, including the United Nations
          General Assembly, Google, TikTok, Paramount, and Vox Media.
        </p>

        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(110px,1fr))] max-[1024px]:[grid-template-columns:repeat(4,1fr)] max-[700px]:!grid-cols-4 gap-[32px] gap-x-[28px] max-[1024px]:gap-y-8 max-[700px]:gap-y-6 max-[700px]:gap-x-4 items-center mb-11">
          {speakingLogos.map((logo) => (
            <Image quality={90}
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={200}
              height={logo.heightPx}
              style={{ height: logo.heightPx, width: "auto", maxWidth: "100%" }}
              className={`object-contain opacity-[0.92] max-[1024px]:max-h-[30px] max-[1024px]:w-auto max-[700px]:max-h-[24px] ${
                logo.invert ? "brightness-0 invert" : ""
              }`}
            />
          ))}
        </div>

        <ul className="list-none flex flex-wrap gap-x-[18px] gap-y-2 p-0 m-0 mb-11 max-[700px]:mb-9">
          {engagementFormats.map((format, i) => (
            <li key={format} className="flex items-center gap-[18px]">
              <span className="text-[13px] font-bold text-cream/70">{format}</span>
              {i < engagementFormats.length - 1 && (
                <span className="text-[13px] font-bold text-cream/30">·</span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden max-[700px]:grid grid-cols-2 gap-[3px] mb-14">
          <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[260px]">
            <Image quality={90}
              src={galleryPhotos[0]}
              alt="Ariba Jahan speaking engagement"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {[galleryPhotos[3], galleryPhotos[2]].map((src) => (
            <div key={src} className="min-w-0 min-h-0 overflow-hidden relative h-[180px]">
              <Image quality={90}
                src={src}
                alt="Ariba Jahan speaking engagement"
                fill
                sizes="50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div className="max-[700px]:hidden grid grid-cols-4 max-[1024px]:grid-cols-3 gap-[3px] mb-[3px]">
          <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[260px]">
            <Image quality={90}
              src={galleryPhotos[0]}
              alt="Ariba Jahan speaking engagement"
              fill
              sizes="(max-width: 1024px) 66vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {galleryPhotos.slice(1, 3).map((src) => (
            <div
              key={src}
              className="min-w-0 min-h-0 overflow-hidden relative h-[260px]"
            >
              <Image quality={90}
                src={src}
                alt="Ariba Jahan speaking engagement"
                fill
                sizes="(max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div className="max-[700px]:hidden grid grid-cols-3 gap-[3px] mb-14">
          {galleryPhotos.slice(3).map((src) => (
            <div key={src} className="min-w-0 min-h-0 overflow-hidden relative h-[260px]">
              <Image quality={90}
                src={src}
                alt="Ariba Jahan speaking engagement"
                fill
                sizes="33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="#close"
            className="inline-block bg-cherish text-cream px-[30px] py-4 max-[700px]:px-[22px] max-[700px]:py-[14px] text-xs font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]"
          >
            Bring Me to Your Event →
          </a>
        </div>
      </div>
    </section>
  );
}
