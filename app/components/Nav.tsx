"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../data/home";
import siteSettings from "../../content/site-settings.json";

export default function Nav({ contactHref = "/contact" }: { contactHref?: string }) {
  const [open, setOpen] = useState(false);
  const { announcementBar } = siteSettings;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-cream border-b border-charcoal/[0.08] py-4">
      {announcementBar.enabled && announcementBar.message && (
        <a
          href={announcementBar.link || undefined}
          className="block bg-cherish text-cream text-center text-[13px] font-semibold py-2 px-4 -mt-4 mb-4"
        >
          {announcementBar.message}
        </a>
      )}
      <div className="flex items-center justify-between gap-5 max-w-[1600px] mx-auto px-[clamp(24px,5vw,80px)]">
        <Link href="/">
          <Image quality={90}
            src="/assets/wordmark-black.png"
            alt="Ariba Jahan"
            height={26}
            width={140}
            style={{ height: 26, width: "auto" }}
            priority
          />
        </Link>

        <ul className="hidden min-[701px]:flex items-center gap-[clamp(16px,3vw,36px)] list-none text-sm font-semibold tracking-[0.1em] uppercase whitespace-nowrap">
          {navLinks.map((link) => (
            <li key={link.label} className="whitespace-nowrap">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener" : undefined}
                className="transition-colors duration-150 whitespace-nowrap hover:text-cherish"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="whitespace-nowrap">
            <a
              href={contactHref}
              className="inline-block bg-cherish text-cream px-[22px] py-2 text-[15px] font-bold tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-150 hover:bg-charcoal active:bg-charcoal active:scale-[0.97]"
            >
              Contact
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex min-[701px]:hidden flex-col gap-[5px] cursor-pointer p-[10px] min-w-[44px] min-h-[44px] items-center justify-center"
        >
          <span className="w-6 h-0.5 bg-charcoal" />
          <span className="w-6 h-0.5 bg-charcoal" />
          <span className="w-6 h-0.5 bg-charcoal" />
        </button>
      </div>

      {open && (
        <div className="flex min-[701px]:hidden flex-col px-6 pb-2 bg-cream border-t border-charcoal/[0.08]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener" : undefined}
              onClick={() => setOpen(false)}
              className="text-base font-bold tracking-[0.06em] uppercase text-charcoal py-[14px] border-b border-charcoal/[0.08] min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactHref}
            onClick={() => setOpen(false)}
            className="text-base font-bold tracking-[0.06em] uppercase text-cherish py-[14px] min-h-[44px] flex items-center"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
