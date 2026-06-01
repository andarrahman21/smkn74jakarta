create table if not exists public.pengumuman_categories (
  id   uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.pengumuman_categories enable row level security;

create policy "Public read" on public.pengumuman_categories
  for select using (true);

create policy "Service role full access" on public.pengumuman_categories
  using (true) with check (true);

insert into public.pengumuman_categories (name, sort_order) values
  ('MPLS', 1),
  ('Akademik', 2),
  ('Beasiswa', 3),
  ('Kesiswaan', 4),
  ('PKL & Industri', 5),
  ('Kesehatan', 6),
  ('Pengumuman Umum', 7),
  ('Lainnya', 8)
on conflict (name) do nothing;
