import content from "../../content/pages/work-with-me-overview.json";
import WorkWithMeHero from "./WorkWithMeHero";

const wrap = "max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]";
const button = "inline-flex items-center justify-center gap-5 min-h-12 px-6 py-3 text-[14px] font-extrabold tracking-[0.06em] uppercase transition-[transform,box-shadow] duration-150 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4";

export default function WorkWithMeOverview() {
  return (
    <main>
      <WorkWithMeHero hero={content.hero} />
      <section id="engagements" aria-label="Choose an engagement" className="scroll-mt-20 bg-cream py-10 max-[700px]:py-7">
        <div className={wrap}>
          <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-charcoal/60 mb-5">Three ways to work together</p>
          <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-4">
            {content.offers.map((offer, i) => (
              <a key={offer.id} href={`#${offer.id}`} className="group border border-charcoal/25 px-5 py-5 flex items-center justify-between gap-4 hover:border-cherish hover:bg-cherish/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                <div>
                  <span className="block font-display uppercase text-[25px] max-[1024px]:text-[22px] leading-[1.1] mb-2">{offer.menuTitle}</span>
                  <span className="block text-[13px] text-charcoal/65 leading-[1.45]">{offer.menuDescription}</span>
                </div>
                <span aria-hidden="true" className="text-cherish text-2xl group-hover:translate-y-1 transition-transform">↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {content.offers.map((offer, index) => {
        const onRed = index === 0;
        const onDark = index === 2;
        const lightText = onRed || onDark;
        return (
          <section key={offer.id} id={offer.id} className={`scroll-mt-16 py-[72px] max-[700px]:py-11 ${onRed ? "bg-cherish text-cream" : onDark ? "bg-charcoal text-cream" : "bg-cream text-charcoal border-t border-charcoal/15"}`}>
            <div className={`${wrap} grid grid-cols-[0.8fr_1.4fr] gap-x-16 gap-y-7 max-[850px]:grid-cols-1 max-[1024px]:gap-x-10`}>
              <div>
                <p className={`text-[11px] font-extrabold tracking-[0.17em] uppercase mb-4 ${lightText ? "text-cream/70" : "text-charcoal/60"}`}>{String(index + 1).padStart(2, "0")} · {offer.audience}</p>
                <h2 className="font-display uppercase text-[clamp(32px,4vw,48px)] leading-[1.02] tracking-[-0.01em] max-w-[340px] mb-5">{offer.title}</h2>
                <p className={`text-[14px] leading-[1.6] ${lightText ? "text-cream/80" : "text-charcoal/65"}`}>{offer.format}</p>
                {onDark && (
                  <figure className="mt-9 max-w-[340px] border border-cream/25 p-5 bg-cream/[0.04]">
                    <figcaption className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-cream/65 mb-4">{content.advisoryExample.label}</figcaption>
                    <p className="text-[20px] font-semibold leading-tight mb-5">{content.advisoryExample.title}</p>
                    <div className="flex flex-wrap gap-2">
                      {content.advisoryExample.inputs.map(input => <span key={input} className="border border-cream/25 px-2 py-1 text-[11px] text-cream/80">{input}</span>)}
                    </div>
                    <div aria-hidden="true" className="text-cherish text-[28px] py-2">↓</div>
                    <div className="bg-cream text-charcoal p-4 shadow-[5px_5px_0_0_var(--color-cherish)]">
                      <p className="font-extrabold text-[13px] mb-3">{content.advisoryExample.outputLabel}</p>
                      <ul className="space-y-2 text-[12px]">
                        {content.advisoryExample.outputs.map((output, i) => <li key={output} className="flex gap-3"><span className="text-cherish font-extrabold">0{i + 1}</span>{output}</li>)}
                      </ul>
                    </div>
                  </figure>
                )}
              </div>
              <div>
                <p className="text-[20px] max-[700px]:text-[18px] leading-[1.5] font-semibold mb-4">{offer.situation}</p>
                <p className={`text-[17px] max-[700px]:text-[16px] leading-[1.65] mb-6 ${lightText ? "text-cream/85" : "text-charcoal/75"}`}>{offer.description}</p>
                <p className="text-[13px] font-extrabold mb-3">{index === 2 ? "Possible starting points" : "What we work on"}</p>
                <ul className={`list-disc pl-5 space-y-2 text-[16px] leading-[1.55] mb-6 ${lightText ? "text-cream/85" : "text-charcoal/75"}`}>
                  {offer.topics.map(topic => <li key={topic}>{topic}</li>)}
                </ul>
                <p className={`text-[16px] leading-[1.6] mb-6 ${lightText ? "text-cream/85" : "text-charcoal/75"}`}><b className={lightText ? "text-cream" : "text-charcoal"}>What you leave with: </b>{offer.outcome}</p>
                <a href={offer.href} target={index === 2 ? "_blank" : undefined} rel={index === 2 ? "noopener" : undefined} className={`${button} ${onDark ? "bg-cherish text-cream" : "bg-charcoal text-cream"}`}>{offer.cta}<span aria-hidden="true">↗</span></a>
                <div className={`mt-8 pt-5 border-t ${lightText ? "border-cream/25" : "border-charcoal/20"}`}>
                  <p className={`text-[11px] uppercase tracking-[0.1em] font-extrabold mb-2 ${onDark ? "text-cream/75" : lightText ? "text-cream" : "text-charcoal"}`}>{offer.proofLabel}</p>
                  <p className={`text-[14px] leading-[1.6] ${lightText ? "text-cream/80" : "text-charcoal/65"}`}>{offer.proof}</p>
                  {offer.proofQuote && <blockquote className="mt-4"><p className="text-[16px] italic leading-[1.6]">“{offer.proofQuote}”</p><footer className="mt-2 text-[12px] leading-[1.6]">{offer.proofName} · {offer.proofRole}</footer></blockquote>}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-cream py-12">
        <div className={`${wrap} flex justify-between gap-8 items-center max-[700px]:flex-col max-[700px]:items-start`}>
          <div className="max-w-[700px]">
            <h2 className="font-display uppercase text-[36px] leading-[1.1] mb-3">{content.contactHeading}</h2>
            <p className="text-[17px] leading-[1.6] text-charcoal/75">{content.contactBody}</p>
          </div>
          <a href={content.contactHref} className={`${button} bg-cherish text-cream whitespace-nowrap`}>{content.contactCta}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
