import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Preview Agenda — Admin SMKN 74" };

function fmtDate(iso: string) {
  const d = new Date(iso);
  const m = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("agenda")
    .select("id, title, scheduled_at, time_range, location, category")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-amber/10 border border-amber/20">
        <div className="flex items-center gap-3 text-sm text-amber">
          <span className="h-2 w-2 rounded-full bg-amber" />
          <strong>Detail agenda</strong>
        </div>
        <Link
          href={`/admin/agenda/${id}/edit`}
          className="h-8 px-4 rounded-full bg-amber text-navy text-xs font-semibold hover:scale-105 transition-transform inline-flex items-center gap-1.5"
        >
          <span aria-hidden>←</span> Edit
        </Link>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16 space-y-6">
          {data.category && (
            <span className="inline-block text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-navy/10 text-navy">
              {data.category}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl leading-tight">{data.title}</h1>

          <dl className="space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="text-muted w-24 shrink-0">Tanggal</dt>
              <dd className="text-ink font-medium">{fmtDate(data.scheduled_at)}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-muted w-24 shrink-0">Waktu</dt>
              <dd className="text-ink font-medium">
                {data.time_range || fmtTime(data.scheduled_at)}
              </dd>
            </div>
            {data.location && (
              <div className="flex gap-3">
                <dt className="text-muted w-24 shrink-0">Lokasi</dt>
                <dd className="text-ink font-medium">{data.location}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
