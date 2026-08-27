"use client";

import { useState } from "react";
import SectionCard from "../_shared/SectionCard";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import StringListEditor from "../_shared/StringListEditor";
import TitleDescListEditor from "../_shared/TitleDescListEditor";

type Cta = { label: string; href: string };
type TitleDesc = { title: string; description: string };
type WwmContent = {
  hero: {
    photoSrc: string;
    headline: string;
    subhead: string;
    ctas: Cta[];
  };
  cxSprint: {
    fitPoints: string[];
    deliverables: TitleDesc[];
    weeks: TitleDesc[];
  };
  strategySessions: {
    bestFor: string[];
  };
};

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
        <label className="block text-[13px] font-semibold mb-2">Is This You? (fit points)</label>
        <div className="mb-4">
          <StringListEditor items={content.cxSprint.fitPoints} onChange={(fitPoints) => updateCxSprint({ fitPoints })} />
        </div>

        <label className="block text-[13px] font-semibold mb-2">Deliverables</label>
        <div className="mb-4">
          <TitleDescListEditor items={content.cxSprint.deliverables} onChange={(deliverables) => updateCxSprint({ deliverables })} />
        </div>

        <label className="block text-[13px] font-semibold mb-2">Weeks</label>
        <TitleDescListEditor items={content.cxSprint.weeks} onChange={(weeks) => updateCxSprint({ weeks })} />
      </SectionCard>

      <SectionCard title="1:1 CX Strategy Sessions" defaultExpanded={false}>
        <label className="block text-[13px] font-semibold mb-2">Best For</label>
        <StringListEditor items={content.strategySessions.bestFor} onChange={(bestFor) => updateStrategySessions({ bestFor })} />
      </SectionCard>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
