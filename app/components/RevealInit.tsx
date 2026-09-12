"use client";

import { useEffect } from "react";

/**
 * Reveal-on-arrival: section blocks marked `.reveal` lift in once as they enter.
 *
 * No-JS safe: `.reveal` is visible by default. Only after this runs do we add
 * `reveal-ready` to <html>, which activates the hidden start-state in CSS — so if
 * JS never runs, nothing is stuck invisible. Respects prefers-reduced-motion by
 * simply not arming (everything stays visible). Fires once per element.
 */
export default function RevealInit() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target); // fire once
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
