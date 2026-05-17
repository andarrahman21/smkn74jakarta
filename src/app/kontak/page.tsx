import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/profil/PageHeader";
import { KotakSaranForm } from "@/components/profil/KotakSaranForm";

export const metadata: Metadata = {
  title: "Kontak — SMKN 74 Jakarta",
  description: "Email, alamat, telepon, FAQ, denah lokasi, dan kotak saran SMK Negeri 74 Jakarta.",
};

const emails = [
  { label: "Umum",          addr: "info@smkn74.sch.id",       desc: "Pertanyaan umum, informasi, dan inquiry." },
  { label: "PPDB",          addr: "ppdb@smkn74.sch.id",        desc: "Pendaftaran peserta didik baru." },
  { label: "Humas & DUDI",  addr: "humas@smkn74.sch.id",       desc: "Kemitraan industri, PKL, kunjungan." },
  { label: "Tata Usaha",    addr: "tu@smkn74.sch.id",          desc: "Layanan administrasi & surat-menyurat." },
];

const telp = [
  { label: "Sekretariat",  no: "(021) 7864-216",     hours: "Senin–Jumat · 07.00–16.00" },
  { label: "PPDB Hotline", no: "0812-3456-7890",     hours: "Apr–Jun · 08.00–17.00" },
  { label: "UKS & BK",     no: "(021) 7864-216 ext 12", hours: "Senin–Jumat · 07.30–14.00" },
];

const faqs = [
  { q: "Kapan jadwal PPDB tahun ajaran baru?", a: "PPDB SMKN 74 mengikuti jadwal Dinas Pendidikan DKI Jakarta, biasanya dibuka April–Juni. Informasi resmi diumumkan di halaman Informasi Sekolah dan kanal media sosial." },
  { q: "Apakah ada biaya pendaftaran?", a: "Tidak. Sebagai sekolah negeri, pendaftaran SMKN 74 GRATIS. Sekolah tidak memungut biaya apa pun untuk pendaftaran maupun proses seleksi." },
  { q: "Bagaimana cara mengajukan surat akademik / kesiswaan?", a: "Surat dapat diajukan secara online lewat menu Layanan, atau langsung ke Tata Usaha. Proses standar memerlukan 1–3 hari kerja." },
  { q: "Apakah sekolah menerima kunjungan studi banding?", a: "Ya. Kirimkan surat permohonan ke humas@smkn74.sch.id minimal 14 hari sebelum tanggal kunjungan untuk dijadwalkan." },
  { q: "Bagaimana cara berkomunikasi dengan wali kelas?", a: "Setiap wali kelas memiliki grup kelas untuk komunikasi rutin. Untuk pertemuan langsung, dapat dijadwalkan via Tata Usaha." },
  { q: "Apakah ada beasiswa untuk siswa berprestasi atau kurang mampu?", a: "Ya. SMKN 74 menyediakan beasiswa berprestasi dan kurang mampu. Pendaftaran biasanya dibuka di awal semester ganjil." },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Kontak" },
        ]}
        tagline="Hubungi kami"
        title="Datang, tanya,"
        accent="terhubung."
        subtitle="Email, telepon, alamat lengkap, denah lokasi, FAQ, dan kotak saran SMK Negeri 74 Jakarta — semua di satu halaman."
      />

      {/* Quick contact strip */}
      <section className="bg-paper py-12 md:py-16 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "✉", title: "Email Umum",      value: "info@smkn74.sch.id",   href: "mailto:info@smkn74.sch.id" },
            { icon: "☎", title: "Telepon",         value: "(021) 7864-216",       href: "tel:+62217864216" },
            { icon: "◎", title: "Lokasi",          value: "Jagakarsa, Jakarta Selatan", href: "#denah" },
          ].map((q, i) => (
            <a
              key={q.title}
              href={q.href}
              className="reveal group flex items-center gap-4 p-5 bg-white border border-black/5 rounded-2xl hover:border-amber hover:-translate-y-0.5 transition-all duration-300"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <span className="h-12 w-12 rounded-full bg-navy text-amber grid place-items-center text-xl">{q.icon}</span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted">{q.title}</p>
                <p className="font-medium text-ink group-hover:text-navy transition-colors">{q.value}</p>
              </div>
              <span className="ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* Email */}
      <section id="email" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Email</p>
            <h2 className="font-display headline-quote mb-4">Tulis surat ke alamat yang tepat.</h2>
            <p className="text-ink/75 leading-relaxed">
              Kami merespons dalam 1–3 hari kerja. Untuk respons lebih cepat, gunakan email sesuai topiknya.
            </p>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {emails.map((e, i) => (
              <li
                key={e.addr}
                className="reveal bg-white border border-black/5 rounded-2xl p-6 hover:border-amber hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <p className="text-[10px] uppercase tracking-widest text-amber font-medium">{e.label}</p>
                <a href={`mailto:${e.addr}`} className="font-display text-xl mt-2 block hover:text-navy transition-colors break-all">
                  {e.addr}
                </a>
                <p className="text-sm text-ink/70 leading-relaxed mt-2">{e.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alamat & Telp + Denah */}
      <section id="alamat" className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Alamat & telp stack */}
          <div className="lg:col-span-5 space-y-5">
            <div className="reveal bg-navy text-paper rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-5 right-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-amber animate-pulse-dot" />
                Alamat
              </div>
              <p className="text-[10px] uppercase tracking-widest text-amber">Lokasi</p>
              <p className="font-display text-2xl leading-tight mt-3 mb-5">
                Jl. Moch. Kahfi II, <br />
                Jagakarsa, Jakarta Selatan 12640
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-amber hover:text-paper transition-colors group"
              >
                Buka di Google Maps
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <div className="reveal bg-white border border-black/5 rounded-2xl p-7" style={{ animationDelay: "0.1s" }}>
              <p className="text-[10px] uppercase tracking-widest text-amber font-medium mb-5">Telepon</p>
              <ul className="space-y-3">
                {telp.map((t) => (
                  <li key={t.label} className="flex items-start justify-between gap-3 pb-3 border-b border-black/5 last:border-0 last:pb-0">
                    <div>
                      <p className="font-display text-base">{t.label}</p>
                      <p className="text-[11px] uppercase tracking-widest text-muted mt-1">{t.hours}</p>
                    </div>
                    <a href={`tel:${t.no.replace(/\D/g, "")}`} className="text-sm font-medium text-navy hover:text-amber transition-colors">
                      {t.no}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Denah lokasi */}
          <div id="denah" className="lg:col-span-7 reveal" style={{ animationDelay: "0.2s" }}>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Denah lokasi</p>
            <h2 className="font-display headline-quote mb-6">Tata letak kampus.</h2>

            {/* Real Google Maps */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 border border-black/5">
              <iframe
                title="Lokasi SMKN 74 Jakarta"
                src="https://www.google.com/maps?q=SMK+Negeri+74+Jakarta+Jagakarsa&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between mb-6 text-sm">
              <a
                href="https://www.google.com/maps?q=SMK+Negeri+74+Jakarta+Jagakarsa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy hover:text-amber font-medium transition-colors group"
              >
                Buka di Google Maps
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </a>
              <span className="text-xs uppercase tracking-widest text-muted">Klik peta untuk navigasi</span>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="mb-12 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">FAQ</p>
            <h2 className="font-display headline-quote">Pertanyaan yang sering ditanyakan.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="reveal group/faq bg-white border border-transparent hover:border-amber rounded-2xl p-6 transition-all"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-lg leading-snug">{f.q}</span>
                  <span className="shrink-0 h-8 w-8 rounded-full border border-black/10 grid place-items-center transition-transform group-open/faq:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-ink/70 leading-relaxed text-[15px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kotak Saran */}
      <section id="kotak-saran" className="bg-white border-t border-black/5 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 reveal">
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">Kotak Saran</p>
            <h2 className="font-display headline-quote mb-4">Suaramu didengar.</h2>
            <p className="text-ink/75 leading-relaxed">
              Punya saran, kritik, atau apresiasi? Kirim secara anonim atau dengan nama. Kami membaca setiap pesan.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink/70">
              <li>· Respons dalam 3–5 hari kerja</li>
              <li>· Identitas dirahasiakan (opsional)</li>
              <li>· Dilarang konten ofensif / SARA</li>
            </ul>
          </div>

          <KotakSaranForm />
        </div>
      </section>

      {/* Footer CTA back */}
      <section className="bg-navy text-paper py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amber mb-3">Sampai jumpa</p>
          <h2 className="font-display text-3xl leading-tight mb-6">
            Terima kasih sudah meluangkan waktu menghubungi kami.
          </h2>
          <Link href="/" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform">
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </>
  );
}
