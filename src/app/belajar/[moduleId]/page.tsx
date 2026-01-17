'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Clock,
    BookOpen,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Lock,
    LogIn,
    Award,
    XCircle,
    HelpCircle,
    Sparkles,
    PartyPopper,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { learningModules } from '@/data/content';

export default function ModuleDetailPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.moduleId as string;
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [completedModules, setCompletedModules] = useState<number[]>([]);
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);

    // Quiz state
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);

    const module = learningModules.find(m => m.id === moduleId);

    // Fetch progress from database
    const fetchProgress = useCallback(async () => {
        try {
            const response = await fetch(`/api/progress?moduleId=${moduleId}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                const lessonIds = data.lessons?.map((l: { lesson_id: string }) => l.lesson_id) || [];
                setCompletedLessons(lessonIds);
                setCompletedModules(data.completedModules || []);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        } finally {
            setIsLoadingProgress(false);
        }
    }, [moduleId]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProgress();
        } else {
            setIsLoadingProgress(false);
        }
    }, [isAuthenticated, fetchProgress]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push(`/login?redirect=/belajar/${moduleId}`);
        }
    }, [isAuthenticated, authLoading, router, moduleId]);

    if (authLoading) {
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
                    <Link href={`/login?redirect=/belajar/${moduleId}`} className="btn btn-primary">
                        <LogIn className="w-5 h-5" /> Masuk
                    </Link>
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-4">Modul tidak ditemukan</h1>
                    <Link href="/belajar" className="btn btn-primary">
                        <ArrowLeft className="w-4 h-4" /> Kembali ke Belajar
                    </Link>
                </div>
            </div>
        );
    }

    const currentLesson = module.lessons[currentLessonIndex];
    const isCurrentLessonCompleted = completedLessons.includes(currentLesson.id);
    const allLessonsCompleted = module.lessons.every(l => completedLessons.includes(l.id));
    const progress = Math.round((completedLessons.length / module.lessons.length) * 100);

    const markLessonComplete = async () => {
        if (!completedLessons.includes(currentLesson.id)) {
            setCompletedLessons([...completedLessons, currentLesson.id]);

            // Save to database
            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        type: 'lesson',
                        moduleId: moduleId,
                        lessonId: currentLesson.id
                    })
                });
            } catch (error) {
                console.error('Error saving lesson progress:', error);
            }
        }
    };

    // Quiz functions
    const hasQuiz = currentLesson.quiz && currentLesson.quiz.length > 0;
    const currentQuiz = hasQuiz ? currentLesson.quiz![currentQuizIndex] : null;

    const handleAnswerSelect = (answerIndex: number) => {
        if (!quizSubmitted) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleQuizSubmit = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === currentQuiz?.correctAnswer;
        if (isCorrect) {
            setQuizScore(prev => prev + 1);
        }
        setQuizSubmitted(true);
    };

    const handleNextQuestion = () => {
        if (currentQuizIndex < (currentLesson.quiz?.length || 0) - 1) {
            setCurrentQuizIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setQuizSubmitted(false);
        } else {
            // Quiz completed
            markLessonComplete();
            setShowQuiz(false);
            setShowCelebration(true);
            setTimeout(() => setShowCelebration(false), 3000);
        }
    };

    const startQuiz = () => {
        setShowQuiz(true);
        setCurrentQuizIndex(0);
        setSelectedAnswer(null);
        setQuizSubmitted(false);
        setQuizScore(0);
    };

    const goToNextLesson = () => {
        if (hasQuiz && !completedLessons.includes(currentLesson.id)) {
            startQuiz();
            return;
        }

        markLessonComplete();
        if (currentLessonIndex < module.lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setShowQuiz(false);
        }
    };

    const goToPrevLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
            setShowQuiz(false);
        }
    };

    const completeModule = async () => {
        if (hasQuiz && !completedLessons.includes(currentLesson.id)) {
            startQuiz();
            return;
        }

        await markLessonComplete();
        if (!completedModules.includes(module.order)) {
            setCompletedModules([...completedModules, module.order]);

            // Save module completion to database
            try {
                await fetch('/api/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        type: 'module',
                        moduleOrder: module.order
                    })
                });
            } catch (error) {
                console.error('Error saving module progress:', error);
            }
        }
        setShowCelebration(true);
        setTimeout(() => {
            router.push('/belajar');
        }, 2000);
    };

    // Format markdown content to HTML with e-book styling
    const formatContent = (content: string): string => {
        let html = content
            // Handle blockquotes first (important/warning callouts)
            .replace(/> \*\*([^*]+)\*\*(.*)/g, '<div class="my-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl"><p class="font-bold text-amber-800 mb-1">$1</p><p class="text-amber-700">$2</p></div>')
            .replace(/> (.*)/g, '<div class="my-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl text-blue-800">$1</div>')

            // Headers with proper e-book styling
            .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-neutral-900 mt-8 mb-4 pb-2 border-b border-neutral-200">$1</h2>')
            .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-neutral-800 mt-6 mb-3 flex items-center gap-2"><span class="w-2 h-2 bg-violet-500 rounded-full"></span>$1</h3>')

            // Remove stray # symbols
            .replace(/^#\s*$/gm, '')
            .replace(/^\s*#\s*$/gm, '')

            // Bold text
            .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')

            // Tables
            .replace(/\|(.+)\|/g, (match, tableContent) => {
                const cells = tableContent.split('|').map((cell: string) => cell.trim());
                const isHeader = cells.some((c: string) => c.includes('---'));
                if (isHeader) return '';
                const cellHtml = cells.map((cell: string) => `<td class="px-4 py-2 border-b border-neutral-100">${cell}</td>`).join('');
                return `<tr class="hover:bg-neutral-50">${cellHtml}</tr>`;
            })

            // Unordered list items with emojis/checkmarks
            .replace(/^- (✅.*)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-5 h-5 mt-0.5 bg-green-100 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg></span><span class="text-neutral-700">$1</span></li>')
            .replace(/^- (❌.*)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-5 h-5 mt-0.5 bg-red-100 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg></span><span class="text-neutral-700">$1</span></li>')
            .replace(/^- (.+)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-violet-500 rounded-full"></span><span class="text-neutral-700">$1</span></li>')

            // Ordered list items
            .replace(/^(\d+)\. \*\*([^*]+)\*\*(.*)$/gm, '<li class="flex items-start gap-3 mb-3"><span class="flex-shrink-0 w-6 h-6 mt-0.5 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-700">$1</span><span class="text-neutral-700"><strong class="font-semibold text-neutral-900">$2</strong>$3</span></li>')
            .replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-3 mb-3"><span class="flex-shrink-0 w-6 h-6 mt-0.5 bg-violet-100 rounded-full flex items-center justify-center text-xs font-bold text-violet-700">$1</span><span class="text-neutral-700">$2</span></li>')

            // Convert emoji indicators
            .replace(/✅/g, '')
            .replace(/❌/g, '')
            .replace(/⚠️/g, '<span class="text-amber-500">⚠</span>')
            .replace(/💡/g, '<span class="text-yellow-500">💡</span>')
            .replace(/🔵/g, '<span class="text-blue-500">●</span>')
            .replace(/😶|😰|😫|😨|🗣️|🔴|🤲|📌|🔄/g, '')

            // Wrap list items in containers
            .replace(/(<li class="flex items-start gap-3 mb-2">[\s\S]*?<\/li>)+/g, '<ul class="my-4 space-y-1">$&</ul>')
            .replace(/(<li class="flex items-start gap-3 mb-3">[\s\S]*?<\/li>)+/g, '<ol class="my-4 space-y-2">$&</ol>')

            // Paragraph handling
            .replace(/\n\n+/g, '</p><p class="text-neutral-600 leading-relaxed mb-4">')
            .replace(/\n(?!<)/g, ' ')

            // Cleanup multiple whitespaces
            .replace(/\s+/g, ' ')
            .trim();

        // Wrap in paragraph if not starting with block element
        if (!html.startsWith('<h') && !html.startsWith('<div') && !html.startsWith('<ul') && !html.startsWith('<ol')) {
            html = '<p class="text-neutral-600 leading-relaxed mb-4">' + html;
        }
        if (!html.endsWith('</div>') && !html.endsWith('</ul>') && !html.endsWith('</ol>') && !html.endsWith('</h2>') && !html.endsWith('</h3>')) {
            html = html + '</p>';
        }

        // Final cleanup
        html = html
            .replace(/<p class="text-neutral-600 leading-relaxed mb-4">\s*<\/p>/g, '')
            .replace(/<p class="text-neutral-600 leading-relaxed mb-4">\s*<(h2|h3|div|ul|ol)/g, '<$1')
            .replace(/<\/(h2|h3|div|ul|ol)>\s*<\/p>/g, '</$1>');

        return html;
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white py-6 sm:py-8 lg:py-12">
                <div className="section-container">
                    <Link href="/belajar" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-3 sm:mb-4 transition-colors text-sm sm:text-base">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Modul
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <span className="text-2xl sm:text-3xl">{module.icon}</span>
                            <div className="badge badge-primary bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                                Modul {module.order}
                            </div>
                        </div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">{module.title}</h1>
                        <p className="text-white/80 text-sm sm:text-base">{module.description}</p>

                        {/* Progress Bar */}
                        <div className="mt-6 bg-white/20 rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-sm text-white/70 mt-2">
                            Progress: {completedLessons.length}/{module.lessons.length} pelajaran selesai
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="section-container py-6 sm:py-8" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
                    {/* Sidebar - Lesson List */}
                    <div className="lg:col-span-1">
                        <div className="card p-3 sm:p-4 lg:sticky lg:top-28">
                            <h3 className="font-bold text-neutral-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
                                Daftar Pelajaran
                            </h3>
                            <ul className="space-y-2">
                                {module.lessons.map((lesson, index) => {
                                    const isCompleted = completedLessons.includes(lesson.id);
                                    const isCurrent = index === currentLessonIndex;

                                    return (
                                        <li key={lesson.id}>
                                            <button
                                                onClick={() => setCurrentLessonIndex(index)}
                                                className={`w-full text-left p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all ${isCurrent
                                                    ? 'bg-primary-100 border-2 border-primary-500'
                                                    : 'hover:bg-neutral-50 border-2 border-transparent'
                                                    }`}
                                            >
                                                <div className="flex items-start gap-2 sm:gap-3">
                                                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted
                                                        ? 'bg-green-500 text-white'
                                                        : isCurrent
                                                            ? 'bg-primary-500 text-white'
                                                            : 'bg-neutral-200 text-neutral-500'
                                                        }`}>
                                                        {isCompleted ? (
                                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        ) : (
                                                            <span className="text-[10px] sm:text-xs font-bold">{index + 1}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-xs sm:text-sm font-medium truncate ${isCurrent ? 'text-primary-700' : 'text-neutral-700'
                                                            }`}>
                                                            {lesson.title}
                                                        </p>
                                                        <p className="text-[10px] sm:text-xs text-neutral-400 flex items-center gap-1 mt-0.5 sm:mt-1">
                                                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                            {lesson.duration}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            key={currentLesson.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card overflow-hidden"
                        >
                            {/* Lesson Header */}
                            <div className="p-4 sm:p-6 border-b border-neutral-100 bg-gradient-to-r from-neutral-50 to-white">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-1 sm:mb-2">
                                            <span>Pelajaran {currentLessonIndex + 1} dari {module.lessons.length}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                {currentLesson.duration}
                                            </span>
                                        </div>
                                        <h2 className="text-lg sm:text-2xl font-bold text-neutral-900">{currentLesson.title}</h2>
                                    </div>
                                    {isCurrentLessonCompleted && (
                                        <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium w-fit">
                                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                            Selesai
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Lesson Content */}
                            <div className="p-4 sm:p-6 lg:p-8">
                                <div
                                    className="prose prose-neutral max-w-none prose-sm sm:prose-base"
                                    dangerouslySetInnerHTML={{ __html: formatContent(currentLesson.content) }}
                                />
                            </div>

                            {/* Quiz Section */}
                            <AnimatePresence>
                                {showQuiz && hasQuiz && currentQuiz && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="p-6 border-t border-neutral-100 bg-gradient-to-br from-violet-50 to-purple-50"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center">
                                                <HelpCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-neutral-900">Quiz Pemahaman</h3>
                                                <p className="text-sm text-neutral-500">
                                                    Pertanyaan {currentQuizIndex + 1} dari {currentLesson.quiz?.length}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-violet-100">
                                            <p className="text-lg font-medium text-neutral-900 mb-4">
                                                {currentQuiz.question}
                                            </p>

                                            <div className="space-y-3">
                                                {currentQuiz.options.map((option, idx) => {
                                                    const isSelected = selectedAnswer === idx;
                                                    const isCorrect = quizSubmitted && idx === currentQuiz.correctAnswer;
                                                    const isWrong = quizSubmitted && isSelected && idx !== currentQuiz.correctAnswer;

                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleAnswerSelect(idx)}
                                                            disabled={quizSubmitted}
                                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${isCorrect
                                                                ? 'border-green-500 bg-green-50'
                                                                : isWrong
                                                                    ? 'border-red-500 bg-red-50'
                                                                    : isSelected
                                                                        ? 'border-violet-500 bg-violet-50'
                                                                        : 'border-neutral-200 hover:border-violet-300 hover:bg-violet-50/50'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect
                                                                    ? 'bg-green-500 text-white'
                                                                    : isWrong
                                                                        ? 'bg-red-500 text-white'
                                                                        : isSelected
                                                                            ? 'bg-violet-500 text-white'
                                                                            : 'bg-neutral-200 text-neutral-600'
                                                                    }`}>
                                                                    {isCorrect ? <CheckCircle className="w-4 h-4" /> : isWrong ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                                                                </div>
                                                                <span className={`${isCorrect ? 'text-green-700' : isWrong ? 'text-red-700' : 'text-neutral-700'}`}>
                                                                    {option}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            {quizSubmitted && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={`mt-4 p-4 rounded-xl ${selectedAnswer === currentQuiz.correctAnswer ? 'bg-green-100' : 'bg-amber-100'}`}
                                                >
                                                    <p className={`font-medium ${selectedAnswer === currentQuiz.correctAnswer ? 'text-green-800' : 'text-amber-800'}`}>
                                                        {selectedAnswer === currentQuiz.correctAnswer ? '✅ Benar!' : '❌ Kurang tepat'}
                                                    </p>
                                                    <p className={`text-sm mt-1 ${selectedAnswer === currentQuiz.correctAnswer ? 'text-green-700' : 'text-amber-700'}`}>
                                                        {currentQuiz.explanation}
                                                    </p>
                                                </motion.div>
                                            )}

                                            <div className="mt-6 flex justify-end">
                                                {!quizSubmitted ? (
                                                    <button
                                                        onClick={handleQuizSubmit}
                                                        disabled={selectedAnswer === null}
                                                        className={`btn btn-primary ${selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        Cek Jawaban
                                                    </button>
                                                ) : (
                                                    <button onClick={handleNextQuestion} className="btn btn-primary">
                                                        {currentQuizIndex < (currentLesson.quiz?.length || 0) - 1 ? 'Pertanyaan Selanjutnya' : 'Selesai'}
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Quiz Indicator (if lesson has quiz) */}
                            {hasQuiz && !showQuiz && !isCurrentLessonCompleted && (
                                <div className="p-4 border-t border-neutral-100 bg-violet-50">
                                    <div className="flex items-center gap-3 text-violet-700">
                                        <HelpCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">Pelajaran ini memiliki quiz - selesaikan untuk melanjutkan!</span>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50">
                                <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center justify-between gap-3">
                                    <button
                                        onClick={goToPrevLesson}
                                        disabled={currentLessonIndex === 0}
                                        className={`btn btn-outline text-sm sm:text-base order-2 min-[400px]:order-1 ${currentLessonIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Sebelumnya
                                    </button>

                                    {currentLessonIndex === module.lessons.length - 1 ? (
                                        <button onClick={completeModule} className="btn btn-primary text-sm sm:text-base order-1 min-[400px]:order-2">
                                            <CheckCircle className="w-4 h-4" />
                                            Selesaikan Modul
                                        </button>
                                    ) : (
                                        <button onClick={goToNextLesson} className="btn btn-primary text-sm sm:text-base order-1 min-[400px]:order-2">
                                            Selanjutnya
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Module Complete Banner */}
                        {allLessonsCompleted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 card-dark p-6 text-center"
                            >
                                <div className="text-4xl mb-3">🎉</div>
                                <h3 className="text-xl font-bold mb-2">Modul Selesai!</h3>
                                <p className="text-neutral-400 mb-4">
                                    Selamat! Anda telah menyelesaikan semua pelajaran dalam modul ini.
                                </p>
                                <Link href="/belajar" className="btn" style={{ background: 'white', color: 'black' }}>
                                    Kembali ke Daftar Modul
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Celebration Overlay */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, -10, 10, -10, 10, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 0.5, repeat: 2 }}
                                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                            >
                                <Award className="w-10 h-10 text-white" />
                            </motion.div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-medium text-yellow-600">Luar Biasa!</span>
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                </div>

                                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                                    {allLessonsCompleted ? 'Modul Selesai!' : 'Quiz Selesai!'}
                                </h2>
                                <p className="text-neutral-600 mb-4">
                                    {allLessonsCompleted
                                        ? 'Selamat! Anda telah menguasai semua materi dalam modul ini.'
                                        : `Anda menjawab ${quizScore} dari ${currentLesson.quiz?.length || 0} pertanyaan dengan benar!`
                                    }
                                </p>

                                {allLessonsCompleted && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 text-sm font-medium">
                                        <GraduationCap className="w-4 h-4" />
                                        Sertifikat Tersedia
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
