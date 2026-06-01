-- Add cover_image column to pengumuman
alter table public.pengumuman
  add column if not exists cover_image text;
