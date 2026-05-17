import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = {
  title: "Visi & Misi — SMKN 74 Jakarta",
  description: "Visi, misi, dan nilai SMK Negeri 74 Jakarta.",
};

const misi = [
  { n: "01", title: "Membentuk karakter", body: "Menumbuhkan integritas, disiplin, dan semangat gotong-royong sebagai dasar setiap pembelajaran." },
  { n: "02", title: "Mengembangkan keahlian", body: "Menyiapkan lulusan terampil di bidang seni dan kreatif yang relevan dengan kebutuhan industri." },
  { n: "03", title: "Menumbuhkan kreativitas", body: "Membuka ruang ekspresi, eksperimen, dan kolaborasi lintas konsentrasi keahlian." },
  { n: "04", title: "Membangun kemitraan", body: "Bekerjasama dengan DUDI, komunitas seni, dan perguruan tinggi untuk jalur karier yang luas." },
  { n: "05", title: "Mewujudkan lingkungan inklusif", body: "Sekolah yang aman, ramah, dan menghargai setiap latar belakang dan ekspresi." },
];

const nilai = [
  { word: "Integritas", body: "Jujur pada diri sendiri, pada karya, dan pada komunitas.", bg: "bg-navy", ink: "text-paper" },
  { word: "Kreativitas", body: "Berani bertanya, bereksperimen, dan menempuh jalan baru.", bg: "bg-amber", ink: "text-navy" },
  { word: "Kolaborasi", body: "Bertumbuh bersama; satu panggung, banyak suara.", bg: "bg-moss", ink: "text-paper" },
  { word: "Ketekunan", body: "Mengasah kemampuan setiap hari, sedikit demi sedikit.", bg: "bg-rust", ink: "text-paper" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Visi & Misi Sekolah" },
        ]}
        tagline="Arah dan komitmen"
        title="Apa yang kami tuju, dan bagaimana"
        accent="kami menjalankannya"
        trailing="setiap hari."
      />

      {/* Visi */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Visi</p>
            <h2 className="font-display headline-quote">Satu kalimat, satu arah.</h2>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Visi sekolah adalah bintang penunjuk — sederhana, mudah diingat, dan menjadi rujukan setiap keputusan.
            </p>
          </div>
          <div className="lg:col-span-8 reveal" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-2xl bg-navy text-paper p-12 overflow-hidden animate-float-slow shadow-2xl shadow-black/20">
              <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
                Visi SMKN 74
              </div>
              <p className="mt-10 font-display text-4xl lg:text-5xl leading-[1.15]">
                Mewujudkan generasi muda yang <em className="not-italic text-amber">berkarakter, kreatif, dan kompeten</em> di bidang seni untuk berkontribusi pada Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Misi</p>
            <h2 className="font-display headline-section max-w-2xl">Lima langkah, dijalankan bersama.</h2>
          </div>
          <ol className="space-y-4">
            {misi.map((m, i) => (
              <li
                key={m.n}
                className="reveal group flex items-start gap-6 p-6 rounded-2xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="shrink-0 font-display text-3xl text-amber w-12">{m.n}</span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl leading-snug mb-2">{m.title}</h3>
                  <p className="text-ink/70 leading-relaxed">{m.body}</p>
                </div>
                <div className="shrink-0 h-10 w-10 rounded-full border border-black/10 grid place-items-center transition-all group-hover:bg-amber group-hover:border-amber group-hover:rotate-[-45deg]">→</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Nilai */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Nilai</p>
            <h2 className="font-display headline-section max-w-2xl">Empat kata yang kami pegang.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {nilai.map((n, i) => (
              <article
                key={n.word}
                className={`${n.bg} ${n.ink} reveal group rounded-2xl p-7 aspect-[3/4] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-[10px] uppercase tracking-[0.22em] opacity-80">Nilai · 0{i + 1}</span>
                <span className="font-display text-display-md leading-none italic transition-transform duration-700 group-hover:scale-110">
                  {n.word}
                </span>
                <p className="text-sm opacity-85 leading-relaxed border-t border-current/15 pt-4">{n.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Sambutan Kepala Sekolah", body: "Pesan langsung dari kepala sekolah.", href: "/profil/sambutan", bg: "bg-navy", ink: "text-paper" },
          { tag: "Profil", title: "Struktur Organisasi", body: "Manajemen, komite, OSIS, MPK.", href: "/profil/struktur", bg: "bg-amber", ink: "text-navy" },
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
