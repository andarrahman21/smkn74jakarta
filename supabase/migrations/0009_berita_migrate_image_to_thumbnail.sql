-- Migrasi satu kali: salin image → thumbnail untuk baris lama
-- yang belum punya thumbnail (image lama memang berukuran thumbnail).
UPDATE berita
SET
  thumbnail     = image,
  thumbnail_alt = image_alt
WHERE thumbnail IS NULL
  AND image IS NOT NULL;
