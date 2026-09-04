"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type RecognitionItem = { label: string; year?: string; href?: string };
type ClosingLink = { index: string; title: string; cta: string; href: string; external?: boolean };

type AboutContent = {
  hero: {
    photoSrc: string;
    photoSrcMobile: string;
    eyebrow: string;
    headline: string;
  };
  intro: { paragraph: string };
  storyTimeline: {
    eyebrow: string;
    heading: string;
    rightNowLabel: string;
    rightNowCopy: string;
  };
  bio: {
    eyebrow: string;
    intro: string[];
    expanded: string[];
  };
  unmissablesNudge: { text: string; ctaLabel: string; href: string };
  careerAdvisory: {
    eyebrow: string;
    headline: string;
    lead: string;
    body: string;
    cta: string;
    href: string;
    photoSrc: string;
  };
  recognitionFeatures: {
    eyebrow: string;
    heading: string;
    recognitionItems: RecognitionItem[];
    featuredItems: RecognitionItem[];
  };
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

function RecognitionListEditor({
  items,
  onChange,
}: {
  items: RecognitionItem[];
  onChange: (items: RecognitionItem[]) => void;
}) {
  const update = (i: number, patch: Partial<RecognitionItem>) => {
    onChange(items.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
          <input
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
            placeholder="Label"
            className="flex-[2] border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
          />
          <input
            value={item.year ?? ""}
            onChange={(e) => update(i, { year: e.target.value || undefined })}
            placeholder="Year"
            className="flex-none w-16 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
          />
          <input
            value={item.href ?? ""}
            onChange={(e) => update(i, { href: e.target.value || undefined })}
            placeholder="Link (optional)"
            className="flex-[2] border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]"
          />
        </div>
      ))}
    </div>
  );
}

export default function AboutEditor({ initialContent }: { initialContent: AboutContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const updateHero = (patch: Partial<AboutContent["hero"]>) => {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  };

  const updateIntro = (patch: Partial<AboutContent["intro"]>) => {
    setContent((c) => ({ ...c, intro: { ...c.intro, ...patch } }));
  };

  const updateStoryTimeline = (patch: Partial<AboutContent["storyTimeline"]>) => {
    setContent((c) => ({ ...c, storyTimeline: { ...c.storyTimeline, ...patch } }));
  };

  const updateBio = (patch: Partial<AboutContent["bio"]>) => {
    setContent((c) => ({ ...c, bio: { ...c.bio, ...patch } }));
  };

  const updateCareerAdvisory = (patch: Partial<AboutContent["careerAdvisory"]>) => {
    setContent((c) => ({ ...c, careerAdvisory: { ...c.careerAdvisory, ...patch } }));
  };

  const updateUnmissablesNudge = (patch: Partial<AboutContent["unmissablesNudge"]>) => {
    setContent((c) => ({ ...c, unmissablesNudge: { ...c.unmissablesNudge, ...patch } }));
  };

  const updateRecognitionFeatures = (patch: Partial<AboutContent["recognitionFeatures"]>) => {
    setContent((c) => ({ ...c, recognitionFeatures: { ...c.recognitionFeatures, ...patch } }));
  };

  const updateClosingCTA = (patch: Partial<AboutContent["closingCTA"]>) => {
    setContent((c) => ({ ...c, closingCTA: { ...c.closingCTA, ...patch } }));
  };

  const updateClosingLink = (i: number, patch: Partial<ClosingLink>) => {
    updateClosingCTA({ links: content.closingCTA.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) });
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/pages/about.json", content: JSON.stringify(content, null, 2) + "\n" }],
      "Update About content via Studio"
    );

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">About</h1>
      <p className="text-[13px] text-[#999] mb-6">Click a section to expand and edit its fields.</p>

      <SectionCard title="Hero">
        <label className="block text-[13px] font-semibold mb-2">Hero Photo (desktop/tablet)</label>
        <input
          value={content.hero.photoSrc}
          onChange={(e) => updateHero({ photoSrc: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">Hero Photo (mobile)</label>
        <input
          value={content.hero.photoSrcMobile}
          onChange={(e) => updateHero({ photoSrcMobile: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">Eyebrow</label>
        <input
          value={content.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">Headline</label>
        <textarea
          rows={3}
          value={content.hero.headline}
          onChange={(e) => updateHero({ headline: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm resize-y"
        />
      </SectionCard>

      <SectionCard title="Intro Paragraph" defaultExpanded={false}>
        <Field label="Paragraph">
          <textarea rows={4} value={content.intro.paragraph} onChange={(e) => updateIntro({ paragraph: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
      </SectionCard>

      <SectionCard title="Story Timeline" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.storyTimeline.eyebrow} onChange={(e) => updateStoryTimeline({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <textarea rows={2} value={content.storyTimeline.heading} onChange={(e) => updateStoryTimeline({ heading: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="Right Now Label">
          <input value={content.storyTimeline.rightNowLabel} onChange={(e) => updateStoryTimeline({ rightNowLabel: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Right Now Copy">
          <textarea rows={4} value={content.storyTimeline.rightNowCopy} onChange={(e) => updateStoryTimeline({ rightNowCopy: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <p className="text-xs text-[#999]">Story chapters and their photos are managed under Collections → Story Timeline.</p>
      </SectionCard>

      <SectionCard title="Bio" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.bio.eyebrow} onChange={(e) => updateBio({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Short Bio (blank line between paragraphs)">
          <textarea
            rows={8}
            value={content.bio.intro.join("\n\n")}
            onChange={(e) => updateBio({ intro: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <Field label="Long Bio, Read More (blank line between paragraphs)">
          <textarea
            rows={12}
            value={content.bio.expanded.join("\n\n")}
            onChange={(e) => updateBio({ expanded: e.target.value.split(/\n\s*\n/).filter(Boolean) })}
            className={`${inputCls} resize-y`}
          />
        </Field>
        <p className="text-[13px] font-semibold mb-2">Unmissables Nudge (shown under Read Full Bio)</p>
        <Field label="Text">
          <textarea rows={2} value={content.unmissablesNudge.text} onChange={(e) => updateUnmissablesNudge({ text: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="CTA Label">
          <input value={content.unmissablesNudge.ctaLabel} onChange={(e) => updateUnmissablesNudge({ ctaLabel: e.target.value })} className={inputCls} />
        </Field>
        <Field label="CTA Link">
          <input value={content.unmissablesNudge.href} onChange={(e) => updateUnmissablesNudge({ href: e.target.value })} className={`${inputCls} text-[#888]`} />
        </Field>
      </SectionCard>

      <SectionCard title="Career Advisory" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.careerAdvisory.eyebrow} onChange={(e) => updateCareerAdvisory({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Headline">
          <input value={content.careerAdvisory.headline} onChange={(e) => updateCareerAdvisory({ headline: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Lead">
          <textarea rows={2} value={content.careerAdvisory.lead} onChange={(e) => updateCareerAdvisory({ lead: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="Body">
          <textarea rows={3} value={content.careerAdvisory.body} onChange={(e) => updateCareerAdvisory({ body: e.target.value })} className={`${inputCls} resize-y`} />
        </Field>
        <Field label="CTA Label">
          <input value={content.careerAdvisory.cta} onChange={(e) => updateCareerAdvisory({ cta: e.target.value })} className={inputCls} />
        </Field>
        <Field label="CTA Link">
          <input value={content.careerAdvisory.href} onChange={(e) => updateCareerAdvisory({ href: e.target.value })} className={`${inputCls} text-[#888]`} />
        </Field>
        <Field label="Photo">
          <input value={content.careerAdvisory.photoSrc} onChange={(e) => updateCareerAdvisory({ photoSrc: e.target.value })} className={inputCls} />
        </Field>
      </SectionCard>

      <SectionCard title="Recognition & Features" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.recognitionFeatures.eyebrow} onChange={(e) => updateRecognitionFeatures({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Heading">
          <input value={content.recognitionFeatures.heading} onChange={(e) => updateRecognitionFeatures({ heading: e.target.value })} className={inputCls} />
        </Field>
        <label className="block text-[13px] font-semibold mb-2">Recognition</label>
        <div className="mb-4">
          <RecognitionListEditor
            items={content.recognitionFeatures.recognitionItems}
            onChange={(recognitionItems) => updateRecognitionFeatures({ recognitionItems })}
          />
        </div>
        <label className="block text-[13px] font-semibold mb-2">Featured</label>
        <RecognitionListEditor
          items={content.recognitionFeatures.featuredItems}
          onChange={(featuredItems) => updateRecognitionFeatures({ featuredItems })}
        />
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
              <div className="flex gap-2 items-center">
                <input value={link.href} onChange={(e) => updateClosingLink(i, { href: e.target.value })} placeholder="href" className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]" />
                <label className="flex items-center gap-1 text-[11px] text-[#888] whitespace-nowrap">
                  <input type="checkbox" checked={!!link.external} onChange={(e) => updateClosingLink(i, { external: e.target.checked })} />
                  external
                </label>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
