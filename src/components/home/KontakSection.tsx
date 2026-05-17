import Link from "next/link";

export function KontakSection() {
  return (
    <section id="kontak" className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
              Hubungi Kami
            </p>
            <h2 className="font-display headline-section">
              Datang, tanya, terhubung.
            </h2>
          </div>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-black/10 text-sm font-medium hover:bg-white transition-colors group"
          >
            Halaman kontak lengkap
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Map card */}
          <div className="lg:col-span-7 reveal">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-black/5">
              {/* Real Google Maps */}
              <iframe
                title="Lokasi SMKN 74 Jakarta"
                src="https://www.google.com/maps?q=SMK+Negeri+74+Jakarta+Jagakarsa&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              {/* Floating address card — pointer-events-none so map remains interactive behind it */}
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 md:right-auto md:w-80">
                <a
                  href="https://www.google.com/maps?q=SMK+Negeri+74+Jakarta+Jagakarsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto block bg-white rounded-xl p-4 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-muted">Alamat</p>
                    <span className="text-[10px] uppercase tracking-widest text-amber font-medium">
                      Buka peta ↗
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1.5 group-hover:text-navy transition-colors">
                    Jl. Moch. Kahfi II, Jagakarsa, Jakarta Selatan 12640
                  </p>
                </a>
              </div>
            </div>
          </div>

          {/* Contact info + form */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-navy text-paper rounded-2xl p-7 reveal">
              <p className="text-[10px] uppercase tracking-widest text-amber mb-5">
                Informasi
              </p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-paper/60">Telepon</dt>
                  <dd>(021) 7864-216</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-paper/60">Email</dt>
                  <dd>info@smkn74.sch.id</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-paper/60">Jam Kerja</dt>
                  <dd>Senin–Jumat · 07.00–16.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-paper/60">PPDB</dt>
                  <dd>Apr–Jun</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-black/5 rounded-2xl p-7 reveal" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] uppercase tracking-widest text-muted">
                  Kirim Surat
                </p>
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-amber/20 text-amber">
                  Cepat
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink/75 mb-5">
                Punya masukan untuk sekolah? Kirim secara anonim atau dengan nama Anda.
              </p>
              <Link href="/kontak#kotak-saran" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:bg-navy transition-colors group">
                Kirim Surat
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
