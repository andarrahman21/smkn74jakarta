-- Add single `head` field, keep old three columns as nullable backup
alter table hero_slides add column if not exists head text not null default '';

-- Populate `head` for existing rows by combining the three old fields
-- Format: "head_pre *head_accent* head_post"
update hero_slides
set head = trim(
  coalesce(head_pre, '') ||
  case when head_accent <> '' then ' *' || head_accent || '*' else '' end ||
  case when head_post <> '' then ' ' || head_post else '' end
)
where head = '';

-- Make old columns nullable (no longer required)
alter table hero_slides alter column head_pre  set default null;
alter table hero_slides alter column head_accent set default null;
alter table hero_slides alter column head_post set default null;
