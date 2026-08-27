"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type SiteSettings = {
  announcementBar: { enabled: boolean; message: string; link: string };
  [key: string]: unknown;
};

export default function MarketingToolsEditor({ initialSettings }: { initialSettings: SiteSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const { publish, publishing, result } = usePublish();

  const updateBar = (patch: Partial<SiteSettings["announcementBar"]>) => {
    setSettings((s) => ({ ...s, announcementBar: { ...s.announcementBar, ...patch } }));
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/site-settings.json", content: JSON.stringify(settings, null, 2) + "\n" }],
      "Update Marketing Tools via Studio"
    );

  return (
    <div className="max-w-[720px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Site-wide</div>
      <h1 className="text-2xl mb-6">Marketing Tools</h1>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-semibold">Announcement Bar</label>
          <button
            type="button"
            onClick={() => updateBar({ enabled: !settings.announcementBar.enabled })}
            className={`w-9 h-5 rounded-full relative transition-colors ${settings.announcementBar.enabled ? "bg-[#2a7a3e]" : "bg-[#ccc]"}`}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full absolute top-[2px] transition-all ${settings.announcementBar.enabled ? "right-[2px]" : "left-[2px]"}`}
            />
          </button>
        </div>
        <label className="block text-xs font-semibold text-[#888] mb-[6px]">Message</label>
        <input
          value={settings.announcementBar.message}
          onChange={(e) => updateBar({ message: e.target.value })}
          className="w-full px-3 py-[9px] border border-[#ddd] rounded-md text-[13px] mb-3"
        />
        <label className="block text-xs font-semibold text-[#888] mb-[6px]">Link</label>
        <input
          value={settings.announcementBar.link}
          onChange={(e) => updateBar({ link: e.target.value })}
          className="w-full px-3 py-[9px] border border-[#ddd] rounded-md text-[13px]"
        />
      </div>

      <div className="bg-white border border-[#e2e0dc] rounded-[10px] p-5 opacity-55">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold">Promotional Pop-Up</label>
          <span className="text-xs text-[#999]">Not built yet (add when you have a lead magnet)</span>
        </div>
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
