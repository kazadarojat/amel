export interface Question {
  id: number;
  category: string;
  badge: string;
  question: string;
  context: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  clinicalTip: string;
}

export const DENTAL_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Konservasi Gigi & Operative Dentistry",
    badge: "Restorasi Komposit",
    question: "Berapa durasi pengetsaan asam fosfat 37% (total-etch) yang direkomendasikan pada jaringan dentin sebelum aplikasi bonding agent?",
    context: "Kasus: Preparasi kavitas klas II MO pada gigi 36 dengan kedalaman dentin menengah.",
    options: [
      {
        id: "A",
        text: "30 - 45 detik agar dentinal tubule terbuka selebar mungkin",
        isCorrect: false
      },
      {
        id: "B",
        text: "15 detik (maksimal 15-20 detik) untuk mencegah demineralisasi berlebih dan kolaps serat kolagen",
        isCorrect: true
      },
      {
        id: "C",
        text: "Hanya 1-2 detik tanpa perlu pembilasan air",
        isCorrect: false
      },
      {
        id: "D",
        text: "Dentin sama sekali tidak boleh terkena asam fosfat pada teknik total-etch",
        isCorrect: false
      }
    ],
    explanation: "Dentin hanya boleh dietsa selama 15 detik (berbeda dengan enamel yang 20-30 detik). Over-etching dentin mendenaturasi dan meruntuhkan serat kolagen, menyebabkan penurunan bond strength serta sensitivitas pasca-restorasi.",
    clinicalTip: "Pearls: Selalu pastikan kondisi dentin 'moist' (tidak over-dried) setelah rinsing agar fibril kolagen tetap mengembang!"
  },
  {
    id: 2,
    category: "Endodonsia & Perawatan Saluran Akar",
    badge: "Protokol Kemomekanis",
    question: "Mengapa larutan irigasi NaOCl (2.5% - 5.25%) perlu dikombinasikan dengan EDTA 17% secara bertahap saat preparasi saluran akar?",
    context: "Kasus: Gigi 21 nekrosis pulpa dengan lesi periapikal pasca instrumentasi putar (rotary).",
    options: [
      {
        id: "A",
        text: "NaOCl melarutkan jaringan organik & biofilm bakteri, sedangkan EDTA melarutkan komponen anorganik dari smear layer",
        isCorrect: true
      },
      {
        id: "B",
        text: "NaOCl dan EDTA harus dicampur bersamaan di dalam satu spuit untuk meningkatkan keasaman",
        isCorrect: false
      },
      {
        id: "C",
        text: "EDTA berfungsi sebagai semen obturasi permanen sedangkan NaOCl sebagai akselerator",
        isCorrect: false
      },
      {
        id: "D",
        text: "Keduanya hanya berfungsi mendinginkan jarum file agar tidak patah di dalam saluran akar",
        isCorrect: false
      }
    ],
    explanation: "NaOCl adalah agen proteolitik dan disinfektan kuat untuk jaringan nekrotik dan bakteri, namun tidak dapat menghilangkan komponen anorganik. EDTA 17% mengkelat kalsium untuk menghilangkan anorganic smear layer dan membuka tubuli dentin.",
    clinicalTip: "Pearls: Selalu bilas dengan aquadest / saline di antara NaOCl dan Chlorhexidine jika digunakan, agar tidak terbentuk presipitat PCA coklat!"
  },
  {
    id: 3,
    category: "Bedah Mulut & Maksilofasial",
    badge: "Odontektomi Molar 3",
    question: "Pada pencabutan bedah gigi molar ketiga bawah impaksi (Pell & Gregory Kelas II Posisi B), struktur neurovaskular vital mana yang paling rentan cedera?",
    context: "Kasus: Impaksi mesioangular gigi 48 dengan akar mendekati kanalis mandibula.",
    options: [
      {
        id: "A",
        text: "Duktus Stensen dan Arteri Temporalis Superfisial",
        isCorrect: false
      },
      {
        id: "B",
        text: "Nervus Alveolaris Inferior (NAI) di dekat apikal dan Nervus Lingualis di sisi lingual plate",
        isCorrect: true
      },
      {
        id: "C",
        text: "Nervus Fasialis cabang marginal mandibularis di sulkus labial",
        isCorrect: false
      },
      {
        id: "D",
        text: "Sinus Maksilaris dan Pleksus Pterigoideus",
        isCorrect: false
      }
    ],
    explanation: "Nervus Alveolaris Inferior (NAI) berada di dalam kanalis mandibula tepat di dekat apikal akar molar ketiga, sedangkan Nervus Lingualis berjalan sangat dekat dengan lingual plate mukoperiosteal di area retromolar trigonum.",
    clinicalTip: "Pearls: Evaluasi CBCT bila terlihat hilangnya lamina dura kanalis atau deviasi kanalis pada OPG sebelum pembedahan!"
  },
  {
    id: 4,
    category: "Periodonsia & Diagnostik Jaringan Penyangga",
    badge: "Pemeriksaan Periodontal",
    question: "Parameter klinis utama apa yang membedakan poket periodontal sejati (true pocket) dari poket gingiva semu (pseudopocket)?",
    context: "Kasus: Pemeriksaan probing depth 5 mm pada regio anterior rahang atas.",
    options: [
      {
        id: "A",
        text: "Adanya kalkulus subgingiva yang terlihat dari luar tanpa alat bantu",
        isCorrect: false
      },
      {
        id: "B",
        text: "Migrasi apikal dari junctional epithelium (Clinical Attachment Loss / CAL) melebihi batas CEJ",
        isCorrect: true
      },
      {
        id: "C",
        text: "Perubahan warna gigi menjadi kekuningan",
        isCorrect: false
      },
      {
        id: "D",
        text: "Gigi tidak pernah disikat selama 24 jam",
        isCorrect: false
      }
    ],
    explanation: "Pseudopocket timbul karena pembesaran gingiva (gingival enlargement) ke arah koronal tanpa kerusakan perlekatan jaringan ikat periodontal. Sedangkan True Pocket ditandai adanya migrasi junctional epithelium ke apikal dan hilangnya perlekatan (CAL).",
    clinicalTip: "Pearls: CAL = Probing Depth + Gingival Recession (jarak margin gingiva ke CEJ)!"
  },
  {
    id: 5,
    category: "Kasus Khusus: Hari Ulang Tahun Ke-27",
    badge: "Konsultasi Spesial",
    question: "Hari ini adalah hari istimewa ketika Amelia Sekar Kinasih genap berusia 27 tahun. Datang kiriman kue ulang tahun dan ucapan selamat. Tindakan apa yang paling tepat dilakukan drg. Amelia?",
    context: "Kasus: Momen bertambahnya usia ke-27 tahun drg. Amelia Sekar Kinasih.",
    options: [
      {
        id: "A",
        text: "Memberikan resep analgesik dan meminta kiriman dibawa pulang",
        isCorrect: false
      },
      {
        id: "B",
        text: "Menerima ucapan selamat ulang tahun ke-27, tiup lilin, dan membuka pesan ucapan spesial! 🎉🎂",
        isCorrect: true
      },
      {
        id: "C",
        text: "Melakukan preparasi kavitas tanpa indikasi medis",
        isCorrect: false
      },
      {
        id: "D",
        text: "Merujuk ke bagian rontgen tanpa alasan klinis",
        isCorrect: false
      }
    ],
    explanation: "Selamat ulang tahun ke-27, drg. Amelia Sekar Kinasih! Semoga selalu sehat, lancar dalam karir kedokteran gigi, dan segala rencana tercapai.",
    clinicalTip: "Catatan: Tetap semangat menjalani profesi dan jaga kesehatan di sela jadwal praktek."
  }
];
