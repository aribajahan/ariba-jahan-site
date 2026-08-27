"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Category = "LEADERSHIP" | "SPEAKING" | "CLIENT";
type Page = "home" | "speaking" | "work-with-me";
type Testimonial = { category: Category; quote: string; name: string; role: string; showOn: Page[] };

const BADGE_STYLE: Record<Category, string> = {
  LEADERSHIP: "bg-[#FFFBF3] text-[#2D2D2D] border border-[#ddd]",
  SPEAKING: "bg-[#2D2D2D] text-white",
  CLIENT: "bg-[#E73131] text-white",
};

const PAGES: { value: Page; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "speaking", label: "Speaking" },
  { value: "work-with-me", label: "Work With Me" },
];

const emptyTestimonial = (): Testimonial => ({
  category: "CLIENT",
  quote: "",
  name: "",
  role: "",
  showOn: [],
});

export default function TestimonialsEditor({ initialItems }: { initialItems: Testimonial[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<Testimonial>) => {
    setItems((list) => list.map((t, i) => (i === index ? { ...t, ...patch } : t)));
  };

  const toggleShowOn = (index: number, page: Page) => {
    const current = items[index].showOn;
    const showOn = current.includes(page) ? current.filter((p) => p !== page) : [...current, page];
    update(index, { showOn });
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
    setItems((list) => [emptyTestimonial(), ...list]);
    setOpenIndex(0);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/testimonials.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Testimonials via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection</div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl">Testimonials</h1>
        <button
          type="button"
          onClick={addNew}
          className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold"
        >
          + New Testimonial
        </button>
      </div>

      <div className="flex flex-col gap-[10px]">
        {items.map((t, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <div className="flex flex-col gap-[2px]">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="text-[10px] text-[#888] disabled:opacity-30">▲</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="text-[10px] text-[#888] disabled:opacity-30">▼</button>
                </div>
                <span className={`text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded ${BADGE_STYLE[t.category]}`}>
                  {t.category}
                </span>
                <div className="flex-1 text-sm truncate">
                  {t.quote ? `"${t.quote.slice(0, 70)}${t.quote.length > 70 ? "…" : ""}"` : <span className="text-[#bbb]">Empty quote</span>}
                  {t.name && <> (<strong>{t.name}</strong>)</>}
                </div>
                <button type="button" onClick={() => setOpenIndex(open ? null : i)} className="text-[#888] text-sm">
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4">
                  <label className="block text-[13px] font-semibold mb-2">Quote</label>
                  <textarea
                    rows={3}
                    value={t.quote}
                    onChange={(e) => update(i, { quote: e.target.value })}
                    className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3 resize-y"
                  />
                  <div className="flex gap-3 mb-3">
                    <div className="flex-1">
                      <label className="block text-[13px] font-semibold mb-2">Name</label>
                      <input
                        value={t.name}
                        onChange={(e) => update(i, { name: e.target.value })}
                        className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[13px] font-semibold mb-2">Title / Org</label>
                      <input
                        value={t.role}
                        onChange={(e) => update(i, { role: e.target.value })}
                        className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm"
                      />
                    </div>
                  </div>
                  <label className="block text-[13px] font-semibold mb-2">Category</label>
                  <select
                    value={t.category}
                    onChange={(e) => update(i, { category: e.target.value as Category })}
                    className="px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
                  >
                    <option value="LEADERSHIP">Leadership</option>
                    <option value="SPEAKING">Speaking</option>
                    <option value="CLIENT">Client</option>
                  </select>

                  <label className="block text-[13px] font-semibold mb-2">Show On</label>
                  <div className="flex gap-4 mb-4">
                    {PAGES.map((p) => (
                      <label key={p.value} className="flex items-center gap-[6px] text-[13px]">
                        <input
                          type="checkbox"
                          checked={t.showOn.includes(p.value)}
                          onChange={() => toggleShowOn(i, p.value)}
                        />
                        {p.label}
                      </label>
                    ))}
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
        {items.length === 0 && (
          <div className="bg-[#fafaf8] border border-dashed border-[#d5d2cc] rounded-[10px] p-8 text-center text-sm text-[#888]">
            No testimonials yet. Click + New Testimonial.
          </div>
        )}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
