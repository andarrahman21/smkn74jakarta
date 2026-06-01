import Link from "next/link";
import { Counter } from "@/components/profil/Counter";
import { PrestasiIcon } from "@/components/profil/PrestasiIcon";
import { getPrestasiList, getPrestasiStats } from "@/lib/queries/prestasi";
import type { SiteContent } from "@/lib/site-content/get";

export async function PrestasiSection({ cms }: { cms: SiteContent }) {
  const [allRows, stats] = await Promise.all([
    getPrestasiList(4),
    getPrestasiStats(),
  ]);
  const rows = allRows;

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-14 reveal">
          <div>
            <p data-cms-key="prestasi.eyebrow" data-cms-type="text" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              {cms["prestasi.eyebrow"]}
            </p>
            <h2 data-cms-key="prestasi.heading" data-cms-type="text" className="font-display headline-section max-w-xl">
              {cms["prestasi.heading"]}
            </h2>
          </div>
          <div className="hidden md:flex items-baseline gap-6 font-display">
            <div className="text-center">
              <div className="stat-num font-semibold text-navy">
                <Counter target={stats.total} />
              </div>
              <p data-cms-key="prestasi.total_label" data-cms-type="text" className="text-[10px] uppercase tracking-widest text-muted">{cms["prestasi.total_label"]}</p>
            </div>
            <span className="text-3xl text-mist">|</span>
            <div className="text-center">
              <div className="stat-num font-semibold text-amber">
                <Counter target={stats.nasional} />
              </div>
              <p data-cms-key="prestasi.nasional_label" data-cms-type="text" className="text-[10px] uppercase tracking-widest text-muted">{cms["prestasi.nasional_label"]}</p>
            </div>
          </div>
        </div>

        <ul className="space-y-4">
          {rows.map((r, i) => (
            <li
              key={r.slug}
              className="reveal"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Link
                href={`/prestasi/${r.slug}`}
                className="group flex items-center gap-6 p-5 rounded-2xl bg-white border border-black/5 hover:border-amber hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`${r.bg} shrink-0 h-20 w-32 rounded-xl grid place-items-center text-paper overflow-hidden`}>
                  {r.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={r.image} alt={r.imageAlt ?? r.title} className="h-full w-full object-cover" />
                  ) : (
                    <PrestasiIcon kind={r.icon} className="h-10 w-10" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted mb-2">
                    <span>{r.date}</span>
                    <span className="h-1 w-1 rounded-full bg-mist" />
                    <span className="text-amber font-medium">★ {r.tag}</span>
                  </div>
                  <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">{r.sub}</p>
                </div>
                <div className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber group-hover:rotate-[-45deg]">
                  <span>→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center reveal">
          <Link
            href="/prestasi"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors group"
          >
            <span data-cms-key="prestasi.link" data-cms-type="text">{cms["prestasi.link"]}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
