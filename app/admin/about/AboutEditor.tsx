"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type AboutContent = {
  hero: {
    photoSrc: string;
    photoSrcMobile: string;
    eyebrow: string;
    headline: string;
  };
};

export default function AboutEditor({ initialContent }: { initialContent: AboutContent }) {
  const [content, setContent] = useState(initialContent);
  const { publish, publishing, result } = usePublish();

  const updateHero = (patch: Partial<AboutContent["hero"]>) => {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
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

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
