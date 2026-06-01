-- Add status column to prestasi table
-- Default 'published' so existing entries remain visible on public pages
alter table public.prestasi
  add column if not exists status text not null default 'published'
  check (status in ('draft', 'published'));

create index if not exists idx_prestasi_status on public.prestasi (status);
