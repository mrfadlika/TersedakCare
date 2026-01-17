'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, CheckCircle, Bookmark, BookMarked, AlertTriangle, Lock, LogIn, Sparkles } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/context/AuthContext';

const ageCategories = [
    {
        id: 'bayi', name: 'Bayi', age: '0-12 Bulan', icon: '👶', technique: 'Back Blows & Chest Thrusts',
        description: 'Teknik khusus untuk bayi dengan posisi telungkup pada lengan.',
        topics: ['Tanda-tanda tersedak', 'Posisi yang benar', 'Back Blows', 'Chest Thrusts', 'Kapan panggil bantuan']
    },
    {
        id: 'balita', name: 'Balita', age: '1-3 Tahun', icon: '🧒', technique: 'Back Blows & Abdominal Thrusts',
        description: 'Kombinasi tepukan punggung dan tekanan perut untuk balita.',
        topics: ['Perbedaan dengan bayi', 'Tepukan punggung', 'Tekanan perut aman', 'Posisi yang benar']
    },
    {
        id: 'anak', name: 'Anak', age: '3+ Tahun', icon: '👦', technique: 'Heimlich Maneuver',
        description: 'Manuver Heimlich standar untuk anak-anak yang lebih besar.',
        topics: ['Posisi di belakang anak', 'Posisi tangan', 'Gerakan tekanan', 'Jika tidak sadar']
    },
];

export default function MateriPage() {
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const [filter, setFilter] = useState<string>('all');
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/materi');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="card text-center max-w-md mx-auto p-10">
                    <Lock className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                    <h2 className="text-xl font-bold text-neutral-900 mb-2">Login Diperlukan</h2>
                    <p className="text-neutral-600 mb-6">Silakan login untuk mengakses materi edukasi</p>
                    <Link href="/login?redirect=/materi" className="btn btn-primary">
                        <LogIn className="w-5 h-5" /> Masuk
                    </Link>
                </div>
            </div>
        );
    }

    const filteredCategories = filter === 'all' ? ageCategories : ageCategories.filter(c => c.id === filter);

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
                        <div className="badge badge-primary mb-4"><BookOpen className="w-4 h-4" />Materi Edukasi</div>
                        <h1 className="heading-2 mb-4">Pelajari Sesuai <span className="text-gradient">Usia Anak</span></h1>
                        <p className="text-neutral-600">Setiap kelompok usia memiliki teknik penanganan yang berbeda</p>
                    </motion.div>
                </div>
            </section>

            {/* Filter */}
            <section className="py-6 bg-white border-b border-neutral-100">
                <div className="section-container">
                    <div className="flex flex-wrap justify-center gap-3">
                        <button onClick={() => setFilter('all')} className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}>
                            Semua
                        </button>
                        {ageCategories.map((cat) => (
                            <button key={cat.id} onClick={() => setFilter(cat.id)} className={`btn btn-sm ${filter === cat.id ? 'btn-primary' : 'btn-outline'}`}>
                                <span>{cat.icon}</span> {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-gap">
                <div className="section-container">
                    <div className="grid gap-6 max-w-4xl mx-auto">
                        {filteredCategories.map((category, index) => (
                            <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                                className="card p-6 sm:p-8"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-4xl flex-shrink-0">
                                        {category.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-xl font-bold text-neutral-900">{category.name}</h2>
                                                    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm font-medium">{category.age}</span>
                                                </div>
                                                <span className="badge badge-primary text-xs">{category.technique}</span>
                                            </div>
                                            <button onClick={() => toggleBookmark({
                                                id: category.id,
                                                title: category.name,
                                                category: 'materi',
                                                path: `/materi/${category.id}`
                                            })} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors">
                                                {isBookmarked(category.id) ? <BookMarked className="w-5 h-5 text-primary-600" /> : <Bookmark className="w-5 h-5 text-neutral-400" />}
                                            </button>
                                        </div>
                                        <p className="text-neutral-600 mb-4">{category.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {category.topics.map((topic, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 text-neutral-700 rounded-full text-sm">
                                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />{topic}
                                                </span>
                                            ))}
                                        </div>
                                        <Link href={`/materi/${category.id}`} className="btn btn-primary">
                                            Baca Materi <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="pb-16">
                <div className="section-container max-w-4xl mx-auto">
                    <div className="card-emergency p-8 lg:p-10 text-center">
                        <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-white/90" />
                        <h2 className="text-xl lg:text-2xl font-bold mb-3">Butuh Panduan Cepat?</h2>
                        <p className="text-white/80 mb-6 max-w-md mx-auto">Mode Darurat untuk situasi genting</p>
                        <Link href="/darurat" className="btn btn-lg" style={{ background: 'white', color: '#e03131' }}>
                            <AlertTriangle className="w-5 h-5" /> Mode Darurat
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
