"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import StringListEditor from "../_shared/StringListEditor";

type RecognitionItem = { label: string; year?: string; href?: string };

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
  closingCTA: { heading: string; subhead: string };
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

  const updateRecognitionFeatures = (patch: Partial<AboutContent["recognitionFeatures"]>) => {
    setContent((c) => ({ ...c, recognitionFeatures: { ...c.recognitionFeatures, ...patch } }));
  };

  const updateClosingCTA = (patch: Partial<AboutContent["closingCTA"]>) => {
    setContent((c) => ({ ...c, closingCTA: { ...c.closingCTA, ...patch } }));
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
        <p className="text-xs text-[#999]">Story chapters and their photos are managed in code.</p>
      </SectionCard>

      <SectionCard title="Bio" defaultExpanded={false}>
        <Field label="Eyebrow">
          <input value={content.bio.eyebrow} onChange={(e) => updateBio({ eyebrow: e.target.value })} className={inputCls} />
        </Field>
        <label className="block text-[13px] font-semibold mb-2">Intro Paragraphs</label>
        <div className="mb-4">
          <StringListEditor items={content.bio.intro} onChange={(intro) => updateBio({ intro })} />
        </div>
        <label className="block text-[13px] font-semibold mb-2">Expanded Paragraphs (Read More)</label>
        <StringListEditor items={content.bio.expanded} onChange={(expanded) => updateBio({ expanded })} />
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
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
