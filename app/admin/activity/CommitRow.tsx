"use client";

import { useState } from "react";
import type { CommitFileDiff } from "../../../lib/githubActivity";

type Props = {
  sha: string;
  message: string;
  sourceLabel: string;
  time: string;
  url: string;
};

function DiffLines({ patch }: { patch: string }) {
  return (
    <pre className="text-[12px] leading-[1.5] font-mono overflow-x-auto whitespace-pre">
      {patch.split("\n").map((line, i) => {
        let cls = "text-[#666]";
        if (line.startsWith("+") && !line.startsWith("+++")) cls = "text-[#2a7a3e] bg-[#f0f9f1]";
        else if (line.startsWith("-") && !line.startsWith("---")) cls = "text-[#b33] bg-[#fdf2f2]";
        else if (line.startsWith("@@")) cls = "text-[#999]";
        return (
          <div key={i} className={`px-2 ${cls}`}>
            {line || " "}
          </div>
        );
      })}
    </pre>
  );
}

export default function CommitRow({ sha, message, sourceLabel, time, url }: Props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<CommitFileDiff[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && files === null && !loading) {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/commit-diff?sha=${sha}`);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Failed to load diff.");
        setFiles(data.diff.files);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load diff.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border-b border-[#f5f4f1] last:border-b-0">
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center gap-3 px-4 py-[10px] text-sm text-left hover:bg-[#fafaf8]"
      >
        <span className="text-[10px] font-semibold tracking-[0.04em] uppercase text-[#999] w-[90px] shrink-0">
          {sourceLabel}
        </span>
        <span className="flex-1 truncate">{message}</span>
        <span className="text-xs text-[#bbb] shrink-0">{time}</span>
      </button>

      {open && (
        <div className="px-4 pb-4">
          {loading && <div className="text-xs text-[#999] py-2">Loading diff...</div>}
          {error && <div className="text-xs text-[#b33] py-2">{error}</div>}
          {files && files.length === 0 && <div className="text-xs text-[#999] py-2">No file changes found.</div>}
          {files?.map((f) => (
            <div key={f.filename} className="border border-[#eee] rounded-md mb-2 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#fafaf8] text-xs">
                <span className="font-mono truncate flex-1">{f.filename}</span>
                <span className="text-[#2a7a3e]">+{f.additions}</span>
                <span className="text-[#b33]">-{f.deletions}</span>
              </div>
              {f.patch ? (
                <DiffLines patch={f.patch} />
              ) : (
                <div className="text-xs text-[#999] px-3 py-2">Binary file or diff too large to preview.</div>
              )}
            </div>
          ))}
          <a href={url} target="_blank" rel="noreferrer" className="text-xs text-[#888] underline">
            Open on GitHub &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
