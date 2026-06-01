"use client";

import Link from "next/link";
import { CategoryFilter } from "@/components/profil/CategoryFilter";
import { PrestasiIcon } from "@/components/profil/PrestasiIcon";
import type { Prestasi } from "@/lib/queries/types";

export function PrestasiClientList({ items }: { items: (Prestasi & { id: string })[] }) {
  return (
    <CategoryFilter
      items={items}
      categoryOf={(p) => p.level}
      searchOf={(p) => `${p.title} ${p.sub} ${p.tag}`}
      searchPlaceholder="Cari prestasi…"
      render={(filtered) => (
        <ul className="space-y-4">
          {filtered.map((p, i) => (
            <li key={p.slug} className="reveal" style={{ animationDelay: `${i * 0.05}s` }}>
              <Link
                href={`/prestasi/${p.slug}`}
                className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-black/5 hover:border-amber hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`${p.bg} shrink-0 h-20 w-32 rounded-xl grid place-items-center text-paper overflow-hidden`}>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.imageAlt ?? p.title} className="h-full w-full object-cover" />
                  ) : (
                    <PrestasiIcon kind={p.icon} className="h-10 w-10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted mb-2">
                    <span>{p.date}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span className="text-amber font-medium">★ {p.tag}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">{p.sub}</p>
                </div>
                <div className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber group-hover:rotate-[-45deg]">
                  <span>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    />
  );
}
