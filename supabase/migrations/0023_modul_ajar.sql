-- Modul Ajar per konsentrasi keahlian (Tari, Musik, Karawitan, Teater)
create table if not exists public.modul_ajar (
  id          uuid primary key default gen_random_uuid(),
  jurusan     text not null,           -- 'tari' | 'musik' | 'karawitan' | 'teater'
  sort_order  int not null default 0,
  title       text not null default '',
  cover_url   text,
  file_url    text,                     -- PDF
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists modul_ajar_jurusan_sort on public.modul_ajar(jurusan, sort_order);

alter table public.modul_ajar enable row level security;
drop policy if exists "public_read_modul_ajar" on public.modul_ajar;
create policy "public_read_modul_ajar" on public.modul_ajar for select using (true);
