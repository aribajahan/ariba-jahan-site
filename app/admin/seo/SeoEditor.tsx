"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import MediaPicker from "../_shared/MediaPicker";

type PageSeo = { title: string; description: string; ogImage?: string; useHomeOgImage?: boolean };
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
  const isHome = activePage === "home";
  const usingHomeImage = !isHome && current.useHomeOgImage;

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
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm resize-y mb-4"
        />

        <label className="block text-[13px] font-semibold mb-2">Social Share Image (Open Graph)</label>
        <p className="text-xs text-[#999] mb-3">
          Shown when this page is shared on LinkedIn, X, Slack, etc. Leave empty to use the site&rsquo;s
          default image.
        </p>

        {!isHome && (
          <label className="flex items-center gap-[6px] text-[13px] mb-3">
            <input
              type="checkbox"
              checked={!!current.useHomeOgImage}
              onChange={(e) => update({ useHomeOgImage: e.target.checked })}
            />
            Use the same image as Home
          </label>
        )}

        {usingHomeImage ? (
          <div className="text-xs text-[#999] bg-[#fafaf8] border border-dashed border-[#d5d2cc] rounded-md p-3">
            Using Home&rsquo;s social share image. Uncheck above to set one just for this page.
          </div>
        ) : (
          <MediaPicker value={current.ogImage ?? ""} onChange={(ogImage) => update({ ogImage })} />
        )}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
