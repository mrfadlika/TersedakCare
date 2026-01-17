'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck, Clock, CheckCircle, ArrowRight, ArrowLeft, RotateCcw, Home, BookOpen, Award, TrendingUp, AlertCircle, Lock, LogIn } from 'lucide-react';
import { getAssessmentQuestions, Question } from '@/data/questions';
import { useAuth } from '@/context/AuthContext';

type TestType = 'pretest' | 'posttest';
type TestState = 'idle' | 'inProgress' | 'completed';

interface TestResult { score: number; total: number; percentage: number; completedAt: string; }

export default function AssessmentPage() {
    const [testType, setTestType] = useState<TestType | null>(null);
    const [testState, setTestState] = useState<TestState>('idle');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    const [preTestResult, setPreTestResult] = useState<TestResult | null>(null);
    const [postTestResult, setPostTestResult] = useState<TestResult | null>(null);
    const [isLoadingResults, setIsLoadingResults] = useState(true);
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Fetch assessment results from database
    const fetchResults = useCallback(async () => {
        try {
            const [preRes, postRes] = await Promise.all([
                fetch('/api/assessment?type=pre', { credentials: 'include' }),
                fetch('/api/assessment?type=post', { credentials: 'include' })
            ]);

            if (preRes.ok) {
                const preData = await preRes.json();
                if (preData.result) {
                    setPreTestResult({
                        score: preData.result.score,
                        total: preData.result.total,
                        percentage: Math.round((preData.result.score / preData.result.total) * 100),
                        completedAt: preData.result.completedAt
                    });
                }
            }

            if (postRes.ok) {
                const postData = await postRes.json();
                if (postData.result) {
                    setPostTestResult({
                        score: postData.result.score,
                        total: postData.result.total,
                        percentage: Math.round((postData.result.score / postData.result.total) * 100),
                        completedAt: postData.result.completedAt
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching assessment results:', error);
        } finally {
            setIsLoadingResults(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchResults();
        } else {
            setIsLoadingResults(false);
        }
    }, [isAuthenticated, fetchResults]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/assessment');
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (testState !== 'inProgress') return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) { finishTest(); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [testState]);

    const startTest = (type: TestType) => {
        setTestType(type);
        setQuestions(getAssessmentQuestions(10));
        setCurrentQuestion(0);
        setAnswers({});
        setTimeLeft(15 * 60);
        setTestState('inProgress');
    };

    const selectAnswer = (optionIndex: number) => {
        const questionId = questions[currentQuestion].id;
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const finishTest = async () => {
        let score = 0;
        questions.forEach((q) => { if (answers[q.id] === q.correctAnswer) score++; });
        const result: TestResult = { score, total: questions.length, percentage: Math.round((score / questions.length) * 100), completedAt: new Date().toISOString() };

        if (testType === 'pretest') {
            setPreTestResult(result);
        } else {
            setPostTestResult(result);
        }

        // Save to database
        try {
            await fetch('/api/assessment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    type: testType === 'pretest' ? 'pre' : 'post',
                    score: result.score,
                    total: result.total,
                    answers: answers
                })
            });
        } catch (error) {
            console.error('Error saving assessment result:', error);
        }

        setTestState('completed');
    };

    const resetTest = () => { setTestType(null); setTestState('idle'); setQuestions([]); setCurrentQuestion(0); setAnswers({}); };
    const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

    const currentResult = testType === 'pretest' ? preTestResult : postTestResult;
    const improvement = preTestResult && postTestResult ? postTestResult.percentage - preTestResult.percentage : 0;
    const currentQ = questions[currentQuestion];

    if (isLoading || isLoadingResults) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center max-w-md mx-auto p-8">
                    <Lock className="w-16 h-16 mx-auto mb-4 text-neutral-300" />
                    <h2 className="text-xl font-bold text-neutral-900 mb-2">Login Diperlukan</h2>
                    <p className="text-neutral-600 mb-6">Silakan login untuk mengakses assessment</p>
                    <Link href="/login?redirect=/assessment" className="btn btn-primary">
                        <LogIn className="w-5 h-5" /> Masuk
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-neutral-50">
            <AnimatePresence mode="wait">
                {testState === 'idle' && (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {/* Header */}
                        <section className="py-12 lg:py-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                            <div className="section-container max-w-4xl mx-auto text-center">
                                <div className="badge badge-primary mb-4"><ClipboardCheck className="w-4 h-4" />Assessment</div>
                                <h1 className="heading-2 mb-4">Uji <span className="text-primary-600">Pengetahuan</span> Anda</h1>
                                <p className="text-neutral-600">Ambil pre-test sebelum belajar dan post-test setelah belajar</p>
                            </div>
                        </section>

                        {/* Results */}
                        {(preTestResult || postTestResult) && (
                            <section className="py-6 bg-white border-b border-neutral-100">
                                <div className="section-container max-w-4xl mx-auto">
                                    <h2 className="font-bold text-neutral-900 mb-4">Hasil Sebelumnya</h2>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {preTestResult && (
                                            <div className="p-4 bg-blue-50 rounded-xl text-center">
                                                <p className="text-sm text-blue-600 font-medium">Pre-Test</p>
                                                <p className="text-2xl font-bold text-blue-700">{preTestResult.percentage}%</p>
                                            </div>
                                        )}
                                        {postTestResult && (
                                            <div className="p-4 bg-green-50 rounded-xl text-center">
                                                <p className="text-sm text-green-600 font-medium">Post-Test</p>
                                                <p className="text-2xl font-bold text-green-700">{postTestResult.percentage}%</p>
                                            </div>
                                        )}
                                        {preTestResult && postTestResult && (
                                            <div className={`p-4 rounded-xl text-center ${improvement >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
                                                <p className="text-sm font-medium" style={{ color: improvement >= 0 ? '#059669' : '#dc2626' }}>Peningkatan</p>
                                                <p className="text-2xl font-bold flex items-center justify-center gap-1" style={{ color: improvement >= 0 ? '#059669' : '#dc2626' }}>
                                                    <TrendingUp className={`w-5 h-5 ${improvement < 0 ? 'rotate-180' : ''}`} />
                                                    {improvement > 0 ? '+' : ''}{improvement}%
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Test Cards */}
                        <section className="py-12">
                            <div className="section-container max-w-4xl mx-auto">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6"><ClipboardCheck className="w-7 h-7 text-blue-600" /></div>
                                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Pre-Test</h3>
                                        <p className="text-neutral-600 mb-4">Tes sebelum belajar</p>
                                        <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />15 menit</span>
                                            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />10 soal</span>
                                        </div>
                                        <button onClick={() => startTest('pretest')} className="w-full btn" style={{ background: '#3b82f6', color: 'white' }}>
                                            {preTestResult ? 'Ulangi' : 'Mulai'} Pre-Test
                                        </button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6"><Award className="w-7 h-7 text-green-600" /></div>
                                        <h3 className="text-xl font-bold text-neutral-900 mb-2">Post-Test</h3>
                                        <p className="text-neutral-600 mb-4">Tes setelah belajar</p>
                                        <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
                                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />15 menit</span>
                                            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" />10 soal</span>
                                        </div>
                                        <button onClick={() => startTest('posttest')} className="w-full btn" style={{ background: '#22c55e', color: 'white' }}>
                                            {postTestResult ? 'Ulangi' : 'Mulai'} Post-Test
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}

                {testState === 'inProgress' && currentQ && (
                    <motion.div key="inProgress" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8">
                        <div className="section-container max-w-3xl mx-auto">
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-neutral-100 mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-neutral-600">Soal {currentQuestion + 1}/{questions.length}</span>
                                    <span className={`flex items-center gap-2 font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-neutral-700'}`}><Clock className="w-4 h-4" />{formatTime(timeLeft)}</span>
                                </div>
                                <div className="progress-bar"><motion.div className="progress-bar-fill" animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} /></div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-100"
                                >
                                    <h2 className="text-xl font-bold text-neutral-900 mb-6">{currentQ.question}</h2>
                                    <div className="space-y-3">
                                        {currentQ.options.map((option, idx) => (
                                            <button key={idx} onClick={() => selectAnswer(idx)}
                                                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${answers[currentQ.id] === idx ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 hover:border-neutral-300'}`}>
                                                <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-sm font-bold mr-3 ${answers[currentQ.id] === idx ? 'bg-red-500 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </span>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-between mt-6">
                                <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0}
                                    className="btn btn-secondary disabled:opacity-40"><ArrowLeft className="w-4 h-4" />Sebelumnya</button>
                                {currentQuestion === questions.length - 1 ? (
                                    <button onClick={finishTest} className="btn btn-primary">Selesai<CheckCircle className="w-4 h-4" /></button>
                                ) : (
                                    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="btn btn-primary">Selanjutnya<ArrowRight className="w-4 h-4" /></button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {testState === 'completed' && currentResult && (
                    <motion.div key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12">
                        <div className="section-container max-w-md mx-auto">
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-100 text-center">
                                <div className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center mb-6 ${currentResult.percentage >= 70 ? 'bg-green-100' : 'bg-amber-100'}`}>
                                    <span className={`text-3xl font-bold ${currentResult.percentage >= 70 ? 'text-green-600' : 'text-amber-600'}`}>{currentResult.percentage}%</span>
                                </div>
                                <h2 className="text-xl font-bold text-neutral-900 mb-2">{testType === 'pretest' ? 'Pre-Test' : 'Post-Test'} Selesai!</h2>
                                <p className="text-neutral-600 mb-6">{currentResult.score}/{currentResult.total} benar</p>
                                <div className="flex flex-col gap-3">
                                    <button onClick={resetTest} className="btn btn-secondary justify-center"><RotateCcw className="w-4 h-4" />Ulangi</button>
                                    <Link href="/belajar" className="btn btn-primary justify-center"><BookOpen className="w-4 h-4" />Belajar</Link>
                                    <Link href="/dashboard" className="btn justify-center" style={{ background: '#111', color: 'white' }}><Home className="w-4 h-4" />Beranda</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
