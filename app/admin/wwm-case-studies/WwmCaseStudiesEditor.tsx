"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";
import type { CaseStudy } from "../../data/work-with-me";

const inputCls = "w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3";
const labelCls = "block text-[13px] font-semibold mb-2";

const EMPTY: CaseStudy = {
  tagRotationDeg: 0,
  photoSrc: "",
  client: "",
  title: "",
  summary: "",
  pills: [],
  challenge: "",
  solution: "",
  impact: "",
  roleContext: "",
};

export default function WwmCaseStudiesEditor({ initialItems }: { initialItems: CaseStudy[] }) {
  const [items, setItems] = useState(initialItems);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<number | null>(null);
  const { publish, publishing, result } = usePublish();

  const update = (index: number, patch: Partial<CaseStudy>) => {
    setItems((list) => list.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  };

  const updateTestimonial = (index: number, patch: Partial<NonNullable<CaseStudy["testimonial"]>>) => {
    setItems((list) =>
      list.map((c, i) =>
        i === index
          ? { ...c, testimonial: { quote: "", name: "", role: "", ...c.testimonial, ...patch } }
          : c
      )
    );
  };

  const toggleTestimonial = (index: number, on: boolean) => {
    setItems((list) =>
      list.map((c, i) => {
        if (i !== index) return c;
        if (!on) {
          const { testimonial: _removed, ...rest } = c;
          return rest;
        }
        return { ...c, testimonial: c.testimonial ?? { quote: "", name: "", role: "" } };
      })
    );
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    setOpenIndex(target);
  };

  const remove = (index: number) => {
    setItems((list) => list.filter((_, i) => i !== index));
    setConfirmingDelete(null);
    setOpenIndex(null);
  };

  const addNew = () => {
    setItems((list) => [...list, { ...EMPTY }]);
    setOpenIndex(items.length);
  };

  const handlePublish = () =>
    publish(
      [{ path: "content/collections/wwm-case-studies.json", content: JSON.stringify(items, null, 2) + "\n" }],
      "Update Work With Me case studies via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">
        Collection · the flip cards on Work With Me
      </div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl">Case Studies (Work With Me)</h1>
        <button
          type="button"
          onClick={addNew}
          className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold"
        >
          + New Case Study
        </button>
      </div>
      <p className="text-[13px] text-[#777] mb-7 leading-[1.5]">
        Front of card: client, title, summary, tags. Back of card: challenge, solution, impact, role
        &amp; context, and an optional testimonial that opens when a reader clicks the name. The Home
        page&rsquo;s Select Work strip is a separate collection — editing here does not change it.
      </p>

      <div className="flex flex-col gap-[10px]">
        {items.map((cs, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <div className="flex flex-col gap-[2px]">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="text-[10px] text-[#888] disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    className="text-[10px] text-[#888] disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
                <span className="text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded bg-[#F5A8D5] text-[#2D2D2D] whitespace-nowrap">
                  Case Study {i + 1}
                </span>
                <div className="flex-1 text-sm truncate">
                  {cs.client || <span className="text-[#bbb]">Untitled</span>}
                  {cs.title ? <span className="text-[#999]"> — {cs.title}</span> : null}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="text-[#888] text-sm"
                >
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4">
                  <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#999] mb-3">
                    Front of card
                  </div>

                  <label className={labelCls}>Client</label>
                  <input
                    value={cs.client}
                    onChange={(e) => update(i, { client: e.target.value })}
                    className={inputCls}
                  />

                  <label className={labelCls}>Title</label>
                  <input
                    value={cs.title}
                    onChange={(e) => update(i, { title: e.target.value })}
                    className={inputCls}
                  />

                  <label className={labelCls}>Summary</label>
                  <textarea
                    rows={3}
                    value={cs.summary}
                    onChange={(e) => update(i, { summary: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />

                  <label className={labelCls}>Tags — one per line</label>
                  <textarea
                    rows={4}
                    value={cs.pills.join("\n")}
                    onChange={(e) =>
                      update(i, { pills: e.target.value.split("\n").map((p) => p.trim()).filter(Boolean) })
                    }
                    className={`${inputCls} resize-y`}
                  />
                  <p className="text-[12px] text-[#888] -mt-1 mb-3">
                    On phones only the first two tags show.
                  </p>

                  <label className={labelCls}>Photo</label>
                  <input
                    value={cs.photoSrc}
                    onChange={(e) => update(i, { photoSrc: e.target.value })}
                    className={inputCls}
                  />

                  <label className={labelCls}>Tag tilt (degrees)</label>
                  <input
                    type="number"
                    value={cs.tagRotationDeg}
                    onChange={(e) => update(i, { tagRotationDeg: Number(e.target.value) || 0 })}
                    className="w-[120px] px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-1"
                  />
                  <p className="text-[12px] text-[#888] mb-4">
                    How far the pink &ldquo;Case Study&rdquo; label tilts. Small values like -3 to 3.
                  </p>

                  <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#999] mb-3 pt-2 border-t border-[#f0efec]">
                    Back of card
                  </div>

                  <label className={labelCls}>Challenge</label>
                  <textarea
                    rows={4}
                    value={cs.challenge}
                    onChange={(e) => update(i, { challenge: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />

                  <label className={labelCls}>Solution</label>
                  <textarea
                    rows={4}
                    value={cs.solution}
                    onChange={(e) => update(i, { solution: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />

                  <label className={labelCls}>Impact</label>
                  <textarea
                    rows={4}
                    value={cs.impact}
                    onChange={(e) => update(i, { impact: e.target.value })}
                    className={`${inputCls} resize-y`}
                  />

                  <label className={labelCls}>Role &amp; context</label>
                  <input
                    value={cs.roleContext}
                    onChange={(e) => update(i, { roleContext: e.target.value })}
                    className={inputCls}
                  />

                  <label className="flex items-center gap-2 text-[13px] font-semibold mb-3 pt-2">
                    <input
                      type="checkbox"
                      checked={!!cs.testimonial}
                      onChange={(e) => toggleTestimonial(i, e.target.checked)}
                    />
                    Include a testimonial on this card
                  </label>

                  {cs.testimonial && (
                    <div className="border-l-2 border-[#eee] pl-4 mb-4">
                      <label className={labelCls}>Quote</label>
                      <textarea
                        rows={4}
                        value={cs.testimonial.quote}
                        onChange={(e) => updateTestimonial(i, { quote: e.target.value })}
                        className={`${inputCls} resize-y`}
                      />

                      <label className={labelCls}>Name</label>
                      <input
                        value={cs.testimonial.name}
                        onChange={(e) => updateTestimonial(i, { name: e.target.value })}
                        className={inputCls}
                      />

                      <label className={labelCls}>Role</label>
                      <input
                        value={cs.testimonial.role}
                        onChange={(e) => updateTestimonial(i, { role: e.target.value })}
                        className={inputCls}
                      />
                      <p className="text-[12px] text-[#888] -mt-1">
                        The card shows &ldquo;Read what {cs.testimonial.name || "[name]"} said&rdquo;.
                      </p>
                    </div>
                  )}

                  {confirmingDelete === i ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#b33] font-semibold">Delete for good?</span>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="bg-[#b33] text-white rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold"
                      >
                        Yes, delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingDelete(null)}
                        className="bg-white border border-[#ddd] rounded-[5px] px-[10px] py-[5px] text-[11px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingDelete(i)}
                      className="bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold"
                    >
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
