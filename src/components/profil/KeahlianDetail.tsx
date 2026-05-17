import Link from "next/link";
import { PageHeader } from "./PageHeader";
import { RelatedCards, type Related } from "./RelatedCards";

export type KeahlianProps = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  quote: string;
  curriculum: { year: string; topics: string[] }[];
  achievements: { year: string; title: string; sub: string }[];
  related: Related[];
  /** Tailwind bg class for the accent panel */
  accentBg: string;
  accentInk: string;
};

export function KeahlianDetail(p: KeahlianProps) {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Konsentrasi Keahlian", href: "/profil/keahlian" },
          { label: p.title },
        ]}
        tagline={p.tagline}
        title={p.title.split(" ")[0]}
        accent={p.title.split(" ").slice(1).join(" ")}
      />

      {/* Intro + accent card */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 reveal">
            <div className={`${p.accentBg} ${p.accentInk} relative rounded-2xl p-10 aspect-[4/5] animate-float-slow shadow-2xl shadow-black/15 flex flex-col justify-between`}>
              <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">{p.title}</span>
              <span className="font-display text-display-md italic">
                {p.title.split(" ").map((w) => w[0]).join("")}
              </span>
              <p className="text-sm leading-relaxed border-t border-current/15 pt-4 opacity-85">
                {p.tagline}
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.1s" }}>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Pengantar</p>
            <h2 className="font-display headline-quote mb-6">Apa yang dipelajari di sini.</h2>
            <p className="text-[17px] leading-relaxed text-ink/85 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {p.intro}
            </p>
            <blockquote className="mt-10 border-l-4 border-amber pl-6">
              <p className="font-display text-2xl italic leading-snug text-ink">
                &ldquo;{p.quote}&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Curriculum timeline */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Kurikulum</p>
            <h2 className="font-display headline-section max-w-2xl">Tiga tahun, satu perjalanan.</h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {p.curriculum.map((y, i) => (
              <li
                key={y.year}
                className="reveal bg-paper-soft rounded-2xl p-7 flex flex-col gap-4 hover:bg-white hover:border-amber border border-transparent hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="font-display text-3xl text-amber">{y.year}</span>
                <ul className="space-y-2 text-sm text-ink/80">
                  {y.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="shrink-0 mt-2 h-1 w-3 rounded-full bg-amber" />
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Prestasi</p>
            <h2 className="font-display headline-section max-w-2xl">Catatan dari panggung & kompetisi.</h2>
          </div>
          <ul className="space-y-3">
            {p.achievements.map((a, i) => (
              <li
                key={a.title}
                className="reveal group flex items-center gap-6 p-6 rounded-2xl bg-white border border-black/5 hover:border-amber hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="shrink-0 font-display text-2xl text-amber w-20">{a.year}</span>
                <div className="flex-1">
                  <h3 className="font-display text-xl leading-snug">{a.title}</h3>
                  <p className="text-xs text-muted mt-1">{a.sub}</p>
                </div>
                <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedCards items={p.related} heading="Konsentrasi lain di SMKN 74." />
    </>
  );
}
