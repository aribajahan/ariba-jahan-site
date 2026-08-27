"use client";

import { useState } from "react";

export default function SectionCard({
  title,
  defaultExpanded = true,
  children,
}: {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white border border-[#e2e0dc] rounded-[10px] mb-3 overflow-hidden">
      <div
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-[10px] px-4 py-[14px] cursor-pointer"
      >
        <strong className="flex-1 text-sm">{title}</strong>
        <span className="text-xs text-[#999]">{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}
