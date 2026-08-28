"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import MediaPicker from "../_shared/MediaPicker";

type StoryPhoto = {
  src: string;
  top: number;
  widthPct: number;
  rotate: number;
  z: number;
  side: "left" | "right";
};

type StoryChapter = {
  id: number;
  align: "photo-left" | "photo-right";
  baseRot: number;
  wrapperHeight: number;
  headline: string;
  body: string;
  tapeTop: number;
  tapeRotate: number;
  tapeShadow?: boolean;
  photoA: StoryPhoto;
  photoB: StoryPhoto;
};

const emptyChapter = (chapters: StoryChapter[]): StoryChapter => {
  const nextId = chapters.reduce((max, c) => Math.max(max, c.id), 0) + 1;
  const alternateLeft = chapters.length % 2 === 0;
  return {
    id: nextId,
    align: alternateLeft ? "photo-left" : "photo-right",
    baseRot: alternateLeft ? -2 : 2,
    wrapperHeight: 250,
    headline: "",
    body: "",
    tapeTop: 4,
    tapeRotate: alternateLeft ? -2 : 2,
    photoA: { src: "", top: 0, widthPct: 53, rotate: alternateLeft ? -4 : 4, z: 1, side: "left" },
    photoB: { src: "", top: 0, widthPct: 53, rotate: 4, z: 2, side: "right" },
  };
};

export default function StoryTimelineEditor({ initialItems }: { initialItems: StoryChapter[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<StoryChapter>) => {
    setItems((list) => list.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  const updatePhoto = (index: number, key: "photoA" | "photoB", patch: Partial<StoryPhoto>) => {
    setItems((list) => list.map((c, i) => (i === index ? { ...c, [key]: { ...c[key], ...patch } } : c)));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    if (openIndex === index) setOpenIndex(target);
    else if (openIndex === target) setOpenIndex(index);
  };

  const remove = (index: number) => {
    setItems((list) => list.filter((_, i) => i !== index));
    setConfirmingDelete(null);
    setOpenIndex(null);
  };

  const addNew = () => {
    setItems((list) => [...list, emptyChapter(list)]);
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/story-timeline.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Story Timeline via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection</div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl">Story Timeline</h1>
        <button
          type="button"
          onClick={addNew}
          className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold"
        >
          + New Chapter
        </button>
      </div>
      <p className="text-xs text-[#999] mb-5">
        Fine-tuned layout and rotation are handled in code. New chapters get sensible defaults automatically.
      </p>

      <div className="flex flex-col gap-[10px]">
        {items.map((chapter, i) => {
          const open = openIndex === i;
          return (
            <div key={chapter.id} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <div className="flex flex-col gap-[2px]">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                </div>
                <div className="flex-1 text-sm truncate">
                  {chapter.headline || <span className="text-[#bbb]">Untitled chapter</span>}
                </div>
                <button type="button" onClick={() => setOpenIndex(open ? null : i)} className="text-[#888] text-sm">
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4">
                  <label className="block text-[13px] font-semibold mb-2">Headline (tape label)</label>
                  <input
                    value={chapter.headline}
                    onChange={(e) => update(i, { headline: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
                  />

                  <label className="block text-[13px] font-semibold mb-2">Paragraph</label>
                  <textarea
                    rows={5}
                    value={chapter.body}
                    onChange={(e) => update(i, { body: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-4 resize-y"
                  />

                  <div className="flex gap-4 mb-2">
                    <div className="flex-1">
                      <label className="block text-[13px] font-semibold mb-2">Photo A</label>
                      <MediaPicker value={chapter.photoA.src} onChange={(src) => updatePhoto(i, "photoA", { src })} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[13px] font-semibold mb-2">Photo B</label>
                      <MediaPicker value={chapter.photoB.src} onChange={(src) => updatePhoto(i, "photoB", { src })} />
                    </div>
                  </div>

                  <div className="mt-4">
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
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="bg-[#fafaf8] border border-dashed border-[#d5d2cc] rounded-[10px] p-8 text-center text-sm text-[#888]">
            No chapters yet. Click + New Chapter.
          </div>
        )}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
