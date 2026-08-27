"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import MediaPicker from "../_shared/MediaPicker";

export default function GalleryEditor({ initialItems }: { initialItems: string[] }) {
  const [items, setItems] = useState(initialItems);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, value: string) => {
    setItems((list) => list.map((src, i) => (i === index ? value : src)));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

  const remove = (index: number) => setItems((list) => list.filter((_, i) => i !== index));
  const addNew = () => setItems((list) => [...list, ""]);

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/speaking-gallery-photos.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Speaking Gallery Photos via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection · used on Speaking page</div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl">Speaking Gallery Photos</h1>
        <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold">
          + Add Photo
        </button>
      </div>
      <p className="text-[13px] text-[#999] mb-7">
        Order matters: the first photo is the large hero photo in the grid, the rest fill in around it.
      </p>

      <div className="flex flex-col gap-[10px]">
        {items.map((src, i) => (
          <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] p-[14px] flex items-center gap-4">
            <div className="flex flex-col gap-[2px]">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
            </div>
            <div className="flex-1">
              <MediaPicker value={src} onChange={(value) => update(i, value)} />
            </div>
            <button type="button" onClick={() => remove(i)} className="text-[#c44] text-sm">✕</button>
          </div>
        ))}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
