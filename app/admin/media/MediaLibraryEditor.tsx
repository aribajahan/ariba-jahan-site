"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePublish } from "../_shared/usePublish";
import { isLogo } from "../_shared/isLogo";
import { uploadImage } from "../_shared/uploadImage";
import type { MediaItem } from "../../../lib/mediaLibrary";

type Filter = { type: "all" | "unused" | "tag" | "page" | "collection"; value?: string };

export default function MediaLibraryEditor({ initialItems }: { initialItems: MediaItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<Filter>({ type: "all" });
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const [addingTagFor, setAddingTagFor] = useState<string | null>(null);
  const [newTagValue, setNewTagValue] = useState("");
  const { publish, publishing } = usePublish();

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [items]);

  const allPages = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.pages.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, [items]);

  const allCollections = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.collections.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [items]);

  const unusedCount = items.filter((i) => i.usedOn.length === 0).length;

  const filtered = items.filter((item) => {
    if (search && !item.src.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter.type === "all") return true;
    if (filter.type === "unused") return item.usedOn.length === 0;
    if (filter.type === "tag") return item.tags.includes(filter.value!);
    if (filter.type === "page") return item.pages.includes(filter.value!);
    if (filter.type === "collection") return item.collections.includes(filter.value!);
    return true;
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
    setOpenSrc(null);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadImage(file);
      if (data.ok && data.src) {
        setItems((list) => [
          { src: data.src!, alt: "", tags: [], usedOn: [], pages: [], collections: [], collectionKeys: [] },
          ...list,
        ]);
        router.refresh();
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const isActive = (f: Filter) => filter.type === f.type && filter.value === f.value;
  const chipCls = (active: boolean) =>
    `text-xs font-semibold px-3 py-[5px] rounded-full cursor-pointer ${
      active ? "bg-[#181818] text-white" : "bg-white border border-[#ddd]"
    }`;

  return (
    <div className="max-w-[1400px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">DAM</div>
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
        className="w-full max-w-[420px] px-3 py-[9px] border border-[#ddd] rounded-md text-[13px] mb-4"
      />

      <div className="flex flex-col gap-[10px] mb-6">
        <div className="flex gap-2 flex-wrap items-center">
          <span onClick={() => setFilter({ type: "all" })} className={chipCls(isActive({ type: "all" }))}>
            All
          </span>
          <span
            onClick={() => setFilter({ type: "unused" })}
            className={`text-xs font-semibold px-3 py-[5px] rounded-full cursor-pointer border border-dashed ${
              isActive({ type: "unused" }) ? "bg-[#181818] text-white border-[#181818]" : "text-[#999] border-[#ccc]"
            }`}
          >
            + Unused ({unusedCount})
          </span>
        </div>

        {allPages.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.06em] mr-1">Page:</span>
            {allPages.map((p) => (
              <span key={p} onClick={() => setFilter({ type: "page", value: p })} className={chipCls(isActive({ type: "page", value: p }))}>
                {p}
              </span>
            ))}
          </div>
        )}

        {allCollections.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.06em] mr-1">Collection:</span>
            {allCollections.map((c) => (
              <span key={c} onClick={() => setFilter({ type: "collection", value: c })} className={chipCls(isActive({ type: "collection", value: c }))}>
                {c}
              </span>
            ))}
          </div>
        )}

        {allTags.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <span className="text-[11px] font-bold text-[#999] uppercase tracking-[0.06em] mr-1">Tag:</span>
            {allTags.map((t) => (
              <span key={t} onClick={() => setFilter({ type: "tag", value: t })} className={chipCls(isActive({ type: "tag", value: t }))}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {filtered.map((item) => {
          const isUnused = item.usedOn.length === 0;
          const isOpen = openSrc === item.src;
          const logo = isLogo(item);
          return (
            <div
              key={item.src}
              className={`bg-white border rounded-[10px] overflow-hidden flex flex-col ${isUnused ? "border-[#f0c0c0]" : "border-[#e2e0dc]"}`}
            >
              <div className={`relative w-full aspect-square ${logo ? "bg-[#f7f6f4]" : "bg-[#f0efec]"}`}>
                <Image
                  src={item.src}
                  alt={item.alt || ""}
                  fill
                  sizes="180px"
                  style={{ objectFit: logo ? "contain" : "cover" }}
                  className={logo ? "p-4" : ""}
                />
              </div>
              <div className="p-3 flex-1 flex flex-col gap-2">
                <div className="text-[12px] font-semibold truncate" title={item.src}>
                  {item.src.split("/").pop()}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {isUnused ? (
                    <span className="bg-[#fbeaea] text-[#b33] text-[10px] font-semibold px-2 py-[2px] rounded-full">Not used anywhere</span>
                  ) : (
                    item.usedOn.map((u) => (
                      <span key={u} className="bg-[#e8f4ea] text-[#2a7a3e] text-[10px] font-semibold px-2 py-[2px] rounded-full">
                        {u}
                      </span>
                    ))
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenSrc(isOpen ? null : item.src);
                    setConfirmingDelete(null);
                  }}
                  className="text-[11px] text-[#888] text-left mt-auto"
                >
                  {isOpen ? "Close" : "Edit"}
                </button>
              </div>

              {isOpen && (
                <div className="p-3 pt-0 flex flex-col gap-2 border-t border-[#f0efec]">
                  <input
                    value={item.alt}
                    onChange={(e) => updateItem(item.src, { alt: e.target.value })}
                    onBlur={(e) => commitItemChange(item.src, { alt: e.target.value })}
                    placeholder="Alt text"
                    className="w-full text-[12px] px-2 py-[6px] border border-[#ddd] rounded-[5px]"
                  />
                  <div className="flex gap-[6px] flex-wrap">
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
                  {confirmingDelete === item.src ? (
                    <div className="flex flex-col gap-1">
                      {!isUnused && <span className="text-[10px] text-[#b33]">Used elsewhere. Deleting may break it.</span>}
                      <span className="text-[10px] text-[#b33] font-semibold">Delete for good?</span>
                      <div className="flex gap-1">
                        <button type="button" onClick={() => deleteImage(item.src)} disabled={publishing} className="bg-[#b33] text-white rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                          Yes, delete
                        </button>
                        <button type="button" onClick={() => setConfirmingDelete(null)} className="bg-white border border-[#ddd] rounded-[5px] px-[10px] py-[5px] text-[11px]">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setConfirmingDelete(item.src)} className="bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div className="col-span-full text-sm text-[#888] text-center py-10">No images match.</div>}
      </div>

      <div className="mt-5 text-[13px] text-[#999]">
        {items.length} total images. Alt text and tags save automatically as you edit, no separate Publish step needed here.
      </div>
    </div>
  );
}
