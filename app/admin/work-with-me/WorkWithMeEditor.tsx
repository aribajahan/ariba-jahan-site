"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import TitleDescListEditor from "../_shared/TitleDescListEditor";
import MediaPicker from "../_shared/MediaPicker";

type Cta = { label: string; href: string };
type TitleDesc = { title: string; description: string };
type ProblemCard = { photoSrc: string; title: string; description: string };
type ClosingLink = { index: string; title: string; cta: string; href: string; sub?: string };
type WwmContent = {
  hero: {
    photoSrc: string;
    headline: string;
    subhead: string;
    ctas: Cta[];
  };
  cxSprint: {
    eyebrow: string;
    heading: string;
    photoSrc: string;
    intro: string;
    body: string[];
    fitPoints: string[];
    outcome: string;
    deliverablesNote: string;
    deliverables: TitleDesc[];
    weeks: TitleDesc[];
    ctaLabel: string;
    ctaHref: string;
  };
  strategySessions: {
    eyebrow: string;
    heading: string;
    photoSrc: string;
    intro: string;
    body: string[];
    bestFor: string[];
    whatYouGet: string;
    ctaLabel: string;
    ctaHref: string;
  };
  wwmTrustedBy: { eyebrow: string };
  problemFraming: { eyebrow: string; heading: string; body: string; cards: ProblemCard[] };
  twoWaysDivider: { heading: string };
  testimonialsSection: { eyebrow: string; heading: string };
  caseStudiesSection: { eyebrow: string; heading: string; intro: string };
  closingCTA: { heading: string; subhead: string; links: ClosingLink[] };
};

const inputCls = "w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold mb-2">{label}</label>
      {children}
    </div>
  );
}

export default function WorkWithMeEditor({ initialContent }: { initialContent: WwmContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const updateHero = (patch: Partial<WwmContent["hero"]>) => {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  };

  const updateCta = (index: number, patch: Partial<Cta>) => {
    const ctas = content.hero.ctas.map((cta, i) => (i === index ? { ...cta, ...patch } : cta));
    updateHero({ ctas });
  };

  const updateCxSprint = (patch: Partial<WwmContent["cxSprint"]>) => {
    setContent((c) => ({ ...c, cxSprint: { ...c.cxSprint, ...patch } }));
  };

  const updateStrategySessions = (patch: Partial<WwmContent["strategySessions"]>) => {
    setContent((c) => ({ ...c, strategySessions: { ...c.strategySessions, ...patch } }));
  };

  const updateWwmTrustedBy = (patch: Partial<WwmContent["wwmTrustedBy"]>) => {
    setContent((c) => ({ ...c, wwmTrustedBy: { ...c.wwmTrustedBy, ...patch } }));
  };

  const updateProblemFraming = (patch: Partial<WwmContent["problemFraming"]>) => {
    setContent((c) => ({ ...c, problemFraming: { ...c.problemFraming, ...patch } }));
  };

  const updateProblemCard = (index: number, patch: Partial<ProblemCard>) => {
    const cards = content.problemFraming.cards.map((card, i) => (i === index ? { ...card, ...patch } : card));
    updateProblemFraming({ cards });
  };

  const updateTwoWaysDivider = (patch: Partial<WwmContent["twoWaysDivider"]>) => {
    setContent((c) => ({ ...c, twoWaysDivider: { ...c.twoWaysDivider, ...patch } }));
  };

  const updateTestimonialsSection = (patch: Partial<WwmContent["testimonialsSection"]>) => {
    setContent((c) => ({ ...c, testimonialsSection: { ...c.testimonialsSection, ...patch } }));
  };

  const updateCaseStudiesSection = (patch: Partial<WwmContent["caseStudiesSection"]>) => {
    setContent((c) => ({ ...c, caseStudiesSection: { ...c.caseStudiesSection, ...patch } }));
  };

  const updateClosingCTA = (patch: Partial<WwmContent["closingCTA"]>) => {
    setContent((c) => ({ ...c, closingCTA: { ...c.closingCTA, ...patch } }));
  };

  const updateClosingLink = (i: number, patch: Partial<ClosingLink>) => {
    updateClosingCTA({ links: content.closingCTA.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/pages/work-with-me.json", content: JSON.stringify(content, null, 2) + "\n" }],
      "Update Work With Me content via Studio"
    );

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">Work With Me</h1>
      <p className="text-[13px] text-[#999] mb-6">Click a section to expand and edit its fields.</p>

      <SectionCard title="Hero">
        <label className="block text-[13px] font-semibold mb-2">Hero Photo</label>
        <input
          value={content.hero.photoSrc}
          onChange={(e) => updateHero({ photoSrc: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">Headline</label>
        <textarea
          rows={2}
          value={content.hero.headline}
          onChange={(e) => updateHero({ headline: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
        />

        <label className="block text-[13px] font-semibold mb-2">Subhead</label>
        <textarea
          rows={3}
          value={content.hero.subhead}
          onChange={(e) => updateHero({ subhead: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
        />

        <label className="block text-[13px] font-semibold mb-[10px]">CTAs</label>
        <div className="flex flex-col gap-2">
          {content.hero.ctas.map((cta, i) => (
            <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <input
                value={cta.label}
                onChange={(e) => updateCta(i, { label: e.target.value })}
                className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
              />
              <input
                value={cta.href}
                onChange={(e) => updateCta(i, { href: e.target.value })}
                className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]"
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="CX Ambition Sprint" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.cxSprint.eyebrow} onChange={(e) => updateCxSprint({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.cxSprint.heading} onChange={(e) => updateCxSprint({ heading: e.target.value })} className={inputCls} />
        </Field>
        <label className="block text-[13px] font-semibold mb-2">Photo</label>
        <div className="mb-4">
          <MediaPicker value={content.cxSprint.photoSrc} onChange={(photoSrc) => updateCxSprint({ photoSrc })} />
        </div>
        <Field label="Intro Line (bold summary)">
          <textarea rows={2} value={content.cxSprint.intro} onChange={(e) => updateCxSprint({ intro: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="Body (blank line between paragraphs)">
          <textarea
            rows={6}
            value={content.cxSprint.body.join("\n\n")}
            onChange={(e) => updateCxSprint({ body: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="Is This You? (one per line)">
          <textarea
            rows={6}
            value={content.cxSprint.fitPoints.join("\n")}
            onChange={(e) => updateCxSprint({ fitPoints: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="What Comes Out Of It">
          <textarea rows={3} value={content.cxSprint.outcome} onChange={(e) => updateCxSprint({ outcome: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>

        <label className="block text-[13px] font-semibold mb-2">Deliverables</label>
        <Field label="Deliverables Note (italic intro line)">
          <input value={content.cxSprint.deliverablesNote} onChange={(e) => updateCxSprint({ deliverablesNote: e.target.value })} className={inputCls} />
        </Field>
        <div className="mb-4">
          <TitleDescListEditor items={content.cxSprint.deliverables} onChange={(deliverables) => updateCxSprint({ deliverables })} />
        </div>

        <label className="block text-[13px] font-semibold mb-2">Weeks</label>
        <div className="mb-4">
          <TitleDescListEditor items={content.cxSprint.weeks} onChange={(weeks) => updateCxSprint({ weeks })} />
        </div>

        <div className="flex gap-3">
          <Field label="CTA Label">
            <input value={content.cxSprint.ctaLabel} onChange={(e) => updateCxSprint({ ctaLabel: e.target.value })} className={inputCls} />
          </Field>
          <Field label="CTA Link">
            <input value={content.cxSprint.ctaHref} onChange={(e) => updateCxSprint({ ctaHref: e.target.value })} className={inputCls} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="1:1 CX Strategy Sessions" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.strategySessions.eyebrow} onChange={(e) => updateStrategySessions({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.strategySessions.heading} onChange={(e) => updateStrategySessions({ heading: e.target.value })} className={inputCls} />
        </Field>
        <label className="block text-[13px] font-semibold mb-2">Photo</label>
        <div className="mb-4">
          <MediaPicker value={content.strategySessions.photoSrc} onChange={(photoSrc) => updateStrategySessions({ photoSrc })} />
        </div>
        <Field label="Intro Line (bold summary)">
          <textarea rows={2} value={content.strategySessions.intro} onChange={(e) => updateStrategySessions({ intro: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="Body (blank line between paragraphs)">
          <textarea
            rows={6}
            value={content.strategySessions.body.join("\n\n")}
            onChange={(e) => updateStrategySessions({ body: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="Best For (one per line)">
          <textarea
            rows={5}
            value={content.strategySessions.bestFor.join("\n")}
            onChange={(e) => updateStrategySessions({ bestFor: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="What You Get">
          <textarea rows={3} value={content.strategySessions.whatYouGet} onChange={(e) => updateStrategySessions({ whatYouGet: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <div className="flex gap-3">
          <Field label="CTA Label">
            <input value={content.strategySessions.ctaLabel} onChange={(e) => updateStrategySessions({ ctaLabel: e.target.value })} className={inputCls} />
          </Field>
          <Field label="CTA Link">
            <input value={content.strategySessions.ctaHref} onChange={(e) => updateStrategySessions({ ctaHref: e.target.value })} className={inputCls} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Trusted By" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.wwmTrustedBy.eyebrow} onChange={(e) => updateWwmTrustedBy({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <p className="text-xs text-[#999]">Logos are managed in code, not here.</p>
      </SectionCard>

      <SectionCard title="Problem Framing" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.problemFraming.eyebrow} onChange={(e) => updateProblemFraming({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.problemFraming.heading} onChange={(e) => updateProblemFraming({ heading: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Body">
          <textarea rows={4} value={content.problemFraming.body} onChange={(e) => updateProblemFraming({ body: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Problem Cards</label>
        <div className="flex flex-col gap-3">
          {content.problemFraming.cards.map((card, i) => (
            <div key={i} className="p-3 bg-[#f7f6f4] rounded-md flex flex-col gap-2">
              <input value={card.title} onChange={(e) => updateProblemCard(i, { title: e.target.value })} placeholder="Title" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] font-semibold" />
              <input value={card.photoSrc} onChange={(e) => updateProblemCard(i, { photoSrc: e.target.value })} placeholder="Photo path" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <textarea value={card.description} onChange={(e) => updateProblemCard(i, { description: e.target.value })} placeholder="Description" rows={3} className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] resize-y" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Two Ways Divider" defaultExpanded={false}>
        <Field label="Heading">
          <input value={content.twoWaysDivider.heading} onChange={(e) => updateTwoWaysDivider({ heading: e.target.value })} className={inputCls} />
        </Field>
      </SectionCard>

      <SectionCard title="Testimonials Section Header" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.testimonialsSection.eyebrow} onChange={(e) => updateTestimonialsSection({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.testimonialsSection.heading} onChange={(e) => updateTestimonialsSection({ heading: e.target.value })} className={inputCls} />
        </Field>
        <p className="text-xs text-[#999]">Testimonials themselves are managed in the shared Testimonials collection.</p>
      </SectionCard>

      <SectionCard title="Case Studies Section Header" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.caseStudiesSection.eyebrow} onChange={(e) => updateCaseStudiesSection({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.caseStudiesSection.heading} onChange={(e) => updateCaseStudiesSection({ heading: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Intro">
          <textarea rows={3} value={content.caseStudiesSection.intro} onChange={(e) => updateCaseStudiesSection({ intro: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <p className="text-xs text-[#999]">Case studies themselves are managed in code.</p>
      </SectionCard>

      <SectionCard title="Closing CTA" defaultExpanded={false}>
        <Field label="Heading">
          <input value={content.closingCTA.heading} onChange={(e) => updateClosingCTA({ heading: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Subhead">
          <textarea rows={2} value={content.closingCTA.subhead} onChange={(e) => updateClosingCTA({ subhead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Links</label>
        <div className="flex flex-col gap-2">
          {content.closingCTA.links.map((link, i) => (
            <div key={i} className="p-[10px] bg-[#f7f6f4] rounded-md flex flex-col gap-[6px]">
              <div className="flex gap-2">
                <input value={link.index} onChange={(e) => updateClosingLink(i, { index: e.target.value })} className="w-14 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
                <input value={link.title} onChange={(e) => updateClosingLink(i, { title: e.target.value })} placeholder="Title" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              </div>
              <input value={link.cta} onChange={(e) => updateClosingLink(i, { cta: e.target.value })} placeholder="CTA text" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={link.href} onChange={(e) => updateClosingLink(i, { href: e.target.value })} placeholder="href" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
              <input value={link.sub ?? ""} onChange={(e) => updateClosingLink(i, { sub: e.target.value })} placeholder="Sub text (optional)" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
            </div>
          ))}
        </div>
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
