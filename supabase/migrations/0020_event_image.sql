-- Tambah kolom cover image untuk event
alter table public.event
  add column if not exists image_url text,
  add column if not exists image_alt text;
