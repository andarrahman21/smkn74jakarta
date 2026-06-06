"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Megaphone, Newspaper, Trophy,
  CalendarDays, CalendarClock, MessageSquareDot, Image, Users, FileText, BookOpen,
  Library, FolderKanban, Network, ChevronDown, type LucideIcon,
} from "lucide-react";

type Item = { label: string; href: string; icon: LucideIcon };
type Group = { group: string; icon: LucideIcon; items: Item[] };
type Entry = Item | Group;

const NAV: Entry[] = [
  { label: "Dashboard",   href: "/admin",             icon: LayoutDashboard },
  { label: "Hero Banner", href: "/admin/hero-banner", icon: Image },
  {
    group: "Publikasi",
    icon: Library,
    items: [
      { label: "Berita",     href: "/admin/berita",     icon: Newspaper },
      { label: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
      { label: "Prestasi",   href: "/admin/prestasi",   icon: Trophy },
      { label: "Event",      href: "/admin/event",      icon: CalendarDays },
      { label: "Agenda",     href: "/admin/agenda",     icon: CalendarClock },
    ],
  },
  {
    group: "Data Sekolah",
    icon: FolderKanban,
    items: [
      { label: "Daftar Guru",         href: "/admin/daftar-guru", icon: Users },
      { label: "Struktur Organisasi", href: "/admin/struktur",    icon: Network },
      { label: "Modul Ajar",          href: "/admin/modul-ajar",  icon: BookOpen },
      { label: "Kotak Saran",         href: "/admin/kotak-saran", icon: MessageSquareDot },
    ],
  },
  { label: "Halaman Website", href: "/admin/halaman-website", icon: FileText },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

function ItemLink({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active ? "bg-white/10 text-amber font-medium" : "text-paper/70 hover:bg-white/5 hover:text-paper"
      }`}
    >
      <item.icon size={16} className={`shrink-0 ${active ? "text-amber" : "text-amber/50"}`} />
      {item.label}
    </Link>
  );
}

function GroupBlock({ group, pathname }: { group: Group; pathname: string }) {
  const hasActive = group.items.some((it) => isActive(pathname, it.href));
  const [open, setOpen] = useState(hasActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          hasActive ? "text-amber" : "text-paper/70 hover:bg-white/5 hover:text-paper"
        }`}
      >
        <group.icon size={16} className={`shrink-0 ${hasActive ? "text-amber" : "text-amber/50"}`} />
        <span className="flex-1 text-left">{group.group}</span>
        <ChevronDown size={14} className={`shrink-0 text-paper/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="mt-1 ml-3 pl-3 border-l border-white/10 space-y-1">
          {group.items.map((it) => (
            <ItemLink key={it.href} item={it} active={isActive(pathname, it.href)} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AdminMobileNav() {
  const pathname = usePathname();
  const flat: Item[] = NAV.flatMap((e) => ("group" in e ? e.items : [e]));
  return (
    <nav className="md:hidden bg-navy-deep text-paper px-5 pb-5 flex gap-2 overflow-x-auto border-b border-white/10">
      {flat.map((n) => {
        const active = isActive(pathname, n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
              active ? "bg-amber text-navy font-medium" : "bg-white/5 text-paper/80 hover:bg-amber hover:text-navy"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:block flex-1 px-3 py-5 space-y-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {NAV.map((e) =>
        "group" in e ? (
          <GroupBlock key={e.group} group={e} pathname={pathname} />
        ) : (
          <ItemLink key={e.href} item={e} active={isActive(pathname, e.href)} />
        )
      )}
    </nav>
  );
}
