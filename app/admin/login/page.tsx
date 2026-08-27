"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Something went wrong.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3F1] font-sans">
      <form onSubmit={handleSubmit} className="w-full max-w-[340px] bg-white border border-[#e2e0dc] rounded-[10px] p-8">
        <h1 className="text-lg font-bold mb-1">Ariba Jahan · Studio</h1>
        <p className="text-sm text-[#888] mb-6">Enter your username and password to continue.</p>
        <input
          type="text"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
        />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-[10px] border border-[#ddd] rounded-md text-sm mb-3"
        />
        {error && <div className="text-xs text-[#b33] mb-3">{error}</div>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#181818] text-white rounded-md py-[10px] text-sm font-semibold disabled:opacity-60"
        >
          {submitting ? "Checking…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
