import { useState } from "react";

export type PublishFile = { path: string; content: string };

export function usePublish() {
  const [publishing, setPublishing] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const publish = async (files: PublishFile[], message: string, deletions: string[] = []) => {
    setPublishing(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files, message, deletions }),
      });
      if (!res.ok) throw new Error("Publish failed");
      setResult("success");
    } catch {
      setResult("error");
    } finally {
      setPublishing(false);
    }
  };

  return { publish, publishing, result };
}
