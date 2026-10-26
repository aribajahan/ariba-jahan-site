import Image from "next/image";
import type { ReactNode } from "react";
import content from "../../content/pages/work-with-me-overview.json";
import cards from "../../content/pages/work-with-me-photo-preview.json";
import originalContent from "../../content/pages/work-with-me.json";
import WorkWithMeHero from "./WorkWithMeHero";
import WwmTrustedBy from "./WwmTrustedBy";
import CaseStudies from "./CaseStudies";

const wrap = "max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]";
const body = "text-[18px] max-[700px]:text-[17px] leading-[1.5]";
const readingWidth = "max-w-none";
const button = "inline-block bg-cherish text-cream px-7 py-[15px] max-[700px]:px-5 max-[700px]:py-3 text-[15px] max-[700px]:text-[12px] font-extrabold tracking-[0.1em] uppercase transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-1 hover:shadow-[0_12px_20px_-8px_rgba(231,49,49,0.6)] focus-visible:outline-2 focus-visible:outline-offset-4";

function OfferDisclosure({ title, dark, children }: { title: string; dark: boolean; children: ReactNode }) {
  return (
    <details className={`group border-t ${dark ? "border-cream/25" : "border-charcoal/20"}`}>
      <summary className="list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 min-h-11 py-3 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4">
        <span className="text-[13px] font-extrabold tracking-[0.06em] uppercase">{title}</span>
        <span aria-hidden="true" className="text-lg font-light"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span>
      </summary>
      <div className="pt-1 pb-5">{children}</div>
    </details>
  );
}

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

      <div className="max-w-[1380px] mx-auto px-[4%] pb-4">
        {content.offers.map((offer, index) => {
          const card = cards.offers.find(card => card.id === offer.id)!;
          const isAdvisory = offer.id === "strategy-sessions";
          const dark = index === 1;
          return (
            <section key={offer.id} id={offer.id} className="scroll-mt-[115px] pt-6 mb-9 max-[700px]:pt-8">
              <div className={`ml-[18px] px-[42px] pt-[30px] pb-7 max-[700px]:ml-3 max-[700px]:p-[26px] ${dark ? "bg-charcoal text-cream" : index === 0 ? "bg-white text-charcoal" : "bg-[#eee8dc] text-charcoal"}`}>
                <div className="grid grid-cols-[180px_1fr] gap-7 items-center max-[700px]:grid-cols-1 max-[700px]:gap-4">
                  <div className={`relative ${isAdvisory ? "w-[220px] h-[200px]" : "w-[200px] h-[185px]"} -ml-[60px] -mt-12 shadow-[7px_7px_0_var(--color-cherish)] max-[700px]:w-[135px] max-[700px]:h-[135px] max-[700px]:-ml-[38px] max-[700px]:-mt-[46px]`}>
                    <Image src={card.photoSrc} alt={card.photoAlt} fill sizes={`(max-width: 700px) 135px, ${isAdvisory ? "220px" : "200px"}`} className="object-cover object-[50%_40%]" />
                  </div>
                  <div>
                    <p className={`text-[15px] leading-[1.5] mb-2 ${dark ? "text-cream/75" : "text-charcoal/75"}`}>
                      {offer.audience}<span aria-hidden="true" className="mx-2">·</span><span className="inline-block">{offer.format}</span>
                    </p>
                    <h2 className="font-display uppercase text-[42px] max-[700px]:text-[34px] leading-[1.1] mb-2">{offer.title}</h2>
                    <p className={`${body} ${readingWidth}`}>{offer.situation} {offer.description}</p>
                  </div>
                </div>
                <div className={`mt-5 ${readingWidth}`}>
                  <h3 className={`${body} font-semibold mb-2`}>{isAdvisory ? "Possible starting points" : "What we work on"}</h3>
                  <ul className={`list-disc pl-5 space-y-1.5 ${body} ${dark ? "marker:text-[#ffb4ac]" : "marker:text-[#c52d27]"}`}>
                    {offer.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
                <p className={`mt-4 ${readingWidth} ${body}`}><strong className="font-semibold">What you leave with: </strong>{offer.outcomeSummary}</p>
                <div className="mt-5">
                  <OfferDisclosure title={offer.detailsLabel} dark={dark}>
                    <ul className={`list-disc pl-5 space-y-3 ${body} ${dark ? "marker:text-[#ffb4ac]" : "marker:text-[#c52d27]"}`}>
                      {offer.topics.map(topic => <li key={topic}>{topic}</li>)}
                    </ul>
                    <p className={`mt-4 ${body}`}><strong className="font-semibold">{isAdvisory ? "Your session and next steps: " : "Outcomes and scope: "}</strong>{offer.outcome}</p>
                  </OfferDisclosure>
                {offer.id === "ambition-sprint" && (
                  <>
                    {[
                      {
                        heading: "Typical deliverables & artifacts",
                        note: originalContent.cxSprint.deliverablesNote,
                        items: originalContent.cxSprint.deliverables,
                      },
                      {
                        heading: "How the engagement works",
                        note: "Scope, depth, and timing are agreed around your project.",
                        items: originalContent.cxSprint.weeks.map(step => ({
                          title: step.title.replace(/^.*?:\s*/, ""),
                          description: step.description,
                        })),
                      },
                    ].map(detail => (
                      <OfferDisclosure key={detail.heading} title={detail.heading} dark={dark}>
                          <p className="text-[15px] leading-[1.5] text-cream/75 mb-3">{detail.note}</p>
                          <ul className={`space-y-3 ${body}`}>
                            {detail.items.map(item => <li key={item.title}><strong className="font-semibold">{item.title}</strong> {item.description}</li>)}
                          </ul>
                      </OfferDisclosure>
                    ))}
                  </>
                )}
                </div>
                <div className="mt-4 flex gap-6 items-center flex-wrap">
                  <a href={offer.href} target={isAdvisory ? "_blank" : undefined} rel={isAdvisory ? "noopener" : undefined} className={button}>{offer.cta}</a>
                  <a href={`#case-studies-${offer.id}`} className="text-[15px] font-semibold underline underline-offset-4">See relevant work</a>
                </div>
                {(offer.proofQuote || offer.proof) && <div className={`mt-4 ${readingWidth} text-[15px] leading-[1.5] ${dark ? "text-cream/75" : "text-charcoal/75"}`}>
                  {offer.proofQuote ? <blockquote><p>“{offer.proofQuote}”</p><cite className="not-italic block mt-2">{offer.proofName} · {offer.proofRole}</cite></blockquote> : <p>{offer.proof}</p>}
                </div>}
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
