import Image from "next/image";
import wwmContent from "../../content/pages/work-with-me.json";

const CTA_STYLES = [
  "inline-block bg-cherish text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] max-[700px]:tracking-[0.08em] uppercase whitespace-nowrap transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] active:-translate-y-[2px] active:shadow-[0_6px_10px_-6px_rgba(231,49,49,0.6)]",
  "inline-block bg-transparent text-cream px-7 py-[15px] max-[700px]:px-[20px] max-[700px]:py-[12px] text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] max-[700px]:tracking-[0.08em] uppercase whitespace-nowrap border-[1.5px] border-cream/50 transition-[border-color,background] duration-150 hover:border-cream hover:bg-cream/[0.08] active:border-cream active:bg-cream/[0.08]",
];

export default function WorkWithMeHero({ hero = wwmContent.hero, engagementLinks = [] }: { hero?: typeof wwmContent.hero; engagementLinks?: { label: string; href: string }[] }) {

  return (
    <section className="relative flex flex-col justify-end overflow-hidden bg-ink min-h-[85vh] max-[700px]:min-h-[85vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.photoSrc}
          alt="Ariba Jahan"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(20,12,12,0.85) 0%, rgba(20,12,12,0.55) 30%, rgba(20,12,12,0.05) 62%), linear-gradient(to bottom, rgba(20,12,12,0.05) 0%, rgba(20,12,12,0.25) 45%, rgba(20,12,12,0.9) 100%)",
        }}
      />
      <div className="relative z-[2] max-w-[1200px] mx-auto w-full px-[clamp(24px,5vw,80px)] pb-20 pt-[210px] pointer-events-none max-[700px]:pt-[130px] max-[700px]:pb-14 max-[1024px]:pt-[160px]">
        <h1 className="font-display text-[clamp(38px,4vw,60px)] font-black text-cream leading-none tracking-[-0.02em] max-w-[1040px]">
          {hero.headline}
        </h1>
        <p className="text-body max-[700px]:text-body-sm text-cream/75 max-w-[640px] mt-[22px]">
          {hero.subhead}
        </p>
        {hero.ctas.length > 0 && <div className="flex flex-wrap gap-4 mt-8 pointer-events-auto">
          {hero.ctas.map((cta, i) => (
            <a key={cta.label} href={cta.href} className={CTA_STYLES[i] ?? CTA_STYLES[1]}>
              {cta.label}
            </a>
          ))}
        </div>}
        {engagementLinks.length > 0 && (
          <nav aria-label="Explore engagements" className="mt-9 grid grid-cols-3 max-[700px]:grid-cols-1 border border-cream/35 divide-x divide-cream/35 max-[700px]:divide-x-0 max-[700px]:divide-y bg-charcoal/65 pointer-events-auto">
            {engagementLinks.map(link => (
              <a key={link.href} href={link.href} className="px-5 py-5 max-[700px]:py-4 font-display text-[24px] max-[1024px]:text-[21px] font-extrabold uppercase text-cream leading-tight hover:bg-cream/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
