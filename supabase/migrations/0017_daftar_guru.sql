create table if not exists daftar_guru (
  id          uuid primary key default gen_random_uuid(),
  sort_order  int not null default 0,
  initials    text not null default '',
  name        text not null default '',
  role        text not null default '',
  photo_url   text,
  bg          text not null default 'bg-navy',
  ink         text not null default 'text-paper',
  group_label text,
  status      text not null default 'draft' check (status in ('draft', 'published')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists daftar_guru_status_sort on daftar_guru(status, sort_order);
