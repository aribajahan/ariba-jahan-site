import Image from "next/image";
import homeContent from "../../content/pages/home.json";

export default function Community() {
  const { community } = homeContent;
  // Duplicated once so the CSS marquee loop is seamless.
  const photos = [...community.photos, ...community.photos];

  return (
    <section className="bg-charcoal pt-[120px] max-[1024px]:pt-24 max-[700px]:pt-[70px] pb-[100px] max-[1024px]:pb-20 max-[700px]:pb-16 overflow-hidden">
      <div className="max-w-[700px] mx-auto mb-14 text-center px-[clamp(24px,5vw,80px)]">
        <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] text-cream mb-4">
          {community.heading}
        </div>
        <p className="text-base leading-[1.6] text-cream/65">{community.intro}</p>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-4 w-max [animation:communityScroll_170s_linear_infinite] hover:[animation-play-state:paused]"
        >
          {photos.map((photo, i) => (
            <div key={`${photo.number}-${i}`} className="flex-[0_0_340px] flex flex-col gap-[10px]">
              <div className="relative h-[260px] overflow-hidden">
                <span className="absolute top-2 left-2 z-[2] text-cream font-display font-extrabold text-base w-[26px] h-[26px] flex items-center justify-center [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                  {photo.number}
                </span>
                <Image quality={90}
                  src={photo.photoSrc}
                  alt={photo.caption}
                  fill
                  sizes="340px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="text-[13px] leading-[1.45] text-cream/65">{photo.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
