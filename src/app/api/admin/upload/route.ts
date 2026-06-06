import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient, isAdminEmail } from "@/lib/supabase/admin";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_BYTES = 30 * 1024 * 1024; // 30 MB
const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const ALLOWED = [...ALLOWED_IMAGES, "application/pdf"];

export async function POST(req: Request) {
  // 1) Pastikan request datang dari admin yang sudah login
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }

  // 2) Parse multipart form
  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return NextResponse.json({ error: "Form-data tidak valid." }, { status: 400 });
  }
  const file = fd.get("file");
  const folder = String(fd.get("folder") ?? "uploads").replace(/[^a-z0-9-]/gi, "-");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: `Tipe file tidak didukung: ${file.type}` }, { status: 400 });
  }
  const isPdf = file.type === "application/pdf";
  const maxBytes = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
  if (file.size > maxBytes) {
    return NextResponse.json({ error: `Ukuran maksimal ${isPdf ? "30" : "5"} MB.` }, { status: 400 });
  }

  // 3) Upload ke Storage
  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase();
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const admin = createAdminClient();
  const { error: upErr } = await admin.storage.from("media").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (upErr) {
    return NextResponse.json({ error: upErr.message }, { status: 500 });
  }

  const { data } = admin.storage.from("media").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl, path });
}
