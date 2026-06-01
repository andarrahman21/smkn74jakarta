-- Thumbnail image untuk berita (berbeda dari cover/image)
-- Cover = hero image di halaman detail
-- Thumbnail = gambar kecil di listing & card
ALTER TABLE berita ADD COLUMN IF NOT EXISTS thumbnail TEXT;
ALTER TABLE berita ADD COLUMN IF NOT EXISTS thumbnail_alt TEXT;
