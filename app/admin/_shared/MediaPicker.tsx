"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isLogo } from "./isLogo";
import { uploadImage } from "./uploadImage";
import type { MediaItem } from "../../../lib/mediaLibrary";

export default function MediaPicker({
  value,
  onChange,
  placeholder = "/uploads/photo.jpg",
}: {
  value: string;
  onChange: (src: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open || items) return;
    setLoading(true);
    fetch("/api/admin/media-library")
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .finally(() => setLoading(false));
  }, [open, items]);

  const filtered = (items ?? []).filter((item) => !search || item.src.toLowerCase().includes(search.toLowerCase()));
  const currentItem = items?.find((item) => item.src === value);
  const valueIsLogo = currentItem ? isLogo(currentItem) : /\/logo-/.test(value);

  const choose = (src: string) => {
    onChange(src);
    setOpen(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadImage(file);
      if (data.ok && data.src) {
        choose(data.src);
        // Prepend the new upload to the cached list so reopening this same
        // picker instance shows it immediately instead of a stale list.
        setItems((list) =>
          list ? [{ src: data.src!, alt: "", tags: [], usedOn: [], pages: [], collections: [], collectionKeys: [] }, ...list] : list
        );
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <div
        className={`relative w-11 h-11 rounded-md overflow-hidden flex-shrink-0 border border-[#ddd] ${
          valueIsLogo ? "bg-[#f7f6f4]" : "bg-[#f0efec]"
        }`}
      >
        {value && (
          <Image
            src={value}
            alt=""
            fill
            sizes="44px"
            style={{ objectFit: valueIsLogo ? "contain" : "cover" }}
            className={valueIsLogo ? "p-1" : ""}
          />
        )}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-[100px] border border-[#ddd] rounded-md px-3 py-[8px] text-[13px]"
      />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-[#181818] text-white rounded-md px-3 py-[8px] text-[12px] font-semibold whitespace-nowrap"
      >
        Browse
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6" onClick={() => setOpen(false)}>
          <div
            className="bg-white rounded-[12px] w-full max-w-[900px] max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#eee] flex items-center gap-3">
              <h2 className="text-lg font-semibold flex-1">Choose an image</h2>
              <label className="bg-[#f0efec] text-[#444] rounded-md px-3 py-[7px] text-[12px] font-semibold cursor-pointer">
                {uploading ? "Uploading…" : "+ Upload New"}
                <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
              </label>
              <button type="button" onClick={() => setOpen(false)} className="text-[#888] text-xl leading-none px-1">
                ✕
              </button>
            </div>
            <div className="p-4 border-b border-[#eee]">
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by filename…"
                className="w-full px-3 py-[8px] border border-[#ddd] rounded-md text-[13px]"
              />
            </div>
            <div className="p-4 overflow-y-auto flex-1">
              {loading && <div className="text-sm text-[#888] text-center py-10">Loading…</div>}
              {!loading && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
                  {filtered.map((item) => {
                    const logo = isLogo(item);
                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => choose(item.src)}
                        className={`text-left border rounded-[8px] overflow-hidden hover:border-[#181818] transition-colors ${
                          item.src === value ? "border-[#181818] ring-1 ring-[#181818]" : "border-[#e2e0dc]"
                        }`}
                      >
                        <div className={`relative w-full aspect-square ${logo ? "bg-[#f7f6f4]" : "bg-[#f0efec]"}`}>
                          <Image
                            src={item.src}
                            alt={item.alt || ""}
                            fill
                            sizes="120px"
                            style={{ objectFit: logo ? "contain" : "cover" }}
                            className={logo ? "p-3" : ""}
                          />
                        </div>
                        <div className="text-[10px] px-2 py-[6px] truncate">{item.src.split("/").pop()}</div>
                      </button>
                    );
                  })}
                  {filtered.length === 0 && (
                    <div className="col-span-full text-sm text-[#888] text-center py-10">No images match.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
