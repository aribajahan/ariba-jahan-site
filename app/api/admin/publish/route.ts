import { NextResponse } from "next/server";
import { publishFiles, fetchContentJson } from "../../../../lib/github";
import { buildCopyMarkdown } from "../../../../lib/copyExport.mjs";
import { hashPagePassword, isHashedPassword } from "../../../../lib/pageAccess";

const PAGE_SETTINGS_PATH = "content/page-settings.json";

/**
 * Replaces any plaintext page password with its HMAC digest before the file is
 * committed. This repo is public and git history is permanent, so a plaintext
 * password reaching a commit could never be fully retracted.
 *
 * Done here, at the single point every publish passes through, rather than in
 * the Studio editor — the editor is a client component and the signing secret
 * is server-only, and a server-side choke point can't be bypassed by a future
 * caller that forgets to hash.
 *
 * Throws if a password can't be secured, so the publish fails loudly instead of
 * quietly shipping a readable password.
 */
function hashPasswordsInSettings(raw: string): string {
  const parsed = JSON.parse(raw) as Record<string, { password?: unknown } | null>;

  for (const page of Object.values(parsed)) {
    if (!page || typeof page !== "object") continue;
    const { password } = page;
    if (typeof password !== "string" || password === "") continue;
    if (isHashedPassword(password)) continue;
    page.password = hashPagePassword(password);
  }

  return JSON.stringify(parsed, null, 2) + "\n";
}

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

  // Never let a readable page password reach a commit. Unlike COPY.md below,
  // this is not best-effort: if it fails, the publish fails.
  for (const file of fileList) {
    if (file.path !== PAGE_SETTINGS_PATH) continue;
    try {
      file.content = hashPasswordsInSettings(file.content);
    } catch (error) {
      console.error("Refusing to publish page settings with unsecured passwords", error);
      return NextResponse.json(
        { ok: false, error: "Could not secure page passwords. Nothing was published." },
        { status: 500 }
      );
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
