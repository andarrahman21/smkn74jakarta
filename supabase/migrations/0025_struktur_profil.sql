-- Profil Struktur Organisasi (Manajemen, Komite, OSIS, MPK, Tenaga Pendidik & Kependidikan)
create table if not exists public.struktur_profil (
  id          uuid primary key default gen_random_uuid(),
  kategori    text not null,           -- 'manajemen' | 'komite' | 'osis' | 'mpk' | 'tenaga'
  sort_order  int not null default 0,
  title       text not null default '',  -- jabatan / titel
  nama        text not null default '',
  foto_url    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists struktur_profil_kategori_sort on public.struktur_profil(kategori, sort_order);

alter table public.struktur_profil enable row level security;
drop policy if exists "public_read_struktur_profil" on public.struktur_profil;
create policy "public_read_struktur_profil" on public.struktur_profil for select using (true);
