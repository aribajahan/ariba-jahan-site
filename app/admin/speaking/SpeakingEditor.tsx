"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type SpeakingContent = {
  hero: {
    photoSrc: string;
    headline: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

export default function SpeakingEditor({ initialContent }: { initialContent: SpeakingContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const updateHero = (patch: Partial<SpeakingContent["hero"]>) => {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/pages/speaking.json", content: JSON.stringify(content, null, 2) + "\n" }],
      "Update Speaking content via Studio"
    );

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">Speaking</h1>
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
          rows={3}
          value={content.hero.headline}
          onChange={(e) => updateHero({ headline: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
        />

        <label className="block text-[13px] font-semibold mb-2">CTA Label</label>
        <input
          value={content.hero.ctaLabel}
          onChange={(e) => updateHero({ ctaLabel: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">CTA Link</label>
        <input
          value={content.hero.ctaHref}
          onChange={(e) => updateHero({ ctaHref: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm text-[#888]"
        />
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
