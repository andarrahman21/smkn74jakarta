-- Tambah kolom gambar untuk prestasi
alter table public.prestasi
  add column if not exists image_url text,
  add column if not exists image_alt text;
