import { NextResponse } from "next/server";
import { publishFiles } from "../../../../lib/github";

export async function POST(request: Request) {
  const { files, message } = await request.json();

  if (!Array.isArray(files) || files.length === 0) {
    return NextResponse.json({ ok: false, error: "No files to publish." }, { status: 400 });
  }
  for (const file of files) {
    if (typeof file.path !== "string" || typeof file.content !== "string") {
      return NextResponse.json({ ok: false, error: "Malformed file entry." }, { status: 400 });
    }
    if (!file.path.startsWith("content/") && !file.path.startsWith("public/uploads/")) {
      return NextResponse.json({ ok: false, error: `Refusing to write outside content/: ${file.path}` }, { status: 400 });
    }
  }

  try {
    const result = await publishFiles(files, typeof message === "string" && message.trim() ? message : "Update site content via Studio");
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Publish failed", error);
    return NextResponse.json({ ok: false, error: "Failed to publish." }, { status: 500 });
  }
}
