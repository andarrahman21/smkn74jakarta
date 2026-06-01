-- CMS table for Event (mirrors pengumuman schema exactly)
create table if not exists public.event_cms (
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

create index if not exists idx_event_cms_published_at on public.event_cms (published_at desc);
create index if not exists idx_event_cms_status       on public.event_cms (status);
create index if not exists idx_event_cms_category     on public.event_cms (category);

create trigger trg_event_cms_updated_at
  before update on public.event_cms
  for each row execute function public.set_updated_at();

-- Categories
create table if not exists public.event_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,
  sort_order integer not null default 99,
  created_at timestamptz not null default now()
);

alter table public.event_cms        enable row level security;
alter table public.event_categories enable row level security;

create policy "event_cms_public_read"
  on public.event_cms for select using (true);

create policy "event_categories_public_read"
  on public.event_categories for select using (true);

-- Default categories
insert into public.event_categories (name, sort_order) values
  ('Festival', 10), ('Open House', 20), ('Seminar', 30),
  ('Workshop', 40), ('Pertunjukan', 50), ('Lainnya', 99)
on conflict (name) do nothing;
