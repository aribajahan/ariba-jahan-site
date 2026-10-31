import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import WorkWithMeHero from "../components/WorkWithMeHero";
import WorkWithMeClosingCTA from "../components/WorkWithMeClosingCTA";
import RevealInit from "../components/RevealInit";
import PageGate from "../components/PageGate";
import { guardPage } from "../../lib/guardPage";
import { getPageSettings } from "../../lib/pageSettings";
import content from "../../content/pages/work-with-me-overview.json";
import preview from "../../content/pages/work-with-me-photo-preview.json";

export const metadata: Metadata = { title: "Work With Me — photo preview", robots: { index: false, follow: false } };
const wrap = "max-w-[1200px] mx-auto px-[clamp(24px,5vw,80px)]";
const button = "inline-flex items-center justify-center gap-5 min-h-12 px-6 py-3 text-[13px] font-extrabold tracking-[0.06em] uppercase bg-cherish text-cream hover:bg-charcoal transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

export default async function PhotoPreview() {
  const guard = await guardPage("work-with-me-photo-preview");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate />;
  const { showFooter } = getPageSettings("work-with-me-photo-preview");
  return <div className="bg-cream text-charcoal font-body text-body">
    <Nav /><RevealInit />
    <main>
      <WorkWithMeHero hero={content.hero} />
      <section id="engagements" className="py-12 max-[700px]:py-8 scroll-mt-20">
        <div className={wrap}>
          <h2 className="font-display uppercase text-[34px] leading-tight mb-6">Three ways to work together</h2>
          <div className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
            {content.offers.map((o, i) => <a key={o.id} href={`#${o.id}`} className="border-t-[3px] border-cherish border-x border-b border-x-charcoal/20 border-b-charcoal/20 p-5 hover:bg-charcoal/5 focus-visible:outline-2 focus-visible:outline-offset-4">
              <span className="block text-cherish text-[12px] font-extrabold mb-3">0{i + 1}</span>
              <span className="block font-display uppercase text-[25px] leading-tight mb-2">{o.menuTitle}</span>
              <span className="text-[13px] text-charcoal/70">{o.menuDescription} ↓</span>
            </a>)}
          </div>
        </div>
      </section>
      {content.offers.map((o, i) => {
        const p = preview.offers.find(p => p.id === o.id)!;
        const dark = i === 1;
        return <section key={o.id} id={o.id} className={`scroll-mt-20 ${dark ? "bg-charcoal text-cream" : i === 0 ? "bg-white text-charcoal" : "bg-cream text-charcoal"}`}>
          <div className={`${wrap} py-16 max-[700px]:py-10`}>
            <div className="grid grid-cols-2 gap-12 items-center max-[850px]:grid-cols-1 max-[850px]:gap-6">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] mb-4">0{i + 1} · {o.audience}</p>
                <h2 className="font-display uppercase text-[clamp(36px,4vw,52px)] leading-[1.02] mb-5">{o.title}</h2>
                <p className="text-lede mb-5">{p.intro}</p>
                <p className="text-[15px] font-bold">{o.format}</p>
              </div>
              <div className="relative h-[330px] max-[850px]:h-[290px] overflow-hidden">
                <Image src={p.photoSrc} alt={p.photoAlt} fill sizes="(max-width: 850px) 100vw, 550px" className="object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-9 mt-10 max-[700px]:grid-cols-1 max-[700px]:gap-5">
              {p.examples.map(e => <div key={e.title} className="">
                <h3 className="text-[18px] font-extrabold mb-2">{e.title}</h3>
                <p className="text-body">{e.text}</p>
              </div>)}
            </div>
            <div className="mt-7 flex justify-between items-end gap-8 max-[700px]:flex-col max-[700px]:items-start">
              <p className="text-[16px] max-w-[550px]">{o.proofQuote ? <>“{o.proofQuote}”<span className="block mt-3 text-[14px] font-bold">{o.proofName} · {o.proofRole}</span></> : o.proof}</p>
              <div className="flex flex-col items-start gap-3 shrink-0">
                <a href={o.href} target={i === 0 ? "_blank" : undefined} rel={i === 0 ? "noopener" : undefined} className={`${button} ${dark ? "hover:bg-cream hover:text-charcoal" : ""}`}>{o.cta} ↗</a>
                <a className="text-[14px] underline underline-offset-4 font-bold" href={`/work-with-me-photo-preview/${o.id}`}>{p.detailLabel} →</a>
              </div>
            </div>
          </div>
        </section>;
      })}
      <section className={`${wrap} pt-4 pb-14`}>
        <div className="pt-4 flex justify-between items-center gap-8 max-[700px]:flex-col max-[700px]:items-start">
          <div className="max-w-[680px]"><h2 className="font-display uppercase text-[34px] leading-tight mb-3">{content.contactHeading}</h2><p className="text-[16px] text-charcoal/75">{content.contactBody}</p></div>
          <a href={content.contactHref} className={`${button} shrink-0`}>{content.contactCta} ↗</a>
        </div>
      </section>
    </main>
    <WorkWithMeClosingCTA closingCTA={content.closingCTA} />
    {showFooter && <Footer />}
  </div>;
}
