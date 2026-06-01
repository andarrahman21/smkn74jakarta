"use client";

import Image from "next/image";
import Link from "next/link";
import { CategoryFilter } from "@/components/profil/CategoryFilter";
import type { Berita } from "@/lib/queries/types";

export function BeritaList({ items }: { items: (Berita & { id: string })[] }) {
  return (
    <CategoryFilter
      items={items}
      categoryOf={(b) => b.tag}
      searchOf={(b) => `${b.title} ${b.excerpt}`}
      searchPlaceholder="Cari berita…"
      render={(filtered) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((b, i) => (
            <Link
              key={b.slug}
              href={`/berita/${b.slug}`}
              className="reveal group cursor-pointer"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="relative rounded-2xl aspect-[5/4] overflow-hidden mb-5 transition-transform duration-500 group-hover:-translate-y-1 bg-navy">
                <Image
                  src={b.thumbnail ?? b.image}
                  alt={b.thumbnailAlt ?? b.imageAlt ?? b.title}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-amber text-navy text-[10px] uppercase tracking-widest font-semibold rounded-sm z-10">{b.num}</span>
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-paper z-10 drop-shadow">{b.tag}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted mb-2">
                <span>{b.date}</span>
                <span className="h-1 w-1 rounded-full bg-mist" />
                <span>{b.readTime}</span>
              </div>
              <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-navy transition-colors">{b.title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-3">{b.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                Baca selengkapnya
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    />
  );
}
