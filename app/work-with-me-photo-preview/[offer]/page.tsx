import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PageGate from "../../components/PageGate";
import { guardPage } from "../../../lib/guardPage";
import { getPageSettings } from "../../../lib/pageSettings";
import content from "../../../content/pages/work-with-me-overview.json";
import preview from "../../../content/pages/work-with-me-photo-preview.json";

export const metadata: Metadata = { title: "Engagement details — preview", robots: { index: false, follow: false } };
export function generateStaticParams() { return content.offers.map(o => ({ offer: o.id })); }
export default async function OfferDetail({ params }: { params: Promise<{ offer: string }> }) {
  const { offer } = await params;
  const o = content.offers.find(o => o.id === offer);
  const p = preview.offers.find(p => p.id === offer);
  if (!o || !p) notFound();
  const guard = await guardPage("work-with-me");
  if (guard === "notFound") notFound();
  if (guard === "gate") return <PageGate pageKey="work-with-me" />;
  const { showFooter } = getPageSettings("work-with-me");
  return <div className="bg-cream text-charcoal font-body leading-[1.65]">
    <Nav />
    <main className="max-w-[950px] mx-auto px-6 pt-32 pb-20">
      <a href={`/work-with-me-photo-preview#${o.id}`} className="text-[14px] underline underline-offset-4">← All ways to work together</a>
      <p className="text-cherish uppercase text-[11px] tracking-[0.16em] font-extrabold mt-9 mb-3">{o.audience}</p>
      <h1 className="font-display uppercase text-[clamp(40px,5vw,64px)] leading-none mb-5">{o.title}</h1>
      <p className="text-[14px] mb-7">{o.format}</p>
      <div className="relative h-[360px] max-[700px]:h-[260px] mb-10"><Image src={p.photoSrc} alt={p.photoAlt} fill priority sizes="900px" className="object-cover" /></div>
      <div className="max-w-[700px] mx-auto">
        <p className="text-[23px] leading-[1.5] font-bold mb-5">{o.situation}</p>
        <p className="text-[18px] mb-8">{o.description}</p>
        <h2 className="font-display uppercase text-[30px] mb-4">{o.id === "strategy-sessions" ? "Possible starting points" : "What we work on"}</h2>
        <ul className="list-disc pl-5 space-y-4 text-[17px] mb-10">{o.topics.map(t => <li key={t}>{t}</li>)}</ul>
        <h2 className="font-display uppercase text-[30px] mb-4">What you leave with</h2>
        <p className="text-[18px] mb-8">{o.outcome}</p>
        <div className="border-t border-charcoal/25 pt-7 mb-8"><p className="text-[12px] uppercase tracking-wider font-bold mb-3">{o.proofLabel}</p><p className="text-[16px]">{o.proof}</p>{o.proofQuote && <blockquote className="mt-5 text-[19px]"><p>“{o.proofQuote}”</p><footer className="mt-3 text-[13px]">{o.proofName} · {o.proofRole}</footer></blockquote>}</div>
        <a href={o.href} className="inline-flex bg-cherish text-cream px-7 py-4 font-bold uppercase text-[14px] tracking-wider">{o.cta} ↗</a>
      </div>
    </main>
    {showFooter && <Footer />}
  </div>;
}
