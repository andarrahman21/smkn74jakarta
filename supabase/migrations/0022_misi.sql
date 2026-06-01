-- Daftar misi sekolah (dikelola dari /admin/misi)
create table if not exists public.misi (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int not null default 0,
  title       text not null default '',
  body        text not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.misi enable row level security;

drop policy if exists "public_read_misi" on public.misi;
create policy "public_read_misi" on public.misi for select using (true);
