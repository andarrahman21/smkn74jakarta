import Link from "next/link";

export type Related = {
  tag: string;
  title: string;
  body: string;
  href: string;
  bg: string;
  ink: string;
};

export function RelatedCards({ items, heading = "Telusuri lebih jauh tentang sekolah." }: { items: Related[]; heading?: string }) {
  return (
    <section className="bg-white border-t border-black/5 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10 reveal">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Selanjutnya</p>
            <h2 className="font-display headline-quote max-w-2xl">{heading}</h2>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-paper-soft transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            Kembali ke Beranda
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className={`${c.bg} ${c.ink} group rounded-2xl p-7 flex flex-col gap-4 aspect-[4/3] transition-transform duration-500 hover:-translate-y-2 reveal`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{c.tag}</p>
              <h3 className="font-display text-2xl leading-tight mt-auto">{c.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{c.body}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                Pelajari
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
