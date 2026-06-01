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
  /** CMS overrides map (key → value). Optional. */
  cms?: Record<string, string>;
  /** Key prefix for CMS keys, e.g. "bop" or "bos". */
  keyPrefix?: string;
};

export function BudgetDetail(p: BudgetProps) {
  const cms = p.cms ?? {};
  const kp = p.keyPrefix ?? p.code.toLowerCase();
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
        cms={cms}
        cmsPrefix={kp}
        wide
      />

      {/* Intro */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8 reveal">
          <p data-cms-key={`${kp}.intro.eyebrow`} data-cms-type="text" data-cms-label="Eyebrow Pengantar" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms[`${kp}.intro.eyebrow`] ?? "Pengantar"}</p>
          <h2 className="font-display headline-quote mb-6">Apa itu {p.code}?</h2>
          <p data-cms-key={`${kp}.intro`} data-cms-type="textarea" data-cms-label="Teks Pengantar" className="text-[17px] leading-relaxed text-ink/85 first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
            {cms[`${kp}.intro`] ?? p.intro}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key={`${kp}.faq.eyebrow`} data-cms-type="text" data-cms-label="Eyebrow FAQ" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms[`${kp}.faq.eyebrow`] ?? "FAQ"}</p>
            <h2 data-cms-key={`${kp}.faq.heading`} data-cms-type="text" data-cms-label="Judul FAQ" className="font-display headline-quote">{cms[`${kp}.faq.heading`] ?? "Pertanyaan yang sering ditanyakan."}</h2>
          </div>
          <div className="space-y-3">
            {p.faqs.map((f, i) => (
              <details key={f.q} className="reveal group/faq bg-paper-soft rounded-2xl p-6 hover:bg-white border border-transparent hover:border-amber transition-all" style={{ animationDelay: `${i * 0.06}s` }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span data-cms-key={`${kp}.faq.${i}.q`} data-cms-type="text" data-cms-label="Pertanyaan FAQ" className="font-display text-lg leading-snug">{cms[`${kp}.faq.${i}.q`] ?? f.q}</span>
                  <span className="shrink-0 h-8 w-8 rounded-full border border-black/10 grid place-items-center transition-transform group-open/faq:rotate-45">
                    +
                  </span>
                </summary>
                <p data-cms-key={`${kp}.faq.${i}.a`} data-cms-type="textarea" data-cms-label="Jawaban FAQ" className="mt-4 text-ink/70 leading-relaxed text-[15px]">{cms[`${kp}.faq.${i}.a`] ?? f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA hubungi */}
      <section className="bg-navy text-paper py-14 md:py-20 relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p data-cms-key={`${kp}.cta.eyebrow`} data-cms-type="text" data-cms-label="Eyebrow CTA" className="text-xs uppercase tracking-[0.22em] text-amber mb-4">{cms[`${kp}.cta.eyebrow`] ?? "Butuh info lebih?"}</p>
          <h2 data-cms-key={`${kp}.cta.heading`} data-cms-type="text" data-cms-label="Judul CTA" className="font-display headline-quote mb-6">{cms[`${kp}.cta.heading`] ?? "Hubungi Tata Usaha atau Kotak Saran."}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/profil/struktur/tenaga-kependidikan" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform">
              <span data-cms-key={`${kp}.cta.btn1`} data-cms-type="text" data-cms-label="Tombol 1">{cms[`${kp}.cta.btn1`] ?? "Tata Usaha →"}</span>
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-paper/30 text-sm font-medium hover:bg-white/5 transition-colors">
              <span data-cms-key={`${kp}.cta.btn2`} data-cms-type="text" data-cms-label="Tombol 2">{cms[`${kp}.cta.btn2`] ?? "Kotak Saran"}</span>
            </Link>
          </div>
        </div>
      </section>

      <RelatedCards items={p.related} heading="Pelajari lebih jauh." />
    </>
  );
}
