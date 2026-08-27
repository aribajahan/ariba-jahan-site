import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"]);
const PUBLIC_DIRS = ["assets", "uploads"];
const CONTENT_ROOT = path.join(process.cwd(), "content");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

export type MediaMeta = { alt: string; tags: string[] };
export type MediaItem = {
  src: string;
  alt: string;
  tags: string[];
  usedOn: string[];
  pages: string[];
  collections: string[];
  /** Raw, un-humanized collection filenames (e.g. "speaking-logos") — a stable
   * identity for logic that needs to key off a collection, as opposed to
   * `collections`, which is display text and can change independently. */
  collectionKeys: string[];
};

function readMetaFile(): Record<string, MediaMeta> {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_ROOT, "media-library.json"), "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function listImageFiles(): string[] {
  const files: string[] = [];
  for (const dir of PUBLIC_DIRS) {
    const full = path.join(PUBLIC_ROOT, dir);
    let entries: string[] = [];
    try {
      entries = fs.readdirSync(full);
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase())) {
        files.push(`/${dir}/${entry}`);
      }
    }
  }
  return files;
}

function humanizeContentFile(relativePath: string): string {
  const withoutExt = relativePath.replace(/\.json$/, "");
  const parts = withoutExt.split(path.sep);
  return parts[parts.length - 1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function findSectionKey(doc: unknown, imagePath: string): string | null {
  if (typeof doc !== "object" || doc === null) return null;
  for (const [key, value] of Object.entries(doc as Record<string, unknown>)) {
    if (JSON.stringify(value).includes(imagePath)) return key;
  }
  return null;
}

function walkContentFiles(dir: string, out: string[] = []): string[] {
  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkContentFiles(full, out);
    // media-library.json itself always contains every image's own path as a
    // metadata key, which would otherwise make every image show as "used on
    // Media Library" — exclude it, it's not a real content reference.
    else if (entry.name.endsWith(".json") && entry.name !== "media-library.json") out.push(full);
  }
  return out;
}

type ContentFile = {
  raw: string;
  kind: "page" | "collection" | "other";
  key: string;
  label: string;
  doc: unknown;
};

/** Reads and parses every content file once, up front — not once per image
 * (getMediaLibrary previously called usageFor per image, and usageFor
 * re-read+re-parsed every content file inside that per-image call, an
 * O(images × files) scan). */
function loadContentFiles(paths: string[]): ContentFile[] {
  return paths.map((full) => {
    const relative = path.relative(CONTENT_ROOT, full);
    let raw = "";
    try {
      raw = fs.readFileSync(full, "utf-8");
    } catch {
      raw = "";
    }
    const kind: ContentFile["kind"] = relative.startsWith("pages" + path.sep)
      ? "page"
      : relative.startsWith("collections" + path.sep)
      ? "collection"
      : "other";
    let doc: unknown;
    if (kind === "page" && raw) {
      try {
        doc = JSON.parse(raw);
      } catch {
        doc = undefined;
      }
    }
    return { raw, kind, key: path.basename(relative, ".json"), label: humanizeContentFile(relative), doc };
  });
}

type Usage = { usedOn: string[]; pages: string[]; collections: string[]; collectionKeys: string[] };

/** Scans every content file for references to an image path, so Media
 * Library can show a real "used on" list instead of a static guess. Buckets
 * each reference into "page" or "collection" so the admin UI can filter by
 * either facet — a file that's neither (e.g. content/seo.json) is recorded
 * in `usedOn` for the audit trail but left out of both facets, since it's
 * not a real page section or a real collection. */
function usageFor(imagePath: string, contentFiles: ContentFile[]): Usage {
  const usedOn: string[] = [];
  const pages = new Set<string>();
  const collections = new Set<string>();
  const collectionKeys = new Set<string>();

  for (const file of contentFiles) {
    if (!file.raw.includes(imagePath)) continue;

    if (file.kind === "page") {
      const sectionKey = file.doc ? findSectionKey(file.doc, imagePath) : null;
      usedOn.push(sectionKey ? `${file.label} → ${sectionKey}` : file.label);
      pages.add(file.label);
    } else if (file.kind === "collection") {
      usedOn.push(file.label);
      collections.add(file.label);
      collectionKeys.add(file.key);
    } else {
      usedOn.push(file.label);
    }
  }
  return { usedOn, pages: Array.from(pages), collections: Array.from(collections), collectionKeys: Array.from(collectionKeys) };
}

export function getMediaLibrary(): MediaItem[] {
  const meta = readMetaFile();
  const files = listImageFiles();
  const contentFiles = loadContentFiles(walkContentFiles(CONTENT_ROOT));

  return files.map((src) => {
    const usage = usageFor(src, contentFiles);
    return {
      src,
      alt: meta[src]?.alt ?? "",
      tags: meta[src]?.tags ?? [],
      usedOn: usage.usedOn,
      pages: usage.pages,
      collections: usage.collections,
      collectionKeys: usage.collectionKeys,
    };
  });
}
