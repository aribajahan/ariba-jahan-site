"use client";

import { useState } from "react";
import PublishBar from "../_shared/PublishBar";
import { usePublish } from "../_shared/usePublish";

type Article = {
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  body: string;
  tags: string[];
  publishedDate: string;
  status: "draft" | "published";
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const todayISO = () => new Date().toISOString().slice(0, 10);

const emptyArticle = (): Article => ({
  slug: "",
  title: "",
  coverImage: "",
  excerpt: "",
  body: "",
  tags: [],
  publishedDate: todayISO(),
  status: "draft",
});

export default function ArticlesEditor({ initialItems }: { initialItems: Article[] }) {
  // Each item is tagged with a stable editor-only id so update/remove/open
  // state never depends on `slug`, which can be empty or duplicated while
  // a new article is still being titled.
  const [items, setItems] = useState(() => initialItems.map((a, i) => ({ ...a, _id: `existing-${i}` })));
  const [nextDraftId, setNextDraftId] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
  const { publish, publishing, result } = usePublish();

  const sorted = [...items].sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

  const update = (id: string, patch: Partial<Article>) => {
    setItems((list) => list.map((a) => (a._id === id ? { ...a, ...patch } : a)));
  };

  const remove = (id: string) => {
    setItems((list) => list.filter((a) => a._id !== id));
    setConfirmingDelete(null);
    setOpenId(null);
  };

  const addNew = () => {
    const id = `draft-${nextDraftId}`;
    setNextDraftId((n) => n + 1);
    setItems((list) => [{ ...emptyArticle(), _id: id }, ...list]);
    setOpenId(id);
  };

  const handlePublish = () =>
    publish(
      [
        {
          path: "content/collections/articles.json",
          content: JSON.stringify(items.map(({ _id, ...rest }) => rest), null, 2) + "\n",
        },
      ],
      "Update Articles via Studio"
    );

  return (
    <div className="max-w-[820px] p-10">
      <div className="text-xs font-semibold text-[#888] mb-[6px]">Collection · native blog on your own site</div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl">Articles</h1>
        <button type="button" onClick={addNew} className="bg-[#181818] text-white rounded-md px-4 py-[9px] text-[13px] font-semibold">
          + New Article
        </button>
      </div>
      <p className="text-[14px] text-[#888] mb-6">
        One shared Article template renders every entry here. Publishing a new piece is filling out this form, no new page ever
        gets coded. Separate from Unmissables (that lives on unmissables.xyz).
      </p>

      <div className="flex flex-col gap-[10px]">
        {sorted.map((article) => {
          const open = openId === article._id;
          return (
            <div key={article._id} className="bg-white border border-[#e2e0dc] rounded-[10px] overflow-hidden">
              <div className="flex items-center gap-[14px] px-[18px] py-4">
                <span
                  className={`text-[10px] font-bold tracking-[0.06em] uppercase px-2 py-[3px] rounded ${
                    article.status === "published" ? "bg-[#8EF942] text-[#2D2D2D]" : "bg-[#f0efec] text-[#888]"
                  }`}
                >
                  {article.status === "published" ? "Published" : "Draft"}
                </span>
                <div className="flex-1 text-sm truncate">{article.title || <span className="text-[#bbb]">Untitled</span>}</div>
                <span className="text-xs text-[#999]">
                  {article.status === "published" ? article.publishedDate : "Unpublished"}
                </span>
                <button type="button" onClick={() => setOpenId(open ? null : article._id)} className="text-[#888] text-sm">
                  {open ? "Close" : "Edit →"}
                </button>
              </div>

              {open && (
                <div className="px-[18px] pb-5 border-t border-[#f0efec] pt-4 flex flex-col gap-3">
                  <label className="block text-[13px] font-semibold">Title</label>
                  <input
                    value={article.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const autoSlug = article.slug === "" || article.slug === slugify(article.title) ? slugify(title) : article.slug;
                      update(article._id, { title, slug: autoSlug });
                    }}
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm"
                  />

                  <label className="block text-[13px] font-semibold">Slug</label>
                  <input
                    value={article.slug}
                    onChange={(e) => update(article._id, { slug: slugify(e.target.value) })}
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm text-[#888]"
                  />

                  <label className="block text-[13px] font-semibold">Cover Image</label>
                  <input
                    value={article.coverImage}
                    onChange={(e) => update(article._id, { coverImage: e.target.value })}
                    placeholder="/uploads/photo.jpg"
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm"
                  />

                  <label className="block text-[13px] font-semibold">Excerpt</label>
                  <textarea
                    value={article.excerpt}
                    onChange={(e) => update(article._id, { excerpt: e.target.value })}
                    rows={2}
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm resize-y"
                  />

                  <label className="block text-[13px] font-semibold">Body (Markdown)</label>
                  <textarea
                    value={article.body}
                    onChange={(e) => update(article._id, { body: e.target.value })}
                    rows={10}
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm font-mono resize-y"
                  />

                  <label className="block text-[13px] font-semibold">Tags (comma separated)</label>
                  <input
                    value={article.tags.join(", ")}
                    onChange={(e) => update(article._id, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                    className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm"
                  />

                  <div className="flex gap-4 items-end">
                    <div>
                      <label className="block text-[13px] font-semibold mb-1">Published Date</label>
                      <input
                        type="date"
                        value={article.publishedDate}
                        onChange={(e) => update(article._id, { publishedDate: e.target.value })}
                        className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold mb-1">Status</label>
                      <select
                        value={article.status}
                        onChange={(e) => update(article._id, { status: e.target.value as "draft" | "published" })}
                        className="border border-[#ddd] rounded-md px-3 py-[8px] text-sm"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {confirmingDelete === article._id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#b33] font-semibold">Delete for good?</span>
                      <button type="button" onClick={() => remove(article._id)} className="bg-[#b33] text-white rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
                        Yes, delete
                      </button>
                      <button type="button" onClick={() => setConfirmingDelete(null)} className="bg-white border border-[#ddd] rounded-[5px] px-[10px] py-[5px] text-[11px]">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setConfirmingDelete(article._id)} className="self-start bg-[#fdeaea] text-[#b33] border border-[#f0c0c0] rounded-[5px] px-[10px] py-[5px] text-[11px] font-semibold">
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
            No articles yet. Click + New Article.
          </div>
        )}
      </div>

      <PublishBar onPublish={handlePublish} publishing={publishing} result={result} />
    </div>
  );
}
