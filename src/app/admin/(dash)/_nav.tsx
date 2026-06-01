"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Megaphone, Newspaper, Trophy,
  CalendarDays, CalendarClock, MessageSquareDot, Image, Users, FileText,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",   href: "/admin",             icon: LayoutDashboard },
  { label: "Hero Banner", href: "/admin/hero-banner", icon: Image },
  { label: "Pengumuman",  href: "/admin/pengumuman",  icon: Megaphone },
  { label: "Berita",      href: "/admin/berita",      icon: Newspaper },
  { label: "Prestasi",    href: "/admin/prestasi",    icon: Trophy },
  { label: "Event",       href: "/admin/event",       icon: CalendarDays },
  { label: "Agenda",      href: "/admin/agenda",      icon: CalendarClock },
  { label: "Daftar Guru", href: "/admin/daftar-guru", icon: Users },
  { label: "Kotak Saran", href: "/admin/kotak-saran", icon: MessageSquareDot },
  { label: "Halaman Website", href: "/admin/halaman-website", icon: FileText },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="md:hidden bg-navy-deep text-paper px-5 pb-5 flex gap-2 overflow-x-auto border-b border-white/10">
      {NAV.map((n) => {
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs transition-colors ${
              active
                ? "bg-amber text-navy font-medium"
                : "bg-white/5 text-paper/80 hover:bg-amber hover:text-navy"
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

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="hidden md:block flex-1 px-3 py-5 space-y-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {NAV.map((n) => {
        const active = isActive(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              active
                ? "bg-white/10 text-amber font-medium"
                : "text-paper/70 hover:bg-white/5 hover:text-paper"
            }`}
          >
            <n.icon
              size={16}
              className={`shrink-0 ${active ? "text-amber" : "text-amber/50"}`}
            />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
