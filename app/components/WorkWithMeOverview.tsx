import Image from "next/image";
import content from "../../content/pages/work-with-me-overview.json";
import cards from "../../content/pages/work-with-me-photo-preview.json";
import WorkWithMeHero from "./WorkWithMeHero";
import WwmTrustedBy from "./WwmTrustedBy";
import CaseStudies from "./CaseStudies";

const wrap = "max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]";
const body = "text-[18px] max-[700px]:text-[17px] leading-[1.65]";
const readingWidth = "max-w-none";
const button = "inline-block bg-cherish text-cream px-7 py-[15px] max-[700px]:px-5 max-[700px]:py-3 text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4";

export default function WorkWithMeOverview() {
  return (
    <main>
      <WorkWithMeHero hero={content.hero} />
      <WwmTrustedBy />
      <section id="engagements" aria-label="Choose an engagement" className="scroll-mt-20 bg-cream pt-12 pb-14 max-[700px]:py-9">
        <div className={wrap}>
          <h2 className="font-display text-[34px] max-[700px]:text-[28px] uppercase leading-tight mb-7">Three ways to work together</h2>
          <div className="grid grid-cols-3 max-[700px]:grid-cols-1 gap-4">
            {content.offers.map((offer, i) => (
              <a key={offer.id} href={`#${offer.id}`} className="group border border-charcoal/20 border-t-[3px] border-t-cherish px-6 py-6 flex items-end justify-between gap-4 hover:border-cherish hover:bg-cherish/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                <div>
                  <span className="block text-[12px] font-extrabold text-cherish mb-4">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block font-display uppercase text-[25px] max-[1024px]:text-[22px] leading-[1.1] mb-2">{offer.menuTitle}</span>
                  <span className="block text-[15px] text-charcoal/75 leading-[1.6]">{offer.menuDescription}</span>
                </div>
                <span aria-hidden="true" className="text-cherish text-2xl group-hover:translate-y-1 transition-transform">↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className={`${wrap} pb-4`}>
        {content.offers.map((offer, index) => {
          const card = cards.offers.find(card => card.id === offer.id)!;
          const isAdvisory = offer.id === "strategy-sessions";
          const dark = index === 1;
          return (
            <section key={offer.id} id={offer.id} className="scroll-mt-[115px] mb-7">
              <div className={`px-8 py-7 flow-root max-[700px]:px-5 max-[700px]:py-6 ${dark ? "bg-charcoal text-cream" : index === 0 ? "bg-white text-charcoal" : "bg-[#eee8dc] text-charcoal"}`}>
                <div className="flow-root">
                  <div className="relative float-right w-[160px] h-[150px] ml-7 mb-3 max-[700px]:w-[96px] max-[700px]:h-[104px] max-[700px]:ml-4">
                    <Image src={card.photoSrc} alt={card.photoAlt} fill sizes="(max-width: 700px) 96px, 160px" className="object-cover object-[50%_40%]" />
                  </div>
                  <div>
                    <p className={`text-[15px] leading-[1.6] mb-2 ${dark ? "text-cream/75" : "text-charcoal/75"}`}>{offer.audience}</p>
                    <h2 className="font-display uppercase text-[42px] max-[700px]:text-[34px] leading-[1.1] mb-3">{offer.title}</h2>
                    {card.lead && <p className={`${body} font-semibold mb-3`}>{card.lead}</p>}
                    <p className={`${body} mb-3 ${readingWidth}`}>{card.intro}</p>
                    <p className={`text-[15px] leading-[1.6] ${dark ? "text-cream/75" : "text-charcoal/75"}`}>{offer.format}</p>
                  </div>
                </div>
                <div className={`mt-5 ${readingWidth}`}>
                  <h3 className={`${body} font-semibold mb-2`}>{isAdvisory ? "Possible starting points" : "What we work on"}</h3>
                  <ul className={`list-disc pl-5 space-y-2 ${body} ${dark ? "marker:text-[#ffb4ac]" : "marker:text-[#c52d27]"}`}>
                    {card.examples.map(example => <li key={example.title}><strong className="font-semibold">{example.title}.</strong> {example.text}</li>)}
                  </ul>
                </div>
                <p className={`mt-5 ${readingWidth} ${body}`}><strong className="font-semibold">What you leave with: </strong>{offer.outcome}</p>
                <div className="mt-5 flex gap-6 items-center flex-wrap">
                  <a href={offer.href} target={isAdvisory ? "_blank" : undefined} rel={isAdvisory ? "noopener" : undefined} className={button}>{offer.cta}</a>
                  <a href={`#case-studies-${offer.id}`} className="text-[15px] font-semibold underline underline-offset-4">See relevant work</a>
                </div>
                <div className={`mt-5 ${readingWidth} text-[15px] leading-[1.65] ${dark ? "text-cream/75" : "text-charcoal/75"}`}>
                  {offer.proofQuote ? <blockquote><p>“{offer.proofQuote}”</p><cite className="not-italic block mt-2">{offer.proofName} · {offer.proofRole}</cite></blockquote> : <p>{offer.proof}</p>}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <CaseStudies filterable />

      <section className="bg-cream pb-16 pt-4 max-[700px]:pb-11">
        <div className={`${wrap} flex justify-between gap-8 items-center max-[700px]:flex-col max-[700px]:items-start`}>
          <div className="max-w-[700px]">
            <h2 className="font-display uppercase text-[36px] leading-[1.1] mb-3">{content.contactHeading}</h2>
            <p className="text-[17px] leading-[1.6] text-charcoal/85">{content.contactBody}</p>
          </div>
          <a href={content.contactHref} className={`${button} whitespace-nowrap`}>{content.contactCta}</a>
        </div>
      </section>
    </main>
  );
}
