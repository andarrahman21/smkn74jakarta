import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { getStrukturProfil, toPeople } from "@/lib/struktur-data";

export const metadata: Metadata = { title: "Komite Sekolah — SMKN 74 Jakarta" };

export default async function Page() {
  const cms = await resolveSiteContent();
  const peopleResolved = toPeople(await getStrukturProfil("komite"));
  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Struktur Organisasi", href: "/profil/struktur" },
          { label: "Komite Sekolah" },
        ]}
        tagline={cms["struktur-komite.header_tagline"] ?? "Jembatan sekolah & masyarakat"}
        taglineKey="struktur-komite.header_tagline"
        title={cms["struktur-komite.header_title"] ?? "Komite menjaga"}
        titleKey="struktur-komite.header_title"
        accent={cms["struktur-komite.header_accent"] ?? "suara orang tua tetap hidup"}
        accentKey="struktur-komite.header_accent"
        trailing="di setiap keputusan."
      />

      <PeopleSection
        people={peopleResolved}
        heading={cms["struktur-komite.heading"] ?? "Pengurus Komite periode 2024–2027."}
        headingKey="struktur-komite.heading"
        eyebrowKey="struktur-komite.eyebrow"
        eyebrow={cms["struktur-komite.eyebrow"] ?? "Anggota"}
      />

      <RelatedCards
        items={[
          { tag: "Struktur", title: "Manajemen Sekolah", body: "Pengambil keputusan harian.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
          { tag: "Kesiswaan", title: "OSIS", body: "Organisasi Siswa Intra Sekolah.", href: "/profil/struktur/osis", bg: "bg-rust", ink: "text-paper" },
          { tag: "Kesiswaan", title: "MPK", body: "Majelis Perwakilan Kelas.", href: "/profil/struktur/mpk", bg: "bg-amber", ink: "text-navy" },
        ]}
        heading={cms["struktur-komite.related_heading"] ?? "Telusuri lebih jauh tentang sekolah."}
        headingKey="struktur-komite.related_heading"
      />
    </>
  );
}
