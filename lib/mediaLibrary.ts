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
  const label = parts[parts.length - 1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  if (parts[0] === "pages") return label;
  if (parts[0] === "collections") return label;
  return label;
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

/** Scans every content/*.json file for references to each image path, so
 * Media Library can show a real "used on" list instead of a static guess. */
function usageFor(imagePath: string, allContentFiles: string[]): string[] {
  const usages: string[] = [];
  for (const file of allContentFiles) {
    let raw: string;
    try {
      raw = fs.readFileSync(file, "utf-8");
    } catch {
      continue;
    }
    if (!raw.includes(imagePath)) continue;

    const relative = path.relative(CONTENT_ROOT, file);
    const label = humanizeContentFile(relative);

    if (relative.startsWith("pages" + path.sep)) {
      const doc = JSON.parse(raw);
      const sectionKey = findSectionKey(doc, imagePath);
      usages.push(sectionKey ? `${label} → ${sectionKey}` : label);
    } else {
      usages.push(label);
    }
  }
  return usages;
}

export function getMediaLibrary(): MediaItem[] {
  const meta = readMetaFile();
  const files = listImageFiles();
  const allContentFiles = walkContentFiles(CONTENT_ROOT);

  return files.map((src) => ({
    src,
    alt: meta[src]?.alt ?? "",
    tags: meta[src]?.tags ?? [],
    usedOn: usageFor(src, allContentFiles),
  }));
}
