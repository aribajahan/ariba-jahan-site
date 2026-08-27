"use client";

import { useState } from "react";

// LinkedIn-skills-style tag editor: short items sit as reorderable pills in a
// horizontal wrap instead of a long vertical list, with an inline field to
// add new ones. Meant for short single-line items (names, format labels) --
// full-sentence lists (fit points, bio paragraphs) stay on StringListEditor,
// where a chip layout would just look like oddly-shaped pills of paragraph text.
export default function TagListEditor({
  items,
  onChange,
  placeholder = "Add…",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addDraft = () => {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  };

  const updateTag = (i: number, value: string) => onChange(items.map((v, idx) => (idx === i ? value : v)));
  const removeTag = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
    setDragIndex(null);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {items.map((value, i) => (
        <span
          key={i}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(i)}
          className={`flex items-center gap-[6px] bg-[#f0efec] border rounded-full pl-3 pr-2 py-[6px] cursor-grab active:cursor-grabbing ${
            dragIndex === i ? "border-[#181818] opacity-50" : "border-[#ddd]"
          }`}
        >
          <input
            value={value}
            onChange={(e) => updateTag(i, e.target.value)}
            className="bg-transparent text-[13px] outline-none"
            style={{ width: `${Math.max(value.length, 2)}ch` }}
          />
          <button
            type="button"
            onClick={() => removeTag(i)}
            className="text-[#999] hover:text-[#c44] text-[13px] leading-none"
            aria-label={`Remove ${value}`}
          >
            ✕
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addDraft();
          } else if (e.key === "Backspace" && draft === "" && items.length > 0) {
            removeTag(items.length - 1);
          }
        }}
        placeholder={placeholder}
        className="border border-dashed border-[#ccc] rounded-full px-3 py-[6px] text-[13px] min-w-[120px] flex-1"
      />
    </div>
  );
}
