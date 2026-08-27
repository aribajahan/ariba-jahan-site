"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import StringListEditor from "../_shared/StringListEditor";

type Theme = { photoSrc: string; title: string; question: string; description: string };
type SpeakingContent = {
  hero: { photoSrc: string; headline: string; ctaLabel: string; ctaHref: string };
  themes: { eyebrow: string; heading: string; lead: string; body: string; items: Theme[] };
  testimonialsSection: { eyebrow: string; heading: string };
  engagements: { eyebrow: string; heading: string; intro: string; formats: string[] };
  closingCTA: { heading: string; subhead: string };
};

const inputCls = "w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold mb-2">{label}</label>
      {children}
    </div>
  );
}

export default function SpeakingEditor({ initialContent }: { initialContent: SpeakingContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const set = <K extends keyof SpeakingContent>(key: K, patch: Partial<SpeakingContent[K]>) => {
    setContent((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  };

  const updateTheme = (i: number, patch: Partial<Theme>) => {
    set("themes", { items: content.themes.items.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) });
  };

  const handlePublish = () =>
    publish([{ path: "content/pages/speaking.json", content: JSON.stringify(content, null, 2) + "\n" }], "Update Speaking content via Studio");

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">Speaking</h1>
      <p className="text-[13px] text-[#999] mb-6">Click a section to expand and edit its fields.</p>

      <SectionCard title="Hero">
        <Field label="Hero Photo"><input value={content.hero.photoSrc} onChange={(e) => set("hero", { photoSrc: e.target.value })} className={inputCls} /></Field>
        <Field label="Headline">
          <textarea rows={3} value={content.hero.headline} onChange={(e) => set("hero", { headline: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="CTA Label"><input value={content.hero.ctaLabel} onChange={(e) => set("hero", { ctaLabel: e.target.value })} className={inputCls} /></Field>
        <Field label="CTA Link"><input value={content.hero.ctaHref} onChange={(e) => set("hero", { ctaHref: e.target.value })} className={`${inputCls} text-[#888]`} /></Field>
      </SectionCard>

      <SectionCard title="Speaking Themes" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.themes.eyebrow} onChange={(e) => set("themes", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.themes.heading} onChange={(e) => set("themes", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Lead (bold intro line)">
          <textarea rows={2} value={content.themes.lead} onChange={(e) => set("themes", { lead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="Body">
          <textarea rows={4} value={content.themes.body} onChange={(e) => set("themes", { body: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-[10px]">Theme Cards</label>
        <div className="flex flex-col gap-3">
          {content.themes.items.map((theme, i) => (
            <div key={i} className="p-3 bg-[#f7f6f4] rounded-md flex flex-col gap-2">
              <input value={theme.title} onChange={(e) => updateTheme(i, { title: e.target.value })} placeholder="Title" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] font-semibold" />
              <input value={theme.photoSrc} onChange={(e) => updateTheme(i, { photoSrc: e.target.value })} placeholder="Photo path" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]" />
              <input value={theme.question} onChange={(e) => updateTheme(i, { question: e.target.value })} placeholder="Question" className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] italic" />
              <textarea value={theme.description} onChange={(e) => updateTheme(i, { description: e.target.value })} placeholder="Description" rows={3} className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] resize-y" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Testimonials Section Header" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.testimonialsSection.eyebrow} onChange={(e) => set("testimonialsSection", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.testimonialsSection.heading} onChange={(e) => set("testimonialsSection", { heading: e.target.value })} className={inputCls} /></Field>
        <p className="text-xs text-[#999]">Testimonials themselves are managed in the shared Testimonials collection.</p>
      </SectionCard>

      <SectionCard title="Engagements" defaultExpanded={false}>
        <Field label="Eyebrow"><input value={content.engagements.eyebrow} onChange={(e) => set("engagements", { eyebrow: e.target.value })} className={inputCls} /></Field>
        <Field label="Heading"><input value={content.engagements.heading} onChange={(e) => set("engagements", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Intro">
          <textarea rows={3} value={content.engagements.intro} onChange={(e) => set("engagements", { intro: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <label className="block text-[13px] font-semibold mb-2">Format Tags</label>
        <StringListEditor items={content.engagements.formats} onChange={(formats) => set("engagements", { formats })} />
        <p className="text-xs text-[#999] mt-3">Logos and photo gallery are managed in their own collections (Speaking Logos, Speaking Gallery Photos).</p>
      </SectionCard>

      <SectionCard title="Closing CTA" defaultExpanded={false}>
        <Field label="Heading"><input value={content.closingCTA.heading} onChange={(e) => set("closingCTA", { heading: e.target.value })} className={inputCls} /></Field>
        <Field label="Subhead">
          <textarea rows={2} value={content.closingCTA.subhead} onChange={(e) => set("closingCTA", { subhead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
