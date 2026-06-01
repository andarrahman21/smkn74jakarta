-- CMS table for Agenda (mirrors pengumuman schema exactly)
create table if not exists public.agenda_cms (
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

create index if not exists idx_agenda_cms_published_at on public.agenda_cms (published_at desc);
create index if not exists idx_agenda_cms_status       on public.agenda_cms (status);
create index if not exists idx_agenda_cms_category     on public.agenda_cms (category);

create trigger trg_agenda_cms_updated_at
  before update on public.agenda_cms
  for each row execute function public.set_updated_at();

-- Categories
create table if not exists public.agenda_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  sort_order integer not null default 99,
  created_at timestamptz not null default now()
);

alter table public.agenda_cms        enable row level security;
alter table public.agenda_categories enable row level security;

create policy "agenda_cms_public_read"
  on public.agenda_cms for select using (true);

create policy "agenda_categories_public_read"
  on public.agenda_categories for select using (true);

-- Default categories
insert into public.agenda_categories (name, sort_order) values
  ('Akademik', 10), ('Kesiswaan', 20), ('PKL & Industri', 30),
  ('Seni & Budaya', 40), ('Komunitas', 50), ('Lainnya', 99)
on conflict (name) do nothing;
