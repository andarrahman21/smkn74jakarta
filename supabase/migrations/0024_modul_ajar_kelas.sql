-- Tambah kategori kelas untuk modul ajar (X / XI / XII)
alter table public.modul_ajar
  add column if not exists kelas text;
