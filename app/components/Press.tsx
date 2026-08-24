import Image from "next/image";
import { pressItems } from "../data/home";

export default function Press() {
  return (
    <section className="bg-cream pt-[120px] max-[700px]:pt-20 pb-[120px] max-[700px]:pb-20 border-t border-charcoal/[0.08]">
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
          In The Press
        </div>
        <div className="font-display text-[48px] max-[700px]:text-[32px] font-black uppercase tracking-[-0.01em] leading-none text-charcoal mb-9">
          Press &amp; Bylines
        </div>

        {/* Phone tier: flat list */}
        <div className="hidden max-[700px]:flex flex-col">
          {pressItems.map((item, i) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener"
              className={`flex justify-between items-baseline gap-3 py-4 min-h-[44px] ${
                i < pressItems.length - 1 ? "border-b border-charcoal/10" : ""
              }`}
            >
              <span>
                <span className="text-[10px] font-extrabold tracking-[0.1em] uppercase text-cherish block mb-[3px]">
                  {item.outlet}
                </span>
                <span className="text-base font-semibold text-charcoal">{item.title}</span>
              </span>
              <span className="text-sm flex-shrink-0">→</span>
            </a>
          ))}
        </div>

        {/* Desktop/tablet tier: photo grid */}
        <div className="grid grid-cols-5 max-[1024px]:grid-cols-3 max-[700px]:hidden gap-1">
          {pressItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener"
              className="relative aspect-square overflow-hidden block"
              style={{ background: item.bg }}
            >
              <Image quality={90}
                src={item.photoSrc}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 33vw, 20vw"
                style={{ objectFit: "cover" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,12,12,0.85), rgba(20,12,12,0.05) 55%)",
                }}
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-end pointer-events-none">
                <span className="text-[9px] font-extrabold tracking-[0.1em] uppercase text-tennis mb-[6px]">
                  {item.outlet}
                </span>
                <span className="font-display text-lg font-extrabold text-cream leading-[1.05]">
                  {item.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
