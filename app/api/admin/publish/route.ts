import { NextResponse } from "next/server";
import { publishFiles } from "../../../../lib/github";

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

  try {
    const result = await publishFiles(
      fileList,
      typeof message === "string" && message.trim() ? message : "Update site content via Studio",
      deletionList
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Publish failed", error);
    return NextResponse.json({ ok: false, error: "Failed to publish." }, { status: 500 });
  }
}
