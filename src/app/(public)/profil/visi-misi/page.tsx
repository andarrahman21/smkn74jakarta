import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { createPublicClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Visi & Misi — SMKN 74 Jakarta",
  description: "Visi, misi, dan nilai SMK Negeri 74 Jakarta.",
};

async function getMisi(): Promise<{ id: string; title: string; body: string }[]> {
  try {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("misi")
      .select("id, title, body")
      .order("sort_order", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const cms = await resolveSiteContent();
  const misi = await getMisi();
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
        cms={cms}
        cmsPrefix="visimisi"
      />

      {/* Visi */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <p data-cms-key="visimisi.visi_eyebrow" data-cms-type="text" data-cms-label="Label Visi" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["visimisi.visi_eyebrow"] ?? "Visi"}</p>
            <h2 data-cms-key="visimisi.visi_title" data-cms-type="text" data-cms-label="Judul Visi" className="font-display headline-quote">{cms["visimisi.visi_title"] ?? "Satu kalimat, satu arah."}</h2>
            <p data-cms-key="visimisi.visi_intro" data-cms-type="textarea" data-cms-label="Pengantar Visi" className="mt-4 text-ink/70 leading-relaxed">
              {cms["visimisi.visi_intro"] ?? "Visi sekolah adalah bintang penunjuk — sederhana, mudah diingat, dan menjadi rujukan setiap keputusan."}
            </p>
          </div>
          <div className="lg:col-span-8 reveal" style={{ animationDelay: "0.1s" }}>
            <div className="relative rounded-2xl bg-navy text-paper p-12 overflow-hidden animate-float-slow shadow-2xl shadow-black/20">
              <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
                <span data-cms-key="visimisi.visi_badge" data-cms-type="text" data-cms-label="Badge Visi">{cms["visimisi.visi_badge"] ?? "Visi SMKN 74"}</span>
              </div>
              <p className="mt-10 font-display text-4xl lg:text-5xl leading-[1.15]">
                <span data-cms-key="visimisi.visi_text_a" data-cms-type="textarea" data-cms-label="Visi (awal)">{cms["visimisi.visi_text_a"] ?? "Mewujudkan generasi muda yang"}</span> <em className="not-italic text-amber"><span data-cms-key="visimisi.visi_text_b" data-cms-type="text" data-cms-label="Visi (sorotan)">{cms["visimisi.visi_text_b"] ?? "berkarakter, kreatif, dan kompeten"}</span></em> <span data-cms-key="visimisi.visi_text_c" data-cms-type="textarea" data-cms-label="Visi (akhir)">{cms["visimisi.visi_text_c"] ?? "di bidang seni untuk berkontribusi pada Indonesia."}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misi */}
      <section className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-14 reveal">
            <p data-cms-key="visimisi.misi_eyebrow" data-cms-type="text" data-cms-label="Label Misi" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">{cms["visimisi.misi_eyebrow"] ?? "Misi"}</p>
            <h2 data-cms-key="visimisi.misi_title" data-cms-type="text" data-cms-label="Judul Misi" className="font-display headline-section max-w-2xl">{cms["visimisi.misi_title"] ?? "Lima langkah, dijalankan bersama."}</h2>
          </div>
          <ol className="space-y-4">
            {misi.map((m, i) => (
              <li
                key={m.id}
                className="reveal group flex items-start gap-6 p-6 rounded-2xl bg-paper-soft hover:bg-white hover:border-amber border border-transparent hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="shrink-0 font-display text-3xl text-amber w-12">{String(i + 1).padStart(2, "0")}</span>
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
