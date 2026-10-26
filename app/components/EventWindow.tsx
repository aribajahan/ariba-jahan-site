"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 60_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export default function EventWindow({ endsAt, children }: { endsAt: string; children: ReactNode }) {
  const expired = useSyncExternalStore(subscribe, () => Date.now() >= Date.parse(endsAt), () => false);
  return expired ? null : children;
}
