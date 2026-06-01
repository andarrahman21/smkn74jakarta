-- CMS table for Prestasi (mirrors pengumuman schema exactly)
create table if not exists public.prestasi_cms (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  published_at   timestamptz not null default now(),
  category       text not null default '',
  tag            text,
  title          text not null,
  excerpt        text not null default '',
  body           text[] not null default '{}',
  body_html      text,
  cover_image    text,
  cover_image_alt text,
  status         text not null default 'draft' check (status in ('draft', 'published')),
  view_count     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists idx_prestasi_cms_published_at on public.prestasi_cms (published_at desc);
create index if not exists idx_prestasi_cms_status       on public.prestasi_cms (status);
create index if not exists idx_prestasi_cms_category     on public.prestasi_cms (category);

create trigger trg_prestasi_cms_updated_at
  before update on public.prestasi_cms
  for each row execute function public.set_updated_at();

-- Categories
create table if not exists public.prestasi_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  sort_order integer not null default 99,
  created_at timestamptz not null default now()
);

alter table public.prestasi_cms     enable row level security;
alter table public.prestasi_categories enable row level security;

create policy "prestasi_cms_public_read"
  on public.prestasi_cms for select using (true);

create policy "prestasi_categories_public_read"
  on public.prestasi_categories for select using (true);

-- Default categories
insert into public.prestasi_categories (name, sort_order) values
  ('LKS', 10), ('OSN', 20), ('Olahraga', 30), ('Seni', 40),
  ('Olimpiade', 50), ('Karya Ilmiah', 60), ('Lainnya', 99)
on conflict (name) do nothing;
