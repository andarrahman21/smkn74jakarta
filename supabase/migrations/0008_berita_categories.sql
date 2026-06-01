create table if not exists public.berita_categories (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.berita_categories enable row level security;

create policy "Public read" on public.berita_categories
  for select using (true);

create policy "Service role full access" on public.berita_categories
  using (true) with check (true);

insert into public.berita_categories (name, sort_order) values
  ('Karya Siswa',   1),
  ('Prestasi',      2),
  ('Workshop',      3),
  ('Karier',        4),
  ('Suara Siswa',   5),
  ('Komunitas',     6),
  ('Lainnya',       7)
on conflict (name) do nothing;
