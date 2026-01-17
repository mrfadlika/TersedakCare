'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { GraduationCap, Lock, CheckCircle, Play, ArrowRight, Clock, Award, ChevronDown, LogIn, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { learningModules } from '@/data/content';

// Map learning modules to display format
const modules = learningModules.map(m => ({
    id: m.order,
    moduleId: m.id,
    title: m.title,
    description: m.description,
    duration: m.duration,
    lessons: m.lessons.length,
    icon: m.icon,
    topics: m.topics,
}));

export default function BelajarPage() {
    const [completedModules, setCompletedModules] = useState<number[]>([]);
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Fetch progress from database
    const fetchProgress = useCallback(async () => {
        try {
            const response = await fetch('/api/progress', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setCompletedModules(data.completedModules || []);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        } finally {
            setIsLoadingProgress(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProgress();
        } else {
            setIsLoadingProgress(false);
        }
    }, [isAuthenticated, fetchProgress]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/belajar');
        }
    }, [isAuthenticated, isLoading, router]);

    const progress = Math.round((completedModules.length / modules.length) * 100);

    const toggleComplete = async (id: number) => {
        if (completedModules.includes(id)) {
            setCompletedModules(completedModules.filter(m => m !== id));
            // Note: We don't have a delete endpoint, but user can re-complete
        } else {
            setCompletedModules([...completedModules, id]);
            // Save to database
            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ type: 'module', moduleOrder: id })
                });
            } catch (error) {
                console.error('Error saving module progress:', error);
            }
        }
    };

    const isLocked = (index: number) => index > 0 && !completedModules.includes(modules[index - 1].id);

    if (isLoading || isLoadingProgress) {
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
                    <p className="text-neutral-600 mb-6">Silakan login untuk mengakses modul belajar</p>
                    <Link href="/login?redirect=/belajar" className="btn btn-primary">
                        <LogIn className="w-5 h-5" /> Masuk
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-violet-50 via-white to-purple-50">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
                        <div className="badge badge-primary mb-4"><GraduationCap className="w-4 h-4" />Modul Belajar</div>
                        <h1 className="heading-2 mb-4">Belajar <span className="text-gradient">Langkah demi Langkah</span></h1>
                        <p className="text-neutral-600">Modul pembelajaran terstruktur untuk pemahaman mendalam</p>
                    </motion.div>
                </div>
            </section>

            {/* Progress */}
            <section className="py-6 bg-white border-b border-neutral-100">
                <div className="section-container max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-3">
                        <div><span className="font-semibold text-neutral-900">Progress</span><span className="text-neutral-500 ml-2">{completedModules.length}/{modules.length}</span></div>
                        <span className="text-2xl font-bold text-primary-600">{progress}%</span>
                    </div>
                    <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div>
                </div>
            </section>

            {/* Modules */}
            <section className="section-gap">
                <div className="section-container max-w-3xl mx-auto space-y-4">
                    {modules.map((module, index) => {
                        const isCompleted = completedModules.includes(module.id);
                        const locked = isLocked(index);
                        const isExpanded = expandedModule === module.id;

                        return (
                            <motion.div key={module.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                                className={`card overflow-hidden ${locked ? 'opacity-60' : ''} ${isCompleted ? 'border-green-200 bg-green-50/30' : ''}`}
                            >
                                <div className={`p-5 cursor-pointer ${locked ? 'cursor-not-allowed' : ''}`} onClick={() => !locked && setExpandedModule(isExpanded ? null : module.id)}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${isCompleted ? 'bg-green-500 text-white' : locked ? 'bg-neutral-200 text-neutral-400' : 'bg-primary-100 text-primary-700'}`}>
                                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : locked ? <Lock className="w-5 h-5" /> : module.id}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-neutral-900 truncate">{module.title}</h3>
                                            <p className="text-sm text-neutral-500 truncate">{module.description}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0 flex items-center gap-3">
                                            <span className="text-sm text-neutral-400 flex items-center gap-1"><Clock className="w-4 h-4" />{module.duration}</span>
                                            {!locked && <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && !locked && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-5 pb-5 border-t border-neutral-100">
                                        <div className="pt-4">
                                            {/* Topics */}
                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-neutral-500 mb-2">Topik yang dipelajari:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {module.topics.map((topic, idx) => (
                                                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 text-neutral-600 rounded-full text-xs">
                                                            <BookOpen className="w-3 h-3" />{topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Actions */}
                                            <div className="flex flex-wrap gap-3">
                                                <Link href={`/belajar/${module.moduleId}`} className="btn btn-primary">
                                                    <Play className="w-4 h-4" />{isCompleted ? 'Ulangi Modul' : 'Mulai Belajar'}
                                                </Link>
                                                <button onClick={(e) => { e.stopPropagation(); toggleComplete(module.id); }} className={`btn ${isCompleted ? 'btn-outline' : 'btn-secondary'}`}>
                                                    <CheckCircle className="w-4 h-4" />{isCompleted ? 'Batalkan' : 'Tandai Selesai'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="pb-16">
                <div className="section-container max-w-3xl mx-auto">
                    <div className="card-dark p-8 lg:p-10 text-center">
                        <Award className="w-10 h-10 mx-auto mb-4 text-purple-400" />
                        <h2 className="text-xl font-bold mb-3">Siap Menguji Pengetahuan?</h2>
                        <p className="text-neutral-400 mb-6 max-w-md mx-auto">Ambil assessment untuk mengukur pemahaman</p>
                        <Link href="/assessment" className="btn btn-lg" style={{ background: 'white', color: 'black' }}>
                            Mulai Assessment <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
