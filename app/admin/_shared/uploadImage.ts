export type UploadResult = { ok: boolean; src?: string; error?: string };

/** Shared by MediaLibraryEditor and MediaPicker -- both need to turn a File
 * into a committed /uploads/... path via the same upload API contract. */
export async function uploadImage(file: File): Promise<UploadResult> {
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, dataUrl, alt: "", tags: [] }),
  });
  return res.json();
}
