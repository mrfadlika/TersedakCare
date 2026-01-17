// Educational Content Data
// Sumber: RS Pondok Indah & Kementerian Kesehatan RI
// https://www.rspondokindah.co.id/id/news/pertolongan-pertama-saat-bayi-tersedak-
// https://keslan.kemkes.go.id/view_artikel/85/jangan-panik-ini-yang-harus-dilakukan-jika-anak-tersedak

// ============================================================================
// MATERI - Referensi Cepat Berdasarkan Usia
// Konten ini digunakan di halaman /materi untuk panduan langsung berdasarkan
// kategori usia anak. Fokus pada langkah-langkah penanganan praktis.
// ============================================================================

export interface ContentSection {
    id: string;
    title: string;
    description: string;
    content: string;
    imageUrl?: string;
    videoUrl?: string;
    warnings?: string[];
    tips?: string[];
}

export interface AgeGroup {
    id: 'bayi' | 'balita' | 'anak';
    name: string;
    ageRange: string;
    description: string;
    icon: string;
    color: string;
    sections: ContentSection[];
}

export const ageGroups: AgeGroup[] = [
    {
        id: 'bayi',
        name: 'Bayi',
        ageRange: '0-12 Bulan',
        description: 'Panduan penanganan tersedak untuk bayi usia 0-12 bulan dengan teknik Back Blows & Chest Thrusts',
        icon: '👶',
        color: 'accent',
        sections: [
            {
                id: 'bayi-tanda',
                title: 'Tanda-Tanda Bayi Tersedak',
                description: 'Kenali tanda-tanda bayi yang mengalami tersedak',
                content: `
## Tanda-Tanda Tersedak pada Bayi

Bayi memiliki saluran udara yang sangat kecil sehingga lebih mudah tersedak. Deteksi dini harus dilakukan segera.

### Tersedak Parsial (Sumbatan Tidak Total)
- ✅ Masih bisa batuk dan gagging
- ✅ Masih bisa bernapas
- ✅ Masih bisa menangis

**Penanganan:** Segera bawa ke rumah sakit terdekat.

### Tersedak Total - DARURAT!
1. **Batuk tidak efektif** - Batuk tidak menimbulkan suara
2. **Tidak bisa menangis** - Bayi tiba-tiba diam
3. **Wajah membiru** - Tanda kekurangan oksigen
4. **Kesulitan bernapas berat**
5. **Kesadaran menurun** - Bayi lemas atau tidak responsif

> **⚠️ SEGERA hubungi 119 atau IGD rumah sakit terdekat!**
        `,
                warnings: [
                    'JANGAN masukkan jari ke mulut bayi - berisiko mendorong benda lebih dalam',
                    'JANGAN tepuk punggung dengan posisi bayi tegak',
                ],
            },
            {
                id: 'bayi-langkah',
                title: 'Langkah Penanganan',
                description: 'Back Blows & Chest Thrusts untuk bayi 0-12 bulan',
                videoUrl: 'https://www.youtube.com/watch?v=UrON59WCDEU',
                content: `
## Pertolongan Pertama pada Bayi Tersedak

### Langkah 1: Back Blow (Tepukan Punggung)
- Posisikan bayi **telungkup** di lengan Anda
- Kepala bayi **lebih rendah** dari tubuh
- Sangga kepala dan leher dengan tangan
- Berikan **5 tepukan** di antara tulang belikat
- Gunakan **pangkal telapak tangan**

### Langkah 2: Chest Thrust (Tekanan Dada)
Jika Back Blow gagal:
- **Balikkan bayi telentang**
- Kepala tetap lebih rendah
- Letakkan **2 jari** di tengah dada (bawah garis puting)
- Berikan **5 tekanan** kedalaman ~4 cm

### Langkah 3: Ulangi
- Siklus: **5 Back Blows → 5 Chest Thrusts**
- Terus lakukan sampai benda keluar atau bayi tidak sadar

### Jika Bayi Tidak Sadar
- Hubungi **119** segera
- Mulai CPR: 30 kompresi, 2 napas bantuan
        `,
                tips: [
                    'Tetap tenang - kepanikan menghambat tindakan',
                    'Minta seseorang hubungi 119 sementara Anda menangani',
                    'Semua bayi tersedak HARUS diperiksa dokter',
                ],
            },
        ],
    },
    {
        id: 'balita',
        name: 'Balita',
        ageRange: '1-3 Tahun',
        description: 'Panduan penanganan tersedak untuk balita usia 1-3 tahun dengan teknik Back Blows & Abdominal Thrusts',
        icon: '🧒',
        color: 'secondary',
        sections: [
            {
                id: 'balita-tanda',
                title: 'Tanda-Tanda Balita Tersedak',
                description: 'Kenali tanda-tanda balita yang mengalami tersedak',
                content: `
## Tanda-Tanda Tersedak pada Balita

Balita berisiko tinggi tersedak karena aktivitas eksplorasi dan suka memasukkan benda ke mulut.

### Batuk Efektif (Sumbatan Parsial)
- ✅ Batuk dengan keras
- ✅ Mengeluarkan suara atau berbicara
- ✅ Bernapas meski dengan kesulitan

**Penanganan:** Biarkan batuk, JANGAN tepuk punggung!

### Batuk Tidak Efektif (Sumbatan Total) - DARURAT!
- ❌ Batuk tidak menimbulkan suara
- ❌ Tidak bisa berbicara atau menangis
- ❌ Kesulitan bernapas berat
- ❌ Wajah kebiruan
        `,
                warnings: [
                    'Jangan korek mulut dengan jari jika benda tidak terlihat',
                    'Jangan berikan minuman untuk "mendorong" benda',
                ],
            },
            {
                id: 'balita-langkah',
                title: 'Langkah Penanganan',
                description: 'Back Blows & Abdominal Thrusts untuk balita 1-3 tahun',
                videoUrl: 'https://www.youtube.com/watch?v=UrON59WCDEU',
                content: `
## Pertolongan Pertama pada Balita Tersedak

### Langkah 1: Back Blows
- Condongkan balita ke depan
- Topang dada dengan satu tangan
- Berikan **5 tepukan** di antara tulang belikat
- Gunakan **pangkal telapak tangan**

### Langkah 2: Abdominal Thrusts
- Berdiri **di belakang balita**
- Lingkarkan tangan di pinggang
- Kepalkan tangan, letakkan **antara pusar dan tulang dada**
- Genggam dengan tangan lain
- Berikan **5 hentakan** ke arah dalam dan atas

### Langkah 3: Ulangi
- Siklus: **5 Back Blows → 5 Abdominal Thrusts**
- Terus sampai benda keluar

### Jika Tidak Sadar
- Baringkan di lantai
- Hubungi **119**
- Mulai CPR, kedalaman kompresi ~5 cm
        `,
                tips: [
                    'Abdominal Thrusts TIDAK boleh untuk bayi di bawah 1 tahun',
                    'Tekanan arah dalam dan atas (seperti huruf J)',
                ],
            },
        ],
    },
    {
        id: 'anak',
        name: 'Anak',
        ageRange: '3+ Tahun',
        description: 'Panduan penanganan tersedak untuk anak usia 3 tahun ke atas dengan Heimlich Maneuver',
        icon: '👦',
        color: 'success',
        sections: [
            {
                id: 'anak-tanda',
                title: 'Tanda-Tanda Anak Tersedak',
                description: 'Kenali tanda-tanda anak yang mengalami tersedak',
                content: `
## Tanda-Tanda Tersedak pada Anak

Anak yang lebih besar dapat memberikan tanda yang lebih jelas.

### Tanda Universal Tersedak
**Memegang tenggorokan dengan kedua tangan**

### Tanyakan: "Apakah kamu tersedak?"

### Batuk Efektif
- ✅ Masih bisa batuk keras
- ✅ Masih bisa berbicara

**Penanganan:** Minta batuk keras, jangan intervensi.

### Batuk Tidak Efektif - DARURAT!
- ❌ Tidak bisa berbicara
- ❌ Batuk lemah/tidak ada suara
- ❌ Napas berbunyi (wheezing)
- ❌ Wajah merah lalu biru
        `,
                warnings: [
                    'Jika masih bisa batuk dan berbicara, JANGAN lakukan Heimlich',
                    'Dorong anak terus batuk jika batuknya efektif',
                ],
            },
            {
                id: 'anak-langkah',
                title: 'Langkah Penanganan (Heimlich Maneuver)',
                description: 'Abdominal Thrusts / Heimlich Maneuver untuk anak 3+ tahun',
                videoUrl: 'https://www.youtube.com/watch?v=UrON59WCDEU',
                content: `
## Heimlich Maneuver untuk Anak

### Langkah 1: Back Blows
- Condongkan anak ke depan
- Berikan **5 tepukan kuat** di antara tulang belikat

### Langkah 2: Abdominal Thrusts (Heimlich)
- Berdiri **di belakang anak**
- Lingkarkan tangan di **pinggang**
- Kepalkan tangan, letakkan **di atas pusar, bawah tulang dada**
- Genggam dengan tangan lain
- Hentakkan **ke dalam dan ke atas** dengan cepat
- Berikan **5 hentakan**

### Langkah 3: Ulangi
- **5 Back Blows → 5 Abdominal Thrusts**
- Terus sampai benda keluar

### Jika Tidak Sadar
- Baringkan di lantai
- Hubungi **119**
- CPR: 30 kompresi, 2 napas bantuan
- Kedalaman kompresi ~5 cm
        `,
                tips: [
                    'Heimlich yang benar menyelamatkan nyawa dalam detik',
                    'Latihan rutin sangat penting',
                    'Tetap periksakan ke dokter setelah tersedak teratasi',
                ],
            },
        ],
    },
];

// ============================================================================
// BELAJAR - Modul Pembelajaran Terstruktur
// Konten ini digunakan di halaman /belajar untuk pembelajaran bertahap
// dengan progress tracking. Fokus pada pemahaman mendalam dan teori.
// ============================================================================

export interface LearningLesson {
    id: string;
    title: string;
    duration: string;
    content: string;
    videoUrl?: string;
    quiz?: {
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
    }[];
}

export interface LearningModule {
    id: string;
    order: number;
    title: string;
    description: string;
    duration: string;
    icon: string;
    lessons: LearningLesson[];
    topics: string[];
    completed?: boolean;
}

export const learningModules: LearningModule[] = [
    {
        id: 'module-1',
        order: 1,
        title: 'Pengenalan Tersedak',
        description: 'Memahami apa itu tersedak, mengapa berbahaya, dan siapa yang berisiko tinggi',
        duration: '10 menit',
        icon: '📚',
        topics: [
            'Definisi tersedak',
            'Anatomi saluran napas anak',
            'Mengapa anak mudah tersedak',
            'Faktor risiko tersedak',
        ],
        lessons: [
            {
                id: 'lesson-1-1',
                title: 'Apa Itu Tersedak?',
                duration: '3 menit',
                content: `
## Pengertian Tersedak

**Tersedak** adalah kondisi darurat ketika saluran napas tersumbat oleh benda asing, sehingga mengganggu atau menghentikan aliran udara ke paru-paru.

### Mengapa Tersedak Berbahaya?

Tersedak adalah **kegawatdaruratan yang harus ditangani segera**. Ketika saluran napas tersumbat:

1. **Oksigen tidak bisa masuk** ke paru-paru
2. **Otak kekurangan oksigen** dalam hitungan menit
3. **Kerusakan otak permanen** dapat terjadi dalam 4-6 menit
4. **Kematian** dapat terjadi jika tidak ditangani

### Penyebab Umum Tersedak

- **Makanan**: potongan besar, bulat, atau kenyal
- **Benda kecil**: koin, baterai, mainan kecil, kancing
- **ASI/susu**: posisi menyusu yang salah
                `,
                quiz: [
                    {
                        question: 'Berapa lama kerusakan otak permanen dapat terjadi jika tersedak tidak ditangani?',
                        options: ['1-2 menit', '4-6 menit', '10-15 menit', '30 menit'],
                        correctAnswer: 1,
                        explanation: 'Kerusakan otak permanen dapat terjadi dalam 4-6 menit karena otak sangat sensitif terhadap kekurangan oksigen.'
                    },
                    {
                        question: 'Manakah yang BUKAN penyebab umum tersedak pada anak?',
                        options: ['Potongan makanan besar', 'Koin dan baterai', 'Air putih', 'Mainan kecil'],
                        correctAnswer: 2,
                        explanation: 'Air putih tidak menyebabkan tersedak karena bersifat cair. Tersedak disebabkan oleh benda padat yang menyumbat saluran napas.'
                    }
                ]
            },
            {
                id: 'lesson-1-2',
                title: 'Mengapa Anak Mudah Tersedak?',
                duration: '4 menit',
                content: `
## Faktor Risiko pada Anak

Bayi dan anak-anak **sangat rentan** tersedak karena beberapa faktor:

### Anatomi

1. **Saluran napas lebih kecil** - Diameter trakea bayi hanya sekitar 4mm (setara sedotan)
2. **Refleks menelan belum sempurna** - Koordinasi mengunyah dan menelan masih berkembang
3. **Gigi belum lengkap** - Tidak bisa mengunyah makanan dengan sempurna

### Perilaku

1. **Eksplorasi dengan mulut** - Anak suka memasukkan benda ke mulut
2. **Aktivitas tinggi** - Makan sambil berlari atau bermain
3. **Keingintahuan** - Tidak mengerti bahaya benda kecil

### Kelompok Usia Berisiko Tinggi

| Usia | Risiko | Penyebab Utama |
|------|--------|----------------|
| 0-12 bulan | Sangat tinggi | ASI/susu, makanan padat pertama |
| 1-3 tahun | Tinggi | Makanan, mainan kecil |
| 3-5 tahun | Sedang | Makanan, benda rumah tangga |
                `,
            },
            {
                id: 'lesson-1-3',
                title: 'Pencegahan Tersedak',
                duration: '3 menit',
                content: `
## Langkah Pencegahan Tersedak

### Di Rumah

1. **Jauhkan benda kecil** dari jangkauan anak:
   - Koin dan uang logam
   - Baterai (terutama baterai kancing)
   - Mainan dengan bagian kecil
   - Kancing, peniti, jepit rambut

2. **Pilih mainan sesuai usia** - Perhatikan label rekomendasi umur

### Saat Makan

1. **Potong makanan kecil-kecil**
2. **Awasi anak saat makan** - Jangan biarkan makan sendiri tanpa pengawasan
3. **Jangan ajak bicara saat makan** - Fokus mengunyah dan menelan
4. **Pastikan posisi duduk** - Jangan makan sambil berbaring atau berlari

### Makanan Berisiko Tinggi

❌ Anggur utuh → ✅ Potong jadi 4 bagian
❌ Sosis utuh → ✅ Potong memanjang lalu iris
❌ Permen keras → ✅ Hindari untuk anak kecil
❌ Kacang utuh → ✅ Haluskan atau hindari
                `,
            },
        ],
    },
    {
        id: 'module-2',
        order: 2,
        title: 'Mengenali Tanda-Tanda Tersedak',
        description: 'Cara identifikasi cepat dan akurat tanda-tanda tersedak berdasarkan tingkat keparahan',
        duration: '15 menit',
        icon: '👀',
        topics: [
            'Tanda universal tersedak',
            'Sumbatan parsial vs total',
            'Batuk efektif vs tidak efektif',
            'Tanda berdasarkan usia',
        ],
        lessons: [
            {
                id: 'lesson-2-1',
                title: 'Tanda Universal Tersedak',
                duration: '4 menit',
                content: `
## Mengenali Tersedak dengan Cepat

### Tanda Universal Tersedak

🤲 **Memegang tenggorokan dengan kedua tangan** - Ini adalah tanda instingtif yang dilakukan orang tersedak

### Tanda-Tanda Umum

1. **Kesulitan bernapas** - Napas pendek, tersengal
2. **Tidak bisa berbicara/menangis** - Suara tercekat
3. **Wajah berubah warna** - Merah → Kebiruan
4. **Mata melotot** - Tanda panik dan kesulitan
5. **Gerakan panik** - Mengibas-ngibaskan tangan

### Pertanyaan Kunci

Untuk anak yang lebih besar, tanyakan langsung:

> **"Apakah kamu tersedak?"**

Jika anak **mengangguk** → Segera bantu
Jika anak **menjawab dengan suara** → Batuk efektif, biarkan batuk
                `,
            },
            {
                id: 'lesson-2-2',
                title: 'Sumbatan Parsial vs Total',
                duration: '5 menit',
                content: `
## Tingkat Keparahan Sumbatan

### Sumbatan Parsial (Ringan)

Saluran napas hanya **tersumbat sebagian**, masih ada celah untuk udara.

**Tanda-tanda:**
- ✅ Masih bisa batuk dengan keras
- ✅ Masih bisa bernapas
- ✅ Masih bisa menangis/berbicara
- ✅ Mungkin ada suara wheezing

**Penanganan:**
- **JANGAN tepuk punggung** - bisa memperburuk
- Biarkan batuk secara alami
- Dorong untuk terus batuk
- Segera bawa ke RS untuk diperiksa

---

### Sumbatan Total (Berat) - DARURAT!

Saluran napas **tersumbat sepenuhnya**, tidak ada udara yang bisa lewat.

**Tanda-tanda:**
- ❌ Tidak bisa batuk (atau batuk sangat lemah tanpa suara)
- ❌ Tidak bisa bernapas
- ❌ Tidak bisa berbicara/menangis
- ❌ Wajah membiru
- ❌ Bisa hilang kesadaran

**Penanganan:**
- **SEGERA lakukan pertolongan pertama**
- Hubungi 119
- Lakukan Back Blows + Chest/Abdominal Thrusts
                `,
            },
            {
                id: 'lesson-2-3',
                title: 'Tanda Berdasarkan Usia',
                duration: '4 menit',
                content: `
## Perbedaan Tanda Berdasarkan Usia

### Bayi (0-12 bulan)

Bayi tidak bisa memberikan tanda yang jelas. Perhatikan:
- 😶 Tiba-tiba diam saat sebelumnya aktif
- 😰 Ekspresi wajah panik atau ketakutan
- 🔵 Wajah dan bibir membiru
- 😫 Gerakan menggeliat atau meronta
- 💨 Napas sangat pendek atau tidak bernapas

### Balita (1-3 tahun)

- 🤲 Mungkin memegang leher
- 😨 Terlihat sangat ketakutan
- 🗣️ Tidak bisa berbicara atau hanya bersuara lemah
- 🔴 Wajah memerah lalu membiru

### Anak (3+ tahun)

- 🤲 Memegang tenggorokan (tanda universal)
- ❌ Menggelengkan kepala saat ditanya "tersedak?"
- ✅ Mengangguk saat ditanya (tidak bisa jawab dengan kata)
- 📢 Membuka mulut tanpa suara keluar

### Tips Deteksi Cepat

> **Arahkan kecurigaan tersedak jika:**
> - Gejala muncul **tiba-tiba**
> - Anak baru saja **makan atau bermain** dengan benda kecil
                `,
            },
            {
                id: 'lesson-2-4',
                title: 'Kapan Harus Bertindak',
                duration: '2 menit',
                content: `
## Diagram Keputusan

### Apakah Anak Bisa Batuk dengan Kuat?

**YA** → Jangan intervensi
- Dorong terus batuk
- Awasi dengan cermat
- Bawa ke RS setelah benda keluar

**TIDAK** → Segera bertindak!
- Bayi 0-12 bulan: Back Blows + Chest Thrusts
- Anak 1+ tahun: Back Blows + Abdominal Thrusts
- Hubungi 119

### Kapan Hubungi 119?

📞 **SEGERA hubungi 119 jika:**
1. Anak tidak bisa batuk/bernapas/berbicara
2. Wajah membiru
3. Anak kehilangan kesadaran
4. Benda tidak keluar setelah beberapa siklus
5. Tersedak benda tajam atau baterai

> **Jangan tunda** - Setiap detik berharga!
                `,
            },
        ],
    },
    {
        id: 'module-3',
        order: 3,
        title: 'Penanganan Bayi (0-12 Bulan)',
        description: 'Teknik Back Blows dan Chest Thrusts khusus untuk bayi sesuai standar medis',
        duration: '20 menit',
        icon: '👶',
        topics: [
            'Posisi yang benar',
            'Teknik Back Blow',
            'Teknik Chest Thrust',
            'CPR bayi jika tidak sadar',
        ],
        lessons: [
            {
                id: 'lesson-3-1',
                title: 'Posisi yang Benar',
                duration: '5 menit',
                content: `
## Posisi Bayi untuk Penanganan Tersedak

### Mengapa Posisi Penting?

Posisi yang benar memungkinkan **gravitasi membantu** mengeluarkan benda dan memastikan **teknik efektif**.

### Posisi untuk Back Blows

1. **Duduk atau berlutut** dengan stabil
2. **Letakkan bayi telungkup** di lengan bawah Anda
3. **Kepala lebih rendah** dari tubuh (sudut ~60°)
4. **Sangga kepala dan rahang** dengan tangan Anda
5. **Jari TIDAK menekan** jaringan lunak leher depan
6. Lengan bawah bisa ditopang di paha Anda

### Posisi untuk Chest Thrusts

1. **Balikkan bayi** menjadi telentang
2. **Kepala tetap lebih rendah** dari tubuh
3. **Lengan menopang punggung** dan kepala bayi
4. **Bayi menghadap ke atas**

### Hal yang Harus Dihindari

❌ Posisi bayi tegak/vertikal
❌ Kepala lebih tinggi dari tubuh
❌ Menekan leher bagian depan
❌ Menggendong dengan tidak stabil
                `,
            },
            {
                id: 'lesson-3-2',
                title: 'Teknik Back Blow',
                duration: '5 menit',
                content: `
## Back Blow Maneuver pada Bayi

### Langkah-Langkah

1. **Posisikan bayi telungkup** di lengan Anda
   - Kepala lebih rendah dari tubuh
   - Sangga kepala dengan tangan

2. **Lokasi tepukan**
   - Di **pertengahan punggung**
   - **Di antara kedua tulang belikat** (scapula)

3. **Cara melakukan tepukan**
   - Gunakan **pangkal telapak tangan** (heel of hand)
   - Berikan **5 tepukan** berturut-turut
   - Tepukan harus **tegas tapi terkontrol**
   - Arah tepukan: ke depan dan ke bawah

4. **Setelah setiap siklus**
   - Periksa mulut bayi
   - Jika benda **terlihat**, keluarkan dengan hati-hati
   - Jika benda **tidak terlihat**, JANGAN korek

### Kekuatan Tepukan

⚠️ Tepukan harus cukup kuat untuk menciptakan **tekanan** yang mendorong benda keluar, tapi tidak sampai menyakiti bayi.

Bayangkan seperti **tepukan bersendawa** tapi sedikit lebih kuat.
                `,
            },
            {
                id: 'lesson-3-3',
                title: 'Teknik Chest Thrust',
                duration: '5 menit',
                content: `
## Chest Thrust pada Bayi

Dilakukan jika Back Blows **tidak berhasil** mengeluarkan benda.

### Langkah-Langkah

1. **Balikkan bayi ke posisi telentang**
   - Topang kepala dan punggung
   - Kepala tetap lebih rendah dari tubuh

2. **Posisi tangan**
   - Letakkan **2 jari** (telunjuk dan jari tengah)
   - Di **tengah tulang dada** (sternum)
   - **Di bawah garis puting** (nipple line)

3. **Cara melakukan tekanan**
   - Tekan **ke dalam dan ke atas**
   - Kedalaman: sekitar **4 cm** (1.5 inci)
   - Berikan **5 tekanan** berturut-turut
   - Tekanan harus mantap dan terkontrol

4. **Setelah siklus**
   - Periksa mulut bayi
   - Ulangi Back Blows jika benda belum keluar

### Siklus Lengkap

🔄 **5 Back Blows → 5 Chest Thrusts → Cek mulut → Ulangi**

Terus lakukan sampai:
- ✅ Benda berhasil keluar, ATAU
- ❌ Bayi kehilangan kesadaran (mulai CPR)
                `,
            },
            {
                id: 'lesson-3-4',
                title: 'CPR Bayi dan Kapan ke RS',
                duration: '5 menit',
                content: `
## Jika Bayi Tidak Sadar

### Langkah Darurat

1. **Hubungi 119** segera
2. **Baringkan bayi** di permukaan datar dan keras
3. **Mulai CPR**

### CPR Bayi

**Kompresi Dada:**
- Lokasi: tengah dada, di bawah garis puting
- Gunakan: 2 jari (atau 2 ibu jari jika ada 2 penolong)
- Kedalaman: ~4 cm
- Kecepatan: 100-120 kompresi/menit
- Rasio: **30 kompresi : 2 napas bantuan**

**Napas Bantuan:**
- Tutup hidung dan mulut bayi dengan mulut Anda
- Berikan napas lembut (jangan terlalu kuat)
- Lihat dada naik

### Sebelum Napas Bantuan
Selalu **periksa mulut** - jika benda terlihat, keluarkan

---

## Setelah Tersedak Teratasi

**WAJIB bawa ke dokter** jika:
- 🔵 Sempat membiru
- 😵 Sempat tidak sadar
- 😮‍💨 Masih kesulitan bernapas
- 🤧 Batuk terus-menerus
- 🍼 Kesulitan menelan
                `,
            },
        ],
    },
    {
        id: 'module-4',
        order: 4,
        title: 'Penanganan Balita (1-3 Tahun)',
        description: 'Teknik kombinasi Back Blows dan Abdominal Thrusts untuk balita',
        duration: '20 menit',
        icon: '🧒',
        topics: [
            'Perbedaan dengan penanganan bayi',
            'Teknik Back Blows untuk balita',
            'Abdominal Thrust yang aman',
            'Penanganan balita tidak sadar',
        ],
        lessons: [
            {
                id: 'lesson-4-1',
                title: 'Perbedaan dengan Bayi',
                duration: '4 menit',
                content: `
## Perbedaan Penanganan Bayi vs Balita

### Mengapa Berbeda?

| Aspek | Bayi (0-12 bln) | Balita (1-3 thn) |
|-------|-----------------|------------------|
| **Ukuran** | Kecil, muat di lengan | Lebih besar, berdiri |
| **Posisi** | Telungkup di lengan | Condong ke depan |
| **Teknik perut** | ❌ Chest Thrust | ✅ Abdominal Thrust |
| **Kekuatan** | Lebih lembut | Lebih kuat |

### Mengapa Abdominal Thrust Baru Boleh di Usia 1 Tahun?

- Organ dalam bayi masih **sangat rapuh**
- Risiko **cedera hati dan limpa** pada bayi
- Pada usia 1 tahun, organ sudah **lebih kuat**

### ⚠️ Penting!

> Jangan pernah lakukan Abdominal Thrust pada bayi di bawah 1 tahun!
                `,
            },
            {
                id: 'lesson-4-2',
                title: 'Back Blows untuk Balita',
                duration: '5 menit',
                content: `
## Back Blows pada Balita

### Posisi

1. **Berdiri atau berlutut** di belakang/samping balita
2. **Condongkan balita ke depan**
   - Satu tangan menopang dada dari depan
   - Kepala lebih rendah dari tubuh
3. Balita bisa **berdiri** atau **duduk di pangkuan** Anda

### Teknik Tepukan

1. **Lokasi**: Pertengahan punggung, di antara tulang belikat
2. **Alat**: Pangkal telapak tangan
3. **Jumlah**: **5 tepukan** berturut-turut
4. **Arah**: Ke depan dan ke bawah
5. **Kekuatan**: Tegas dan terkontrol

### Untuk Balita Kecil

Jika balita masih kecil (sekitar 1 tahun):
- Bisa diposisikan **telungkup di paha** Anda
- Mirip dengan posisi bayi, tapi lebih stabil

### Setelah 5 Back Blows

- Periksa mulut
- Jika benda belum keluar → lanjut ke Abdominal Thrust
                `,
            },
            {
                id: 'lesson-4-3',
                title: 'Abdominal Thrust untuk Balita',
                duration: '6 menit',
                content: `
## Abdominal Thrust pada Balita

Dilakukan setelah Back Blows tidak berhasil.

### Posisi

1. **Berdiri atau berlutut** di belakang balita
2. **Lingkarkan kedua lengan** di bawah ketiak balita
3. **Peluk dari belakang** di sekitar pinggang

### Posisi Tangan

1. **Kepalkan satu tangan**
2. Letakkan kepalan dengan **sisi ibu jari menempel** di perut
3. **Lokasi**: Di antara pusar dan tulang dada bawah
4. **Genggam kepalan** dengan tangan lainnya

### Teknik Hentakan

1. Tarik tangan **ke dalam dan ke atas** dengan cepat
2. Gerakan seperti huruf **"J"**
3. Berikan **5 hentakan** berturut-turut
4. Hentakan harus **tegas dan cepat**

### Siklus

🔄 **5 Back Blows → 5 Abdominal Thrusts → Cek mulut → Ulangi**

### Untuk Balita yang Sangat Kecil

- Anda mungkin perlu **berlutut** agar setinggi balita
- Sesuaikan kekuatan dengan ukuran tubuh balita
                `,
            },
            {
                id: 'lesson-4-4',
                title: 'Jika Balita Tidak Sadar',
                duration: '5 menit',
                content: `
## Penanganan Balita Tidak Sadar

### Langkah Darurat

1. **Baringkan** di permukaan datar
2. **Hubungi 119** segera
3. **Cek kesadaran** - tepuk dan panggil nama
4. **Mulai CPR** jika tidak responsif

### CPR Balita

**Kompresi Dada:**
- Lokasi: tengah dada
- Gunakan: **1-2 telapak tangan** (sesuai ukuran balita)
- Kedalaman: sekitar **5 cm** (2 inci)
- Kecepatan: 100-120 kompresi/menit
- Rasio: **30 kompresi : 2 napas bantuan**

**Sebelum Napas Bantuan:**
- **Buka jalan napas** (head tilt - chin lift)
- **Periksa mulut** - keluarkan benda jika terlihat
- Jangan korek jika tidak terlihat

### Terus Lakukan CPR

- Sampai balita sadar dan bernapas
- Sampai bantuan medis datang
- Sampai Anda kelelahan dan ada pengganti
                `,
            },
        ],
    },
    {
        id: 'module-5',
        order: 5,
        title: 'Penanganan Anak (3+ Tahun)',
        description: 'Heimlich Maneuver standar untuk anak-anak yang lebih besar',
        duration: '15 menit',
        icon: '👦',
        topics: [
            'Heimlich Maneuver standar',
            'Variasi untuk anak besar',
            'Self-Heimlich jika sendirian',
            'CPR anak',
        ],
        lessons: [
            {
                id: 'lesson-5-1',
                title: 'Heimlich Maneuver Standar',
                duration: '5 menit',
                content: `
## Heimlich Maneuver untuk Anak

Teknik standar untuk anak usia 3 tahun ke atas.

### Posisi

1. **Berdiri di belakang anak**
2. Anak dalam posisi **berdiri** atau **duduk**
3. Jika anak lebih pendek, **berlutut**

### Langkah-Langkah

**1. Back Blows Dulu**
- Condongkan anak ke depan
- 5 tepukan kuat di antara tulang belikat

**2. Abdominal Thrust (Heimlich)**
- Lingkarkan tangan di pinggang anak
- Kepalkan satu tangan
- Letakkan di **atas pusar, bawah tulang dada**
- Genggam dengan tangan lain
- Hentakkan **ke dalam dan ke atas**
- Berikan **5 hentakan**

**3. Ulangi**
- 5 Back Blows → 5 Abdominal Thrusts
- Sampai benda keluar

### Kunci Keberhasilan

✅ Hentakan ke arah **dalam DAN ke atas**
✅ Gerakan cepat dan **tegas**
✅ Posisi tangan **pas** (tidak di tulang dada, tidak terlalu bawah)
                `,
            },
            {
                id: 'lesson-5-2',
                title: 'Variasi untuk Anak Besar',
                duration: '4 menit',
                content: `
## Heimlich untuk Anak Besar atau Gemuk

### Jika Anak Lebih Besar dari Anda

1. Anak bisa **duduk di kursi**
2. Anda berdiri di belakang
3. Teknik sama seperti standar

### Jika Anak Sangat Gemuk

Tangan mungkin tidak bisa melingkari perut:
1. Minta anak **berbaring telentang**
2. Berlutut di samping anak
3. Letakkan **pangkal telapak tangan** di atas pusar
4. Letakkan tangan lain di atas
5. Tekan **ke dalam dan ke atas** dengan cepat

### Heimlich pada Diri Sendiri (untuk anak besar)

Jika tersedak dan sendirian:
1. **Kepalkan tangan**
2. Letakkan di atas pusar
3. Genggam dengan tangan lain
4. **Hentakkan ke dalam dan ke atas**

Atau gunakan **sandaran kursi**:
1. Condongkan tubuh ke sandaran kursi
2. Dorong perut ke sandaran dengan cepat
                `,
            },
            {
                id: 'lesson-5-3',
                title: 'CPR Anak',
                duration: '6 menit',
                content: `
## CPR Anak (3+ Tahun)

Dilakukan jika anak tidak sadar dan tidak bernapas.

### Langkah Darurat

1. **Pastikan keamanan** lingkungan
2. **Cek kesadaran** - tepuk bahu, panggil nama
3. **Hubungi 119** atau minta orang lain menghubungi
4. **Mulai CPR**

### Teknik CPR

**Kompresi Dada:**
- Lokasi: **tengah dada** (antara kedua puting)
- Gunakan: **1-2 telapak tangan** (lengan lurus)
- Kedalaman: sekitar **5 cm** (2 inci)
- Kecepatan: **100-120** kompresi/menit
- Biarkan dada **mengembang penuh** setiap kompresi

**Napas Bantuan:**
- Buka jalan napas (dongakkan kepala, angkat dagu)
- Tutup hidung anak
- Tiup ke mulut (**volume sedang**)
- Lihat dada naik

### Rasio

**30 kompresi : 2 napas bantuan**

### Sebelum Setiap Napas Bantuan

**PERIKSA MULUT** - keluarkan benda jika terlihat

### Terus Lakukan CPR

Sampai anak sadar, bantuan datang, atau ada pengganti
                `,
            },
        ],
    },
    {
        id: 'module-6',
        order: 6,
        title: 'Pencegahan Tersedak',
        description: 'Langkah-langkah praktis mencegah tersedak di rumah dan lingkungan sehari-hari',
        duration: '15 menit',
        icon: '🛡️',
        topics: [
            'Keamanan makanan',
            'Keamanan mainan',
            'Pengawasan anak',
            'Persiapan darurat',
        ],
        lessons: [
            {
                id: 'lesson-6-1',
                title: 'Keamanan Makanan',
                duration: '5 menit',
                content: `
## Mencegah Tersedak Saat Makan

### Makanan Berisiko Tinggi

| Makanan | Risiko | Solusi |
|---------|--------|--------|
| Anggur, tomat ceri | Bulat, licin | Potong jadi 4 bagian |
| Sosis, bakso | Bulat, kenyal | Potong memanjang, lalu iris |
| Permen keras | Keras, licin | Hindari untuk anak kecil |
| Popcorn | Mudah terselip | Hindari untuk anak < 4 tahun |
| Kacang utuh | Keras, kecil | Haluskan atau hindari |
| Wortel mentah | Keras | Potong tipis atau kukus dulu |
| Roti dengan olesan kental | Lengket | Oleskan tipis |

### Tips Saat Makan

1. **Potong makanan kecil-kecil** - seukuran ujung jari kelingking
2. **Awasi anak** setiap kali makan
3. **Jangan ajak bicara** saat mulut penuh
4. **Dudukkan anak** - jangan makan sambil berlari/bermain
5. **Ajarkan mengunyah** dengan baik sebelum menelan
                `,
            },
            {
                id: 'lesson-6-2',
                title: 'Keamanan Mainan dan Rumah',
                duration: '5 menit',
                content: `
## Keamanan Lingkungan

### Benda Berbahaya yang Harus Dijauhkan

🔴 **Sangat Berbahaya:**
- Baterai kancing (bisa menyebabkan luka bakar internal)
- Magnet kecil (berbahaya jika tertelan lebih dari satu)
- Koin dan uang logam
- Balon (terutama saat pecah)

🟡 **Berbahaya:**
- Kancing, manik-manik
- Tutup pulpen
- Jepit rambut, peniti
- Batu kecil, kerikil
- Potongan mainan yang lepas

### Keamanan Mainan

1. **Perhatikan label usia** pada mainan
2. **Periksa mainan secara berkala** - apakah ada bagian yang lepas
3. **Simpan mainan kakak** yang tidak sesuai untuk adik
4. **Gunakan aturan "toilet paper roll"**: 
   > Jika benda bisa masuk ke lubang tisu toilet, itu terlalu kecil untuk anak di bawah 3 tahun

### Keamanan Rumah

- Simpan benda kecil di tempat tertutup rapat
- Periksa kolong sofa dan tempat tidur
- Pastikan pintu lemari pengaman terpasang
                `,
            },
            {
                id: 'lesson-6-3',
                title: 'Pengawasan dan Kebiasaan',
                duration: '3 menit',
                content: `
## Pengawasan yang Efektif

### Saat Makan

✅ **Selalu awasi** anak saat makan
✅ Makan bersama di meja makan
✅ Jangan biarkan makan di depan TV (distraksi)
✅ Pastikan anak **fokus** pada makanan

### Saat Bermain

✅ Awasi jika bermain dengan benda kecil
✅ Ajarkan untuk **tidak berlari** sambil makan/mengunyah
✅ Jangan biarkan bermain dengan mainan yang tidak sesuai usia

### Kebiasaan Baik

1. **Ajarkan mengunyah** dengan mulut tertutup
2. **Jangan bicara** saat mulut penuh
3. **Minum setelah menelan**, bukan untuk mendorong makanan
4. **Makan perlahan** dan nikmati makanan

### Untuk Bayi yang Menyusu

- Posisikan kepala **lebih tinggi** dari tubuh
- Beri jeda untuk **bersendawa**
- Jangan tidurkan sambil minum botol
- Pilih dot dengan **lubang sesuai** usia
                `,
            },
            {
                id: 'lesson-6-4',
                title: 'Persiapan Darurat',
                duration: '2 menit',
                content: `
## Bersiap Menghadapi Darurat

### Nomor Telepon Penting

📞 **Simpan di tempat yang mudah dilihat:**
- **119** - Ambulans/Gawat Darurat Medis
- **112** - Panggilan Darurat Terintegrasi
- Nomor RS terdekat
- Nomor dokter anak

### Latihan Rutin

1. **Latih teknik** secara berkala (dengan boneka/phantom)
2. **Review langkah-langkah** setiap beberapa bulan
3. **Ajarkan anggota keluarga lain** (kakek/nenek, pengasuh)

### Persiapan di Rumah

✅ Poster langkah penanganan di dinding dapur
✅ Nomor darurat tertempel di kulkas
✅ Kotak P3K yang lengkap
✅ Semua pengasuh tahu prosedur darurat

### Setelah Kejadian Tersedak

> **SELALU** bawa anak ke dokter untuk pemeriksaan, meskipun benda sudah keluar dan anak terlihat baik-baik saja.

Dokter perlu memastikan:
- Tidak ada sisa benda
- Tidak ada cedera di saluran napas
- Anak bernapas dengan normal
                `,
            },
        ],
    },
];

// ============================================================================
// KONTEN UMUM - Digunakan di berbagai halaman
// ============================================================================

// Emergency Quick Steps (untuk /darurat)
export interface EmergencyStep {
    id: number;
    title: string;
    description: string;
    action: string;
    icon: string;
    critical?: boolean;
}

export const emergencySteps: EmergencyStep[] = [
    {
        id: 1,
        title: 'Kenali Tanda Tersedak',
        description: 'Memegang tenggorokan, tidak bisa bicara/menangis, wajah kebiruan',
        action: 'Tanyakan: "Apakah kamu tersedak?"',
        icon: '👀',
        critical: true,
    },
    {
        id: 2,
        title: 'Jika Masih Bisa Batuk',
        description: 'Biarkan batuk - jangan tepuk punggung, jangan beri minum',
        action: 'Dorong terus batuk dengan keras',
        icon: '💨',
    },
    {
        id: 3,
        title: 'Jika Tidak Bisa Batuk',
        description: 'Sumbatan total - segera bertindak!',
        action: 'Bayi: 5 Back Blows + 5 Chest Thrusts. Anak 1+: 5 Back Blows + 5 Abdominal Thrusts',
        icon: '🤲',
        critical: true,
    },
    {
        id: 4,
        title: 'Ulangi Sampai Keluar',
        description: 'Terus ulangi siklus',
        action: 'Periksa mulut setelah setiap siklus',
        icon: '🔄',
    },
    {
        id: 5,
        title: 'Jika Tidak Sadar',
        description: 'Baringkan dan mulai CPR',
        action: 'Hubungi 119 SEGERA!',
        icon: '🚨',
        critical: true,
    },
];

// Things NOT to do
export interface DontDoItem {
    id: string;
    title: string;
    explanation: string;
    icon: string;
}

export const dontDoList: DontDoItem[] = [
    {
        id: 'dont-1',
        title: 'Jangan Masukkan Jari ke Mulut',
        explanation: 'Berisiko mendorong benda lebih dalam. Keluarkan hanya jika terlihat jelas.',
        icon: '🚫',
    },
    {
        id: 'dont-2',
        title: 'Jangan Berikan Minum',
        explanation: 'Tidak membantu mengeluarkan benda, justru bisa menyebabkan aspirasi.',
        icon: '🚫',
    },
    {
        id: 'dont-3',
        title: 'Jangan Tepuk Punggung Saat Batuk Efektif',
        explanation: 'Bisa mengganggu proses pengeluaran benda secara alami.',
        icon: '🚫',
    },
    {
        id: 'dont-4',
        title: 'Jangan Angkat Tangan ke Atas',
        explanation: 'Mitos yang tidak memiliki dasar medis.',
        icon: '🚫',
    },
    {
        id: 'dont-5',
        title: 'Jangan Panik',
        explanation: 'Kepanikan menghambat tindakan yang tepat.',
        icon: '🚫',
    },
    {
        id: 'dont-6',
        title: 'Jangan Abdominal Thrust pada Bayi',
        explanation: 'Untuk bayi < 1 tahun, gunakan Back Blows + Chest Thrusts saja.',
        icon: '🚫',
    },
];

// Sources/References
export const sources = [
    {
        name: 'RS Pondok Indah',
        url: 'https://www.rspondokindah.co.id/id/news/pertolongan-pertama-saat-bayi-tersedak-',
        title: 'Pertolongan Pertama Saat Bayi Tersedak',
    },
    {
        name: 'Kementerian Kesehatan RI',
        url: 'https://keslan.kemkes.go.id/view_artikel/85/jangan-panik-ini-yang-harus-dilakukan-jika-anak-tersedak',
        title: 'Jangan Panik, Ini Yang Harus Dilakukan Jika Anak Tersedak',
    },
    {
        name: 'American Heart Association',
        url: 'https://www.heart.org',
        title: 'Pedoman AHA 2015 untuk CPR dan ECC',
    },
    {
        name: 'American National Red Cross',
        url: 'https://www.redcross.org',
        title: 'First Aid Guidelines 2015',
    },
    {
        name: 'IDAI',
        url: 'https://idai.or.id',
        title: 'Yang Harus Dilakukan Jika Anak Tersedak',
    },
];
