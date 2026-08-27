"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PageGate({ pageKey }: { pageKey: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/page-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong.");
        return;
      }
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px]">
        <div className="text-[11px] font-extrabold tracking-[0.22em] uppercase text-cherish mb-3">Password Protected</div>
        <h1 className="font-display text-[28px] font-black uppercase text-charcoal mb-4">This page is locked</h1>
        <p className="text-charcoal/70 mb-6">Enter the password to continue.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-[12px] border border-charcoal/20 bg-white text-base mb-3"
        />
        {error && <div className="text-xs text-cherish mb-3">{error}</div>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-cherish text-cream px-7 py-3 text-[14px] font-extrabold tracking-[0.08em] uppercase disabled:opacity-60"
        >
          {submitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}
