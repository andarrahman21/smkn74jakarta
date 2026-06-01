-- Add view_count to prestasi (same pattern as pengumuman)
alter table public.prestasi
  add column if not exists view_count integer not null default 0;

create index if not exists idx_prestasi_view_count on public.prestasi (view_count desc);
