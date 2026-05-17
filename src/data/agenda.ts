export type Agenda = {
  day: string;
  month: string;
  year: string;
  date: string;
  time: string;
  title: string;
  location: string;
  category: "Akademik" | "Kesiswaan" | "PKL & Industri" | "Seni & Budaya" | "Komunitas";
};

export const agendaList: Agenda[] = [
  { day: "10", month: "Apr", year: "2026", date: "10 April 2026", time: "08.00 – 12.00", title: "Pendaftaran Tim Pekan Seni 2026 ditutup.", location: "Sekretariat OSIS", category: "Kesiswaan" },
  { day: "12", month: "Apr", year: "2026", date: "12 April 2026", time: "09.00 – 11.30", title: "Workshop Multimedia bersama Studio Visinema.", location: "Lab Komputer 1", category: "PKL & Industri" },
  { day: "15", month: "Apr", year: "2026", date: "15 April 2026", time: "07.30 – selesai", title: "Penyerahan beasiswa berprestasi 2025/2026.", location: "Aula Serbaguna", category: "Akademik" },
  { day: "18", month: "Apr", year: "2026", date: "18 April 2026", time: "13.00 – 16.00", title: "Audisi terbuka Pekan Seni — Konsentrasi Tari.", location: "Studio Tari 1", category: "Seni & Budaya" },
  { day: "22", month: "Apr", year: "2026", date: "22 April 2026", time: "07.30 – 09.30", title: "Upacara Hari Kartini.", location: "Lapangan Olahraga", category: "Komunitas" },
  { day: "24", month: "Apr", year: "2026", date: "24 April 2026", time: "19.00 – 22.00", title: "Final Showcase Pekan Seni 2026 — Suara Tanah Air.", location: "Aula Serbaguna", category: "Seni & Budaya" },
  { day: "07", month: "Mei", year: "2026", date: "7 Mei 2026", time: "08.00 – 12.00", title: "UTS Genap dimulai (5 hari).", location: "Seluruh ruang kelas", category: "Akademik" },
  { day: "12", month: "Mei", year: "2026", date: "12 Mei 2026", time: "Libur", title: "Libur Hari Raya Idul Fitri.", location: "—", category: "Komunitas" },
  { day: "22", month: "Mei", year: "2026", date: "22 Mei 2026", time: "07.00", title: "Hari pertama masuk pasca libur Idul Fitri.", location: "Seluruh sekolah", category: "Akademik" },
  { day: "05", month: "Jun", year: "2026", date: "5 Juni 2026", time: "08.00 – 16.00", title: "Open House: pengenalan sekolah untuk calon siswa baru.", location: "Seluruh kampus", category: "Komunitas" },
];

// Order of Indonesian short month names for sorting
const MONTH_ORDER = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const monthIdx = (m: string) => MONTH_ORDER.indexOf(m);

export const agendaByMonth = (list: Agenda[] = agendaList) => {
  const map = new Map<string, Agenda[]>();
  for (const a of list) {
    const key = `${a.month} ${a.year}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(a);
  }

  // Sort agenda items within each month (newest day first)
  for (const items of map.values()) {
    items.sort((a, b) => Number(b.day) - Number(a.day));
  }

  // Sort month groups: newest year first, then newest month
  return Array.from(map.entries()).sort(([keyA], [keyB]) => {
    const [mA, yA] = keyA.split(" ");
    const [mB, yB] = keyB.split(" ");
    if (yA !== yB) return Number(yB) - Number(yA);
    return monthIdx(mB) - monthIdx(mA);
  });
};
