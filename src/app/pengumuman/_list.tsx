"use client";

import Link from "next/link";
import { CategoryFilter } from "@/components/profil/CategoryFilter";
import type { Pengumuman } from "@/data/pengumuman";

export function PengumumanList({ items }: { items: (Pengumuman & { id: string })[] }) {
  return (
    <CategoryFilter
      items={items}
      categoryOf={(p) => p.category}
      searchOf={(p) => `${p.title} ${p.excerpt}`}
      searchPlaceholder="Cari pengumuman…"
      render={(filtered) => (
        <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5 overflow-hidden">
          {filtered.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ animationDelay: `${i * 0.04}s` }}>
              <Link
                href={`/pengumuman/${p.slug}`}
                className="flex items-center gap-5 p-5 hover:bg-paper-soft transition-colors group"
              >
                <div className="shrink-0 h-16 w-16 rounded-xl bg-navy text-paper grid place-items-center font-display leading-none">
                  <div className="text-2xl font-semibold">{p.day}</div>
                  <div className="text-[10px] uppercase tracking-widest text-amber">{p.month}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted mb-1">
                    <span>{p.year}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span>{p.category}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                    {p.title}
                  </h3>
                </div>
                {p.tag && (
                  <span className="shrink-0 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber/20 text-amber">
                    {p.tag}
                  </span>
                )}
                <span className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber group-hover:rotate-[-45deg]">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  );
}
