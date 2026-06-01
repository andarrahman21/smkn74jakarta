import { createAdminClient } from "@/lib/supabase/admin";
import { setStatus } from "./actions";

export const metadata = { title: "Kotak Saran — Admin SMKN 74" };

const STATUS_OPTIONS = ["baru", "dibaca", "ditindaklanjuti", "spam"] as const;

async function getList() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("kotak_saran")
    .select("id, nama, email, kategori, pesan, status, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export default async function Page() {
  const items = await getList();

  return (
    <div className="w-full">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-muted mb-2">Admin</p>
        <h1 className="font-display headline-section">Kotak Saran.</h1>
        <p className="mt-2 text-sm text-muted">{items.length} pesan total</p>
      </header>

      {items.length === 0 ? (
        <div className="bg-white border border-black/5 rounded-2xl p-8 text-sm text-muted">
          Belum ada pesan masuk.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li key={m.id} className="bg-white border border-black/5 rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-semibold ${
                    m.status === "baru"
                      ? "bg-amber text-navy"
                      : m.status === "spam"
                      ? "bg-rust/15 text-rust"
                      : "bg-paper-soft text-muted"
                  }`}
                >
                  {m.status}
                </span>
                <div className="text-xs text-muted">
                  <span className="font-medium text-ink">{m.nama ?? "Anonim"}</span>
                  {m.email && <span> · {m.email}</span>}
                  <span> · {m.kategori}</span>
                  <span> · {new Date(m.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</span>
                </div>
              </div>

              <p className="text-sm text-ink/85 whitespace-pre-wrap leading-relaxed mb-4">{m.pesan}</p>

              <form action={setStatus} className="flex flex-wrap gap-2">
                <input type="hidden" name="id" value={m.id} />
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="submit"
                    name="status"
                    value={s}
                    disabled={s === m.status}
                    className={`h-8 px-3 rounded-full text-xs uppercase tracking-widest font-medium transition-colors ${
                      s === m.status
                        ? "bg-navy text-paper opacity-50 cursor-not-allowed"
                        : "border border-black/10 text-ink/70 hover:bg-amber hover:border-amber hover:text-navy"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
