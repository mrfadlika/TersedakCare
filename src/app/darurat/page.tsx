'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, ChevronLeft, ChevronRight, XCircle, AlertCircle, RotateCcw, Home, CheckCircle } from 'lucide-react';

type AgeGroup = 'bayi' | 'balita' | 'anak';

const ageGroups: Record<AgeGroup, { name: string; age: string; icon: string; color: string; steps: { title: string; desc: string; detail: string; critical?: boolean }[] }> = {
    bayi: {
        name: 'Bayi', age: '0-12 Bulan', icon: '👶', color: 'amber',
        steps: [
            { title: 'Posisikan Bayi', desc: 'Letakkan bayi TELUNGKUP di lengan bawah Anda', detail: 'Kepala lebih RENDAH dari badan. Topang kepala dan rahang dengan tangan.', critical: true },
            { title: 'Tepukan Punggung', desc: 'Berikan 5 tepukan kuat di antara tulang belikat', detail: 'Gunakan pangkal telapak tangan. Tepukan harus cukup kuat.' },
            { title: 'Balikkan Bayi', desc: 'Balikkan bayi menjadi TELENTANG', detail: 'Topang kepala dan leher. Posisi kepala tetap lebih rendah.' },
            { title: 'Tekanan Dada', desc: 'Berikan 5 tekanan dada dengan 2 jari', detail: 'Tekan di tengah tulang dada, sekitar 4 cm.', critical: true },
            { title: 'Ulangi', desc: 'Ulangi langkah 1-4 sampai benda keluar', detail: 'Jika bayi tidak sadar, hubungi 119 dan mulai CPR.' },
        ],
    },
    balita: {
        name: 'Balita', age: '1-3 Tahun', icon: '🧒', color: 'cyan',
        steps: [
            { title: 'Posisikan Anak', desc: 'Posisikan anak telungkup di pangkuan Anda', detail: 'Kepala lebih rendah dari dada. Topang dada anak.', critical: true },
            { title: 'Tepukan Punggung', desc: 'Berikan 5 tepukan kuat di punggung', detail: 'Tepuk di antara tulang belikat dengan pangkal telapak tangan.' },
            { title: 'Balikkan Anak', desc: 'Balikkan anak menjadi telentang', detail: 'Topang kepala dan leher dengan baik saat membalikkan.' },
            { title: 'Tekanan Perut', desc: 'Berikan 5 tekanan perut', detail: 'Tekan di atas pusar dan di bawah tulang dada dengan 2 jari.', critical: true },
            { title: 'Ulangi', desc: 'Ulangi sampai benda keluar atau bantuan datang', detail: 'Hubungi 119 jika anak tidak sadar.' },
        ],
    },
    anak: {
        name: 'Anak', age: '3+ Tahun', icon: '👦', color: 'green',
        steps: [
            { title: 'Berdiri di Belakang', desc: 'Berdiri di belakang anak, berlutut jika perlu', detail: 'Pastikan posisi Anda stabil dan anak dalam posisi berdiri.', critical: true },
            { title: 'Posisikan Tangan', desc: 'Kepalkan tangan dan letakkan di atas pusar', detail: 'Posisikan kepalan tangan di antara pusar dan tulang dada.' },
            { title: 'Genggam Kepalan', desc: 'Genggam kepalan tangan dengan tangan lainnya', detail: 'Kedua tangan melingkari perut anak dengan kuat.' },
            { title: 'Tekan ke Dalam & Atas', desc: 'Berikan tekanan cepat ke dalam dan ke atas', detail: 'Lakukan gerakan seperti huruf "J". Tekanan kuat dan cepat.', critical: true },
            { title: 'Ulangi 5 Kali', desc: 'Ulangi tekanan hingga benda keluar', detail: 'Lakukan 5 kali tekanan, lalu periksa mulut.' },
        ],
    },
};

const warnings = [
    'JANGAN masukkan jari ke mulut secara membabi buta',
    'JANGAN tepuk punggung jika anak masih bisa batuk keras',
    'JANGAN berikan minum saat tersedak',
    'JANGAN panik - tetap tenang dan fokus',
];

export default function EmergencyPage() {
    const [selectedAge, setSelectedAge] = useState<AgeGroup | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    const group = selectedAge ? ageGroups[selectedAge] : null;
    const steps = group?.steps || [];
    const step = steps[currentStep];

    return (
        // <main className="min-h-screen bg-neutral-50">

        <div className="section-container py-16" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
            <AnimatePresence mode="wait">
                {!selectedAge ? (
                    <motion.div key="select" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <h2 className="heading-2 mb-3 sm:mb-4">Pilih Kategori Usia</h2>
                            <p className="text-neutral-600 text-base sm:text-lg">Teknik penanganan berbeda untuk setiap kelompok usia</p>
                        </div>

                        {/* Age Cards */}
                        <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
                            {(Object.entries(ageGroups) as [AgeGroup, typeof ageGroups.bayi][]).map(([key, g], idx) => (
                                <motion.button
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedAge(key)}
                                    className="card p-4 sm:p-8 text-center hover:shadow-2xl"
                                >
                                    <span className="text-4xl sm:text-6xl block mb-3 sm:mb-5">{g.icon}</span>
                                    <h3 className="font-bold text-xl sm:text-2xl text-neutral-900 mb-1">{g.name}</h3>
                                    <p className="text-neutral-500 text-base sm:text-lg">{g.age}</p>
                                </motion.button>
                            ))}
                        </div>

                        {/* Warnings Card */}
                        <div className="card p-4 sm:p-8 border-red-200 bg-red-50/50">
                            <h3 className="font-bold text-lg sm:text-xl text-red-700 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Yang TIDAK Boleh Dilakukan
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                                {warnings.map((w, i) => (
                                    <div key={i} className="flex items-start gap-2 sm:gap-4">
                                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-neutral-700 text-sm sm:text-base">{w}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="steps" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
                        {/* Back Button */}
                        <button onClick={() => { setSelectedAge(null); setCurrentStep(0); }} className="btn btn-outline mb-8">
                            <ChevronLeft className="w-5 h-5" /> Ganti Usia
                        </button>

                        {/* Progress */}
                        <div className="progress-bar mb-10" style={{ height: '0.625rem' }}>
                            <motion.div
                                className="progress-bar-fill"
                                style={{ background: 'linear-gradient(90deg, #e03131, #ff6b6b)' }}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>

                        {/* Step Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                className={`p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-xl ${step?.critical ? 'bg-gradient-to-br from-[#e03131] to-[#c92a2a] text-white' : 'bg-white border border-neutral-100'}`}
                            >
                                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                                    <span className={`text-xs sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full ${step?.critical ? 'bg-white/20' : 'bg-red-100 text-red-700'}`}>
                                        Langkah {currentStep + 1}
                                    </span>
                                    {step?.critical && (
                                        <span className="text-xs sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-yellow-400 text-yellow-900">
                                            ⚠️ PENTING
                                        </span>
                                    )}
                                </div>
                                <h2 className={`text-xl sm:text-3xl font-bold mb-3 sm:mb-4 ${step?.critical ? 'text-white' : 'text-neutral-900'}`}>
                                    {step?.title}
                                </h2>
                                <p className={`text-base sm:text-xl mb-3 sm:mb-5 ${step?.critical ? 'text-white' : 'text-neutral-800'}`}>
                                    {step?.desc}
                                </p>
                                <p className={`text-sm sm:text-lg ${step?.critical ? 'text-white/80' : 'text-neutral-600'}`}>
                                    {step?.detail}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-10">
                            <button
                                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                                disabled={currentStep === 0}
                                className="btn btn-outline disabled:opacity-40 order-2 min-[400px]:order-1"
                            >
                                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Sebelumnya
                            </button>
                            <button
                                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                                disabled={currentStep === steps.length - 1}
                                className="btn btn-emergency disabled:opacity-40 order-1 min-[400px]:order-2"
                            >
                                Selanjutnya <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        {/* Step Dots */}
                        <div className="flex justify-center gap-3 mt-10">
                            {steps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentStep(i)}
                                    className={`h-3 rounded-full transition-all ${i === currentStep ? 'w-10 bg-[#e03131]' : 'w-3 bg-neutral-300 hover:bg-neutral-400'}`}
                                />
                            ))}
                        </div>

                        {/* Completion */}
                        {currentStep === steps.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 sm:mt-12 p-5 sm:p-8 bg-green-50 border border-green-200 rounded-2xl sm:rounded-3xl text-center"
                            >
                                <CheckCircle className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 text-green-500" />
                                <h3 className="font-bold text-lg sm:text-xl text-green-700 mb-2">Langkah Selesai!</h3>
                                <p className="text-green-600 mb-4 sm:mb-6 text-sm sm:text-base">Ulangi jika benda belum keluar. Hubungi 119 jika tidak sadar.</p>
                                <div className="flex flex-col min-[400px]:flex-row justify-center gap-3 sm:gap-4">
                                    <button onClick={() => { setSelectedAge(null); setCurrentStep(0); }} className="btn btn-outline">
                                        <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" /> Ulangi
                                    </button>
                                    <Link href="/" className="btn btn-secondary">
                                        <Home className="w-4 h-4 sm:w-5 sm:h-5" /> Beranda
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        // </main>
    );
}
