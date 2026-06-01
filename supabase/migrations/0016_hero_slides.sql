create table if not exists hero_slides (
  id           uuid primary key default gen_random_uuid(),
  sort_order   int not null default 0,
  eyebrow      text not null default '',
  head_pre     text not null default '',
  head_accent  text not null default '',
  head_post    text not null default '',
  tag          text,
  caption      text,
  year_label   text,
  image_url    text,
  image_alt    text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists hero_slides_status_sort on hero_slides(status, sort_order);
