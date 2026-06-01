import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = { title: "Kurikulum — SMKN 74 Jakarta" };

const pillars = [
  { n: "01", title: "Mata Pelajaran Umum", body: "Bahasa Indonesia, Matematika, Bahasa Inggris, Sejarah, PPKn, PJOK, Agama." },
  { n: "02", title: "Dasar Bidang Keahlian", body: "Pengetahuan dasar seni, sejarah seni, apresiasi karya, dan estetika." },
  { n: "03", title: "Konsentrasi Keahlian", body: "Spesialisasi Tari, Musik, Karawitan, atau Teater dengan studio dan magang industri." },
  { n: "04", title: "Projek Penguatan P5", body: "Profil Pelajar Pancasila lewat projek lintas mata pelajaran." },
];

const timeline = [
  { semester: "Sem 1–2 · Kelas X", focus: "Fondasi & eksplorasi", topics: "Dasar umum, pengantar seni, P5 perdana." },
  { semester: "Sem 3–4 · Kelas XI", focus: "Spesialisasi", topics: "Pendalaman konsentrasi, magang awal, kolaborasi lintas konsentrasi." },
  { semester: "Sem 5 · Kelas XII", focus: "Industri & PKL", topics: "Praktik Kerja Lapangan di mitra DUDI, produksi karya tugas akhir." },
  { semester: "Sem 6 · Kelas XII", focus: "Karya & ujian akhir", topics: "Tugas akhir, resital/pementasan, portofolio audisi PT/karier." },
];

export default async function Page() {
  const cms = await resolveSiteContent();
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Kurikulum" },
        ]}
        tagline="Cara kami belajar"
        title="Kurikulum Merdeka,"
        accent="dijalankan dengan ritme seni."
        cms={cms}
        cmsPrefix="kurikulum"
      />

      {/* Pillars */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="kurikulum.pillars_eyebrow" data-cms-type="text" data-cms-label="Label Pilar" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["kurikulum.pillars_eyebrow"] ?? "Empat Pilar"}</p>
            <h2 data-cms-key="kurikulum.pillars_title" data-cms-type="text" data-cms-label="Judul Pilar" className="font-display headline-section max-w-2xl">{cms["kurikulum.pillars_title"] ?? "Apa yang dipelajari setiap siswa."}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <article
                key={p.n}
                className="reveal group bg-white border border-black/5 rounded-2xl p-7 hover:border-amber hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-display text-3xl text-amber">{p.n}</span>
                  <h3 data-cms-key={`kurikulum.pillar.${i}.title`} data-cms-type="text" data-cms-label="Judul Pilar" className="font-display text-2xl leading-tight">{cms[`kurikulum.pillar.${i}.title`] ?? p.title}</h3>
                </div>
                <p data-cms-key={`kurikulum.pillar.${i}.body`} data-cms-type="textarea" data-cms-label="Deskripsi Pilar" className="text-ink/70 leading-relaxed">{cms[`kurikulum.pillar.${i}.body`] ?? p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline 3 tahun */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p data-cms-key="kurikulum.timeline_eyebrow" data-cms-type="text" data-cms-label="Label Perjalanan" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["kurikulum.timeline_eyebrow"] ?? "Perjalanan"}</p>
            <h2 data-cms-key="kurikulum.timeline_title" data-cms-type="text" data-cms-label="Judul Perjalanan" className="font-display headline-section max-w-2xl">{cms["kurikulum.timeline_title"] ?? "Tiga tahun, empat fase."}</h2>
          </div>

          <ol className="relative border-l-2 border-amber/30 ml-3 space-y-8">
            {timeline.map((t, i) => (
              <li key={t.semester} className="pl-8 relative reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="absolute -left-[11px] top-2 h-5 w-5 rounded-full bg-amber border-4 border-paper" />
                <p data-cms-key={`kurikulum.phase.${i}.semester`} data-cms-type="text" data-cms-label="Semester" className="text-[10px] uppercase tracking-[0.22em] text-amber font-medium">{cms[`kurikulum.phase.${i}.semester`] ?? t.semester}</p>
                <h3 data-cms-key={`kurikulum.phase.${i}.focus`} data-cms-type="text" data-cms-label="Fokus Fase" className="font-display text-2xl mt-1 mb-2">{cms[`kurikulum.phase.${i}.focus`] ?? t.focus}</h3>
                <p data-cms-key={`kurikulum.phase.${i}.topics`} data-cms-type="textarea" data-cms-label="Topik Fase" className="text-ink/70 leading-relaxed">{cms[`kurikulum.phase.${i}.topics`] ?? t.topics}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Profil", title: "Visi & Misi Sekolah", body: "Arah dan komitmen.", href: "/profil/visi-misi", bg: "bg-navy", ink: "text-paper" },
          { tag: "Profil", title: "Sarana & Prasarana", body: "Ruang untuk berlatih & berkarya.", href: "/profil/sarana-prasarana", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
