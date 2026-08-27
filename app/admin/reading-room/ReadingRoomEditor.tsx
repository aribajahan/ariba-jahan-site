"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Book = { title: string; author: string; coverSrc: string; note: string; link: string };

export default function ReadingRoomEditor({ initialItems }: { initialItems: Book[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (i: number, patch: Partial<Book>) => setItems((list) => list.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    setItems(next);
  };
  const remove = (i: number) => {
    setItems((list) => list.filter((_, idx) => idx !== i));
    setOpenIndex(null);
  };
  const addNew = () => {
    setItems((list) => [...list, { title: "", author: "", coverSrc: "", note: "", link: "" }]);
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/reading-room-books.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Reading Room via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Page — not finished on the live site yet</div>
      <h1 className="text-2xl mb-2">Reading Room</h1>
      <p className="text-[14px] text-[#888] mb-6">
        Modeled now so the schema is ready whenever you finish the page design — a book/recommendation collection, same pattern as Testimonials.
      </p>

      {items.length === 0 ? (
        <div className="bg-[#fafaf8] border border-dashed border-[#d5d2cc] rounded-[10px] p-8 text-center mb-3">
          <div className="text-sm text-[#888] mb-3">No books added yet.</div>
          <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-[18px] py-[9px] text-[13px] font-semibold">
            + Add Your First Book
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-3">
            <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold">
              + Add Book
            </button>
          </div>
          <div className="flex flex-col gap-[10px]">
            {items.map((book, i) => {
              const open = openIndex === i;
              return (
                <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
                  <div className="flex items-center gap-[14px] px-[18px] py-4">
                    <div className="flex flex-col gap-[2px]">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                    </div>
                    <div className="flex-1 text-sm">{book.title || <span className="text-[#bbb]">Untitled</span>}</div>
                    <button type="button" onClick={() => setOpenIndex(open ? null : i)} className="text-[#888] text-sm">
                      {open ? "Close" : "Edit →"}
                    </button>
                  </div>
                  {open && (
                    <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4 flex flex-col gap-3">
                      <input value={book.title} onChange={(e) => update(i, { title: e.target.value })} placeholder="Title" className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm" />
                      <input value={book.author} onChange={(e) => update(i, { author: e.target.value })} placeholder="Author" className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm" />
                      <input value={book.coverSrc} onChange={(e) => update(i, { coverSrc: e.target.value })} placeholder="Cover image path" className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm" />
                      <textarea value={book.note} onChange={(e) => update(i, { note: e.target.value })} placeholder="Why it's worth reading" rows={2} className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm resize-y" />
                      <input value={book.link} onChange={(e) => update(i, { link: e.target.value })} placeholder="Link (optional)" className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm text-[#888]" />
                      <button type="button" onClick={() => remove(i)} className="self-start bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
