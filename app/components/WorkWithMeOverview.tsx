import Image from "next/image";
import content from "../../content/pages/work-with-me-overview.json";

const wrap = "max-w-[1200px] mx-auto px-[clamp(24px,5vw,64px)]";

export default function WorkWithMeOverview() {
  return (
    <main>
      <section className="bg-charcoal text-cream pt-[124px] pb-11 max-[700px]:pt-[110px] max-[700px]:pb-8">
        <div className={`${wrap} flex items-center justify-between gap-10`}>
          <div className="max-w-[760px]">
            <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-cherish mb-4">{content.eyebrow}</p>
            <h1 className="font-display uppercase text-[clamp(48px,6.5vw,80px)] leading-[0.98] tracking-[-0.02em]">{content.heading}</h1>
            <p className="mt-5 text-[19px] max-[700px]:text-[17px] leading-[1.6] text-cream/80 max-w-[690px]">{content.intro}</p>
          </div>
          <Image src={content.photoSrc} alt="Ariba Jahan" width={180} height={200} priority className="w-[156px] h-[180px] object-cover shrink-0 max-[800px]:hidden" />
        </div>
      </section>

      <section aria-label="Ways to work together" className="bg-cream py-12 max-[700px]:py-8">
        <div className={wrap}>
          <div className="grid grid-cols-3 max-[800px]:grid-cols-1 gap-7 max-[800px]:gap-0">
            {content.offers.map((offer, index) => (
              <article key={offer.id} id={offer.id} className="scroll-mt-24 flex flex-col border-t-[3px] border-cherish pt-5 max-[800px]:pb-8 max-[800px]:mb-5">
                <p className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-charcoal/60 min-h-8">{offer.audience}</p>
                <h2 className="font-display uppercase text-[34px] leading-[1.04] mt-2 mb-5 min-[801px]:min-h-[72px]">{offer.title}</h2>
                <p className="text-[17px] leading-[1.5] font-semibold mb-4">{offer.situation}</p>
                <p className="text-[16px] leading-[1.6] text-charcoal/75 mb-5">{offer.description}</p>
                <div className="mt-auto">
                  <p className="text-[12px] leading-[1.5] font-semibold text-charcoal/65 mb-4">{offer.format}</p>
                  <a href={offer.href} target={index === 2 ? "_blank" : undefined} rel={index === 2 ? "noopener" : undefined} className="flex items-center justify-between gap-3 min-h-12 py-3 border-y border-charcoal/25 text-[14px] font-extrabold hover:text-cherish focus-visible:outline-2 focus-visible:outline-offset-4">
                    {offer.cta}<span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="pt-5 mt-1 min-[801px]:min-h-[116px]">
                  <p className="text-[11px] uppercase tracking-[0.1em] font-extrabold mb-2">{offer.proofLabel}</p>
                  <p className="text-[14px] leading-[1.6] text-charcoal/65">{offer.proof}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-charcoal/15 py-8">
        <div className={`${wrap} flex justify-between gap-7 items-center max-[700px]:flex-col max-[700px]:items-start`}>
          <blockquote className="text-[22px] max-[700px]:text-[20px] leading-[1.4] max-w-[650px] font-semibold">“{content.testimonial.quote}”</blockquote>
          <p className="text-[13px] leading-[1.6] shrink-0"><b>{content.testimonial.name}</b><br />{content.testimonial.role}</p>
        </div>
      </section>

      <section className="bg-cherish text-cream py-10">
        <div className={`${wrap} flex justify-between gap-8 items-center max-[700px]:flex-col max-[700px]:items-start`}>
          <div className="max-w-[700px]">
            <h2 className="font-display uppercase text-[34px] leading-[1.1] mb-3">{content.contactHeading}</h2>
            <p className="text-[16px] leading-[1.6] text-cream/90">{content.contactBody}</p>
          </div>
          <a href={content.contactHref} className="inline-flex items-center justify-center min-h-12 px-6 bg-charcoal text-cream text-[14px] font-extrabold whitespace-nowrap hover:bg-charcoal/80">{content.contactCta} <span aria-hidden="true" className="ml-4">↗</span></a>
        </div>
      </section>
    </main>
  );
}
