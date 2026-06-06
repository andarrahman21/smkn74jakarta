import type { Metadata } from "next";
import { PageHeader } from "@/components/profil/PageHeader";
import { PeopleSection } from "@/components/profil/PeopleSection";
import { RelatedCards } from "@/components/profil/RelatedCards";
import { resolveSiteContent } from "@/lib/site-content/get";
import { getStrukturProfil, toPeople } from "@/lib/struktur-data";

export const metadata: Metadata = { title: "Profil Tenaga Pendidik & Kependidikan — SMKN 74 Jakarta" };

export default async function Page() {
  const cms = await resolveSiteContent();

  const people = toPeople(await getStrukturProfil("tenaga"));

  return (
    <>
      <PageHeader
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil Sekolah" },
          { label: "Tenaga Pendidik & Kependidikan" },
        ]}
        tagline={cms["tendik.tagline"] ?? "Orang-orang sekolah"}
        taglineKey="tendik.tagline"
        title={cms["tendik.title"] ?? "Guru, staf, dan"}
        titleKey="tendik.title"
        accent={cms["tendik.accent"] ?? "pendamping setiap hari."}
        accentKey="tendik.accent"
      />

      <PeopleSection
        people={people}
        headingKey="tendik.umum.heading"
        eyebrowKey="tendik.umum.eyebrow"
        heading={cms["tendik.umum.heading"] ?? "Tenaga Pendidik & Kependidikan."}
        eyebrow={cms["tendik.umum.eyebrow"] ?? "Anggota"}
      />

      <RelatedCards
        items={[
          { tag: "Struktur", title: "Manajemen Sekolah", body: "Kepala sekolah & para wakil.", href: "/profil/struktur/manajemen", bg: "bg-navy", ink: "text-paper" },
          { tag: "Akademik", title: "Konsentrasi Keahlian", body: "Empat jurusan seni.", href: "/profil/keahlian", bg: "bg-amber", ink: "text-navy" },
          { tag: "Akademik", title: "Kurikulum", body: "Bagaimana kami belajar.", href: "/profil/kurikulum", bg: "bg-moss", ink: "text-paper" },
        ]}
      />
    </>
  );
}
