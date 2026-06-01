import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type Payload = {
  nama?: string;
  email?: string;
  kategori: string;
  pesan: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Validasi sederhana
  const kategori = body.kategori?.trim();
  const pesan = body.pesan?.trim();
  if (!kategori || !pesan) {
    return NextResponse.json(
      { ok: false, error: "Kategori dan pesan wajib diisi." },
      { status: 400 }
    );
  }
  if (pesan.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Pesan terlalu singkat (min. 8 karakter)." },
      { status: 400 }
    );
  }
  if (pesan.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Pesan terlalu panjang (max 5000 karakter)." },
      { status: 400 }
    );
  }

  const nama = body.nama?.trim() || null;
  const email = body.email?.trim() || null;

  // Meta untuk audit / anti-spam
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;
  const userAgent = req.headers.get("user-agent") ?? null;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("kotak_saran").insert({
      nama,
      email,
      kategori,
      pesan,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (error) {
      console.error("[kotak-saran] insert error:", error);
      return NextResponse.json(
        { ok: false, error: "Gagal menyimpan pesan." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kotak-saran] unexpected:", err);
    return NextResponse.json(
      { ok: false, error: "Galat tak terduga." },
      { status: 500 }
    );
  }
}
