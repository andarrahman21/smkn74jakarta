import Image from "next/image";
import Link from "next/link";
import { beritaList } from "@/data/berita";

export function NewsSection() {
  const news = beritaList.slice(0, 3);

  return (
    <section id="berita" className="bg-white py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              Cerita Terbaru
            </p>
            <h2 className="font-display headline-section max-w-xl">
              Cerita dari sekolah kami.
            </h2>
          </div>
          <Link
            href="/berita"
            className="hidden md:inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-paper-soft transition-colors group"
          >
            Lihat semua Berita
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
                  src={n.image}
                  alt={n.title}
                  fill
                  sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <span className="absolute top-4 left-4 inline-block px-3 py-1 bg-amber text-navy text-[10px] uppercase tracking-widest font-semibold rounded-sm z-10">
                  {n.num}
                </span>
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-paper z-10 drop-shadow">
                  {n.tag}
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
