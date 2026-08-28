"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import MediaPicker from "../_shared/MediaPicker";

export type TileType = "essay" | "podcast";
export type Tile = { id: string; photoSrc: string; headline: string; href: string; type: TileType; bg: string; overlay: "dark" | "light" };

const newId = () => `unmissables-${Date.now()}`;

export default function UnmissablesEditor({ initialItems }: { initialItems: Tile[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<Tile>) => {
    setItems((list) => list.map((t, i) => (i === index ? { ...t, ...patch } : t)));
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
    setConfirmingDelete(null);
    setOpenIndex(null);
  };

  const addNew = () => {
    setItems((list) => [
      ...list,
      { id: newId(), photoSrc: "", headline: "", href: "", type: "essay", bg: "#2D2D2D", overlay: "dark" },
    ]);
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish([{ path: "content/collections/unmissables.json", content: JSON.stringify(items, null, 2) + "\n" }], "Update Unmissables via Studio");

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection · the grid of tiles on Home&rsquo;s Unmissables section</div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl">Unmissables</h1>
        <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold">
          + New Tile
        </button>
      </div>
      <p className="text-[13px] text-[#999] mb-5">
        Order determines position in the grid. The essay/podcast framework, hero tile, and links are managed in code.
      </p>

      <div className="flex flex-col gap-[10px]">
        {items.map((tile, i) => {
          const open = openIndex === i;
          return (
            <div key={tile.id} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <div className="flex flex-col gap-[2px]">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                </div>
                <span
                  className={`text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded ${
                    tile.type === "podcast" ? "bg-[#F5A8D5] text-[#2D2D2D]" : "bg-[#8EF942] text-[#2D2D2D]"
                  }`}
                >
                  {tile.type === "podcast" ? "Podcast" : "Essay"}
                </span>
                <div className="flex-1 text-sm truncate">{tile.headline || <span className="text-[#bbb]">Untitled</span>}</div>
                <button type="button" onClick={() => { setOpenIndex(open ? null : i); setConfirmingDelete(null); }} className="text-[#888] text-sm">
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4">
                  <label className="block text-[13px] font-semibold mb-2">Photo</label>
                  <div className="mb-3">
                    <MediaPicker value={tile.photoSrc} onChange={(photoSrc) => update(i, { photoSrc })} />
                  </div>

                  <label className="block text-[13px] font-semibold mb-2">Headline</label>
                  <input
                    value={tile.headline}
                    onChange={(e) => update(i, { headline: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
                  />

                  <label className="block text-[13px] font-semibold mb-2">URL</label>
                  <input
                    value={tile.href}
                    onChange={(e) => update(i, { href: e.target.value })}
                    placeholder="https://www.unmissables.xyz/p/..."
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3 text-[#888]"
                  />

                  <label className="block text-[13px] font-semibold mb-2">Type</label>
                  <select
                    value={tile.type}
                    onChange={(e) => update(i, { type: e.target.value as TileType })}
                    className="px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
                  >
                    <option value="essay">Essay</option>
                    <option value="podcast">Podcast</option>
                  </select>

                  <div className="flex gap-4 items-center mb-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#999] mb-2">Tile Color</label>
                      <input
                        type="color"
                        value={tile.bg}
                        onChange={(e) => update(i, { bg: e.target.value })}
                        className="w-10 h-8 border border-[#ddd] rounded-[5px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#999] mb-2">Overlay</label>
                      <select
                        value={tile.overlay}
                        onChange={(e) => update(i, { overlay: e.target.value as Tile["overlay"] })}
                        className="px-2 py-[8px] border border-[#ddd] rounded-md text-[13px]"
                      >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                  </div>

                  {confirmingDelete === i ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#b33] font-semibold">Delete for good?</span>
                      <button type="button" onClick={() => remove(i)} className="bg-[#b33] text-white rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                        Yes, delete
                      </button>
                      <button type="button" onClick={() => setConfirmingDelete(null)} className="bg-white border border-[#ddd] rounded-[5px] px-[10px] py-[5px] text-[11px]">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setConfirmingDelete(i)} className="bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
