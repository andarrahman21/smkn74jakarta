import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";

export const metadata: Metadata = { title: "Struktur Organisasi — SMKN 74 Jakarta" };

const cards = [
  { tag: "Internal", title: "Manajemen Sekolah", body: "Kepala sekolah, wakil, dan koordinator bidang.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
  { tag: "Pendukung", title: "Tenaga Kependidikan", body: "Tata usaha, pustakawan, laboran, dan teknisi.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-amber", ink: "text-navy" },
  { tag: "Eksternal", title: "Komite Sekolah", body: "Mitra orang tua dan masyarakat.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
  { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
  { tag: "Kesiswaan", title: "MPK", body: "Majelis Perwakilan Kelas.", href: "/profil/struktur/mpk", bg: "bg-navy-deep", ink: "text-paper" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi" },
        ]}
        tagline="Siapa mengerjakan apa"
        title="Lima bagian, satu"
        accent="komunitas sekolah."
      />

      {/* Org chart */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Bagan</p>
            <h2 className="font-display headline-quote max-w-2xl">Hierarki dan jalur koordinasi.</h2>
          </div>

          {/* Stylized org chart */}
          <div className="rounded-2xl bg-white border border-black/5 p-10 reveal">
            <div className="flex flex-col items-center gap-6">
              {/* Top */}
              <div className="bg-navy text-paper rounded-xl px-8 py-4 text-center min-w-[260px] animate-float-slow">
                <p className="text-[10px] uppercase tracking-widest text-amber">Kepala Sekolah</p>
                <p className="font-display text-lg">Drs. Bambang Sutiyono</p>
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Komite di kanan */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="bg-paper-soft rounded-xl px-6 py-3 text-center min-w-[180px]">
                  <p className="text-[10px] uppercase tracking-widest text-muted">Komite</p>
                  <p className="font-display">Mitra Orang Tua</p>
                </div>
                <div className="bg-paper-soft rounded-xl px-6 py-3 text-center min-w-[180px]">
                  <p className="text-[10px] uppercase tracking-widest text-muted">Pengawas</p>
                  <p className="font-display">Suku Dinas</p>
                </div>
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Wakil-wakil */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {["Kurikulum", "Kesiswaan", "Sarana & Prasarana", "Humas & DUDI"].map((w, i) => (
                  <div key={w} className="bg-amber/15 rounded-xl px-4 py-3 text-center reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                    <p className="text-[10px] uppercase tracking-widest text-amber">Wakil</p>
                    <p className="font-display text-sm">{w}</p>
                  </div>
                ))}
              </div>
              <div className="w-px h-6 bg-mist" />
              {/* Bottom row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full text-center text-xs">
                <div className="bg-paper-soft rounded-lg py-3">Guru Mata Pelajaran</div>
                <div className="bg-paper-soft rounded-lg py-3">Wali Kelas</div>
                <div className="bg-paper-soft rounded-lg py-3">Tenaga Kependidikan</div>
                <div className="bg-paper-soft rounded-lg py-3">BK / Konselor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-section cards */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Bagian</p>
            <h2 className="font-display headline-section max-w-2xl">Telusuri tiap bagian.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`${c.bg} ${c.ink} group rounded-2xl p-7 flex flex-col gap-3 aspect-[4/3] hover:-translate-y-2 transition-transform duration-500 reveal`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-80">{c.tag}</p>
                <h3 className="font-display text-2xl leading-tight mt-auto">{c.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{c.body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  Lihat
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
