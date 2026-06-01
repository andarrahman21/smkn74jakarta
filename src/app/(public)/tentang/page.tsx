import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Tentang Sekolah — SMKN 74 Jakarta",
  description: "Sejarah singkat, identitas, dan komitmen SMK Negeri 74 Jakarta.",
};

const timeline = [
  { year: "1994", t: "Sekolah didirikan", d: "SMKN 74 Jakarta resmi berdiri di kawasan Jagakarsa, Jakarta Selatan, dengan dua jurusan awal." },
  { year: "2003", t: "Konsentrasi Seni dibuka", d: "Empat konsentrasi keahlian seni (Tari, Musik, Karawitan, Teater) resmi dibuka." },
  { year: "2014", t: "Akreditasi A", d: "Mendapat akreditasi A dari BAN-SM untuk seluruh konsentrasi keahlian." },
  { year: "2020", t: "Pembelajaran hybrid", d: "Transformasi pembelajaran digital saat pandemi: e-learning, kelas hybrid, asesmen online." },
  { year: "2024", t: "Kurikulum Merdeka", d: "Mengadopsi Kurikulum Merdeka dengan penguatan Projek Profil Pelajar Pancasila (P5)." },
  { year: "2026", t: "Pekan Seni & PKL", d: "Festival Pekan Seni tahunan + ekspansi kelas industri ke 24 mitra DUDI Jakarta." },
];

const facts = [
  { n: "30+", l: "Tahun berdiri" },
  { n: "1.500", l: "Siswa aktif" },
  { n: "42", l: "Guru" },
  { n: "24", l: "Mitra industri" },
  { n: "4", l: "Konsentrasi seni" },
  { n: "1.5 ha", l: "Luas lahan" },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Tentang Sekolah" },
        ]}
        tagline="Tentang SMKN 74"
        title="Tiga puluh tahun"
        accent="menumbuhkan seniman muda"
        trailing="dari Jagakarsa."
        subtitle="SMK Negeri 74 Jakarta adalah sekolah kejuruan negeri dengan empat konsentrasi keahlian seni — Tari, Musik, Karawitan, dan Teater. Kami percaya seni adalah jalan tumbuhnya karakter."
        cms={cms}
        cmsPrefix="tentang"
      />

      {/* Quick facts */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {facts.map((f, i) => (
            <div key={f.l} className="reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <div data-cms-key={`tentang.fact.${i}.n`} data-cms-type="text" data-cms-label="Angka Fakta" className="font-display text-4xl text-navy">{cms[`tentang.fact.${i}.n`] ?? f.n}</div>
              <p data-cms-key={`tentang.fact.${i}.l`} data-cms-type="text" data-cms-label="Label Fakta" className="text-[10px] uppercase tracking-widest text-muted mt-2">{cms[`tentang.fact.${i}.l`] ?? f.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Identitas */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <p data-cms-key="tentang.identitas_eyebrow" data-cms-type="text" data-cms-label="Label Identitas" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["tentang.identitas_eyebrow"] ?? "Identitas"}</p>
            <h2 data-cms-key="tentang.identitas_title" data-cms-type="text" data-cms-label="Judul Identitas" className="font-display headline-quote mb-4">{cms["tentang.identitas_title"] ?? "Sekolah seni dengan akar lokal."}</h2>
            <p data-cms-key="tentang.identitas_body" data-cms-type="textarea" data-cms-label="Deskripsi Identitas" className="text-ink/75 leading-relaxed">
              {cms["tentang.identitas_body"] ?? "Kami berdiri di Jagakarsa, satu kawasan dengan akar seni yang kuat. Kombinasi tradisi dan kontemporer adalah ciri khas pendekatan pembelajaran kami."}
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 reveal" style={{ animationDelay: "0.1s" }}>
            {[
              ["Nama", "SMK Negeri 74 Jakarta"],
              ["NPSN", "20103247"],
              ["Status", "Negeri"],
              ["Akreditasi", "A (BAN-SM)"],
              ["Alamat", "Jl. Moch. Kahfi II, Jagakarsa"],
              ["Kota", "Jakarta Selatan, 12640"],
              ["Telepon", "(021) 7864-216"],
              ["Email", "info@smkn74.sch.id"],
            ].map(([k, v], i) => (
              <div key={k} className="bg-white border border-black/5 rounded-xl p-4">
                <p data-cms-key={`tentang.identity.${i}.k`} data-cms-type="text" data-cms-label="Label Identitas" className="text-[10px] uppercase tracking-widest text-muted">{cms[`tentang.identity.${i}.k`] ?? k}</p>
                <p data-cms-key={`tentang.identity.${i}.v`} data-cms-type="text" data-cms-label="Nilai Identitas" className="text-sm font-medium mt-1">{cms[`tentang.identity.${i}.v`] ?? v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p data-cms-key="tentang.timeline_eyebrow" data-cms-type="text" data-cms-label="Label Perjalanan" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["tentang.timeline_eyebrow"] ?? "Perjalanan"}</p>
            <h2 data-cms-key="tentang.timeline_title" data-cms-type="text" data-cms-label="Judul Perjalanan" className="font-display headline-section max-w-2xl">{cms["tentang.timeline_title"] ?? "Tonggak-tonggak perjalanan."}</h2>
          </div>

          <ol className="relative border-l-2 border-amber/30 ml-3 space-y-8">
            {timeline.map((t, i) => (
              <li key={t.year} className="pl-8 relative reveal" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="absolute -left-[11px] top-2 h-5 w-5 rounded-full bg-amber border-4 border-paper" />
                <p data-cms-key={`tentang.timeline.${i}.year`} data-cms-type="text" data-cms-label="Tahun" className="font-display text-3xl text-amber leading-none">{cms[`tentang.timeline.${i}.year`] ?? t.year}</p>
                <h3 data-cms-key={`tentang.timeline.${i}.t`} data-cms-type="text" data-cms-label="Judul Tonggak" className="font-display text-2xl mt-2 mb-1">{cms[`tentang.timeline.${i}.t`] ?? t.t}</h3>
                <p data-cms-key={`tentang.timeline.${i}.d`} data-cms-type="textarea" data-cms-label="Deskripsi Tonggak" className="text-ink/70 leading-relaxed">{cms[`tentang.timeline.${i}.d`] ?? t.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Komitmen */}
      <section className="bg-navy text-paper py-16 md:py-24 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 flex items-end justify-between px-8 opacity-25">
          {[280, 320, 240, 360, 220, 320, 280, 300, 260, 320, 240, 300].map((h, i) => (
            <span
              key={i}
              className="block w-[4vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
              style={{ height: `${h}px`, animationDelay: `${(i % 5) * 0.2}s`, animationDuration: `${1.4 + (i % 4) * 0.2}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <p data-cms-key="tentang.komitmen_eyebrow" data-cms-type="text" data-cms-label="Label Komitmen" className="text-xs uppercase tracking-[0.22em] text-amber mb-5 animate-fade-up">{cms["tentang.komitmen_eyebrow"] ?? "Komitmen kami"}</p>
          <h2 className="font-display headline-page font-light animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <span data-cms-key="tentang.komitmen_line1" data-cms-type="text" data-cms-label="Komitmen Baris 1">{cms["tentang.komitmen_line1"] ?? "Mendidik anak-anak yang tahu jalan pulang —"}</span><br />
            <em className="not-italic text-amber"><span data-cms-key="tentang.komitmen_line2" data-cms-type="text" data-cms-label="Komitmen Baris 2">{cms["tentang.komitmen_line2"] ?? "dan jalan bertumbuh."}</span></em>
          </h2>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Sambutan Kepala Sekolah", body: "Pesan langsung dari kepala sekolah.", href: "/profil/sambutan", bg: "bg-amber", ink: "text-navy" },
          { tag: "Profil", title: "Visi & Misi Sekolah", body: "Arah dan komitmen.", href: "/profil/visi-misi", bg: "bg-navy", ink: "text-paper" },
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
