"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Tag = "Case Study" | "Quest";
type Entry = { tag: Tag; tagIndex: number; headline: string; description: string; photoSrc: string | null };

const BADGE_STYLE: Record<Tag, string> = {
  "Case Study": "bg-[#F5A8D5] text-[#2D2D2D]",
  Quest: "bg-[#FF6D24] text-[#2D2D2D]",
};

export default function CaseStudiesEditor({ initialItems }: { initialItems: Entry[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<Entry>) => {
    setItems((list) => list.map((e, i) => (i === index ? { ...e, ...patch } : e)));
  };

  const renumber = (list: Entry[]) => list.map((e, i) => ({ ...e, tagIndex: i + 1 }));

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(renumber(next));
  };

  const remove = (index: number) => {
    setItems((list) => renumber(list.filter((_, i) => i !== index)));
    setConfirmingDelete(null);
    setOpenIndex(null);
  };

  const addNew = () => {
    setItems((list) => renumber([...list, { tag: "Case Study", tagIndex: 0, headline: "", description: "", photoSrc: "" }]));
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/case-studies-quests.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Case Studies & Quests via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection — used on Home&rsquo;s Select Work strip</div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl">Case Studies &amp; Quests</h1>
        <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold">
          + New Entry
        </button>
      </div>

      <div className="flex flex-col gap-[10px]">
        {items.map((entry, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <div className="flex flex-col gap-[2px]">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                </div>
                <span className={`text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded ${BADGE_STYLE[entry.tag]}`}>
                  {entry.tag}
                </span>
                <div className="flex-1 text-sm truncate">{entry.headline || <span className="text-[#bbb]">Untitled</span>}</div>
                <button type="button" onClick={() => setOpenIndex(open ? null : i)} className="text-[#888] text-sm">
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4">
                  <label className="block text-[13px] font-semibold mb-2">Tag Type</label>
                  <select
                    value={entry.tag}
                    onChange={(e) => update(i, { tag: e.target.value as Tag })}
                    className="px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
                  >
                    <option value="Case Study">Case Study</option>
                    <option value="Quest">Quest</option>
                  </select>

                  <label className="block text-[13px] font-semibold mb-2">Headline</label>
                  <input
                    value={entry.headline}
                    onChange={(e) => update(i, { headline: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
                  />

                  <label className="block text-[13px] font-semibold mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={entry.description}
                    onChange={(e) => update(i, { description: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3 resize-y"
                  />

                  <label className="block text-[13px] font-semibold mb-2">Photo</label>
                  <input
                    value={entry.photoSrc ?? ""}
                    onChange={(e) => update(i, { photoSrc: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4"
                  />

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
