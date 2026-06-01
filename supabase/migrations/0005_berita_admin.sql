-- ============================================================
-- SMKN 74 Jakarta — Berita admin columns
-- Adds admin-required columns to the berita table
-- ============================================================

ALTER TABLE berita ADD COLUMN IF NOT EXISTS body_html TEXT;
ALTER TABLE berita ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published'));
ALTER TABLE berita ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE berita ADD COLUMN IF NOT EXISTS image_alt TEXT;
