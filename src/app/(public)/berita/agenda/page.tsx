export const revalidate = 60;

import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { getAgendaByMonth, getAgendaList } from "@/lib/queries/agenda";

export const metadata: Metadata = { title: "Agenda — SMKN 74 Jakarta" };

const catColor: Record<string, string> = {
  "Akademik":         "bg-navy text-paper",
  "Kesiswaan":        "bg-amber text-navy",
  "PKL & Industri":   "bg-moss text-paper",
  "Seni & Budaya":    "bg-rust text-paper",
  "Komunitas":        "bg-paper-soft text-ink",
};

export default async function Page() {
  const [months, agendaList] = await Promise.all([getAgendaByMonth(), getAgendaList()]);

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Agenda" },
        ]}
        tagline="Jadwal sekolah"
        title="Agenda terdekat"
        accent="& kalender bulanan."
      />

      {/* Quick stats */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 flex justify-center gap-16 text-center">
          {[
            { n: String(agendaList.length), l: "Agenda terjadwal" },
            { n: String(new Set(agendaList.map((a) => a.category)).size), l: "Kategori" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8 space-y-14">
          {months.map(([monthLabel, items], mi) => (
            <div key={monthLabel}>
              <div className="flex items-baseline justify-between mb-6 reveal">
                <h2 className="font-display text-4xl text-navy">{monthLabel}</h2>
                <span className="text-xs uppercase tracking-widest text-muted">{items.length} agenda</span>
              </div>
              <ul className="rounded-2xl bg-white border border-black/5 divide-y divide-black/5 overflow-hidden">
                {items.map((a, i) => (
                  <li
                    key={a.title}
                    className="reveal flex items-center gap-5 p-5 hover:bg-paper-soft transition-colors group"
                    style={{ animationDelay: `${(mi * 0.05) + (i * 0.04)}s` }}
                  >
                    <div className="shrink-0 h-16 w-16 rounded-xl bg-navy text-paper grid place-items-center font-display leading-none">
                      <div className="text-2xl font-semibold">{a.day}</div>
                      <div className="text-[10px] uppercase tracking-widest text-amber">{a.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-muted mb-1">
                        <span>{a.time}</span>
                        <span className="h-1 w-1 rounded-full bg-mist" />
                        <span>{a.location}</span>
                      </div>
                      <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">
                        {a.title}
                      </h3>
                    </div>
                    <span className={`${catColor[a.category]} shrink-0 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-medium`}>
                      {a.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Berita", title: "Event", body: "Pekan Seni, Open House, & lainnya.", href: "/berita/event", bg: "bg-amber", ink: "text-navy" },
          { tag: "Berita", title: "Berita Sekolah", body: "Cerita terkini.", href: "/berita", bg: "bg-navy", ink: "text-paper" },
          { tag: "Berita", title: "Informasi Sekolah", body: "Panduan & kebijakan.", href: "/berita/informasi-sekolah", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
