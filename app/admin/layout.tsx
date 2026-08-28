"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PAGES = [
  { label: "Home", href: "/admin/home", settingsKey: "home" },
  { label: "Speaking", href: "/admin/speaking", settingsKey: "speaking" },
  { label: "Work With Me", href: "/admin/work-with-me", settingsKey: "work-with-me" },
  { label: "About", href: "/admin/about", settingsKey: "about" },
  { label: "Reading Room", href: "/admin/reading-room", settingsKey: null },
];

const COLLECTIONS = [
  { label: "Articles", href: "/admin/articles" },
  { label: "Case Studies & Quests", href: "/admin/case-studies" },
  { label: "Story Timeline", href: "/admin/story-timeline" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Unmissables", href: "/admin/unmissables" },
  { label: "Forms", href: "/admin/forms" },
];

const MEDIA = [
  { label: "Media Library", href: "/admin/media" },
  {
    label: "Galleries",
    href: "/admin/galleries",
    matchPrefixes: ["/admin/logos", "/admin/gallery", "/admin/wwm-trusted-by"],
  },
];

const SITE = [
  { label: "Commit Activity", href: "/admin/activity" },
  { label: "Site-wide SEO", href: "/admin/seo" },
  { label: "Domains", href: "/admin/domains" },
  { label: "Marketing Tools", href: "/admin/marketing" },
  { label: "Site Settings", href: "/admin/settings" },
];

function PagesNavGroup({ pathname }: { pathname: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 px-[10px] pt-2 pb-[6px]">Pages</div>
      {PAGES.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <div key={item.href} className="flex items-center">
            <Link
              href={item.href}
              className={`flex-1 px-[10px] py-[9px] rounded-md text-sm mb-[2px] ${
                active ? "bg-white/[0.08] text-white" : "text-white/55 hover:text-white/80"
              }`}
            >
              {item.label}
            </Link>
            {item.settingsKey && (
              <Link
                href={`/admin/page-settings/${item.settingsKey}`}
                className="text-white/40 hover:text-white/70 px-[10px] text-[13px]"
                title={`${item.label} settings`}
              >
                ⚙
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: { label: string; href: string; matchPrefixes?: string[] }[];
  pathname: string;
}) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 px-[10px] pt-2 pb-[6px]">
        {title}
      </div>
      {items.map((item) => {
        const active =
          pathname === item.href ||
          pathname.startsWith(item.href + "/") ||
          (item.matchPrefixes ?? []).some((p) => pathname === p || pathname.startsWith(p + "/"));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-[10px] py-[9px] rounded-md text-sm mb-[2px] ${
              active ? "bg-white/[0.08] text-white" : "text-white/55 hover:text-white/80"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen font-sans text-[#1a1a1a] bg-[#F4F3F1]">
      <div className="w-[260px] bg-[#181818] text-[#e5e5e5] flex-shrink-0 flex flex-col">
        <div className="px-5 py-4 border-b border-white/[0.08] font-bold text-[15px] flex items-center gap-2">
          <div className="w-5 h-5 bg-cherish rounded" />
          Ariba Jahan · Studio
        </div>
        <div className="px-3 py-4 overflow-y-auto flex-1">
          <PagesNavGroup pathname={pathname} />
          <NavGroup title="Collections" items={COLLECTIONS} pathname={pathname} />
          <NavGroup title="Media" items={MEDIA} pathname={pathname} />
          <NavGroup title="Site" items={SITE} pathname={pathname} />
        </div>
        <div className="p-3 border-t border-white/[0.08]">
          <button onClick={handleLogout} className="text-xs text-white/50 hover:text-white/80">
            Log Out
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
