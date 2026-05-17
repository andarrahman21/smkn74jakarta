import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { FacilityIllust } from "@/components/profil/FacilityIllust";

export const metadata: Metadata = {
  title: "Sarana & Prasarana — SMKN 74 Jakarta",
};

type Illust = "kelas" | "tari" | "musik" | "teater" | "perpustakaan" | "lab" | "lapangan" | "aula" | "masjid";

const facilities: {
  tag: string;
  title: string;
  count: string;
  body: string;
  bg?: string;
  ink?: string;
  illust: Illust;
}[] = [
  { tag: "Pembelajaran", title: "Ruang Kelas",       count: "24 ruang",      body: "Kelas dengan proyektor, AC, dan papan tulis interaktif.",                        bg: "bg-navy",        ink: "text-paper",  illust: "kelas" },
  { tag: "Praktik",      title: "Studio Tari",       count: "3 studio",      body: "Studio lantai kayu dengan cermin dinding penuh dan sound system.",               bg: "bg-amber",       ink: "text-navy",   illust: "tari" },
  { tag: "Praktik",      title: "Studio Musik",      count: "2 studio",      body: "Ruang akustik dengan alat musik gamelan, drum, gitar, dan keyboard.",            bg: "bg-rust",        ink: "text-paper",  illust: "musik" },
  { tag: "Praktik",      title: "Black Box Theater", count: "1 panggung",    body: "Panggung serbaguna dengan tata cahaya dan tata suara profesional.",              bg: "bg-moss",        ink: "text-paper",  illust: "teater" },
  { tag: "Akademik",     title: "Perpustakaan",      count: "+4.000 koleksi",body: "Buku, jurnal, e-book seni, dan ruang baca tenang.",                              bg: "bg-paper-soft",  ink: "text-ink",    illust: "perpustakaan" },
  { tag: "Akademik",     title: "Lab Komputer",      count: "2 lab",         body: "Workstation untuk desain, multimedia, dan animasi 3D.",                          bg: "bg-navy-deep",   ink: "text-paper",  illust: "lab" },
  { tag: "Olahraga",     title: "Lapangan Olahraga", count: "1 lapangan",    body: "Lapangan serbaguna untuk basket, futsal, dan upacara.",                                                            illust: "lapangan" },
  { tag: "Penunjang",    title: "Aula Serbaguna",    count: "500 kursi",     body: "Aula untuk pertunjukan, seminar, dan acara komunitas.",                          bg: "bg-amber-soft",  ink: "text-navy",   illust: "aula" },
  { tag: "Penunjang",    title: "Masjid",            count: "1 unit",        body: "Masjid sekolah untuk ibadah dan kegiatan kerohanian.",                                                              illust: "masjid" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Sarana & Prasarana" },
        ]}
        tagline="Fasilitas sekolah"
        title="Ruang untuk berlatih,"
        accent="berkarya, dan bertumbuh"
        trailing="setiap hari."
      />

      {/* Stats strip */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: "24", l: "Ruang kelas" },
            { n: "8", l: "Studio & lab" },
            { n: "4", l: "Konsentrasi" },
            { n: "1.5 ha", l: "Luas lahan" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facility grid */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Daftar Fasilitas</p>
            <h2 className="font-display headline-section max-w-2xl">Setiap ruang punya tujuan.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((f, i) => (
              <article
                key={f.title}
                className={`${f.bg ?? "bg-white border border-black/5"} ${f.ink ?? "text-ink"} reveal group rounded-2xl p-6 flex flex-col gap-3 aspect-[4/3] overflow-hidden hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] opacity-80">
                  <span>{f.tag}</span>
                  <span className="text-amber font-medium">{f.count}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight">{f.title}</h3>

                {/* Illustration */}
                <div className="flex-1 grid place-items-center">
                  <FacilityIllust kind={f.illust} />
                </div>

                <p className="text-sm opacity-80 leading-relaxed border-t border-current/10 pt-3">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Struktur Organisasi", body: "Manajemen sekolah dan tim.", href: "/profil/struktur", bg: "bg-navy", ink: "text-paper" },
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Akademik", title: "Kurikulum", body: "Bagaimana kami belajar.", href: "/profil/kurikulum", bg: "bg-rust", ink: "text-paper" },
        ]}
      />
    </>
  );
}
