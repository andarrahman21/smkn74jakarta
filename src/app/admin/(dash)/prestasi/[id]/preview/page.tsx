import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Preview Prestasi — Admin SMKN 74" };

function fmtDate(iso: string) {
  const d = new Date(iso);
  const m = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

const LEVEL_PILL: Record<string, string> = {
  Internasional: "bg-amber/20 text-amber",
  Nasional: "bg-black/10 text-muted",
  Provinsi: "bg-[#cd7f32]/15 text-[#8B4513]",
  Kota: "bg-navy/10 text-navy",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("prestasi")
    .select("id, slug, title, sub, achieved_at, level, tag, icon, bg, team, body")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const team = Array.isArray(data.team) ? (data.team as string[]) : [];
  const body = Array.isArray(data.body) ? (data.body as string[]) : [];

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-amber/10 border border-amber/20">
        <div className="flex items-center gap-3 text-sm text-amber">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <strong>Preview prestasi</strong>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/prestasi/${id}/edit`}
            className="h-8 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform inline-flex items-center gap-1.5"
          >
            <span aria-hidden>←</span> Edit
          </Link>
          <Link
            href={`/prestasi/${data.slug}`}
            target="_blank"
            className="h-8 px-4 rounded-full bg-moss text-paper text-xs font-medium hover:bg-moss/90 transition-colors inline-flex items-center gap-1"
          >
            Buka di publik ↗
          </Link>
        </div>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest ${
                LEVEL_PILL[data.level] ?? "bg-navy/10 text-navy"
              }`}
            >
              {data.level}
            </span>
            {data.tag && (
              <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-[11px]">
                {data.tag}
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl md:text-4xl leading-tight">{data.title}</h1>
            {data.sub && (
              <p className="text-ink/60 mt-2">{data.sub}</p>
            )}
          </div>

          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="text-muted w-24 shrink-0">Diraih</dt>
              <dd className="text-ink font-medium">{fmtDate(data.achieved_at)}</dd>
            </div>
            {data.icon && (
              <div className="flex gap-3">
                <dt className="text-muted w-24 shrink-0">Ikon</dt>
                <dd className="text-ink font-mono text-xs bg-paper-soft px-2 py-0.5 rounded">{data.icon}</dd>
              </div>
            )}
            {data.bg && (
              <div className="flex gap-3">
                <dt className="text-muted w-24 shrink-0">BG class</dt>
                <dd className="text-ink font-mono text-xs bg-paper-soft px-2 py-0.5 rounded">{data.bg}</dd>
              </div>
            )}
          </dl>

          {team.length > 0 && (
            <div>
              <h2 className="font-display text-lg mb-2">Anggota Tim</h2>
              <ul className="space-y-1 text-sm text-ink/80">
                {team.map((name, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {body.length > 0 && (
            <div className="space-y-4">
              {body.map((paragraph, i) => (
                <p key={i} className="text-ink/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
