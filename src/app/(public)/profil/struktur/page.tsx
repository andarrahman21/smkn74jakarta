import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Struktur Organisasi — SMKN 74 Jakarta" };

const cards = [
  { tag: "Internal", title: "Manajemen Sekolah", body: "Kepala sekolah, wakil, dan koordinator bidang.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
  { tag: "Pendukung", title: "Tenaga Kependidikan", body: "Tata usaha, pustakawan, laboran, dan teknisi.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-amber", ink: "text-navy" },
  { tag: "Eksternal", title: "Komite Sekolah", body: "Mitra orang tua dan masyarakat.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
  { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
  { tag: "Kesiswaan", title: "MPK", body: "Majelis Perwakilan Kelas.", href: "/profil/struktur/mpk", bg: "bg-navy-deep", ink: "text-paper" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi" },
        ]}
        tagline={cms["struktur.header_tagline"] ?? "Siapa mengerjakan apa"}
        taglineKey="struktur.header_tagline"
        title={cms["struktur.header_title"] ?? "Lima bagian, satu"}
        titleKey="struktur.header_title"
        accent={cms["struktur.header_accent"] ?? "komunitas sekolah."}
        accentKey="struktur.header_accent"
      />

      {/* Org chart */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p data-cms-key="struktur.chart_eyebrow" data-cms-type="text" data-cms-label="Label bagan" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["struktur.chart_eyebrow"] ?? "Bagan"}</p>
            <h2 data-cms-key="struktur.chart_heading" data-cms-type="text" data-cms-label="Judul bagan" className="font-display headline-quote max-w-2xl">{cms["struktur.chart_heading"] ?? "Hierarki dan jalur koordinasi."}</h2>
          </div>

          {/* Stylized org chart */}
          <div className="rounded-2xl bg-white border border-black/5 p-10 reveal">
            <div className="flex flex-col items-center gap-6">
              {/* Top */}
              <div className="bg-navy text-paper rounded-xl px-8 py-4 text-center min-w-[260px] animate-float-slow">
                <p data-cms-key="struktur.chart_top_role" data-cms-type="text" data-cms-label="Jabatan puncak bagan" className="text-[10px] uppercase tracking-widest text-amber">{cms["struktur.chart_top_role"] ?? "Kepala Sekolah"}</p>
                <p data-cms-key="struktur.chart_top_name" data-cms-type="text" data-cms-label="Nama puncak bagan" className="font-display text-lg">{cms["struktur.chart_top_name"] ?? "Drs. Bambang Sutiyono"}</p>
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Komite di kanan */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="bg-paper-soft rounded-xl px-6 py-3 text-center min-w-[180px]">
                  <p data-cms-key="struktur.chart_komite_role" data-cms-type="text" data-cms-label="Label komite bagan" className="text-[10px] uppercase tracking-widest text-muted">{cms["struktur.chart_komite_role"] ?? "Komite"}</p>
                  <p data-cms-key="struktur.chart_komite_name" data-cms-type="text" data-cms-label="Nama komite bagan" className="font-display">{cms["struktur.chart_komite_name"] ?? "Mitra Orang Tua"}</p>
                </div>
                <div className="bg-paper-soft rounded-xl px-6 py-3 text-center min-w-[180px]">
                  <p data-cms-key="struktur.chart_pengawas_role" data-cms-type="text" data-cms-label="Label pengawas bagan" className="text-[10px] uppercase tracking-widest text-muted">{cms["struktur.chart_pengawas_role"] ?? "Pengawas"}</p>
                  <p data-cms-key="struktur.chart_pengawas_name" data-cms-type="text" data-cms-label="Nama pengawas bagan" className="font-display">{cms["struktur.chart_pengawas_name"] ?? "Suku Dinas"}</p>
                </div>
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Wakil-wakil */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {["Kurikulum", "Kesiswaan", "Sarana & Prasarana", "Humas & DUDI"].map((w, i) => (
                  <div key={w} className="bg-amber/15 rounded-xl px-4 py-3 text-center reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                    <p data-cms-key={`struktur.chart_wakil.${i}.role`} data-cms-type="text" data-cms-label="Label wakil bagan" className="text-[10px] uppercase tracking-widest text-amber">{cms[`struktur.chart_wakil.${i}.role`] ?? "Wakil"}</p>
                    <p data-cms-key={`struktur.chart_wakil.${i}.name`} data-cms-type="text" data-cms-label="Nama wakil bagan" className="font-display text-sm">{cms[`struktur.chart_wakil.${i}.name`] ?? w}</p>
                  </div>
                ))}
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Bottom row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full text-center text-xs">
                <div data-cms-key="struktur.chart_bottom.0" data-cms-type="text" data-cms-label="Baris bawah bagan" className="bg-paper-soft rounded-lg py-3">{cms["struktur.chart_bottom.0"] ?? "Guru Mata Pelajaran"}</div>
                <div data-cms-key="struktur.chart_bottom.1" data-cms-type="text" data-cms-label="Baris bawah bagan" className="bg-paper-soft rounded-lg py-3">{cms["struktur.chart_bottom.1"] ?? "Wali Kelas"}</div>
                <div data-cms-key="struktur.chart_bottom.2" data-cms-type="text" data-cms-label="Baris bawah bagan" className="bg-paper-soft rounded-lg py-3">{cms["struktur.chart_bottom.2"] ?? "Tenaga Kependidikan"}</div>
                <div data-cms-key="struktur.chart_bottom.3" data-cms-type="text" data-cms-label="Baris bawah bagan" className="bg-paper-soft rounded-lg py-3">{cms["struktur.chart_bottom.3"] ?? "BK / Konselor"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section cards */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="struktur.cards_eyebrow" data-cms-type="text" data-cms-label="Label bagian kartu" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["struktur.cards_eyebrow"] ?? "Bagian"}</p>
            <h2 data-cms-key="struktur.cards_heading" data-cms-type="text" data-cms-label="Judul bagian kartu" className="font-display headline-section max-w-2xl">{cms["struktur.cards_heading"] ?? "Telusuri tiap bagian."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`${c.bg} ${c.ink} group rounded-2xl p-7 flex flex-col gap-3 aspect-[4/3] hover:-translate-y-2 transition-transform duration-500 reveal`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p data-cms-key={`struktur.card.${i}.tag`} data-cms-type="text" data-cms-label="Tag kartu bagian" className="text-[10px] uppercase tracking-[0.22em] opacity-80">{cms[`struktur.card.${i}.tag`] ?? c.tag}</p>
                <h3 data-cms-key={`struktur.card.${i}.title`} data-cms-type="text" data-cms-label="Judul kartu bagian" className="font-display text-2xl leading-tight mt-auto">{cms[`struktur.card.${i}.title`] ?? c.title}</h3>
                <p data-cms-key={`struktur.card.${i}.body`} data-cms-type="textarea" data-cms-label="Deskripsi kartu bagian" className="text-sm opacity-80 leading-relaxed">{cms[`struktur.card.${i}.body`] ?? c.body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <span data-cms-key={`struktur.card.${i}.cta`} data-cms-type="text" data-cms-label="Teks tautan kartu">{cms[`struktur.card.${i}.cta`] ?? "Lihat"}</span>
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
