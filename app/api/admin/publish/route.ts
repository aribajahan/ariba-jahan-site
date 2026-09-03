import { NextResponse } from "next/server";
import { publishFiles, fetchContentJson } from "../../../../lib/github";
import { buildCopyMarkdown } from "../../../../lib/copyExport.mjs";

const ALLOWED_PREFIXES = ["content/", "public/uploads/"];
const isAllowedPath = (path: string) => ALLOWED_PREFIXES.some((prefix) => path.startsWith(prefix));

export async function POST(request: Request) {
  const { files, message, deletions } = await request.json();

  const fileList = Array.isArray(files) ? files : [];
  const deletionList = Array.isArray(deletions) ? deletions : [];

  if (fileList.length === 0 && deletionList.length === 0) {
    return NextResponse.json({ ok: false, error: "No files to publish." }, { status: 400 });
  }
  for (const file of fileList) {
    if (typeof file.path !== "string" || typeof file.content !== "string") {
      return NextResponse.json({ ok: false, error: "Malformed file entry." }, { status: 400 });
    }
    if (!isAllowedPath(file.path)) {
      return NextResponse.json({ ok: false, error: `Refusing to write outside content/: ${file.path}` }, { status: 400 });
    }
  }
  for (const path of deletionList) {
    if (typeof path !== "string" || !isAllowedPath(path)) {
      return NextResponse.json({ ok: false, error: `Refusing to delete outside content/: ${path}` }, { status: 400 });
    }
  }

  // Regenerate COPY.md — the readable snapshot of all site copy — so it lands in
  // the same commit as the content it describes. Best-effort: a failure here must
  // never block Ariba from publishing, so we log and ship the content regardless.
  const touchesCopy =
    fileList.some((file: { path: string }) => file.path.startsWith("content/") && file.path.endsWith(".json")) ||
    deletionList.some((path: string) => path.startsWith("content/") && path.endsWith(".json"));

  const outgoing = [...fileList];

  if (touchesCopy) {
    try {
      const current = await fetchContentJson();
      for (const path of deletionList) delete current[path];
      for (const file of fileList) {
        if (file.path.startsWith("content/") && file.path.endsWith(".json")) {
          current[file.path] = file.content;
        }
      }
      outgoing.push({ path: "COPY.md", content: buildCopyMarkdown(current) });
    } catch (error) {
      console.error("COPY.md regeneration failed; publishing content without it", error);
    }
  }

  try {
    const result = await publishFiles(
      outgoing,
      typeof message === "string" && message.trim() ? message : "Update site content via Studio",
      deletionList
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Publish failed", error);
    return NextResponse.json({ ok: false, error: "Failed to publish." }, { status: 500 });
  }
}
