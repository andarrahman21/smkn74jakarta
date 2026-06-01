-- Generic key-value store untuk konten statik halaman (CMS ala WordPress)
create table if not exists public.site_content (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

-- Publik boleh baca semua (konten halaman publik)
drop policy if exists "public_read_site_content" on public.site_content;
create policy "public_read_site_content"
  on public.site_content for select
  using (true);
