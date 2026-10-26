import homeContent from "../../content/pages/home.json";

export default function WorkWithMe() {
  const { workWithMeTeaser } = homeContent;

  return (
    <section
      id="work-with-me"
      className="pt-[100px] max-[1024px]:pt-20 max-[700px]:pt-[70px] pb-[90px] max-[1024px]:pb-16 max-[700px]:pb-14 border-t border-charcoal/[0.08] bg-cherish scroll-mt-16"
    >
      <div className="reveal max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="mb-10 max-[700px]:mb-7">
          <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/75 mb-4">
            {workWithMeTeaser.eyebrow}
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase tracking-[-0.01em] leading-none text-cream">
            {workWithMeTeaser.heading}
          </h2>
          <p className="text-[18px] max-[700px]:text-[17px] leading-[1.5] text-cream/90 max-w-[790px] mt-5">
            {workWithMeTeaser.body}
          </p>
        </div>

        <div className="grid gap-5">
          {workWithMeTeaser.offers.map(offer => (
            <a
              key={offer.index}
              href={offer.href}
              aria-label={`${offer.title} — ${offer.cta}`}
              className="offer-lift group grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto] items-center gap-8 bg-cream px-9 py-8 max-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] max-[1024px]:gap-x-7 max-[1024px]:gap-y-4 max-[700px]:grid-cols-1 max-[700px]:px-6 max-[700px]:py-7 max-[700px]:gap-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-cream"
            >
              <div>
                <span className="block text-[11px] font-extrabold tracking-[0.2em] text-cherish mb-3">{offer.index}</span>
                <h3 className="font-display text-[32px] max-[700px]:text-[28px] font-black uppercase tracking-[-0.01em] leading-[1.05] text-charcoal">
                  <span className="mark-tape relative inline-block -rotate-[1deg] px-2 py-1" style={{ ["--tape-color" as string]: "var(--femme-pink)" }}>{offer.title}</span>
                </h3>
              </div>
              <p className="text-[18px] max-[700px]:text-[17px] leading-[1.5] text-charcoal/85">{offer.lead} {offer.body}</p>
              <span className="text-[13px] font-extrabold tracking-[0.08em] uppercase text-cherish border-b-2 border-cherish pb-[3px] w-fit max-[1024px]:col-start-2 max-[700px]:col-start-1">{offer.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
