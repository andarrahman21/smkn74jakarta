import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { eventList } from "@/data/event";

export const metadata: Metadata = { title: "Event — SMKN 74 Jakarta" };

export default function Page() {
  const upcoming = eventList.filter((e) => e.status === "Akan datang");
  const past = eventList.filter((e) => e.status === "Selesai");

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: "Event" },
        ]}
        tagline="Event sekolah"
        title="Pekan Seni, Open House,"
        accent="dan panggung-panggung lainnya."
      />

      {/* Akan datang */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Akan datang</p>
              <h2 className="font-display headline-section max-w-2xl">Yang sebentar lagi terjadi.</h2>
            </div>
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber/20 text-amber font-medium">
              {upcoming.length} event
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcoming.map((e, i) => (
              <Link
                key={e.slug}
                href={`/berita/event/${e.slug}`}
                className={`${e.bg} ${e.ink} group reveal rounded-2xl p-7 flex flex-col gap-3 aspect-[4/5] hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-80">
                  <span>{e.category}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
                    {e.status}
                  </span>
                </div>
                <h3 className="font-display text-3xl leading-tight mt-auto">{e.title}</h3>
                <p className="text-sm opacity-85 leading-relaxed">{e.body}</p>
                <div className="border-t border-current/15 pt-3 flex items-center justify-between text-sm">
                  <span className="font-medium">{e.date}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selesai */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Sudah berlangsung</p>
              <h2 className="font-display headline-section max-w-2xl">Arsip event terkini.</h2>
            </div>
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-mist/40 text-muted font-medium">
              {past.length} event
            </span>
          </div>
          <ul className="space-y-3">
            {past.map((e, i) => (
              <li key={e.slug} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <Link
                  href={`/berita/event/${e.slug}`}
                  className="group flex items-center gap-6 p-5 rounded-2xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className={`${e.bg} ${e.ink} shrink-0 h-16 w-24 rounded-xl grid place-items-center text-[10px] uppercase tracking-widest font-semibold`}>
                    {e.category}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted mb-1">
                      <span>{e.date}</span>
                      <span className="h-1 w-1 rounded-full bg-mist" />
                      <span>Selesai</span>
                    </div>
                    <h3 className="font-display text-lg leading-snug group-hover:text-navy transition-colors">{e.title}</h3>
                  </div>
                  <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Berita", title: "Agenda", body: "Kalender bulanan sekolah.", href: "/berita/agenda", bg: "bg-navy", ink: "text-paper" },
          { tag: "Berita", title: "Berita Sekolah", body: "Cerita terkini dari sekolah.", href: "/berita", bg: "bg-amber", ink: "text-navy" },
          { tag: "Berita", title: "Informasi Sekolah", body: "Panduan & kebijakan.", href: "/berita/informasi-sekolah", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
