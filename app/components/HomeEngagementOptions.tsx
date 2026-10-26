import Image from "next/image";
import Link from "next/link";
import home from "../../content/pages/home.json";
import photos from "../../content/pages/work-with-me-photo-preview.json";

export type EngagementLayout = "photos" | "numbered" | "shared";
const options: { id: EngagementLayout; label: string }[] = [
  { id: "photos", label: "A · Photo headers" },
  { id: "numbered", label: "B · Numbered cards" },
  { id: "shared", label: "C · Tape cards" },
];

export default function HomeEngagementOptions({ layout }: { layout: EngagementLayout }) {
  const { workWithMeTeaser: content } = home;
  return <section id="work-with-me" className="scroll-mt-16">
    <div className="sticky top-16 z-40 bg-cream px-[clamp(24px,5vw,80px)] py-5 border-y border-charcoal/15">
      <div className="max-w-[1260px] mx-auto flex flex-wrap items-center gap-x-8 gap-y-4">
        <p className="text-[13px] font-semibold">Homepage preview</p>
        <nav aria-label="Engagement layout options" className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-extrabold uppercase tracking-[0.06em]">
          {options.map(option => <a key={option.id} href={`/home-engagement-options?layout=${option.id}#work-with-me`} aria-current={layout === option.id ? "page" : undefined} className={`py-2 border-b-2 transition-colors ${layout === option.id ? "border-cherish text-charcoal" : "border-transparent text-charcoal/65 hover:text-cherish"}`}>{option.label}</a>)}
        </nav>
        <Link href="/#work-with-me" className="text-[13px] underline underline-offset-4 ml-auto">Previous rows</Link>
      </div>
    </div>
    <div className="bg-cherish py-16 max-[700px]:py-12 px-[clamp(24px,5vw,80px)]">
      <div className="max-w-[1260px] mx-auto">
        <header className="mb-9"><div>
          <p className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/80 mb-4">{content.eyebrow}</p>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase leading-none text-cream">{content.heading}</h2>
          <p className="text-[18px] max-[700px]:text-[17px] leading-[1.5] text-cream max-w-[790px] mt-5">{content.body}</p>
        </div>
        </header>
        <div className={`grid grid-cols-3 ${layout === "shared" ? "max-[1100px]:grid-cols-1" : "max-[900px]:grid-cols-1"} gap-5 items-stretch`} data-layout={layout}>
          {content.offers.map((offer, index) => {
            const photo = photos.offers[index];
            const title = layout !== "numbered" && index === 2 ? "AI adoption & Human OS" : offer.title;
            return <a key={offer.index} href={offer.href} aria-label={`${title} — ${offer.cta}`} className={`offer-lift group bg-cream text-charcoal flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${layout === "numbered" ? "border-t-4 border-charcoal" : ""}`} data-offer-card>
              {layout === "photos" && <div className="relative h-[165px] max-[900px]:h-[190px] overflow-hidden">
                <Image src={photo.photoSrc} alt={photo.photoAlt} fill sizes="(max-width: 900px) 92vw, 400px" className={`object-cover ${index === 0 ? "object-[50%_37%]" : "object-[50%_40%]"}`} />
              </div>}
              <div className="flex flex-col flex-1 p-7 max-[700px]:p-6">
                {layout === "numbered" ? <div className="flex items-end justify-between gap-4 mb-5"><span className="font-display text-[64px] leading-none text-cherish" aria-hidden="true">{offer.index}</span><span className="text-[13px] font-semibold text-charcoal/70 pb-1">{["One-to-one", "Focused engagement", "Team capability"][index]}</span></div> : <p className="text-[11px] font-extrabold tracking-[0.2em] text-cherish mb-3">{offer.index}</p>}
                <h3 className={`font-display uppercase leading-[1.05] mb-4 ${layout === "shared" ? "text-[clamp(26px,2.3vw,32px)] min-[701px]:whitespace-nowrap" : `text-[34px] max-[700px]:text-[30px] ${layout === "numbered" ? "min-h-[76px] max-[900px]:min-h-0" : "min-h-[72px] max-[900px]:min-h-0"}`}`}>
                  {layout === "shared" ? <span className="mark-tape relative inline-block -rotate-[1deg] px-2 py-1" style={{ ["--tape-color" as string]: "var(--femme-pink)" }}>{title}</span> : title}
                </h3>
                <p className="text-[18px] max-[700px]:text-[17px] leading-[1.5] text-charcoal/85 mb-7">{offer.lead} {offer.body}</p>
                <span className="mt-auto pt-2"><span className="inline-block text-[13px] font-extrabold tracking-[0.08em] uppercase text-cherish border-b-2 border-cherish pb-[3px]">{offer.cta}</span></span>
              </div>
            </a>;
          })}
        </div>
      </div>
    </div>
  </section>;
}
