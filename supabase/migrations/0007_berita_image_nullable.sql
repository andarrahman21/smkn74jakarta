-- Cover image sekarang opsional (thumbnail & cover bisa diisi terpisah)
ALTER TABLE berita ALTER COLUMN image DROP NOT NULL;
