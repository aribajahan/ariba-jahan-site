import homeContent from "../../content/pages/home.json";

export default function WorkWithMe() {
  const { workWithMeTeaser } = homeContent;
  const bodyParagraphs = workWithMeTeaser.body.split("\n\n");

  return (
    <section
      id="work-with-me"
      className="pt-[120px] max-[1024px]:pt-24 max-[700px]:pt-[70px] pb-[90px] max-[1024px]:pb-16 max-[700px]:pb-14 border-t border-charcoal/[0.08] bg-cherish"
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,5vw,80px)]">
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-3">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cream/75 mb-4">
              {workWithMeTeaser.eyebrow}
            </div>
            <div className="font-display text-[clamp(32px,4vw,52px)] font-black uppercase tracking-[-0.01em] leading-none text-cream">
              {workWithMeTeaser.heading}
            </div>
            <p className="text-[17px] leading-[1.6] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-cream/85 max-w-[560px] mt-5">
              {bodyParagraphs.map((p, i) => (
                <span key={i}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {p}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="grid gap-8 max-[700px]:gap-5 [grid-template-columns:repeat(auto-fit,minmax(380px,1fr))] max-[1024px]:!grid-cols-1">
          {workWithMeTeaser.offers.map((offer) => (
            <div
              key={offer.index}
              className="bg-cream pt-14 px-12 pb-[60px] max-[700px]:pt-8 max-[700px]:px-7 max-[700px]:pb-9 border-t-[3px] border-cherish transition-[transform,box-shadow] duration-[180ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[5px] hover:shadow-[0_14px_24px_-10px_rgba(20,12,12,0.4)] active:-translate-y-[2px] active:shadow-[0_8px_14px_-8px_rgba(20,12,12,0.4)]"
            >
              <div className="text-[11px] font-extrabold tracking-[0.2em] text-cherish mb-4 max-[700px]:mb-3">
                {offer.index}
              </div>
              <div className="font-display text-[clamp(26px,2.8vw,36px)] font-black uppercase tracking-[-0.01em] leading-none mb-5 max-[700px]:mb-4 text-charcoal">
                <span className="inline-block -rotate-[1.5deg] bg-femme-pink px-[10px] py-[3px]">
                  {offer.title}
                </span>
              </div>
              <p className="text-[19px] leading-[1.65] max-[700px]:text-[16px] max-[700px]:leading-[1.45] text-charcoal/[0.62] mb-8 max-[700px]:mb-5">
                <b>{offer.lead}</b>
                <br />
                <br />
                {offer.body}
              </p>
              <a
                href={offer.href}
                className="text-[15px] font-extrabold tracking-[0.12em] uppercase text-cherish border-b-2 border-cherish pb-[3px] w-fit inline-block max-[700px]:text-[12px] max-[700px]:tracking-[0.08em]"
              >
                {offer.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
