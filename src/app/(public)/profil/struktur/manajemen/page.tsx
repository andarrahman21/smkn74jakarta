import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { getStrukturProfil, toPeople } from "@/lib/struktur-data";

export const metadata: Metadata = { title: "Manajemen Sekolah — SMKN 74 Jakarta" };

export default async function Page() {
  const cms = await resolveSiteContent();
  const peopleResolved = toPeople(await getStrukturProfil("manajemen"));
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "Manajemen Sekolah" },
        ]}
        tagline={cms["struktur-manajemen.header_tagline"] ?? "Manajemen Sekolah"}
        taglineKey="struktur-manajemen.header_tagline"
        title={cms["struktur-manajemen.header_title"] ?? "Pengambil keputusan"}
        titleKey="struktur-manajemen.header_title"
        accent={cms["struktur-manajemen.header_accent"] ?? "sehari-hari sekolah."}
        accentKey="struktur-manajemen.header_accent"
      />

      <PeopleSection
        people={peopleResolved}
        heading={cms["struktur-manajemen.heading"] ?? "Kepala Sekolah & para wakil."}
        headingKey="struktur-manajemen.heading"
        eyebrowKey="struktur-manajemen.eyebrow"
        eyebrow={cms["struktur-manajemen.eyebrow"] ?? "Anggota"}
      />

      <RelatedCards
        items={[
          { tag: "Profil", title: "Tenaga Pendidik & Kependidikan", body: "Guru & tim pendukung sekolah.", href: "/profil/tenaga-pendidik", bg: "bg-amber", ink: "text-navy" },
          { tag: "Struktur", title: "Komite Sekolah", body: "Mitra orang tua & masyarakat.", href: "/profil/struktur/komite", bg: "bg-moss", ink: "text-paper" },
          { tag: "Struktur", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
        ]}
        heading={cms["struktur-manajemen.related_heading"] ?? "Telusuri lebih jauh tentang sekolah."}
        headingKey="struktur-manajemen.related_heading"
      />
    </>
  );
}
