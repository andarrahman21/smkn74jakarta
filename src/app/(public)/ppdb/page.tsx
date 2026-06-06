import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "PPDB / SPMB — SMK Negeri 74 Jakarta",
  description: "Informasi penerimaan peserta didik baru (SPMB) SMK Negeri 74 Jakarta.",
};

function normalizeUrl(v: string): string {
  const s = v.trim();
  if (!s) return "#";
  if (/^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

export default async function Page() {
  const cms = await resolveSiteContent();
  const flyer = cms["ppdb.flyer"] ?? "";
  const waValue = cms["ppdb.kontak_no"] ?? "0812-5389-1201";
  const waUrlRaw = cms["ppdb.kontak_wa_url"] ?? "";
  const waHref = waUrlRaw.trim() ? normalizeUrl(waUrlRaw) : `https://wa.me/${waValue.replace(/\D/g, "")}`;
  const spmbUrl = cms["ppdb.spmb_url"] ?? "https://spmb.jakarta.go.id";

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "PPDB" },
        ]}
        tagline={cms["ppdb.header_tagline"] ?? "Penerimaan Peserta Didik Baru"}
        title={cms["ppdb.header_title"] ?? "Bergabung dengan"}
        accent={cms["ppdb.header_accent"] ?? "SMK Negeri 74."}
        cms={cms}
        cmsPrefix="ppdb"
      />

      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Flyer */}
          <div className="lg:col-span-5 reveal">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted mb-3">Flyer</p>
            <div
              data-cms-key="ppdb.flyer"
              data-cms-type="image"
              data-cms-label="Flyer PPDB"
              className="relative rounded-2xl overflow-hidden border border-black/10 bg-navy-deep aspect-[3/4] shadow-xl"
            >
              {flyer ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={flyer} alt="Flyer PPDB SMK Negeri 74 Jakarta" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-paper/40 text-sm">
                  Flyer PPDB (klik untuk unggah)
                </div>
              )}
            </div>
          </div>

          {/* Informasi + kontak + link */}
          <div className="lg:col-span-7 space-y-8">
            <div className="reveal">
              <p data-cms-key="ppdb.info_eyebrow" data-cms-type="text" data-cms-label="Label Informasi" className="text-xs uppercase tracking-[0.22em] text-muted mb-3">
                {cms["ppdb.info_eyebrow"] ?? "Informasi"}
              </p>
              <h2 data-cms-key="ppdb.info_heading" data-cms-type="text" data-cms-label="Judul Informasi" className="font-display headline-quote mb-4">
                {cms["ppdb.info_heading"] ?? "Tentang PPDB / SPMB."}
              </h2>
              <p data-cms-key="ppdb.info_body" data-cms-type="textarea" data-cms-label="Paragraf Informasi" className="text-[17px] leading-relaxed text-ink/85 whitespace-pre-line">
                {cms["ppdb.info_body"] ?? "Penerimaan peserta didik baru SMK Negeri 74 Jakarta mengikuti sistem SPMB (Sistem Penerimaan Murid Baru) Provinsi DKI Jakarta. Seluruh tahapan pendaftaran, jalur, jadwal, dan pengumuman dilakukan melalui portal resmi SPMB DKI Jakarta. Untuk pertanyaan seputar pendaftaran, hubungi panitia SPMB sekolah."}
              </p>
            </div>

            {/* Kontak SPMB */}
            <div className="reveal rounded-2xl bg-white border border-black/5 p-6">
              <p data-cms-key="ppdb.kontak_eyebrow" data-cms-type="text" data-cms-label="Label Kontak SPMB" className="text-[10px] uppercase tracking-widest text-amber mb-3">
                {cms["ppdb.kontak_eyebrow"] ?? "Kontak Panitia SPMB"}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p data-cms-key="ppdb.kontak_nama" data-cms-type="text" data-cms-label="Nama / Bagian" className="font-display text-lg">
                    {cms["ppdb.kontak_nama"] ?? "Panitia SPMB SMKN 74"}
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    WhatsApp: <span data-cms-key="ppdb.kontak_no" data-cms-type="text" data-cms-label="Nomor WhatsApp" className="text-ink font-medium">{waValue}</span>
                  </p>
                </div>
                <a
                  href={waHref}
                  data-cms-key="ppdb.kontak_wa_url"
                  data-cms-type="link"
                  data-cms-href={waUrlRaw}
                  data-cms-label="Link tombol WhatsApp (kosongkan = otomatis dari nomor)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-6 rounded-full bg-moss text-paper text-sm font-medium hover:bg-moss/90 transition-colors inline-flex items-center gap-2"
                >
                  Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Link SPMB DKI */}
            <div className="reveal rounded-2xl bg-navy text-paper p-7">
              <p data-cms-key="ppdb.spmb_eyebrow" data-cms-type="text" data-cms-label="Label Portal" className="text-[10px] uppercase tracking-widest text-amber mb-2">
                {cms["ppdb.spmb_eyebrow"] ?? "Portal Resmi"}
              </p>
              <h3 data-cms-key="ppdb.spmb_heading" data-cms-type="text" data-cms-label="Judul Portal" className="font-display text-2xl leading-snug mb-2">
                {cms["ppdb.spmb_heading"] ?? "SPMB DKI Jakarta"}
              </h3>
              <a
                href={normalizeUrl(spmbUrl)}
                data-cms-key="ppdb.spmb_url"
                data-cms-type="link"
                data-cms-href={spmbUrl}
                data-cms-label="Link tombol Portal SPMB"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-7 rounded-full bg-amber text-navy text-sm font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
              >
                Buka Portal SPMB DKI Jakarta →
              </a>
            </div>
          </div>
        </div>
      </section>

      <RelatedCards
        items={[
          { tag: "Profil", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Profil", title: "Tentang Sekolah", body: "Sejarah & identitas.", href: "/tentang", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kontak", title: "Hubungi Kami", body: "Email, telepon, lokasi.", href: "/kontak", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
