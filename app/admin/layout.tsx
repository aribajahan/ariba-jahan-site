"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const PAGES = [
  { label: "Home", href: "/admin/home" },
  { label: "Speaking", href: "/admin/speaking" },
  { label: "Work With Me", href: "/admin/work-with-me" },
  { label: "About", href: "/admin/about" },
  { label: "Reading Room", href: "/admin/reading-room" },
];

const COLLECTIONS = [
  { label: "Articles", href: "/admin/articles" },
  { label: "Case Studies & Quests", href: "/admin/case-studies" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Speaking Logos", href: "/admin/logos" },
  { label: "Speaking Gallery Photos", href: "/admin/gallery" },
  { label: "Media Library", href: "/admin/media" },
  { label: "Forms", href: "/admin/forms" },
];

const SITE = [
  { label: "Site-wide SEO", href: "/admin/seo" },
  { label: "Domains", href: "/admin/domains" },
  { label: "Marketing Tools", href: "/admin/marketing" },
  { label: "Site Settings", href: "/admin/settings" },
];

function NavGroup({ title, items, pathname }: { title: string; items: typeof PAGES; pathname: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] font-bold tracking-[0.08em] uppercase text-white/40 px-[10px] pt-2 pb-[6px]">
        {title}
      </div>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
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
          Ariba Jahan — Studio
        </div>
        <div className="px-3 py-4 overflow-y-auto flex-1">
          <NavGroup title="Pages" items={PAGES} pathname={pathname} />
          <NavGroup title="Collections" items={COLLECTIONS} pathname={pathname} />
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
