-- #3 View counter
ALTER TABLE pengumuman ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- #5 Cover image alt text
ALTER TABLE pengumuman ADD COLUMN IF NOT EXISTS cover_image_alt TEXT;
