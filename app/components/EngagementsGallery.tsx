import Image from "next/image";
import { engagementFormats, galleryPhotos } from "../data/speaking";

export default function EngagementsGallery() {
  return (
    <section
      id="gallery"
      className="bg-cream pt-[120px] max-[700px]:pt-20 max-[1024px]:pt-24 pb-[120px] max-[700px]:pb-20 max-[1024px]:pb-24 px-[clamp(24px,5vw,80px)]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[760px] mb-14 max-[700px]:mb-9">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-[18px]">
            Selected Speaking Engagements
          </div>
          <h2 className="uppercase font-display text-[48px] max-[700px]:text-[32px] font-black tracking-[-0.01em] leading-none text-charcoal mb-5">
            Where I&rsquo;ve Spoken
          </h2>
          <p className="text-[clamp(20px,1.8vw,26px)] leading-[1.4] text-charcoal mb-5">
            I&rsquo;ve had the privilege of speaking at more than 200 conferences, leadership
            events, executive offsites, universities, and workshops, including the United Nations
            General Assembly, Google, TikTok, Paramount, and Vox Media.
          </p>
          <ul className="list-none flex flex-wrap gap-x-[18px] gap-y-2 p-0 m-0">
            {engagementFormats.map((format, i) => (
              <li key={format} className="flex items-center gap-[18px]">
                <span className="text-[13px] font-bold text-charcoal/65">{format}</span>
                {i < engagementFormats.length - 1 && (
                  <span className="text-[13px] font-bold text-charcoal/35">·</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden max-[700px]:grid grid-cols-2 gap-[3px]">
          <div className="col-span-2 min-w-0 min-h-0 overflow-hidden relative h-[260px]">
            <Image quality={90}
              src={galleryPhotos[0]}
              alt="Ariba Jahan speaking engagement"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {galleryPhotos.slice(1, 3).map((src) => (
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

        <div className="max-[700px]:hidden grid grid-cols-4 grid-rows-2 max-[1024px]:grid-cols-3 max-[1024px]:grid-rows-none max-[1024px]:auto-rows-[220px] max-[1024px]:[grid-auto-flow:dense] gap-[3px]">
          <div className="col-span-2 row-span-2 min-w-0 min-h-0 overflow-hidden relative h-[260px] max-[1024px]:h-auto">
            <Image quality={90}
              src={galleryPhotos[0]}
              alt="Ariba Jahan speaking engagement"
              fill
              sizes="(max-width: 1024px) 66vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {galleryPhotos.slice(1).map((src) => (
            <div
              key={src}
              className="min-w-0 min-h-0 overflow-hidden relative h-[260px] max-[1024px]:h-auto"
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
      </div>
    </section>
  );
}
