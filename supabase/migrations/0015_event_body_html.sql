-- Add body_html to event table for WYSIWYG content
alter table public.event
  add column if not exists body_html text;
