import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { publishFiles } from "../../../../lib/github";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function sanitizeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "upload"}${ext}`;
}

function uniqueUploadPath(filename: string): string {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  let candidate = filename;
  let i = 1;
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  while (fs.existsSync(path.join(uploadsDir, candidate))) {
    candidate = `${base}-${i}${ext}`;
    i++;
  }
  return `/uploads/${candidate}`;
}

export async function POST(request: Request) {
  const { filename, dataUrl, alt, tags } = await request.json();

  if (typeof filename !== "string" || typeof dataUrl !== "string") {
    return NextResponse.json({ ok: false, error: "Missing filename or file data." }, { status: 400 });
  }

  const match = dataUrl.match(/^data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,(.+)$/);
  if (!match) {
    return NextResponse.json({ ok: false, error: "Unsupported image type." }, { status: 400 });
  }
  const base64 = match[2];
  if (Buffer.byteLength(base64, "base64") > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Image is too large (max 8MB)." }, { status: 400 });
  }

  const safeName = sanitizeFilename(filename);
  const publicPath = uniqueUploadPath(safeName);
  const repoPath = `public${publicPath}`;

  let meta: Record<string, { alt: string; tags: string[] }> = {};
  try {
    meta = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "media-library.json"), "utf-8"));
  } catch {
    meta = {};
  }
  meta[publicPath] = { alt: typeof alt === "string" ? alt : "", tags: Array.isArray(tags) ? tags : [] };

  try {
    await publishFiles(
      [
        { path: repoPath, content: `__base64__:${base64}` },
        { path: "content/media-library.json", content: JSON.stringify(meta, null, 2) + "\n" },
      ],
      `Upload ${publicPath} via Studio`
    );
    return NextResponse.json({ ok: true, src: publicPath });
  } catch (error) {
    console.error("Upload failed", error);
    return NextResponse.json({ ok: false, error: "Failed to upload." }, { status: 500 });
  }
}
