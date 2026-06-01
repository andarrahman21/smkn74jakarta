"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LAYANAN_GROUPS } from "@/lib/site-content/layanan";

type SubItem = { label: string; href?: string; linkKey?: string; children?: SubItem[] };
type NavItem = { label: string; href?: string; linkKey?: string; children?: SubItem[] };

// Menu Layanan dibangun dari registry (key link diatur di admin).
const LAYANAN_NODE: NavItem = {
  label: "Layanan",
  children: LAYANAN_GROUPS.map((g) => ({
    label: g.label,
    children: g.items.map((it) => ({ label: it.label, linkKey: it.key })),
  })),
};

const NAV: NavItem[] = [
  {
    label: "Profil Sekolah",
    children: [
      { label: "Sambutan Kepala Sekolah", href: "/profil/sambutan" },
      { label: "Visi & Misi Sekolah", href: "/profil/visi-misi" },
      { label: "Sarana & Prasarana", href: "/profil/sarana-prasarana" },
      {
        label: "Struktur Organisasi",
        href: "/profil/struktur",
        children: [
          { label: "Manajemen Sekolah", href: "/profil/struktur/manajemen" },
          { label: "Tenaga Kependidikan", href: "/profil/struktur/tenaga-kependidikan" },
          { label: "Komite", href: "/profil/struktur/komite" },
          { label: "OSIS", href: "/profil/struktur/osis" },
          { label: "MPK", href: "/profil/struktur/mpk" },
        ],
      },
      { label: "Profil Tenaga Pendidik & Kependidikan", href: "/profil/tenaga-pendidik" },
      {
        label: "Konsentrasi Keahlian",
        href: "/profil/keahlian",
        children: [
          { label: "Seni Tari", href: "/profil/keahlian/tari" },
          { label: "Seni Musik", href: "/profil/keahlian/musik" },
          { label: "Seni Karawitan", href: "/profil/keahlian/karawitan" },
          { label: "Seni Teater", href: "/profil/keahlian/teater" },
        ],
      },
      { label: "Kurikulum", href: "/profil/kurikulum" },
    ],
  },
  {
    label: "Berita",
    href: "/berita",
    children: [
      { label: "Informasi Sekolah", href: "/berita/informasi-sekolah" },
      { label: "Agenda", href: "/berita/agenda" },
      { label: "Event", href: "/berita/event" },
    ],
  },
  LAYANAN_NODE,
  {
    label: "Info Keuangan",
    href: "/info-keuangan",
    children: [
      { label: "BOP", href: "/info-keuangan/bop" },
      { label: "BOS", href: "/info-keuangan/bos" },
    ],
  },
  {
    label: "Kontak",
    href: "/kontak",
  },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 3.5 L5 6.5 L8 3.5" />
    </svg>
  );
}

/** Recursive dropdown panel — opens on hover */
function DropdownItems({ items, level = 0 }: { items: SubItem[]; level?: number }) {
  return (
    <ul className="py-2 min-w-[260px]">
      {items.map((item) => {
        const hasChildren = !!item.children?.length;
        return (
          <li key={item.label} className="relative group/sub">
            <Link
              href={item.href ?? "#"}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between gap-3 px-4 py-2 text-sm text-paper/85 hover:bg-white/8 hover:text-amber transition-colors"
            >
              <span>{item.label}</span>
              {hasChildren && (
                <Chevron className="-rotate-90 opacity-60 group-hover/sub:opacity-100 transition" />
              )}
            </Link>

            {hasChildren && (
              <div
                className="absolute top-0 left-full ml-1 invisible opacity-0 translate-x-1 group-hover/sub:visible group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-200 rounded-xl bg-navy-deep border border-white/10 shadow-2xl shadow-black/40"
                style={{ zIndex: 50 + level }}
              >
                <DropdownItems items={item.children!} level={level + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Normalisasi URL: path internal ("/...") dibiarkan; selainnya dipastikan absolut (https://). */
function normalizeUrl(v: string): string {
  const s = v.trim();
  if (!s) return s;
  if (s.startsWith("/") || s.startsWith("#")) return s;
  if (/^https?:\/\//i.test(s)) return s;
  if (/^(mailto:|tel:)/i.test(s)) return s;
  return `https://${s}`;
}

/** Isi href tiap item dari `links` (berdasarkan linkKey). */
function resolveNav(items: NavItem[], links?: Record<string, string>): NavItem[] {
  return items.map((it) => {
    const raw = it.linkKey ? links?.[it.linkKey]?.trim() : "";
    return {
      ...it,
      href: it.href ?? (raw ? normalizeUrl(raw) : undefined),
      children: it.children ? resolveNav(it.children, links) : undefined,
    };
  });
}

export function MainNav({ links }: { links?: Record<string, string> }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = useMemo(() => resolveNav(NAV, links), [links]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-navy-deep"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Logo SMK Negeri 74 Jakarta"
            className="h-10 w-10 rounded-full object-contain transition-transform group-hover:rotate-[-6deg]"
          />
          <div className="leading-tight text-paper">
            <p className="text-[9px] uppercase tracking-[0.18em] text-amber">
              SMK Negeri
            </p>
            <p className="font-display text-base font-semibold">74 Jakarta</p>
          </div>
        </Link>

        {/* Nav items */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const hasChildren = !!item.children?.length;
            return (
              <div key={item.label} className="relative group">
                <a
                  href={item.href ?? "#"}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-paper/85 hover:text-amber transition-colors"
                >
                  {item.label}
                  {hasChildren && (
                    <Chevron className="transition-transform duration-300 group-hover:rotate-180" />
                  )}
                </a>

                {hasChildren && (
                  <>
                    {/* Invisible bridge to avoid hover gap */}
                    <div className="absolute left-0 right-0 top-full h-2" />
                    <div
                      className="
                        absolute top-[calc(100%+0.25rem)] left-0
                        invisible opacity-0 translate-y-1
                        group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-200
                        rounded-xl bg-navy-deep border border-white/10 shadow-2xl shadow-black/40
                        z-50
                      "
                    >
                      <DropdownItems items={item.children!} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="lg:hidden h-10 w-10 rounded-full border border-white/15 text-paper grid place-items-center hover:bg-white/10 transition-colors"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-4 bg-current transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-4 bg-current transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-deep max-h-[80vh] overflow-y-auto animate-fade-in">
          <ul className="px-4 py-4 space-y-1">
            {nav.map((item) => {
              const hasChildren = !!item.children?.length;
              // Item with no children → simple link
              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-3 text-sm font-medium text-paper hover:bg-white/5 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              // Item with children → details/summary, plus separate parent link if href provided
              return (
              <li key={item.label}>
                <details className="group/mob">
                  <summary className="flex items-center justify-between px-3 py-3 text-sm font-medium text-paper cursor-pointer list-none hover:bg-white/5 rounded-lg">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          // Allow link nav; close menu
                          e.stopPropagation();
                          setMobileOpen(false);
                        }}
                        className="hover:text-amber transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span>{item.label}</span>
                    )}
                    <Chevron className="transition-transform group-open/mob:rotate-180" />
                  </summary>
                  {item.children && (
                    <ul className="pl-4 border-l border-white/10 ml-3 my-1 space-y-0.5">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          {c.children ? (
                            <details>
                              <summary className="flex items-center justify-between px-3 py-2 text-sm text-paper/80 cursor-pointer list-none hover:text-amber">
                                {c.label}
                                <Chevron className="opacity-60" />
                              </summary>
                              <ul className="pl-4 border-l border-white/10 ml-3 my-1">
                                {c.children.map((cc) => (
                                  <li key={cc.label}>
                                    <Link href={cc.href ?? "#"} onClick={() => setMobileOpen(false)} className="block px-3 py-1.5 text-xs text-paper/70 hover:text-amber">
                                      {cc.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : (
                            <Link href={c.href ?? "#"} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-paper/80 hover:text-amber">
                              {c.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
