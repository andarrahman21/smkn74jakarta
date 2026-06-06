import Image from "next/image";
import Link from "next/link";
import { getBeritaList } from "@/lib/queries/berita";
import type { SiteContent } from "@/lib/site-content/get";

export async function NewsSection({ cms }: { cms: SiteContent }) {
  const news = await getBeritaList(3);

  return (
    <section id="berita" className="bg-white py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <p data-cms-key="news.eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              {cms["news.eyebrow"]}
            </p>
            <h2 data-cms-key="news.heading" data-cms-type="text" className="font-display headline-section max-w-xl">
              {cms["news.heading"]}
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden md:inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-paper-soft transition-colors group"
          >
            <span data-cms-key="news.link" data-cms-type="text">{cms["news.link"]}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((n, i) => (
            <Link
              key={n.slug}
              href={`/berita/${n.slug}`}
              className="reveal group cursor-pointer"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="relative rounded-2xl aspect-[5/4] overflow-hidden mb-5 transition-transform duration-500 group-hover:-translate-y-1 bg-navy">
                <Image
                  src={n.thumbnail ?? n.image}
                  alt={n.thumbnailAlt ?? n.imageAlt ?? n.title}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 inline-flex flex-col items-center leading-none px-2.5 py-1.5 bg-amber text-navy rounded-sm z-10">
                  <span className="text-[13px] font-bold">{n.num}</span>
                  <span className="text-[8px] uppercase tracking-widest font-semibold mt-0.5">{n.month}</span>
                </span>
              </div>
              <h3 className="font-display text-xl leading-snug mb-2 group-hover:text-navy transition-colors">
                {n.title}
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-3">{n.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-navy">
                Baca selengkapnya
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
