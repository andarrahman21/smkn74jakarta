import Link from "next/link";
import { PageHeader } from "./PageHeader";
import { RelatedCards, type Related } from "./RelatedCards";

export type Allocation = { label: string; pct: number; body: string };
export type FAQ = { q: string; a: string };

export type BudgetProps = {
  code: "BOP" | "BOS";
  fullName: string;
  source: string;
  tagline: string;
  intro: string;
  totalAnnual: string;
  perStudentMonthly?: string;
  accentBg: string;
  accentInk: string;
  allocations: Allocation[];
  rules: string[];
  faqs: FAQ[];
  related: Related[];
};

export function BudgetDetail(p: BudgetProps) {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Info Keuangan", href: "/info-keuangan" },
          { label: p.code },
        ]}
        tagline={p.tagline}
        title={p.fullName.split(" ")[0]}
        accent={p.fullName.split(" ").slice(1).join(" ")}
      />

      {/* Hero card + intro */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <div className={`${p.accentBg} ${p.accentInk} relative rounded-2xl aspect-[4/5] p-10 animate-float-slow shadow-2xl shadow-black/15 flex flex-col justify-between`}>
              <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">{p.source}</span>
              <span className="font-display text-display-xl italic">{p.code}</span>
              <div className="border-t border-current/15 pt-4">
                <p className="text-xs uppercase tracking-widest opacity-70">Anggaran tahunan</p>
                <p className="font-display text-3xl mt-1">{p.totalAnnual}</p>
                {p.perStudentMonthly && (
                  <p className="text-[11px] opacity-75 mt-2">{p.perStudentMonthly} per siswa / bulan</p>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 reveal" style={{ animationDelay: "0.1s" }}>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Pengantar</p>
            <h2 className="font-display headline-quote mb-6">Apa itu {p.code}?</h2>
            <p className="text-[17px] leading-relaxed text-ink/85 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {p.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Alokasi */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Alokasi</p>
            <h2 className="font-display headline-section max-w-2xl">Ke mana dana mengalir.</h2>
          </div>

          {/* Stacked bar */}
          <div className="rounded-2xl bg-paper-soft p-6 reveal mb-8">
            <div className="flex h-6 rounded-full overflow-hidden">
              {p.allocations.map((a, i) => (
                <div
                  key={a.label}
                  className={[
                    "transition-all duration-500",
                    ["bg-navy", "bg-amber", "bg-moss", "bg-rust", "bg-navy-deep", "bg-amber-soft"][i % 6],
                  ].join(" ")}
                  style={{ width: `${a.pct}%` }}
                  title={`${a.label} — ${a.pct}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs">
              {p.allocations.map((a, i) => (
                <div key={a.label} className="flex items-center gap-2">
                  <span className={[
                    "inline-block h-2 w-2 rounded-full",
                    ["bg-navy", "bg-amber", "bg-moss", "bg-rust", "bg-navy-deep", "bg-amber-soft"][i % 6],
                  ].join(" ")} />
                  <span className="font-medium">{a.label}</span>
                  <span className="text-muted">{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.allocations.map((a, i) => (
              <li
                key={a.label}
                className="reveal bg-white border border-black/5 rounded-2xl p-6 hover:border-amber hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display text-xl">{a.label}</h3>
                  <span className="font-display text-2xl text-amber">{a.pct}%</span>
                </div>
                <p className="text-sm text-ink/70 leading-relaxed">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Aturan penggunaan */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Aturan</p>
            <h2 className="font-display headline-quote mb-4">Apa yang tidak boleh dibiayai {p.code}.</h2>
            <p className="text-ink/75 leading-relaxed">
              Sesuai juknis resmi, ada beberapa peruntukan yang dilarang. Daftar di samping adalah hal-hal yang TIDAK dibiayai oleh {p.code}.
            </p>
          </div>
          <ul className="lg:col-span-7 space-y-3 reveal" style={{ animationDelay: "0.1s" }}>
            {p.rules.map((r, i) => (
              <li key={r} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/5">
                <span className="shrink-0 h-7 w-7 rounded-full bg-rust/15 text-rust grid place-items-center text-sm font-semibold">{i + 1}</span>
                <span className="text-ink/80">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">FAQ</p>
            <h2 className="font-display headline-quote">Pertanyaan yang sering ditanyakan.</h2>
          </div>
          <div className="space-y-3">
            {p.faqs.map((f, i) => (
              <details key={f.q} className="reveal group/faq bg-paper-soft rounded-2xl p-6 hover:bg-white border border-transparent hover:border-amber transition-all" style={{ animationDelay: `${i * 0.06}s` }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-lg leading-snug">{f.q}</span>
                  <span className="shrink-0 h-8 w-8 rounded-full border border-black/10 grid place-items-center transition-transform group-open/faq:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink/70 leading-relaxed text-[15px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA hubungi */}
      <section className="bg-navy text-paper py-14 md:py-20 relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amber mb-4">Butuh info lebih?</p>
          <h2 className="font-display headline-quote mb-6">Hubungi Tata Usaha atau Kotak Saran.</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/profil/struktur/tenaga-kependidikan" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform">
              Tata Usaha →
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-paper/30 text-sm font-medium hover:bg-white/5 transition-colors">
              Kotak Saran
            </Link>
          </div>
        </div>
      </section>

      <RelatedCards items={p.related} heading="Pelajari lebih jauh." />
    </>
  );
}
