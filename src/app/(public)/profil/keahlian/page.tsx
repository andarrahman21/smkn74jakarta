import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Konsentrasi Keahlian — SMKN 74 Jakarta" };

const programs = [
  { slug: "tari",       title: "Seni Tari",       tag: "Konsentrasi 01", body: "Tari tradisional Nusantara, tari kreasi, dan tari kontemporer.", bg: "bg-rust", ink: "text-paper" },
  { slug: "musik",      title: "Seni Musik",      tag: "Konsentrasi 02", body: "Musik klasik, modern, dan eksplorasi instrumen Nusantara.",     bg: "bg-amber", ink: "text-navy" },
  { slug: "karawitan",  title: "Seni Karawitan",  tag: "Konsentrasi 03", body: "Gamelan, vokal pesinden, dan komposisi karawitan Jawa-Sunda.",    bg: "bg-moss", ink: "text-paper" },
  { slug: "teater",     title: "Seni Teater",     tag: "Konsentrasi 04", body: "Akting, penyutradaraan, dramaturgi, dan produksi panggung.",      bg: "bg-navy-deep", ink: "text-paper" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Konsentrasi Keahlian" },
        ]}
        tagline={cms["keahlian.header_tagline"] ?? "Empat jalur, satu panggung"}
        taglineKey="keahlian.header_tagline"
        title={cms["keahlian.header_title"] ?? "Pilih jalanmu di"}
        titleKey="keahlian.header_title"
        accent={cms["keahlian.header_accent"] ?? "rumah seni Jagakarsa."}
        accentKey="keahlian.header_accent"
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="keahlian.intro_eyebrow" data-cms-type="text" data-cms-label="Label bagian konsentrasi" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["keahlian.intro_eyebrow"] ?? "Konsentrasi"}</p>
            <h2 data-cms-key="keahlian.intro_heading" data-cms-type="text" data-cms-label="Judul bagian konsentrasi" className="font-display headline-section max-w-2xl">{cms["keahlian.intro_heading"] ?? "Empat konsentrasi keahlian."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, i) => (
              <Link
                key={p.slug}
                href={`/profil/keahlian/${p.slug}`}
                className={`${p.bg} ${p.ink} group rounded-2xl p-10 aspect-[3/2] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 reveal`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p data-cms-key={`keahlian.program.${i}.tag`} data-cms-type="text" data-cms-label="Tag kartu konsentrasi" className="text-[10px] uppercase tracking-[0.22em] opacity-80">{cms[`keahlian.program.${i}.tag`] ?? p.tag}</p>
                <div>
                  <h3 className="font-display text-display-md leading-none italic transition-transform duration-700 group-hover:scale-105">
                    <span data-cms-key={`keahlian.program.${i}.title`} data-cms-type="text" data-cms-label="Judul kartu konsentrasi">{cms[`keahlian.program.${i}.title`] ?? p.title}</span>
                  </h3>
                  <p data-cms-key={`keahlian.program.${i}.body`} data-cms-type="textarea" data-cms-label="Deskripsi kartu konsentrasi" className="text-sm opacity-85 mt-4 max-w-md leading-relaxed">{cms[`keahlian.program.${i}.body`] ?? p.body}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <span data-cms-key={`keahlian.program.${i}.cta`} data-cms-type="text" data-cms-label="Teks tautan kartu">{cms[`keahlian.program.${i}.cta`] ?? "Selengkapnya"}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
