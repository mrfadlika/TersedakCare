// Assessment Questions Data
// Questions for Pre-test and Post-test

export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
    explanation: string;
    category: 'pengenalan' | 'tanda' | 'penanganan-bayi' | 'penanganan-anak' | 'pencegahan';
}

export const questionBank: Question[] = [
    // Pengenalan
    {
        id: 'q1',
        question: 'Apa yang dimaksud dengan tersedak?',
        options: [
            'Batuk-batuk biasa',
            'Tersumbatnya saluran napas oleh benda asing',
            'Sakit tenggorokan',
            'Kesulitan menelan makanan',
        ],
        correctAnswer: 1,
        explanation: 'Tersedak adalah kondisi di mana saluran napas tersumbat oleh benda asing, sehingga menghambat aliran udara ke paru-paru.',
        category: 'pengenalan',
    },
    {
        id: 'q2',
        question: 'Anak usia berapa yang paling berisiko tersedak?',
        options: [
            'Remaja',
            'Anak usia sekolah (7-12 tahun)',
            'Bayi dan balita (0-5 tahun)',
            'Semua usia sama risikonya',
        ],
        correctAnswer: 2,
        explanation: 'Bayi dan balita paling berisiko karena saluran napas yang kecil, refleks menelan belum sempurna, dan kebiasaan memasukkan benda ke mulut.',
        category: 'pengenalan',
    },

    // Tanda-tanda
    {
        id: 'q3',
        question: 'Apa tanda universal tersedak yang paling mudah dikenali?',
        options: [
            'Batuk keras',
            'Memegang tenggorokan dengan kedua tangan',
            'Wajah merah',
            'Menangis keras',
        ],
        correctAnswer: 1,
        explanation: 'Memegang tenggorokan dengan kedua tangan adalah tanda universal tersedak yang menunjukkan seseorang membutuhkan bantuan segera.',
        category: 'tanda',
    },
    {
        id: 'q4',
        question: 'Jika anak masih bisa batuk dengan kuat saat tersedak, apa yang harus dilakukan?',
        options: [
            'Segera lakukan Heimlich maneuver',
            'Tepuk punggung dengan keras',
            'Biarkan anak batuk dan awasi terus',
            'Berikan minum air',
        ],
        correctAnswer: 2,
        explanation: 'Jika anak masih bisa batuk dengan kuat, biarkan anak batuk karena batuk adalah mekanisme alami tubuh untuk mengeluarkan benda asing. Intervensi justru bisa mengganggu proses ini.',
        category: 'tanda',
    },
    {
        id: 'q5',
        question: 'Tanda tersedak berat pada bayi adalah...',
        options: [
            'Menangis keras',
            'Batuk kuat',
            'Tidak bisa menangis atau bersuara, wajah kebiruan',
            'Rewel dan tidak mau makan',
        ],
        correctAnswer: 2,
        explanation: 'Tersedak berat ditandai dengan ketidakmampuan menangis/bersuara dan perubahan warna wajah (kebiruan) karena kekurangan oksigen.',
        category: 'tanda',
    },

    // Penanganan Bayi
    {
        id: 'q6',
        question: 'Teknik apa yang TIDAK boleh dilakukan pada bayi di bawah 1 tahun?',
        options: [
            'Back blows (tepukan punggung)',
            'Chest thrusts (tekanan dada)',
            'Abdominal thrusts (tekanan perut/Heimlich)',
            'CPR jika tidak sadar',
        ],
        correctAnswer: 2,
        explanation: 'Abdominal thrusts (Heimlich maneuver) tidak boleh dilakukan pada bayi di bawah 1 tahun karena dapat melukai organ dalam bayi. Gunakan back blows dan chest thrusts.',
        category: 'penanganan-bayi',
    },
    {
        id: 'q7',
        question: 'Berapa jumlah tepukan punggung (back blows) yang diberikan pada bayi tersedak?',
        options: [
            '3 kali',
            '5 kali',
            '10 kali',
            'Sampai benda keluar',
        ],
        correctAnswer: 1,
        explanation: 'Berikan 5 kali tepukan punggung, kemudian 5 kali tekanan dada. Ulangi siklus ini sampai benda keluar atau bayi tidak sadar.',
        category: 'penanganan-bayi',
    },
    {
        id: 'q8',
        question: 'Bagaimana posisi bayi yang benar saat melakukan back blows?',
        options: [
            'Bayi tegak',
            'Bayi telungkup dengan kepala lebih rendah dari badan',
            'Bayi telentang',
            'Bayi dalam posisi duduk',
        ],
        correctAnswer: 1,
        explanation: 'Bayi harus dalam posisi telungkup dengan kepala lebih rendah dari badan agar gravitasi membantu mengeluarkan benda asing.',
        category: 'penanganan-bayi',
    },

    // Penanganan Anak
    {
        id: 'q9',
        question: 'Di mana posisi kepalan tangan saat melakukan Heimlich maneuver pada anak?',
        options: [
            'Di atas tulang dada',
            'Di bawah pusar',
            'Di antara pusar dan tulang dada',
            'Di samping perut',
        ],
        correctAnswer: 2,
        explanation: 'Kepalan tangan diletakkan di antara pusar dan tulang dada, kemudian tarik ke arah dalam dan atas.',
        category: 'penanganan-anak',
    },
    {
        id: 'q10',
        question: 'Arah tekanan yang benar saat melakukan Heimlich maneuver adalah...',
        options: [
            'Ke depan dan ke bawah',
            'Ke belakang',
            'Ke dalam dan ke atas',
            'Ke samping',
        ],
        correctAnswer: 2,
        explanation: 'Tekanan harus diarahkan ke dalam dan ke atas (seperti huruf J) untuk memaksa udara keluar dari paru-paru dan mendorong benda asing keluar.',
        category: 'penanganan-anak',
    },
    {
        id: 'q11',
        question: 'Apa yang harus dilakukan jika anak menjadi tidak sadar saat tersedak?',
        options: [
            'Terus lakukan Heimlich maneuver',
            'Baringkan anak dan mulai CPR, hubungi 119',
            'Tunggu sampai anak sadar',
            'Berikan napas buatan saja',
        ],
        correctAnswer: 1,
        explanation: 'Jika anak tidak sadar, baringkan di lantai, hubungi 119, dan mulai CPR. Periksa mulut sebelum memberikan napas bantuan.',
        category: 'penanganan-anak',
    },

    // Pencegahan
    {
        id: 'q12',
        question: 'Makanan berikut yang berisiko tinggi menyebabkan tersedak pada anak adalah...',
        options: [
            'Nasi lembek',
            'Anggur utuh, kacang, permen keras',
            'Bubur',
            'Sayuran yang sudah dihaluskan',
        ],
        correctAnswer: 1,
        explanation: 'Makanan bulat kecil (anggur, cherry tomato), keras (kacang, permen), dan lengket berisiko tinggi menyebabkan tersedak. Potong kecil atau hindari untuk anak kecil.',
        category: 'pencegahan',
    },
    {
        id: 'q13',
        question: 'Tindakan pencegahan tersedak yang BENAR adalah...',
        options: [
            'Biarkan anak makan sambil bermain agar tidak bosan',
            'Potong makanan menjadi potongan kecil dan awasi anak saat makan',
            'Berikan makanan keras agar anak belajar mengunyah',
            'Makanan tidak perlu diawasi jika anak sudah besar',
        ],
        correctAnswer: 1,
        explanation: 'Potong makanan menjadi potongan kecil sesuai usia anak dan selalu awasi anak saat makan. Jangan biarkan anak makan sambil berlari atau bermain.',
        category: 'pencegahan',
    },
    {
        id: 'q14',
        question: 'Apa yang TIDAK boleh dilakukan saat seseorang tersedak?',
        options: [
            'Memberikan tepukan punggung',
            'Memasukkan jari ke mulut secara membabi buta',
            'Melakukan Heimlich maneuver',
            'Menghubungi 119',
        ],
        correctAnswer: 1,
        explanation: 'Memasukkan jari ke mulut secara membabi buta dapat mendorong benda lebih dalam. Hanya keluarkan benda jika terlihat jelas dan dapat dijangkau.',
        category: 'pencegahan',
    },
    {
        id: 'q15',
        question: 'Nomor darurat yang harus dihubungi saat keadaan darurat medis di Indonesia adalah...',
        options: [
            '911',
            '110',
            '119',
            '112',
        ],
        correctAnswer: 2,
        explanation: '119 adalah nomor layanan gawat darurat medis di Indonesia. Nomor 112 adalah nomor darurat terintegrasi yang juga bisa digunakan.',
        category: 'pencegahan',
    },
];

// Function to get random questions for assessment
export function getAssessmentQuestions(count: number = 10): Question[] {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, questionBank.length));
}

// Function to calculate score
export interface AssessmentResult {
    score: number;
    totalQuestions: number;
    percentage: number;
    correctAnswers: number;
    incorrectAnswers: number;
    categoryBreakdown: {
        category: string;
        correct: number;
        total: number;
    }[];
}

export function calculateScore(
    questions: Question[],
    answers: number[]
): AssessmentResult {
    let correct = 0;
    const categoryStats: Record<string, { correct: number; total: number }> = {};

    questions.forEach((q, index) => {
        // Initialize category
        if (!categoryStats[q.category]) {
            categoryStats[q.category] = { correct: 0, total: 0 };
        }
        categoryStats[q.category].total++;

        // Check answer
        if (answers[index] === q.correctAnswer) {
            correct++;
            categoryStats[q.category].correct++;
        }
    });

    const categoryBreakdown = Object.entries(categoryStats).map(([category, stats]) => ({
        category,
        ...stats,
    }));

    return {
        score: correct,
        totalQuestions: questions.length,
        percentage: Math.round((correct / questions.length) * 100),
        correctAnswers: correct,
        incorrectAnswers: questions.length - correct,
        categoryBreakdown,
    };
}
