"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type NavLink = { label: string; href: string; external: boolean };
type SocialLink = { label: string; href: string };
type SiteSettings = {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  footer: { creditLine: string; copyrightYear: string };
};

export default function SiteSettingsEditor({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const { publish, publishing, result } = usePublish();

  const updateNavLink = (i: number, patch: Partial<NavLink>) => {
    setSettings((s) => ({ ...s, navLinks: s.navLinks.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) }));
  };
  const moveNavLink = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= settings.navLinks.length) return;
    const next = [...settings.navLinks];
    [next[i], next[target]] = [next[target], next[i]];
    setSettings((s) => ({ ...s, navLinks: next }));
  };
  const removeNavLink = (i: number) => setSettings((s) => ({ ...s, navLinks: s.navLinks.filter((_, idx) => idx !== i) }));
  const addNavLink = () =>
    setSettings((s) => ({ ...s, navLinks: [...s.navLinks, { label: "New Link", href: "/", external: false }] }));

  const updateSocialLink = (i: number, patch: Partial<SocialLink>) => {
    setSettings((s) => ({ ...s, socialLinks: s.socialLinks.map((l, idx) => (idx === i ? { ...l, ...patch } : l)) }));
  };

  const updateFooter = (patch: Partial<SiteSettings["footer"]>) => {
    setSettings((s) => ({ ...s, footer: { ...s.footer, ...patch } }));
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/site-settings.json", content: JSON.stringify(settings, null, 2) + "\n" }],
      "Update Site Settings via Studio"
    );

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Site-wide</div>
      <h1 className="text-2xl mb-6">Site Settings</h1>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6 mb-4">
        <h3 className="text-[15px] font-semibold mb-4">Navigation</h3>
        <div className="flex flex-col gap-2">
          {settings.navLinks.map((link, i) => (
            <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <div className="flex flex-col gap-[2px]">
                <button type="button" onClick={() => moveNavLink(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                <button type="button" onClick={() => moveNavLink(i, 1)} disabled={i === settings.navLinks.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
              </div>
              <input
                value={link.label}
                onChange={(e) => updateNavLink(i, { label: e.target.value })}
                className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px]"
              />
              <input
                value={link.href}
                onChange={(e) => updateNavLink(i, { href: e.target.value })}
                className="flex-1 border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[13px] text-[#888]"
              />
              <label className="flex items-center gap-1 text-[11px] text-[#888] whitespace-nowrap">
                <input type="checkbox" checked={link.external} onChange={(e) => updateNavLink(i, { external: e.target.checked })} />
                external
              </label>
              <span onClick={() => removeNavLink(i)} className="text-[#c44] cursor-pointer text-[13px]">✕</span>
            </div>
          ))}
          <button type="button" onClick={addNavLink} className="self-start text-xs text-[#888] border border-dashed border-[#ccc] rounded-md px-3 py-[6px]">
            + Add Nav Item
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6 mb-4">
        <h3 className="text-[15px] font-semibold mb-4">Social Links</h3>
        <div className="flex flex-col gap-2">
          {settings.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-[10px] items-center p-[10px] bg-[#f7f6f4] rounded-md">
              <span className="flex-1 text-[13px]">{link.label}</span>
              <input
                value={link.href}
                onChange={(e) => updateSocialLink(i, { href: e.target.value })}
                className="flex-[2] border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[12px] text-[#888]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6">
        <h3 className="text-[15px] font-semibold mb-4">Footer</h3>
        <label className="block text-[13px] font-semibold mb-2">Credit Line</label>
        <textarea
          rows={3}
          value={settings.footer.creditLine}
          onChange={(e) => updateFooter({ creditLine: e.target.value })}
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
        />
        <label className="block text-[13px] font-semibold mb-2">Copyright Year</label>
        <input
          value={settings.footer.copyrightYear}
          onChange={(e) => updateFooter({ copyrightYear: e.target.value })}
          className="w-[120px] px-3 py-[10px] border border-[#ddd] rounded-md text-sm"
        />
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
