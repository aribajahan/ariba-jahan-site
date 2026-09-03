"use client";

import { useState } from "react";
import { usePublish } from "../../_shared/usePublish";

type Availability = "public" | "unlisted" | "password" | "draft";
type PageSettings = {
  navLabel: string;
  slug: string;
  availability: Availability;
  password: string;
  showInNav: boolean;
  showFooter: boolean;
  socialImage: string;
};
type Seo = { title: string; description: string };

export default function PageSettingsEditor({
  pageKey,
  allPageSettings,
  allNavVisibility,
  allSeo,
}: {
  pageKey: string;
  allPageSettings: Record<string, PageSettings>;
  allNavVisibility: Record<string, boolean>;
  allSeo: Record<string, Seo>;
}) {
  const [pageSettings, setPageSettings] = useState(allPageSettings);
  const [navVisibility, setNavVisibility] = useState(allNavVisibility);
  const [seo, setSeo] = useState(allSeo);
  const [tab, setTab] = useState<"general" | "nav" | "seo" | "social">("general");
  const { publish, publishing, result } = usePublish();

  const settings = pageSettings[pageKey];
  const pageSeo = seo[pageKey] ?? { title: "", description: "" };

  // A saved password comes back as its HMAC digest (64 hex chars) — the publish
  // route scrambles it and the plaintext is never stored. Show the field empty
  // in that case rather than putting a meaningless hash in front of Ariba.
  const passwordIsStored = /^[0-9a-f]{64}$/.test(settings.password);

  const updateSettings = (patch: Partial<PageSettings>) => {
    setPageSettings((s) => ({ ...s, [pageKey]: { ...s[pageKey], ...patch } }));
  };

  const updateSeo = (patch: Partial<Seo>) => {
    setSeo((s) => ({ ...s, [pageKey]: { ...pageSeo, ...patch } }));
  };

  const updateShowInNav = (value: boolean) => {
    updateSettings({ showInNav: value });
    setNavVisibility((v) => ({ ...v, [pageKey]: value }));
  };

  const handlePublish = () =>
    publish(
      [
        { path: "content/page-settings.json", content: JSON.stringify(pageSettings, null, 2) + "\n" },
        { path: "content/nav-visibility.json", content: JSON.stringify(navVisibility, null, 2) + "\n" },
        { path: "content/seo.json", content: JSON.stringify(seo, null, 2) + "\n" },
      ],
      `Update ${settings.navLabel} page settings via Studio`
    );

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "general", label: "General" },
    { key: "nav", label: "Navigation" },
    { key: "seo", label: "SEO" },
    { key: "social", label: "Social Image" },
  ];

  return (
    <div className="flex">
      <div className="w-[180px] flex-shrink-0 p-8 border-r border-[#e2e0dc]">
        <h2 className="text-lg font-semibold mb-5">{settings.navLabel} Settings</h2>
        {tabs.map((t) => (
          <div
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-[13px] py-[6px] cursor-pointer ${tab === t.key ? "font-bold underline" : "text-[#555]"}`}
          >
            ↓ {t.label}
          </div>
        ))}
      </div>

      <div className="flex-1 p-10 max-w-[560px]">
        {tab === "general" && (
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.04em] uppercase mb-5">General</h3>
            <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-[6px]">Page Title</label>
            <input
              value={settings.navLabel}
              onChange={(e) => updateSettings({ navLabel: e.target.value })}
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm mb-4"
            />
            <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-[6px]">URL Slug (reference only, changing this doesn&rsquo;t move the route)</label>
            <input
              value={settings.slug}
              onChange={(e) => updateSettings({ slug: e.target.value })}
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm mb-4"
            />
            <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-[6px]">Availability</label>
            <select
              value={settings.availability}
              onChange={(e) => updateSettings({ availability: e.target.value as Availability })}
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm mb-2"
            >
              <option value="public">Public: live and in nav</option>
              <option value="unlisted">Unlisted: live, but hidden from nav (share the link directly)</option>
              <option value="password">Password-protected</option>
              <option value="draft">Draft: not visible to visitors at all</option>
            </select>
            {settings.availability === "password" && (
              <>
                <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mt-4 mb-[6px]">Password</label>
                <input
                  type="text"
                  value={passwordIsStored ? "" : settings.password}
                  placeholder={passwordIsStored ? "Password set — type a new one to change it" : "Choose a password"}
                  onChange={(e) => updateSettings({ password: e.target.value })}
                  className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm"
                />
                <div className="text-xs text-[#999] mt-2">
                  Scrambled on publish, so it&rsquo;s never readable in the site&rsquo;s code. That also means it
                  can&rsquo;t be shown back to you here — if you forget it, set a new one.
                </div>
              </>
            )}
            <div className="text-xs text-[#999] mt-3">
              Good for a page you&rsquo;re still building, or gating something (like a digital product) behind a direct link before it&rsquo;s announced.
            </div>
          </div>
        )}

        {tab === "nav" && (
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.04em] uppercase mb-5">Navigation</h3>
            <div className="flex justify-between items-center py-[10px] border-b border-[#f4f3f1]">
              <span className="text-sm">Show in Nav</span>
              <button
                type="button"
                onClick={() => updateShowInNav(!settings.showInNav)}
                className={`w-9 h-5 rounded-full relative transition-colors ${settings.showInNav ? "bg-[#2a7a3e]" : "bg-[#ccc]"}`}
              >
                <span className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-all ${settings.showInNav ? "right-[2px]" : "left-[2px]"}`} />
              </button>
            </div>
            <div className="flex justify-between items-center py-[10px]">
              <span className="text-sm">Show Footer</span>
              <button
                type="button"
                onClick={() => updateSettings({ showFooter: !settings.showFooter })}
                className={`w-9 h-5 rounded-full relative transition-colors ${settings.showFooter ? "bg-[#2a7a3e]" : "bg-[#ccc]"}`}
              >
                <span className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-all ${settings.showFooter ? "right-[2px]" : "left-[2px]"}`} />
              </button>
            </div>
          </div>
        )}

        {tab === "seo" && (
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.04em] uppercase mb-5">SEO</h3>
            <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-[6px]">Page Title (search &amp; browser tab)</label>
            <input
              value={pageSeo.title}
              onChange={(e) => updateSeo({ title: e.target.value })}
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm mb-4"
            />
            <label className="block text-xs font-bold tracking-[0.04em] uppercase text-[#888] mb-[6px]">Meta Description</label>
            <textarea
              rows={3}
              value={pageSeo.description}
              onChange={(e) => updateSeo({ description: e.target.value })}
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm mb-4 resize-y"
            />
            <div className="text-[11px] font-bold tracking-[0.06em] uppercase text-[#888] mb-2">Search Result Preview</div>
            <div className="border border-[#e2e0dc] rounded-lg p-4">
              <div className="text-[#1a0dab] text-[15px] mb-[2px]">{pageSeo.title}</div>
              <div className="text-[#006621] text-xs mb-[6px]">aribajahan.com{settings.slug}</div>
              <div className="text-[#545454] text-[13px] leading-[1.4]">{pageSeo.description}</div>
            </div>
          </div>
        )}

        {tab === "social" && (
          <div>
            <h3 className="text-[13px] font-bold tracking-[0.04em] uppercase mb-2">Social Image</h3>
            <p className="text-[13px] text-[#888] mb-4">
              Not wired to the live pages yet. Every page currently shares one site-wide preview image when shared on
              LinkedIn, Twitter, etc. This field saves, but a per-page override isn&rsquo;t shown until this gets connected.
            </p>
            <input
              value={settings.socialImage}
              onChange={(e) => updateSettings({ socialImage: e.target.value })}
              placeholder="/uploads/photo.jpg"
              className="w-full px-3 py-[10px] bg-[#f4f3f1] border border-[#e2e0dc] rounded-md text-sm"
            />
          </div>
        )}

        <div className="flex gap-[10px] items-center mt-8">
          <button
            type="button"
            onClick={handlePublish}
            disabled={publishing}
            className="bg-[#181818] text-white rounded-md px-5 py-[10px] text-[13px] font-semibold disabled:opacity-60"
          >
            {publishing ? "Publishing…" : "Publish"}
          </button>
          {result === "success" && <span className="text-xs text-[#2a7a3e]">Published. Live in about a minute.</span>}
          {result === "error" && <span className="text-xs text-[#b33]">Something went wrong publishing. Try again.</span>}
        </div>
      </div>
    </div>
  );
}
