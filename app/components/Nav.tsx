"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { navLinks } from "../data/home";
import navVisibility from "../../content/nav-visibility.json";

// Maps a nav link's href to its page-settings key, so a page's "Show in
// Nav" toggle can hide its entry without deleting it from the nav array.
const HREF_TO_PAGE_KEY: Record<string, keyof typeof navVisibility> = {
  "/speaking": "speaking",
  "/work-with-me": "work-with-me",
  "/about": "about",
};

function isNavLinkVisible(href: string): boolean {
  const pageKey = HREF_TO_PAGE_KEY[href];
  if (!pageKey) return true;
  return navVisibility[pageKey] !== false;
}

// NOTE: the announcement-bar feature was removed when the nav became a
// floating overlay — a transparent nav has no clean slot for it. It is
// currently disabled in site-settings; if it's ever wanted back it needs a
// separate treatment (e.g. a solid strip above the hero).

// Splits a label into per-letter cells for the "ink pour" hover (see globals.css).
// The link carries an aria-label, so these decorative spans aren't read out.
function InkLabel({ text }: { text: string }) {
  let i = 0;
  return (
    <>
      {[...text].map((chr, idx) => {
        if (chr === " ") return <span key={idx} className="sp" />;
        const cur = i++;
        return (
          <span key={idx} className="ch" style={{ "--i": cur } as CSSProperties}>
            <span className="t">{chr}</span>
            <span className="b" aria-hidden="true">
              {chr}
            </span>
          </span>
        );
      })}
    </>
  );
}

export default function Nav({ contactHref = "/contact" }: { contactHref?: string }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false); // slid up out of view
  const [scrolled, setScrolled] = useState(false); // past the hero → whisper bg
  const [light, setLight] = useState(false); // true = light ground → charcoal text

  const visibleNavLinks = navLinks.filter((link) => isNavLinkVisible(link.href));
  const navRef = useRef<HTMLElement | null>(null);
  const lastY = useRef(0);
  const heroH = useRef(0);

  // scroll behavior: hide on down / reveal on up-or-pause, recolor to the
  // ground behind the nav, and add the whisper background once past the hero.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const heroEl = nav.parentElement?.querySelector("section") as HTMLElement | null;
      heroH.current = heroEl ? heroEl.offsetHeight : Math.round(window.innerHeight * 0.9);
    };
    measure();

    const DEADZONE = 6;
    const TOP_ZONE = 90;
    let ticking = false;
    let stopTimer: number | undefined;

    // Is the ground behind the nav light? Walk up from the point under the
    // nav to the first element with a real background color and read its luminance.
    const detectLight = (): boolean => {
      const el = document.elementFromPoint(Math.round(window.innerWidth / 2), 26);
      let node: Element | null = el;
      while (node && node !== document.body) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== "transparent" && !bg.startsWith("rgba(0, 0, 0, 0")) {
          const m = bg.match(/\d+(\.\d+)?/g);
          if (m && m.length >= 3) {
            const alpha = m.length >= 4 ? Number(m[3]) : 1;
            if (alpha > 0.4) {
              const [r, g, b] = m.map(Number);
              return 0.299 * r + 0.587 * g + 0.114 * b > 140;
            }
          }
        }
        node = node.parentElement;
      }
      return true; // default to light (cream page)
    };

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY.current;

      if (!open) setLight(detectLight());
      setScrolled(y > heroH.current - 60);

      // pause-to-reveal: bring it back whenever scrolling stops
      window.clearTimeout(stopTimer);
      stopTimer = window.setTimeout(() => setHidden(false), 220);

      if (Math.abs(dy) >= DEADZONE) {
        if (y <= TOP_ZONE) setHidden(false);
        else if (dy > 0) setHidden(true);
        else setHidden(false);
        lastY.current = y;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearTimeout(stopTimer);
    };
  }, [open]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const textColor = light ? "text-charcoal" : "text-cream";
  const textShadow = light ? "none" : "0 1px 10px rgba(0,0,0,0.28)";
  const linkStyle: CSSProperties = { textShadow };

  // whisper background on the links group, only once past the hero, tint flips with the ground
  const groupStyle: CSSProperties = scrolled
    ? light
      ? { background: "rgba(45,45,45,0.05)", borderColor: "rgba(45,45,45,0.1)" }
      : { background: "rgba(255,251,243,0.08)", borderColor: "rgba(255,251,243,0.12)" }
    : { background: "transparent", borderColor: "transparent" };

  const barShadow = light ? "none" : "0 1px 6px rgba(0,0,0,0.3)";

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-between gap-5 px-[clamp(20px,5vw,44px)] py-[22px] pointer-events-none transition-transform duration-[380ms] ease-[cubic-bezier(.4,.01,.2,1)]"
        style={{ transform: hidden ? "translateY(-140%)" : "none" }}
      >
        {/* wordmark — never a background, recolors only */}
        <Link
          href="/"
          className={`pointer-events-auto font-display font-black text-[21px] tracking-[-0.02em] uppercase leading-none transition-colors duration-300 ${textColor}`}
          style={linkStyle}
        >
          Ariba Jahan
        </Link>

        {/* desktop links — whisper background appears past the hero */}
        <div
          className="hidden min-[701px]:flex items-center gap-7 rounded-[3px] border border-solid px-[18px] py-[8px] pointer-events-auto transition-[background-color,border-color] duration-300"
          style={groupStyle}
        >
          {visibleNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              aria-label={link.label}
              className={`ink-link font-display font-extrabold text-[16px] tracking-[0.11em] uppercase whitespace-nowrap ${textColor}`}
              style={linkStyle}
            >
              <InkLabel text={link.label} />
            </a>
          ))}
          <a
            href={contactHref}
            aria-label="Contact"
            className={`ink-link font-display font-extrabold text-[16px] tracking-[0.11em] uppercase whitespace-nowrap ${textColor}`}
            style={linkStyle}
          >
            <InkLabel text="Contact" />
          </a>
        </div>

        {/* mobile burger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex min-[701px]:hidden flex-col justify-center gap-[7px] w-11 h-11 pointer-events-auto"
        >
          <span
            className={`block w-7 h-[2.5px] rounded transition-colors duration-300 ${light ? "bg-charcoal" : "bg-cream"}`}
            style={{ boxShadow: barShadow }}
          />
          <span
            className={`block w-7 h-[2.5px] rounded transition-colors duration-300 ${light ? "bg-charcoal" : "bg-cream"}`}
            style={{ boxShadow: barShadow }}
          />
        </button>
      </nav>

      {/* mobile full-screen menu */}
      <div
        className="fixed inset-0 z-[300] bg-charcoal text-cream flex flex-col px-[clamp(20px,6vw,44px)] pt-[22px] pb-11 min-[701px]:hidden transition-transform duration-[450ms] ease-[cubic-bezier(.4,.01,.2,1)]"
        style={{ transform: open ? "translateY(0)" : "translateY(-100%)" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display font-black text-[19px] uppercase tracking-[-0.02em]">
            Ariba Jahan
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="font-display font-extrabold text-[15px] tracking-[0.14em] uppercase transition-colors duration-150 hover:text-cherish"
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col justify-center flex-1 gap-1">
          {visibleNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              onClick={() => setOpen(false)}
              className="font-display font-black text-[clamp(38px,12vw,64px)] leading-[1.04] tracking-[-0.02em] uppercase transition-colors duration-150 hover:text-cherish active:text-cherish"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref}
            onClick={() => setOpen(false)}
            className="font-display font-black text-[clamp(38px,12vw,64px)] leading-[1.04] tracking-[-0.02em] uppercase transition-colors duration-150 hover:text-cherish active:text-cherish"
          >
            Contact
          </a>
        </nav>
      </div>
    </>
  );
}
