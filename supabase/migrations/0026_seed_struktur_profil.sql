-- Seed data contoh struktur organisasi (hanya jika tabel masih kosong).
-- Agar admin = sumber data: profil bawaan dimasukkan ke DB supaya bisa diedit.
insert into public.struktur_profil (kategori, sort_order, title, nama)
select kategori, sort_order, title, nama
from (values
  -- Manajemen Sekolah
  ('manajemen', 1, 'Kepala Sekolah',            'Drs. Bambang Sutiyono, M.Pd'),
  ('manajemen', 2, 'Wakil Kurikulum',           'Wahyu Setiawan, S.Pd, M.Pd'),
  ('manajemen', 3, 'Wakil Kesiswaan',           'Dewi Nurjanah, M.Pd'),
  ('manajemen', 4, 'Wakil Sarana & Prasarana',  'Rahmat Abdul Aziz, S.Pd'),
  ('manajemen', 5, 'Wakil Humas & DUDI',        'Fitri Handayani, S.Pd'),
  ('manajemen', 6, 'Koord. SIM Sekolah',        'Ahmad Subagio, S.Kom'),
  -- Komite
  ('komite', 1, 'Ketua Komite',     'Drs. Anwar Budiman'),
  ('komite', 2, 'Sekretaris',       'Sri Dewi, S.E.'),
  ('komite', 3, 'Bendahara',        'Ir. Endang Rahayu'),
  ('komite', 4, 'Bidang Akademik',  'Muhammad Taufik'),
  ('komite', 5, 'Bidang Kesiswaan', 'Laila Kurniawati'),
  ('komite', 6, 'Bidang Hukum',     'Hadi Pramono, S.H.'),
  -- OSIS
  ('osis', 1, 'Ketua OSIS',        'Rangga Aditya'),
  ('osis', 2, 'Wakil Ketua',       'Putri Syahara'),
  ('osis', 3, 'Sekretaris',        'Anisa Maulida'),
  ('osis', 4, 'Bendahara',         'Bagus Firmansyah'),
  ('osis', 5, 'Sie Kerohanian',    'Kharisma Hadi'),
  ('osis', 6, 'Sie Olahraga',      'Lestari Pertiwi'),
  ('osis', 7, 'Sie Seni & Budaya', 'Dimas Arifin'),
  ('osis', 8, 'Sie Humas',         'Sari Melati'),
  -- MPK
  ('mpk', 1, 'Ketua MPK',              'Faiz Rahmadhani'),
  ('mpk', 2, 'Wakil Ketua',            'Naila Hafidza'),
  ('mpk', 3, 'Sekretaris',             'Zahra Aprilia'),
  ('mpk', 4, 'Komisi I — Konstitusi',  'Reza Bachtiar'),
  ('mpk', 5, 'Komisi II — Anggaran',   'Adelia Lestari'),
  ('mpk', 6, 'Komisi III — Aspirasi',  'Gilang Yulianto'),
  -- Tenaga Pendidik & Kependidikan
  ('tenaga', 1,  'Bahasa Indonesia',       'Dewi Nurjanah, S.Pd'),
  ('tenaga', 2,  'Matematika',             'Rio Pramudita, S.Pd'),
  ('tenaga', 3,  'Bahasa Inggris',         'Hesti Susanti, S.Pd'),
  ('tenaga', 4,  'Sejarah Indonesia',      'Joko Tarmono, S.Pd'),
  ('tenaga', 5,  'PPKn',                   'Ani Saraswati, S.Pd'),
  ('tenaga', 6,  'PJOK',                   'Teguh Maulana, S.Pd'),
  ('tenaga', 7,  'Pendidikan Agama Islam', 'Ratna Dewi, S.Pd.I'),
  ('tenaga', 8,  'Bimbingan Konseling',    'Eka Damayanti, S.Pd'),
  ('tenaga', 9,  'Ka. Tata Usaha',         'Sumiati Pratiwi'),
  ('tenaga', 10, 'Pustakawan',             'Rini Widyaningsih'),
  ('tenaga', 11, 'Laboran Multimedia',     'Budi Prasetyo'),
  ('tenaga', 12, 'Staf Keuangan',          'Maria Kartika')
) as v(kategori, sort_order, title, nama)
where not exists (select 1 from public.struktur_profil);
