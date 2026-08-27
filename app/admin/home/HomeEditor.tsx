"use client";

import { useState } from "react";

type Cta = { label: string; href: string };
type HomeContent = {
  hero: {
    photoSrc: string;
    subhead: string;
    ctas: Cta[];
  };
};

export default function HomeEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState(initialContent);
  const [expanded, setExpanded] = useState(true);
  const [lastSavedLabel, setLastSavedLabel] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<"success" | "error" | null>(null);

  const updateHero = (patch: Partial<HomeContent["hero"]>) => {
    setContent((c) => ({ ...c, hero: { ...c.hero, ...patch } }));
    setLastSavedLabel("Draft saved just now");
  };

  const updateCta = (index: number, patch: Partial<Cta>) => {
    const ctas = content.hero.ctas.map((cta, i) => (i === index ? { ...cta, ...patch } : cta));
    updateHero({ ctas });
  };

  const moveCta = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= content.hero.ctas.length) return;
    const ctas = [...content.hero.ctas];
    [ctas[index], ctas[target]] = [ctas[target], ctas[index]];
    updateHero({ ctas });
  };

  const removeCta = (index: number) => {
    updateHero({ ctas: content.hero.ctas.filter((_, i) => i !== index) });
  };

  const addCta = () => {
    updateHero({ ctas: [...content.hero.ctas, { label: "New Link", href: "#" }] });
  };

  const handlePublish = async () => {
    setPublishing(true);
    setPublishResult(null);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          files: [{ path: "content/pages/home.json", content: JSON.stringify(content, null, 2) + "\n" }],
          message: "Update Home content via Studio",
        }),
      });
      if (!res.ok) throw new Error("Publish failed");
      setPublishResult("success");
    } catch {
      setPublishResult("error");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[2px]">Page</div>
      <h1 className="text-2xl mb-1">Home</h1>
      <p className="text-[13px] text-[#999] mb-6">Click a section to expand and edit its fields.</p>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] mb-3 overflow-hidden">
        <div
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-[10px] px-4 py-[14px] cursor-pointer"
        >
          <strong className="flex-1 text-sm">Hero</strong>
          <span className="text-xs text-[#999]">{expanded ? "▲" : "▼"}</span>
        </div>
        {expanded && (
          <div className="px-5 pb-5">
            <label className="block text-[13px] font-semibold mb-2">Hero Photo</label>
            <input
              value={content.hero.photoSrc}
              onChange={(e) => updateHero({ photoSrc: e.target.value })}
              className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
              placeholder="/assets/hero-photo.jpg"
            />

            <label className="block text-[13px] font-semibold mb-2">Subhead</label>
            <textarea
              rows={3}
              value={content.hero.subhead}
              onChange={(e) => updateHero({ subhead: e.target.value })}
              className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
            />

            <label className="block text-[13px] font-semibold mb-[10px]">Hero CTAs</label>
            <div className="flex flex-col gap-2 mb-2">
              {content.hero.ctas.map((cta, i) => (
                <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
                  <div className="flex flex-col gap-[2px]">
                    <button type="button" onClick={() => moveCta(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                    <button type="button" onClick={() => moveCta(i, 1)} disabled={i === content.hero.ctas.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                  </div>
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
                  <span onClick={() => removeCta(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
                </div>
              ))}
            </div>
            <button type="button" onClick={addCta} className="text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">
              + Add CTA
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-[10px] items-center mt-6">
        <button
          type="button"
          onClick={handlePublish}
          disabled={publishing}
          className="bg-[#181818] text-white rounded-md px-5 py-[10px] text-[13px] font-semibold disabled:opacity-60"
        >
          {publishing ? "Publishing…" : "Publish"}
        </button>
        {lastSavedLabel && !publishing && <span className="text-xs text-[#999]">{lastSavedLabel}</span>}
        {publishResult === "success" && (
          <span className="text-xs text-[#2a7a3e]">Published — live in about a minute.</span>
        )}
        {publishResult === "error" && (
          <span className="text-xs text-[#b33]">Something went wrong publishing. Try again.</span>
        )}
      </div>
    </div>
  );
}
