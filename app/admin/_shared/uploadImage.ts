export type UploadResult = { ok: boolean; src?: string; error?: string };

// Vercel rejects request bodies over 4.5MB before the upload route ever runs,
// and base64 adds a third on top of the file. Stay under it with some margin.
const MAX_BODY_CHARS = 4_000_000;
const MAX_DIMENSION = 2000; // matches the server-side cap in /api/admin/upload
const QUALITY = 0.82;

function readAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Shrinks a photo in the browser before it is sent. A full-size phone photo is
 * 5-10MB, which is over the host's request limit, so the server never got to
 * compress it and the upload failed without a message. Resizing here keeps the
 * request small; the server still does its own pass afterwards.
 * SVG and GIF are left alone (resizing would flatten them).
 */
async function shrink(file: File): Promise<Blob> {
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file); // honors EXIF orientation
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, QUALITY));
    // Keep the original if re-encoding somehow made it bigger and it was already small enough.
    if (!blob || (scale === 1 && blob.size >= file.size)) return file;
    return blob;
  } catch {
    return file; // unreadable in the browser: let the server try
  }
}

/** Shared by MediaLibraryEditor and MediaPicker -- both need to turn a File
 * into a committed /uploads/... path via the same upload API contract. */
export async function uploadImage(file: File): Promise<UploadResult> {
  const blob = await shrink(file);
  const dataUrl = await readAsDataUrl(blob);

  if (dataUrl.length > MAX_BODY_CHARS) {
    return { ok: false, error: "That image is still too large after shrinking. Try a smaller or lower-resolution file." };
  }

  try {
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, dataUrl, alt: "", tags: [] }),
    });
    const data = await res.json().catch(() => null);
    if (!data) return { ok: false, error: `Upload failed (server returned ${res.status}).` };
    return data;
  } catch {
    return { ok: false, error: "Upload failed. Check your connection and try again." };
  }
}
