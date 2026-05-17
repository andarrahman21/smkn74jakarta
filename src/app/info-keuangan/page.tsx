import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";

export const metadata: Metadata = { title: "Info Keuangan — SMKN 74 Jakarta" };

const cards = [
  {
    tag: "BOP",
    title: "Biaya Operasional Pendidikan",
    body: "Bantuan dari Pemprov DKI Jakarta untuk operasional sekolah negeri.",
    href: "/info-keuangan/bop",
    bg: "bg-navy",
    ink: "text-paper",
  },
  {
    tag: "BOS",
    title: "Bantuan Operasional Sekolah",
    body: "Bantuan dari Kemendikbudristek untuk pembiayaan operasional sekolah.",
    href: "/info-keuangan/bos",
    bg: "bg-amber",
    ink: "text-navy",
  },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Info Keuangan" },
        ]}
        tagline="Transparansi anggaran"
        title="Dari mana dana sekolah berasal,"
        accent="ke mana ia mengalir."
        subtitle="Sebagai sekolah negeri, sumber pendanaan SMKN 74 berasal dari BOP (Pemprov DKI) dan BOS (Kemendikbudristek). Halaman ini berisi rincian, peruntukan, dan laporan transparansi."
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Dua sumber utama</p>
            <h2 className="font-display headline-section max-w-2xl">Pilih sumber yang ingin kamu telusuri.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`${c.bg} ${c.ink} group rounded-2xl p-10 aspect-[3/2] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 reveal`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="font-display text-7xl leading-none italic opacity-90 transition-transform duration-700 group-hover:scale-105">
                  {c.tag}
                </span>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{c.title}</h3>
                  <p className="text-sm opacity-85 mt-3 max-w-md leading-relaxed">{c.body}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  Lihat rincian
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Komitmen transparansi */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Komitmen</p>
            <h2 className="font-display headline-quote mb-4">Transparan, terbuka, dapat ditelusuri.</h2>
            <p className="text-ink/75 leading-relaxed">
              Kami terbuka untuk pertanyaan, masukan, atau permintaan dokumen anggaran. Hubungi Tata Usaha atau gunakan Kotak Saran.
            </p>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 reveal" style={{ animationDelay: "0.1s" }}>
            {[
              ["Audit", "Diaudit reguler oleh Inspektorat"],
              ["Pelaporan", "RKAS dipublikasikan tiap awal tahun"],
              ["Akuntabilitas", "Bukti pengeluaran tersimpan"],
              ["Pelayanan", "Pertanyaan ditangani dalam 3 hari kerja"],
            ].map(([k, v]) => (
              <li key={k} className="bg-paper-soft rounded-xl p-5">
                <p className="text-[10px] uppercase tracking-widest text-amber font-medium">{k}</p>
                <p className="text-sm mt-2 leading-relaxed">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
