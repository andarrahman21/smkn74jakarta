-- ============================================================
-- SMKN 74 Jakarta — Initial schema
-- Apply via Supabase Dashboard → SQL Editor → New query → paste
-- or via Supabase CLI: `supabase db push`
-- ============================================================

-- Make UUID generation available
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------
-- Reusable: keep updated_at in sync
-- ----------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 1) Pengumuman (Announcements)
-- ============================================================
create table if not exists public.pengumuman (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  published_at  timestamptz not null default now(),
  category      text not null,
  tag           text,                                       -- e.g. "Baru", null kalau tidak ada badge
  title         text not null,
  excerpt       text not null,
  body          text[] not null default '{}',               -- array paragraf
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_pengumuman_published_at on public.pengumuman (published_at desc);
create index if not exists idx_pengumuman_category    on public.pengumuman (category);

create trigger trg_pengumuman_updated_at
  before update on public.pengumuman
  for each row execute function public.set_updated_at();

-- ============================================================
-- 2) Berita (News articles)
-- ============================================================
create table if not exists public.berita (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  num           text not null,                              -- nomor display (e.g. "01")
  tag           text not null,                              -- kategori display (e.g. "Karya Siswa")
  bg            text not null default 'bg-navy',            -- Tailwind class fallback
  published_at  timestamptz not null default now(),
  author        text not null default 'Tim Humas',
  read_time     text not null default '3 mnt',
  title         text not null,
  excerpt       text not null,
  body          text[] not null default '{}',
  image         text not null,                              -- URL foto
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_berita_published_at on public.berita (published_at desc);
create index if not exists idx_berita_tag          on public.berita (tag);

create trigger trg_berita_updated_at
  before update on public.berita
  for each row execute function public.set_updated_at();

-- ============================================================
-- 3) Prestasi (Achievements)
-- ============================================================
do $$ begin
  create type public.prestasi_level as enum ('Internasional', 'Nasional', 'Provinsi', 'Kota');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.prestasi_icon as enum ('trophy', 'calc', 'dance', 'code', 'robot', 'music', 'theater', 'medal');
exception when duplicate_object then null; end $$;

create table if not exists public.prestasi (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  icon          public.prestasi_icon not null default 'trophy',
  bg            text not null default 'bg-navy',
  achieved_at   timestamptz not null,
  level         public.prestasi_level not null,
  tag           text not null,
  title         text not null,
  sub           text not null,                              -- subtitle (jurusan · jumlah siswa)
  team          text[] not null default '{}',               -- daftar anggota tim
  body          text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_prestasi_achieved_at on public.prestasi (achieved_at desc);
create index if not exists idx_prestasi_level       on public.prestasi (level);

create trigger trg_prestasi_updated_at
  before update on public.prestasi
  for each row execute function public.set_updated_at();

-- ============================================================
-- 4) Event (Pekan Seni, Open House, dll)
-- ============================================================
do $$ begin
  create type public.event_status as enum ('Akan datang', 'Selesai');
exception when duplicate_object then null; end $$;

create table if not exists public.event (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  event_date    text not null,                              -- string fleksibel (range tanggal OK: "20–24 April 2026")
  starts_at     timestamptz,                                -- nullable, untuk sort & filter "akan datang"
  status        public.event_status not null,
  category      text not null,
  body          text not null,                              -- ringkasan; isi panjang bisa pakai array
  bg            text not null default 'bg-navy',
  ink           text not null default 'text-paper',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_event_starts_at on public.event (starts_at desc nulls last);
create index if not exists idx_event_status    on public.event (status);

create trigger trg_event_updated_at
  before update on public.event
  for each row execute function public.set_updated_at();

-- ============================================================
-- 5) Agenda (Kalender bulanan)
-- ============================================================
create table if not exists public.agenda (
  id            uuid primary key default gen_random_uuid(),
  scheduled_at  timestamptz not null,                       -- tanggal & waktu mulai
  time_range    text not null default '08.00 – selesai',    -- string display
  title         text not null,
  location      text not null,
  category      text not null,                              -- "Akademik", "Kesiswaan", dll
  created_at    timestamptz not null default now()
);

create index if not exists idx_agenda_scheduled_at on public.agenda (scheduled_at desc);
create index if not exists idx_agenda_category     on public.agenda (category);

-- ============================================================
-- 6) Kotak Saran (Feedback form submissions)
-- ============================================================
create table if not exists public.kotak_saran (
  id            uuid primary key default gen_random_uuid(),
  nama          text,                                       -- nullable: anonim
  email         text,                                       -- nullable
  kategori      text not null,
  pesan         text not null,
  -- meta untuk anti-spam / audit
  ip_address    inet,
  user_agent    text,
  status        text not null default 'baru'
                check (status in ('baru', 'dibaca', 'ditindaklanjuti', 'spam')),
  created_at    timestamptz not null default now()
);

create index if not exists idx_kotak_saran_status     on public.kotak_saran (status);
create index if not exists idx_kotak_saran_created_at on public.kotak_saran (created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- - Pembaca publik (anon, authenticated): hanya SELECT konten publik
-- - Penulis (insert/update/delete): hanya service_role (server admin)
-- - Kecuali kotak_saran: anon boleh INSERT (form publik) tapi tidak SELECT
-- ============================================================

alter table public.pengumuman   enable row level security;
alter table public.berita       enable row level security;
alter table public.prestasi     enable row level security;
alter table public.event        enable row level security;
alter table public.agenda       enable row level security;
alter table public.kotak_saran  enable row level security;

-- Public read policies (semua orang boleh baca)
create policy "pengumuman_public_read"  on public.pengumuman   for select using (true);
create policy "berita_public_read"      on public.berita       for select using (true);
create policy "prestasi_public_read"    on public.prestasi     for select using (true);
create policy "event_public_read"       on public.event        for select using (true);
create policy "agenda_public_read"      on public.agenda       for select using (true);

-- Kotak Saran: anyone can submit, only admin (service_role) can read
create policy "kotak_saran_public_insert"
  on public.kotak_saran for insert
  with check (true);

-- (Tidak ada policy SELECT untuk anon/authenticated di kotak_saran)
-- service_role bypass RLS by default, jadi admin panel tetap bisa SELECT.

-- ============================================================
-- Seed data minimum (1 row per tabel untuk smoke test)
-- Hapus block ini kalau Anda akan migrate full data lewat script Node
-- ============================================================
insert into public.pengumuman (slug, category, tag, title, excerpt, body)
values
  ('jadwal-mpls-2026', 'MPLS', 'Baru',
   'Jadwal MPLS 2026 dan persiapan masuk.',
   'Masa Pengenalan Lingkungan Sekolah dimulai 14 Juli 2026.',
   array[
     'MPLS dilaksanakan 14–18 Juli 2026. Semua peserta didik baru wajib hadir.',
     'Agenda meliputi pengenalan struktur, profil tenaga pendidik, tata tertib, dan orientasi konsentrasi keahlian.'
   ])
on conflict (slug) do nothing;

insert into public.berita (slug, num, tag, bg, author, read_time, title, excerpt, body, image)
values
  ('robotik-juara-nasional', '30', 'Prestasi', 'bg-moss', 'Tim Humas', '3 mnt',
   'Membanggakan: prestasi tim Robotik raih juara nasional.',
   'Tim Robotik SMKN 74 raih juara di kompetisi tingkat nasional Yogyakarta.',
   array['Tim Robotik SMKN 74 berhasil meraih juara pertama di kompetisi robotik nasional di UGM Yogyakarta.'],
   'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80')
on conflict (slug) do nothing;

insert into public.prestasi (slug, icon, bg, achieved_at, level, tag, title, sub, team, body)
values
  ('lks-animasi-3d-2026', 'trophy', 'bg-moss', '2026-05-12 00:00:00+07', 'Nasional',
   'Juara Nasional',
   'Juara 1 Lomba Kompetensi Siswa (LKS) bidang Animasi 3D 2026.',
   'Tim Animasi & Multimedia · 3 siswa',
   array['Reza Maulana', 'Ayu Pertiwi', 'Fadhil Akmal'],
   array['Tim Animasi 3D SMKN 74 berhasil meraih Juara 1 LKS bidang Animasi 3D nasional 2026.'])
on conflict (slug) do nothing;

insert into public.event (slug, title, event_date, starts_at, status, category, body, bg, ink)
values
  ('pekan-seni-2026', 'Pekan Seni 2026 — Suara Tanah Air',
   '20–24 April 2026', '2026-04-20 09:00:00+07', 'Akan datang',
   'Festival',
   'Festival seni tahunan menampilkan karya dari empat konsentrasi keahlian.',
   'bg-amber', 'text-navy')
on conflict (slug) do nothing;

insert into public.agenda (scheduled_at, time_range, title, location, category)
values
  ('2026-04-24 19:00:00+07', '19.00 – 22.00',
   'Final Showcase Pekan Seni 2026 — Suara Tanah Air',
   'Aula Serbaguna', 'Seni & Budaya'),
  ('2026-06-05 08:00:00+07', '08.00 – 16.00',
   'Open House: pengenalan sekolah untuk calon siswa baru.',
   'Seluruh kampus', 'Komunitas');
