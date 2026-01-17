'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    BookOpen, GraduationCap, Award, ArrowRight, CheckCircle,
    AlertTriangle, TrendingUp, Zap, Target, Phone
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const features = [
    {
        id: 'materi',
        title: 'Materi Edukasi',
        description: 'Panduan lengkap penanganan tersedak berdasarkan usia anak',
        icon: BookOpen,
        href: '/materi',
        gradient: 'from-cyan-500 to-teal-600',
        stats: '3 Kategori',
        badge: 'Essentials',
    },
    {
        id: 'belajar',
        title: 'Modul Belajar',
        description: 'Pembelajaran terstruktur langkah demi langkah dengan tracking progress',
        icon: GraduationCap,
        href: '/belajar',
        gradient: 'from-purple-500 to-indigo-600',
        stats: '6 Modul',
        badge: 'Interactive',
    },
    {
        id: 'assessment',
        title: 'Assessment',
        description: 'Uji pemahaman Anda dengan pre-test dan post-test',
        icon: Award,
        href: '/assessment',
        gradient: 'from-amber-500 to-orange-600',
        stats: '15+ Soal',
        badge: 'Challenge',
    },
];

export default function DashboardPage() {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();
    const [completedModules, setCompletedModules] = useState<number[]>([]);
    const [preTestDone, setPreTestDone] = useState(false);
    const [postTestDone, setPostTestDone] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    // Mouse tracking state
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLElement>(null);

    // Fetch data from database
    const fetchDashboardData = useCallback(async () => {
        try {
            // Fetch progress
            const progressRes = await fetch('/api/progress', { credentials: 'include' });
            if (progressRes.ok) {
                const progressData = await progressRes.json();
                setCompletedModules(progressData.completedModules || []);
            }

            // Fetch assessment results
            const [preRes, postRes] = await Promise.all([
                fetch('/api/assessment?type=pre', { credentials: 'include' }),
                fetch('/api/assessment?type=post', { credentials: 'include' })
            ]);

            if (preRes.ok) {
                const preData = await preRes.json();
                setPreTestDone(!!preData.result);
            }
            if (postRes.ok) {
                const postData = await postRes.json();
                setPostTestDone(!!postData.result);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setIsLoadingData(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchDashboardData();
        } else {
            setIsLoadingData(false);
        }
    }, [isAuthenticated, fetchDashboardData]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    // Mouse move handler for interactive background
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });
            }
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [isAuthenticated]);

    if (isLoading || isLoadingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const progress = Math.round((completedModules.length / 6) * 100);

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Hero Welcome - Dark Premium with Mouse Following Effect */}
            <section
                ref={heroRef}
                className="relative overflow-hidden text-white"
                style={{
                    background: `
                        radial-gradient(
                            600px circle at ${mousePosition.x}% ${mousePosition.y}%,
                            rgba(6, 182, 212, 0.15),
                            transparent 40%
                        ),
                        radial-gradient(
                            400px circle at ${mousePosition.x + 10}% ${mousePosition.y + 10}%,
                            rgba(168, 85, 247, 0.1),
                            transparent 40%
                        ),
                        linear-gradient(135deg, #171717 0%, #262626 50%, #171717 100%)
                    `
                }}
            >
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-pulse"
                        style={{
                            left: `${mousePosition.x * 0.8}%`,
                            top: `${mousePosition.y * 0.8}%`,
                            transition: 'all 0.3s ease-out'
                        }}
                    />
                    <div
                        className="absolute w-3 h-3 bg-purple-400/20 rounded-full blur-sm animate-pulse"
                        style={{
                            left: `${mousePosition.x * 1.1}%`,
                            top: `${mousePosition.y * 1.1}%`,
                            transition: 'all 0.5s ease-out',
                            animationDelay: '0.2s'
                        }}
                    />
                </div>

                <div className="section-container relative z-10" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-6">
                            <Zap className="w-4 h-4" />
                            Active Learner
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                            Selamat Datang, {user?.name || 'Learner'}! 👋
                        </h1>

                        {/* Description */}
                        <p className="text-neutral-400 max-w-lg mb-8">
                            Lanjutkan perjalanan belajar Anda untuk menjadi penyelamat yang terlatih dalam penanganan tersedak pada anak.
                        </p>

                        {/* Stats Cards - Below Description */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl hover:bg-white/15 transition-colors">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                                <div>
                                    <div className="text-xs text-neutral-400">Modul Selesai</div>
                                    <div className="font-bold text-lg">{completedModules.length}/6</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl hover:bg-white/15 transition-colors">
                                <Target className="w-5 h-5 text-cyan-400" />
                                <div>
                                    <div className="text-xs text-neutral-400">Pre-Test</div>
                                    <div className="font-bold">{preTestDone ? 'Selesai' : 'Belum'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-4 rounded-2xl hover:bg-white/15 transition-colors">
                                <Award className="w-5 h-5 text-amber-400" />
                                <div>
                                    <div className="text-xs text-neutral-400">Post-Test</div>
                                    <div className="font-bold">{postTestDone ? 'Selesai' : 'Belum'}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Progress Bar */}
            <section className="bg-white border-b border-neutral-100">
                <div className="section-container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold text-neutral-900">Progress Belajar</span>
                        </div>
                        <span className="text-xl font-bold text-primary-600">{progress}%</span>
                    </div>
                    <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </section>

            {/* Main Features */}
            <section className="py-12 lg:py-16">
                <div className="section-container">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Mulai Belajar</h2>
                        <p className="text-neutral-500">Pilih modul yang ingin Anda pelajari</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={feature.href} className="block group h-full">
                                    <div className="card p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${feature.gradient} text-white`}>
                                                {feature.badge}
                                            </span>
                                            <span className="text-sm text-neutral-400">{feature.stats}</span>
                                        </div>

                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                                            <feature.icon className="w-7 h-7 text-white" />
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm flex-1 mb-5">{feature.description}</p>

                                        {/* CTA */}
                                        <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm">
                                            <span>Mulai Sekarang</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Quick Access */}
            <section className="pb-16">
                <div className="section-container">
                    <div className="bg-gradient-to-r from-[#e03131] to-[#c92a2a] rounded-3xl p-8 lg:p-10 text-center text-white max-w-3xl mx-auto shadow-xl">
                        <AlertTriangle className="w-10 h-10 mx-auto mb-4 opacity-90" />
                        <h2 className="text-xl font-bold mb-2">Mode Darurat Tersedia</h2>
                        <p className="text-white/80 mb-6 max-w-md mx-auto text-sm">
                            Akses panduan darurat kapan saja tanpa perlu login
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                            <Link href="/darurat" className="inline-flex items-center justify-center gap-2 bg-white text-[#e03131] font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
                                <AlertTriangle className="w-5 h-5" />
                                Mode Darurat
                            </Link>
                            <a href="tel:119" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                                <Phone className="w-5 h-5" />
                                Panggil 119
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
