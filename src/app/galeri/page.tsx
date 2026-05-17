import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Galeri — SMKN 74 Jakarta",
  description: "Galeri foto dan momen-momen dari sekolah, pertunjukan, dan kegiatan komunitas.",
};

type GalleryItem = {
  id: string;
  category: "Seni Tari" | "Seni Musik" | "Seni Karawitan" | "Seni Teater" | "Kegiatan" | "Sekolah";
  title: string;
  caption: string;
  src: string;
  span?: "tall" | "wide" | "square";
};

const items: GalleryItem[] = [
  { id: "1",  category: "Seni Tari",      title: "Beksan Gambyong Kontemporer", caption: "Festival Tari Tradisional, Bali 2026", src: PHOTOS.galeri.g1,  span: "wide" },
  { id: "2",  category: "Sekolah",        title: "Gedung Utama",                caption: "Arsitektur kampus dari sisi timur",     src: PHOTOS.galeri.g2,  span: "tall" },
  { id: "3",  category: "Seni Karawitan", title: "Pagelaran Bentara Budaya",    caption: "Komposisi karawitan kontemporer",       src: PHOTOS.galeri.g3 },
  { id: "4",  category: "Seni Musik",     title: "Ensembel Musik Kamar",        caption: "Resital semester ganjil 2025",          src: PHOTOS.galeri.g4,  span: "wide" },
  { id: "5",  category: "Kegiatan",       title: "Workshop Kreatif",            caption: "Kreatif Mentor — Mei 2026",             src: PHOTOS.galeri.g5 },
  { id: "6",  category: "Seni Teater",    title: "Adaptasi Rendra",             caption: "Pementasan di Salihara, 2026",          src: PHOTOS.galeri.g6,  span: "tall" },
  { id: "7",  category: "Kegiatan",       title: "Pekan Seni 2026",             caption: "Tema: Suara Tanah Air",                 src: PHOTOS.galeri.g7 },
  { id: "8",  category: "Sekolah",        title: "Lapangan Utama",              caption: "Upacara bendera & olahraga",            src: PHOTOS.galeri.g8 },
  { id: "9",  category: "Seni Tari",     title: "Latihan Studio",              caption: "Studio Tari setiap pagi",               src: PHOTOS.galeri.g9 },
  { id: "10", category: "Kegiatan",      title: "Alumni Talk",                 caption: "Tiga jalur setelah SMK",                src: PHOTOS.galeri.g10, span: "wide" },
  { id: "11", category: "Seni Karawitan",title: "Set Gamelan Lengkap",         caption: "Studio Karawitan",                      src: PHOTOS.galeri.g11 },
  { id: "12", category: "Sekolah",       title: "Perpustakaan",                caption: "4.000+ koleksi buku & jurnal",          src: PHOTOS.galeri.g12 },
];

const categories = ["Semua", "Seni Tari", "Seni Musik", "Seni Karawitan", "Seni Teater", "Kegiatan", "Sekolah"];

function spanClass(span?: GalleryItem["span"]) {
  if (span === "tall") return "row-span-2 aspect-[3/5]";
  if (span === "wide") return "md:col-span-2 aspect-[5/3]";
  return "aspect-square";
}

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Galeri" },
        ]}
        tagline="Galeri foto"
        title="Momen-momen"
        accent="dari panggung & kelas."
        subtitle="Kumpulan foto dari pertunjukan, latihan, kegiatan, dan kehidupan sekolah sehari-hari."
      />

      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { n: String(items.length) + "+", l: "Total foto" },
            { n: String(categories.length - 1), l: "Kategori" },
            { n: "4", l: "Konsentrasi" },
            { n: "2026", l: "Tahun aktif" },
          ].map((s, i) => (
            <div key={s.l} className="reveal" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="font-display stat-num text-navy">{s.n}</div>
              <p className="text-[11px] uppercase tracking-widest text-muted mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper py-12">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2 mb-10 reveal">
            {categories.map((c) => (
              <span
                key={c}
                className={`h-9 px-4 rounded-full text-xs uppercase tracking-widest font-medium grid place-items-center ${
                  c === "Semua" ? "bg-navy text-paper" : "border border-black/10 text-ink/70"
                }`}
              >
                {c}
              </span>
            ))}
            <span className="ml-auto text-xs text-muted self-center">{items.length} foto</span>
          </div>

          {/* Bento grid — caption always visible on mobile, hover-reveal on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {items.map((it, i) => (
              <article
                key={it.id}
                className={`reveal group relative rounded-2xl overflow-hidden cursor-pointer bg-navy ${spanClass(it.span)}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Image
                  src={it.src}
                  alt={`${it.title} — ${it.caption}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tag */}
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-paper/90 text-navy text-[10px] uppercase tracking-widest font-semibold rounded-sm">
                  {it.category}
                </span>
                {/* Caption — always visible on mobile, hover-reveal on desktop */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-paper md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                  <p className="font-display text-base md:text-lg leading-tight">{it.title}</p>
                  <p className="text-xs text-paper/80 mt-1">{it.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Berita", title: "Event", body: "Pekan Seni, Open House, & lainnya.", href: "/berita/event", bg: "bg-amber", ink: "text-navy" },
          { tag: "Profil", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-navy", ink: "text-paper" },
          { tag: "Lainnya", title: "Unduhan", body: "Brosur, juknis, RKAS.", href: "/unduhan", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
