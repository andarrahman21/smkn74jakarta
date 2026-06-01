import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PHOTOS } from "@/data/photos";
import { resolveSiteContent } from "@/lib/site-content/get";

export const metadata: Metadata = {
  title: "Sambutan Kepala Sekolah — SMKN 74 Jakarta",
  description:
    "Sambutan Drs. Bambang Sutiyono, M.Pd selaku Kepala SMK Negeri 74 Jakarta — visi, harapan, dan undangan untuk bertumbuh bersama.",
};

const WAVE_BARS = [240, 280, 320, 220, 300, 260, 320, 280, 300, 260, 340, 240, 300, 280];

export default async function SambutanPage() {
  const cms = await resolveSiteContent();
  return (
    <>
      {/* ---------- Page header (navy, compact) ---------- */}
      <section className="relative bg-navy text-paper overflow-hidden">
        {/* Audio-wave background (subtle, smaller than home hero) */}
        <div aria-hidden className="absolute inset-0 flex items-end justify-between px-8 opacity-25">
          {WAVE_BARS.map((h, i) => (
            <span
              key={i}
              className="block w-[3vw] max-w-[60px] bg-amber/60 rounded-full animate-wave"
              style={{
                height: `${h}px`,
                animationDelay: `${(i % 6) * 0.18}s`,
                animationDuration: `${1.4 + (i % 4) * 0.18}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-16 pb-20">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-paper/60 animate-fade-up"
          >
            <Link href="/" className="hover:text-amber transition-colors">Beranda</Link>
            <span className="text-paper/30">/</span>
            <span className="text-paper/60">Profil Sekolah</span>
            <span className="text-paper/30">/</span>
            <span className="text-amber">Sambutan Kepala Sekolah</span>
          </nav>

          <p data-cms-key="sambutan.hero_eyebrow" data-cms-type="text" data-cms-label="Label Hero" className="mt-10 text-sm uppercase tracking-[0.22em] text-amber/90 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {cms["sambutan.hero_eyebrow"] ?? "Salam dari Kepala Sekolah"}
          </p>
          <h1
            className="mt-4 font-display headline-page font-light max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            &ldquo;<span data-cms-key="sambutan.hero_title_a" data-cms-type="text" data-cms-label="Judul Hero (1)">{cms["sambutan.hero_title_a"] ?? "Sekolah ini bukan sekadar tempat belajar —"}</span> <em className="not-italic text-amber"><span data-cms-key="sambutan.hero_title_b" data-cms-type="text" data-cms-label="Judul Hero (sorotan)">{cms["sambutan.hero_title_b"] ?? "ia adalah rumah"}</span></em> <span data-cms-key="sambutan.hero_title_c" data-cms-type="text" data-cms-label="Judul Hero (2)">{cms["sambutan.hero_title_c"] ?? "tempat karakter dibentuk."}</span>&rdquo;
          </h1>

          <div className="mt-10 flex items-center gap-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="h-14 w-14 rounded-full bg-amber text-navy grid place-items-center font-display text-lg font-bold">
              BS
            </div>
            <div className="leading-tight">
              <p data-cms-key="sambutan.hero_name" data-cms-type="text" data-cms-label="Nama Kepala Sekolah" className="font-display text-lg">{cms["sambutan.hero_name"] ?? "Drs. Bambang Sutiyono, M.Pd"}</p>
              <p data-cms-key="sambutan.hero_role" data-cms-type="text" data-cms-label="Jabatan & Periode" className="text-xs uppercase tracking-[0.22em] text-paper/60 mt-1">
                {cms["sambutan.hero_role"] ?? "Kepala SMK Negeri 74 · Periode 2022–sekarang"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Main body ---------- */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: portrait card (sticky on desktop) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-5 reveal">
              {/* Portrait card */}
              <div className="relative rounded-2xl bg-navy-deep text-paper aspect-[4/5] overflow-hidden animate-float-slow shadow-2xl shadow-black/10">
                <Image
                  data-cms-key="sambutan.portrait"
                  data-cms-type="image"
                  data-cms-label="Foto Kepala Sekolah"
                  src={cms["sambutan.portrait"] ?? PHOTOS.sambutan.portrait}
                  alt="Foto Drs. Bambang Sutiyono, Kepala SMK Negeri 74 Jakarta"
                  fill
                  sizes="(min-width: 1024px) 400px, 80vw"
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/30 pointer-events-none" />
                <div className="absolute top-5 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber z-10">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
                  Kepala Sekolah
                </div>
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <p data-cms-key="sambutan.portrait_name" data-cms-type="text" data-cms-label="Nama (kartu foto)" className="font-display text-base leading-tight">{cms["sambutan.portrait_name"] ?? "Drs. Bambang Sutiyono, M.Pd"}</p>
                  <p data-cms-key="sambutan.portrait_period" data-cms-type="text" data-cms-label="Periode (kartu foto)" className="text-[10px] uppercase tracking-[0.22em] text-paper/70 mt-1">
                    {cms["sambutan.portrait_period"] ?? "Periode 2022 – sekarang"}
                  </p>
                </div>
              </div>

              {/* Info card */}
              <div className="rounded-2xl bg-white border border-black/5 p-6 space-y-3 text-sm">
                <p data-cms-key="sambutan.info_label" data-cms-type="text" data-cms-label="Label Kartu Info" className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  {cms["sambutan.info_label"] ?? "Tentang"}
                </p>
                <dl className="space-y-2.5">
                  {[
                    ["Nama", "Drs. Bambang Sutiyono, M.Pd"],
                    ["Jabatan", "Kepala Sekolah"],
                    ["Periode", "2022 – sekarang"],
                    ["Pendidikan", "S2 Manajemen Pendidikan"],
                  ].map(([k, v], i) => (
                    <div key={k} className="flex justify-between gap-4 pb-2 border-b border-black/5 last:border-0 last:pb-0">
                      <dt data-cms-key={`sambutan.info.${i}.k`} data-cms-type="text" data-cms-label="Label Info" className="text-muted shrink-0">{cms[`sambutan.info.${i}.k`] ?? k}</dt>
                      <dd data-cms-key={`sambutan.info.${i}.v`} data-cms-type="text" data-cms-label="Nilai Info" className="text-right text-ink">{cms[`sambutan.info.${i}.v`] ?? v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Quick links */}
              <div className="rounded-2xl bg-paper-soft p-6 space-y-2 text-sm">
                <p data-cms-key="sambutan.links_label" data-cms-type="text" data-cms-label="Label Tautan Cepat" className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
                  {cms["sambutan.links_label"] ?? "Tautan Cepat"}
                </p>
                {[
                  ["Visi & Misi", "#visi-misi"],
                  ["Struktur Organisasi", "#struktur"],
                  ["Tenaga Pendidik", "#tendik"],
                  ["Sarana & Prasarana", "#sarana"],
                ].map(([label, href], i) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between py-2 text-ink/80 hover:text-navy transition-colors group"
                  >
                    <span data-cms-key={`sambutan.link.${i}`} data-cms-type="text" data-cms-label="Teks Tautan">{cms[`sambutan.link.${i}`] ?? label}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Right: speech body */}
          <article className="lg:col-span-8 space-y-7 text-[17px] leading-[1.75] text-ink/85">
            <p data-cms-key="sambutan.body_eyebrow" data-cms-type="text" data-cms-label="Label Sambutan" className="text-xs uppercase tracking-[0.22em] text-muted reveal">
              {cms["sambutan.body_eyebrow"] ?? "Sambutan"}
            </p>
            <h2 data-cms-key="sambutan.salam" data-cms-type="text" data-cms-label="Salam Pembuka" className="font-display text-4xl leading-[1.1] text-ink reveal">
              {cms["sambutan.salam"] ?? "Bismillahirrahmanirrahim. Assalamu’alaikum warahmatullahi wabarakatuh."}
            </h2>

            {/* First paragraph with drop cap */}
            <p data-cms-key="sambutan.para.0" data-cms-type="textarea" data-cms-label="Paragraf 1" className="reveal first-letter:font-display first-letter:text-7xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.85] first-letter:text-amber">
              {cms["sambutan.para.0"] ?? "Puji syukur kami panjatkan ke hadirat Allah SWT yang telah melimpahkan rahmat dan karunia-Nya, sehingga SMK Negeri 74 Jakarta dapat terus berdiri sebagai rumah belajar bagi generasi muda di Jagakarsa dan sekitarnya."}
            </p>

            <p data-cms-key="sambutan.para.1" data-cms-type="textarea" data-cms-label="Paragraf 2" className="reveal">
              {cms["sambutan.para.1"] ?? "Sebagai Kepala Sekolah, izinkan saya menyampaikan terima kasih dan apresiasi kepada seluruh keluarga besar SMKN 74 — guru, tenaga kependidikan, siswa, orang tua, alumni, serta mitra industri — atas dedikasi dan kepercayaan yang telah diberikan selama ini."}
            </p>

            <p data-cms-key="sambutan.para.2" data-cms-type="textarea" data-cms-label="Paragraf 3" className="reveal">
              {cms["sambutan.para.2"] ?? "Di era yang berubah cepat ini, kami percaya bahwa pendidikan kejuruan bukan sekadar tempat memperoleh keterampilan teknis. Ia adalah ruang di mana karakter dibentuk, di mana keingintahuan dijaga, dan di mana setiap anak dibimbing untuk menemukan jalannya sendiri."}
            </p>

            {/* Pull quote */}
            <blockquote className="my-12 reveal">
              <div className="border-l-4 border-amber pl-8 py-3">
                <p className="font-display text-3xl leading-[1.2] text-ink italic">
                  &ldquo;<span data-cms-key="sambutan.quote_a" data-cms-type="textarea" data-cms-label="Kutipan (1)">{cms["sambutan.quote_a"] ?? "Visi kami sederhana: melahirkan lulusan yang siap kerja, siap belajar lebih lanjut, dan — yang paling penting — siap menjadi"}</span> <span className="text-amber not-italic"><span data-cms-key="sambutan.quote_b" data-cms-type="text" data-cms-label="Kutipan (sorotan)">{cms["sambutan.quote_b"] ?? "manusia yang berintegritas"}</span></span>.&rdquo;
                </p>
              </div>
            </blockquote>

            <p className="reveal">
              <span data-cms-key="sambutan.para.3a" data-cms-type="textarea" data-cms-label="Paragraf 4 (awal)">{cms["sambutan.para.3a"] ?? "SMKN 74 menyelenggarakan empat konsentrasi keahlian di bidang seni —"}</span> <strong className="font-medium text-ink"><span data-cms-key="sambutan.para.3b" data-cms-type="text" data-cms-label="Paragraf 4 (penekanan)">{cms["sambutan.para.3b"] ?? "Tari, Musik, Karawitan, dan Teater"}</span></strong> <span data-cms-key="sambutan.para.3c" data-cms-type="textarea" data-cms-label="Paragraf 4 (akhir)">{cms["sambutan.para.3c"] ?? "— sebagai jawaban atas kebutuhan industri kreatif Indonesia yang terus tumbuh. Kami juga membuka kelas-kelas industri (PKL), kolaborasi dengan DUDI, serta program kewirausahaan agar siswa kami tidak hanya menjadi pekerja yang baik, tetapi juga pencipta peluang."}</span>
            </p>

            <p data-cms-key="sambutan.para.4" data-cms-type="textarea" data-cms-label="Paragraf 5" className="reveal">
              {cms["sambutan.para.4"] ?? "Kami berkomitmen menjadikan sekolah ini tempat yang aman, ramah, dan inklusif. Pintu kami terbuka untuk dialog dengan orang tua, dengan komunitas, dan dengan siapa pun yang ingin berkontribusi pada pendidikan anak-anak kita. Kotak saran, layanan surat-menyurat, dan kanal komunikasi digital kami sediakan agar setiap suara dapat didengar."}
            </p>

            <p className="reveal">
              <span data-cms-key="sambutan.para.5a" data-cms-type="textarea" data-cms-label="Paragraf 6 (awal)">{cms["sambutan.para.5a"] ?? "Terakhir, kepada para siswa: percayalah pada prosesmu. Belajarlah dengan sungguh-sungguh, tetapi jangan lupa untuk bertanya, bermain, dan bermimpi. Sekolah ini ada untukmu — bukan untuk mencetak kalian menjadi sama, melainkan untuk membantu kalian menemukan suara yang khas:"}</span> <em><span data-cms-key="sambutan.para.5b" data-cms-type="text" data-cms-label="Paragraf 6 (penekanan)">{cms["sambutan.para.5b"] ?? "suaramu sendiri"}</span></em>.
            </p>

            <p data-cms-key="sambutan.para.6" data-cms-type="textarea" data-cms-label="Paragraf Penutup" className="reveal">
              {cms["sambutan.para.6"] ?? "Selamat datang di SMK Negeri 74 Jakarta. Mari bersama-sama menumbuhkan masa depan."}
            </p>

            <p data-cms-key="sambutan.salam_penutup" data-cms-type="text" data-cms-label="Salam Penutup" className="reveal text-ink/70">
              {cms["sambutan.salam_penutup"] ?? "Wassalamu’alaikum warahmatullahi wabarakatuh."}
            </p>

            {/* Signature block */}
            <div className="pt-10 mt-10 border-t border-black/10 reveal">
              <p data-cms-key="sambutan.sign_label" data-cms-type="text" data-cms-label="Label Tanda Tangan" className="text-xs uppercase tracking-[0.22em] text-muted mb-4">
                {cms["sambutan.sign_label"] ?? "Hormat kami,"}
              </p>
              <p data-cms-key="sambutan.sign_name" data-cms-type="text" data-cms-label="Nama Tanda Tangan" className="font-display text-lg mt-3 text-ink">
                {cms["sambutan.sign_name"] ?? "Drs. Bambang Sutiyono, M.Pd"}
              </p>
              <p data-cms-key="sambutan.sign_role" data-cms-type="text" data-cms-label="Jabatan Tanda Tangan" className="text-sm text-muted">
                {cms["sambutan.sign_role"] ?? "Kepala SMK Negeri 74 Jakarta"}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ---------- CTA back to home / related ---------- */}
      <section className="bg-white border-t border-black/5 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10 reveal">
            <div>
              <p data-cms-key="sambutan.cta_eyebrow" data-cms-type="text" data-cms-label="Label Selanjutnya" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
                {cms["sambutan.cta_eyebrow"] ?? "Selanjutnya"}
              </p>
              <h2 data-cms-key="sambutan.cta_heading" data-cms-type="text" data-cms-label="Judul Selanjutnya" className="font-display headline-quote">
                {cms["sambutan.cta_heading"] ?? "Telusuri lebih jauh tentang sekolah."}
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-paper-soft transition-colors group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span data-cms-key="sambutan.back_label" data-cms-type="text" data-cms-label="Tombol Kembali">{cms["sambutan.back_label"] ?? "Kembali ke Beranda"}</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                tag: "Profil",
                title: "Visi & Misi Sekolah",
                body: "Apa yang ingin kami capai, dan bagaimana kami menjalankannya setiap hari.",
                href: "#visi-misi",
                bg: "bg-navy",
                ink: "text-paper",
              },
              {
                tag: "Profil",
                title: "Struktur Organisasi",
                body: "Manajemen sekolah, tenaga kependidikan, komite, OSIS, dan MPK.",
                href: "#struktur",
                bg: "bg-amber",
                ink: "text-navy",
              },
              {
                tag: "Akademik",
                title: "Konsentrasi Keahlian",
                body: "Empat jurusan seni: Tari, Musik, Karawitan, dan Teater.",
                href: "#keahlian",
                bg: "bg-moss",
                ink: "text-paper",
              },
            ].map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`${c.bg} ${c.ink} group rounded-2xl p-7 flex flex-col gap-4 aspect-[4/3] transition-transform duration-500 hover:-translate-y-2 reveal`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p data-cms-key={`sambutan.related.${i}.tag`} data-cms-type="text" data-cms-label="Tag Kartu" className="text-[10px] uppercase tracking-[0.22em] opacity-80">
                  {cms[`sambutan.related.${i}.tag`] ?? c.tag}
                </p>
                <h3 data-cms-key={`sambutan.related.${i}.title`} data-cms-type="text" data-cms-label="Judul Kartu" className="font-display text-2xl leading-tight mt-auto">
                  {cms[`sambutan.related.${i}.title`] ?? c.title}
                </h3>
                <p data-cms-key={`sambutan.related.${i}.body`} data-cms-type="textarea" data-cms-label="Deskripsi Kartu" className="text-sm opacity-80 leading-relaxed">{cms[`sambutan.related.${i}.body`] ?? c.body}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <span data-cms-key={`sambutan.related.${i}.cta`} data-cms-type="text" data-cms-label="Tombol Kartu">{cms[`sambutan.related.${i}.cta`] ?? "Pelajari"}</span>
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
