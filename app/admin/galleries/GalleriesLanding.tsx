import Link from "next/link";
import Image from "next/image";

type Gallery = { label: string; href: string; count: number; thumbnails: string[] };

export default function GalleriesLanding({ galleries }: { galleries: Gallery[] }) {
  return (
    <div className="max-w-[1000px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Media</div>
      <h1 className="text-2xl mb-1">Galleries</h1>
      <p className="text-[13px] text-[#999] mb-7">
        Curated, ordered picks from the Media Library — each one a set of images placed on a specific page.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <Link
            key={gallery.href}
            href={gallery.href}
            className="bg-white border border-[#e2e0dc] rounded-[12px] overflow-hidden hover:border-[#181818] transition-colors"
          >
            <div className="grid grid-cols-2 gap-[2px] bg-[#e2e0dc]">
              {gallery.thumbnails.map((src, i) => (
                <div key={i} className="relative aspect-square bg-[#f7f6f4]">
                  <Image src={src} alt="" fill sizes="150px" style={{ objectFit: "contain" }} className="p-2" />
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className="font-semibold text-[15px] mb-1">{gallery.label}</div>
              <div className="text-[12px] text-[#999]">{gallery.count} images</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
