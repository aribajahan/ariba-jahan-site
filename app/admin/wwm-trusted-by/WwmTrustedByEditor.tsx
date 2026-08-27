"use client";

import { useState } from "react";
import Image from "next/image";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Logo = { src: string; alt: string; heightPx: number };

export default function WwmTrustedByEditor({ initialItems }: { initialItems: Logo[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<Logo>) => {
    setItems((list) => list.map((l, i) => (i === index ? { ...l, ...patch } : l)));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  const remove = (index: number) => {
    setItems((list) => list.filter((_, i) => i !== index));
    setOpenIndex(null);
  };

  const addNew = () => {
    setItems((list) => [...list, { src: "", alt: "New Logo", heightPx: 30 }]);
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/wwm-trusted-by.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update WWM Trusted By via Studio"
    );

  return (
    <div className="max-w-[900px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Gallery — used on Work With Me page</div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl">WWM Trusted By</h1>
        <button
          type="button"
          onClick={addNew}
          className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold"
        >
          + Add Logo
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {items.map((logo, i) => (
          <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] p-[14px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">◀</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▶</button>
              </div>
              <button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)} className="text-[11px] text-[#888]">
                {openIndex === i ? "Close" : "Edit"}
              </button>
            </div>
            <div className="h-16 rounded-md bg-[#f7f6f4] flex items-center justify-center overflow-hidden mb-2">
              {logo.src ? (
                <div className="relative w-full h-full">
                  <Image src={logo.src} alt={logo.alt} fill sizes="200px" style={{ objectFit: "contain" }} className="p-2" />
                </div>
              ) : (
                <span className="text-[11px] text-[#bbb]">No image</span>
              )}
            </div>
            <div className="font-bold text-[#444] text-center text-sm truncate">{logo.alt}</div>
            <div className="text-[11px] text-[#999] text-center mt-1">height: {logo.heightPx}px</div>

            {openIndex === i && (
              <div className="mt-3 pt-3 border-t border-[#f0efec] flex flex-col gap-2">
                <input
                  value={logo.alt}
                  onChange={(e) => update(i, { alt: e.target.value })}
                  placeholder="Name"
                  className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[12px]"
                />
                <input
                  value={logo.src}
                  onChange={(e) => update(i, { src: e.target.value })}
                  placeholder="/assets/logo-x.png"
                  className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[12px]"
                />
                <input
                  type="number"
                  value={logo.heightPx}
                  onChange={(e) => update(i, { heightPx: Number(e.target.value) })}
                  className="border border-[#ddd] rounded-[5px] px-2 py-[6px] text-[12px]"
                />
                <button type="button" onClick={() => remove(i)} className="bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 text-[13px] text-[#999]">
        {items.length} total. These scroll continuously in the Trusted By marquee — order sets the starting position.
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
