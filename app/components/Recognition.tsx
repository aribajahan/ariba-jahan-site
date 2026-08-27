import Image from "next/image";
import homeContent from "../../content/pages/home.json";

export default function Recognition() {
  const { recognition } = homeContent;

  return (
    <section className="bg-cream overflow-hidden relative z-10">
      <div className="flex flex-wrap min-h-[520px]">
        <div className="hidden max-[1024px]:block w-full px-[clamp(24px,5vw,80px)] pt-24 max-[700px]:pt-[70px] pb-6 bg-charcoal">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
            {recognition.eyebrow}
          </div>
          <div className="font-display text-[32px] font-black uppercase tracking-[-0.01em] text-cream">
            {recognition.heading}
          </div>
        </div>
        <div className="flex-[1_1_380px] min-h-[min(420px,80vw)] min-w-0 overflow-hidden relative">
          <Image quality={90}
            src={recognition.photoSrc}
            alt="Ariba Jahan receiving an award"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-[1_1_480px] px-[clamp(24px,5vw,80px)] pt-[120px] pb-[72px] max-[1024px]:pt-8 max-[1024px]:pb-11 flex flex-col justify-center bg-charcoal">
          <div className="max-[1024px]:hidden text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-4">
            {recognition.eyebrow}
          </div>
          <div className="max-[1024px]:hidden font-display text-[48px] font-black uppercase tracking-[-0.01em] mb-9 text-cream">
            {recognition.heading}
          </div>
          <div className="flex flex-col">
            {recognition.items.map((item, i) => (
              <div
                key={item}
                className={`text-[17px] max-[700px]:text-[16px] font-normal text-cream leading-[1.3] py-4 ${
                  i < recognition.items.length - 1 ? "border-b border-cream/[0.12]" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          <a
            href={recognition.ctaHref}
            className="inline-block mt-7 text-[15px] font-bold tracking-[0.12em] uppercase text-cherish border-b border-cherish pb-[1px] w-fit"
          >
            {recognition.ctaLabel} →
          </a>
        </div>
      </div>
    </section>
  );
}
