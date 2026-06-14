-- Fix: kolom judul lama (head_pre/head_accent/head_post) sudah tidak dipakai
-- (judul digabung ke kolom `head`). Migration 0018 hanya mengubah DEFAULT-nya
-- jadi null tapi TIDAK melepas NOT NULL, sehingga insert slide baru gagal:
--   null value in column "head_pre" ... violates not-null constraint
-- Lepas NOT NULL agar insert tanpa kolom-kolom itu berhasil.
alter table public.hero_slides alter column head_pre   drop not null;
alter table public.hero_slides alter column head_accent drop not null;
alter table public.hero_slides alter column head_post  drop not null;
