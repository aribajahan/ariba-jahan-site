"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type PageSeo = { title: string; description: string };
type Seo = Record<string, PageSeo>;

const PAGES = [
  { key: "home", label: "Home" },
  { key: "speaking", label: "Speaking" },
  { key: "work-with-me", label: "Work With Me" },
  { key: "about", label: "About" },
];

export default function SeoEditor({ initialSeo }: { initialSeo: Seo }) {
  const [seo, setSeo] = useState(initialSeo);
  const [activePage, setActivePage] = useState("home");
  const { publish, publishing, result } = usePublish();

  const current = seo[activePage];

  const update = (patch: Partial<PageSeo>) => {
    setSeo((s) => ({ ...s, [activePage]: { ...s[activePage], ...patch } }));
  };

  const handlePublish = () =>
    publish([{ path: "content/seo.json", content: JSON.stringify(seo, null, 2) + "\n" }], "Update Site-wide SEO via Studio");

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Per-page</div>
      <h1 className="text-2xl mb-2">SEO</h1>
      <p className="text-[14px] text-[#888] mb-6">Each page gets its own SEO fields, separate from its content. Pick a page to edit.</p>

      <div className="flex flex-col gap-2 mb-7">
        {PAGES.map((p) => (
          <div
            key={p.key}
            onClick={() => setActivePage(p.key)}
            className={`px-[14px] py-[10px] rounded-lg cursor-pointer text-sm border ${
              activePage === p.key ? "bg-[#181818] text-white border-[#181818]" : "bg-white border-[#e2e0dc]"
            }`}
          >
            {p.label}
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6">
        <label className="block text-[13px] font-semibold mb-2">Page Title (shows in browser tab &amp; Google)</label>
        <input
          value={current.title}
          onChange={(e) => update({ title: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
        />
        <label className="block text-[13px] font-semibold mb-2">Meta Description</label>
        <textarea
          rows={3}
          value={current.description}
          onChange={(e) => update({ description: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm resize-y"
        />
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
