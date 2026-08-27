"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePublish } from "../_shared/usePublish";

type MediaItem = { src: string; alt: string; tags: string[]; usedOn: string[] };

export default function MediaLibraryEditor({ initialItems }: { initialItems: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [addingTagFor, setAddingTagFor] = useState<string | null>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const { publish, publishing } = usePublish();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [items]);

  const unusedCount = items.filter((i) => i.usedOn.length === 0).length;

  const filtered = items.filter((item) => {
    if (search && !item.src.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Unused") return item.usedOn.length === 0;
    return item.tags.includes(activeFilter);
  });

  const saveMeta = async (updated: MediaItem[]) => {
    const meta: Record<string, { alt: string; tags: string[] }> = {};
    updated.forEach((item) => {
      meta[item.src] = { alt: item.alt, tags: item.tags };
    });
    await publish(
      [{ path: "content/media-library.json", content: JSON.stringify(meta, null, 2) + "\n" }],
      "Update Media Library metadata via Studio"
    );
  };

  const updateItem = (src: string, patch: Partial<MediaItem>) => {
    setItems((list) => list.map((i) => (i.src === src ? { ...i, ...patch } : i)));
  };

  const commitItemChange = (src: string, patch: Partial<MediaItem>) => {
    const updated = items.map((i) => (i.src === src ? { ...i, ...patch } : i));
    setItems(updated);
    saveMeta(updated);
  };

  const addTag = (src: string) => {
    if (!newTagValue.trim()) {
      setAddingTagFor(null);
      return;
    }
    const item = items.find((i) => i.src === src);
    if (item) commitItemChange(src, { tags: [...item.tags, newTagValue.trim()] });
    setNewTagValue("");
    setAddingTagFor(null);
  };

  const removeTag = (src: string, tag: string) => {
    const item = items.find((i) => i.src === src);
    if (item) commitItemChange(src, { tags: item.tags.filter((t) => t !== tag) });
  };

  const deleteImage = async (src: string) => {
    const remaining = items.filter((i) => i.src !== src);
    const meta: Record<string, { alt: string; tags: string[] }> = {};
    remaining.forEach((item) => {
      meta[item.src] = { alt: item.alt, tags: item.tags };
    });
    await publish(
      [{ path: "content/media-library.json", content: JSON.stringify(meta, null, 2) + "\n" }],
      `Delete ${src} via Studio`,
      [`public${src}`]
    );
    setItems(remaining);
    setConfirmingDelete(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, dataUrl, alt: "", tags: [] }),
      });
      const data = await res.json();
      if (data.ok) {
        setItems((list) => [{ src: data.src, alt: "", tags: [], usedOn: [] }, ...list]);
        router.refresh();
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-[900px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection</div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl">Media Library</h1>
        <label className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold cursor-pointer">
          {uploading ? "Uploading…" : "+ Upload"}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>
      <p className="text-[14px] text-[#888] mb-5">
        Every image, where it&rsquo;s used, its alt text, and tags. Unused images are flagged so you can safely delete them.
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by filename…"
        className="w-full px-3 py-[9px] border border-[#ddd] rounded-md text-[13px] mb-4"
      />

      <div className="flex gap-2 flex-wrap mb-5">
        {["All", ...allTags].map((tag) => (
          <span
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`text-xs font-semibold px-3 py-[5px] rounded-full cursor-pointer ${
              activeFilter === tag ? "bg-[#181818] text-white" : "bg-white border border-[#ddd]"
            }`}
          >
            {tag}
          </span>
        ))}
        <span
          onClick={() => setActiveFilter("Unused")}
          className={`text-xs font-semibold px-3 py-[5px] rounded-full cursor-pointer border border-dashed ${
            activeFilter === "Unused" ? "bg-[#181818] text-white border-[#181818]" : "text-[#999] border-[#ccc]"
          }`}
        >
          + Unused ({unusedCount})
        </span>
      </div>

      <div className="flex flex-col gap-[10px]">
        {filtered.map((item) => {
          const isUnused = item.usedOn.length === 0;
          return (
            <div
              key={item.src}
              className={`bg-white border rounded-[10px] p-[16px] flex gap-4 items-start ${isUnused ? "border-[#f0c0c0]" : "border-[#e2e0dc]"}`}
            >
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-[#f0efec]">
                <Image src={item.src} alt={item.alt || ""} fill sizes="64px" style={{ objectFit: "cover" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold mb-[6px] truncate">{item.src.split("/").pop()}</div>
                <div className="flex gap-[6px] flex-wrap mb-2">
                  {isUnused ? (
                    <span className="bg-[#fbeaea] text-[#b33] text-[11px] font-semibold px-2 py-[2px] rounded-full">Not used anywhere</span>
                  ) : (
                    item.usedOn.map((u) => (
                      <span key={u} className="bg-[#e8f4ea] text-[#2a7a3e] text-[11px] font-semibold px-2 py-[2px] rounded-full">
                        Used on {u}
                      </span>
                    ))
                  )}
                  {item.tags.map((tag) => (
                    <span key={tag} onClick={() => removeTag(item.src, tag)} className="bg-[#eef0fb] text-[#3d4bb3] text-[11px] font-semibold px-2 py-[2px] rounded-full cursor-pointer">
                      🏷 {tag} ✕
                    </span>
                  ))}
                  {addingTagFor === item.src ? (
                    <input
                      autoFocus
                      value={newTagValue}
                      onChange={(e) => setNewTagValue(e.target.value)}
                      onBlur={() => addTag(item.src)}
                      onKeyDown={(e) => e.key === "Enter" && addTag(item.src)}
                      className="text-[11px] border border-[#ddd] rounded-full px-2 py-[2px] w-20"
                    />
                  ) : (
                    <span onClick={() => setAddingTagFor(item.src)} className="bg-[#f0efec] text-[#999] text-[11px] font-semibold px-2 py-[2px] rounded-full cursor-pointer">
                      + tag
                    </span>
                  )}
                </div>
                <input
                  value={item.alt}
                  onChange={(e) => updateItem(item.src, { alt: e.target.value })}
                  onBlur={(e) => commitItemChange(item.src, { alt: e.target.value })}
                  placeholder="Alt text"
                  className="w-full text-[12px] px-2 py-[6px] border border-[#ddd] rounded-[5px]"
                />
              </div>
              <div className="flex flex-col gap-[6px] flex-shrink-0">
                {confirmingDelete === item.src ? (
                  <div className="flex flex-col gap-1">
                    {!isUnused && <span className="text-[10px] text-[#b33] max-w-[110px]">Used elsewhere — deleting may break it.</span>}
                    <span className="text-[10px] text-[#b33] font-semibold">Delete for good?</span>
                    <button type="button" onClick={() => deleteImage(item.src)} disabled={publishing} className="bg-[#b33] text-white rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                      Yes, delete
                    </button>
                    <button type="button" onClick={() => setConfirmingDelete(null)} className="bg-white border border-[#ddd] rounded-[5px] px-[10px] py-[5px] text-[11px]">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmingDelete(item.src)} className="bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold whitespace-nowrap">
                    Delete
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-sm text-[#888] text-center py-10">No images match.</div>}
      </div>

      <div className="mt-5 text-[13px] text-[#999]">
        {items.length} total images. Alt text and tags save automatically as you edit — no separate Publish step needed here.
      </div>
    </div>
  );
}
