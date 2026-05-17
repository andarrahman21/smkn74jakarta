import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Manajemen Sekolah — SMKN 74 Jakarta" };

const people = [
  { initials: "BS", name: "Drs. Bambang Sutiyono, M.Pd", role: "Kepala Sekolah", bg: "bg-navy" },
  { initials: "WS", name: "Wahyu Setiawan, S.Pd, M.Pd", role: "Wakil Kurikulum", bg: "bg-amber", ink: "text-navy" },
  { initials: "DN", name: "Dewi Nurjanah, M.Pd", role: "Wakil Kesiswaan", bg: "bg-moss" },
  { initials: "RA", name: "Rahmat Abdul Aziz, S.Pd", role: "Wakil Sarana & Prasarana", bg: "bg-rust" },
  { initials: "FH", name: "Fitri Handayani, S.Pd", role: "Wakil Humas & DUDI", bg: "bg-navy-deep" },
  { initials: "AS", name: "Ahmad Subagio, S.Kom", role: "Koord. SIM Sekolah", bg: "bg-navy" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "Manajemen Sekolah" },
        ]}
        tagline="Manajemen Sekolah"
        title="Pengambil keputusan"
        accent="sehari-hari sekolah."
      />

      <PeopleSection people={people} heading="Kepala Sekolah & para wakil." />

      <RelatedCards
        items={[
          { tag: "Struktur", title: "Tenaga Kependidikan", body: "Tim pendukung administrasi & teknis.", href: "/profil/struktur/tenaga-kependidikan", bg: "bg-amber", ink: "text-navy" },
          { tag: "Struktur", title: "Komite Sekolah", body: "Mitra orang tua & masyarakat.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
          { tag: "Struktur", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
        ]}
      />
    </>
  );
}
