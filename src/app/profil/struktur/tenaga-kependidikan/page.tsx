import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";

export const metadata: Metadata = { title: "Tenaga Kependidikan — SMKN 74 Jakarta" };

const people = [
  { initials: "SP", name: "Sumiati Pratiwi", role: "Kepala Tata Usaha", bg: "bg-navy" },
  { initials: "AT", name: "Adi Trisno", role: "Staf Administrasi", bg: "bg-moss" },
  { initials: "RW", name: "Rini Widyaningsih", role: "Pustakawan", bg: "bg-amber", ink: "text-navy" },
  { initials: "BP", name: "Budi Prasetyo", role: "Laboran Multimedia", bg: "bg-rust" },
  { initials: "MK", name: "Maria Kartika", role: "Staf Keuangan", bg: "bg-navy-deep" },
  { initials: "HS", name: "Hadi Suparman", role: "Teknisi & Maintenance", bg: "bg-moss" },
  { initials: "NS", name: "Nani Sundari", role: "Petugas Keamanan", bg: "bg-amber", ink: "text-navy" },
  { initials: "DR", name: "Dimas Ramadhan", role: "Operator Dapodik", bg: "bg-navy" },
];

export default function Page() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "Tenaga Kependidikan" },
        ]}
        tagline="Tim pendukung"
        title="Wajah-wajah di balik"
        accent="kelancaran sekolah."
      />
      <PeopleSection people={people} heading="Tata usaha, perpustakaan, laboran, dan staf pendukung." />
      <RelatedCards
        items={[
          { tag: "Struktur", title: "Manajemen Sekolah", body: "Kepala sekolah & para wakil.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
          { tag: "Struktur", title: "Komite Sekolah", body: "Mitra orang tua.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
          { tag: "Profil", title: "Tenaga Pendidik", body: "Guru sekolah.", href: "/profil/tenaga-pendidik", bg: "bg-amber", ink: "text-navy" },
        ]}
      />
    </>
  );
}
