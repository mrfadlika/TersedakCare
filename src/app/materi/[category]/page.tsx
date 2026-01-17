'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Bookmark,
    BookmarkCheck,
    Share2,
    Phone,
    Printer,
    ChevronDown,
    ChevronUp,
    FileText,
    Lightbulb,
    Video,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, AgeBadge } from '@/components/ui/Card';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { useBookmarks } from '@/hooks/useBookmarks';
import { ageGroups, dontDoList } from '@/data/content';

export default function MateriCategoryPage() {
    const params = useParams();
    const category = params.category as string;
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [expandedSummaries, setExpandedSummaries] = useState<Record<string, boolean>>({});

    const toggleSummary = (sectionId: string) => {
        setExpandedSummaries(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    const group = ageGroups.find(g => g.id === category);

    if (!group) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                        Kategori tidak ditemukan
                    </h1>
                    <Link href="/materi">
                        <Button variant="primary" icon={ArrowLeft} color="black">
                            Kembali ke Materi
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const headerColors = {
        bayi: 'from-accent-500 to-accent-600',
        balita: 'from-secondary-500 to-secondary-600',
        anak: 'from-success-500 to-success-600',
    };

    const nextGroup = ageGroups.find(g =>
        (category === 'bayi' && g.id === 'balita') ||
        (category === 'balita' && g.id === 'anak') ||
        (category === 'anak' && g.id === 'bayi')
    );

    return (
        <div className="min-h-screen bg-neutral-50 print:bg-white">
            {/* Header */}
            <div className={`bg-gradient-to-br ${headerColors[category as keyof typeof headerColors]} text-white py-7 lg:py-8 print:py-6 print:bg-primary-600`}>
                <div className="section-container">
                    <div className="flex items-center justify-between mb-6 print:hidden">
                        <Link href="/materi" className="inline-flex items-center gap-2 text-black/80 hover:text-black transition-colors">
                            <ArrowLeft className="w-4 h-4" color="black" />
                            Kembali ke Materi
                        </Link>
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors text-black/80"
                        >
                            <Printer className="w-4 h-4" />
                            <span className="hidden sm:inline">Cetak</span>
                        </button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-6"
                    >
                        <span className="text-7xl print:text-5xl">{group.icon}</span>
                        <div>
                            <AgeBadge type={group.id as 'bayi' | 'balita' | 'anak'} className="mb-3 bg-white/20 text-black/60" />
                            <h1 className="heading-1 mb-2 print:text-2xl">
                                Penanganan Tersedak pada {group.name}
                            </h1>
                            <p className="text-xl text-black/80 print:text-base">
                                {group.ageRange} | {group.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Step Counter Progress */}
            <div className="section-container py-6 print:hidden" style={{ paddingBottom: '2rem' }}>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-neutral-600 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary-500" />
                            Panduan Langkah
                        </span>
                        <span className="text-sm text-neutral-500">{group.sections.length} bagian</span>
                    </div>
                    <div className="flex gap-2">
                        {group.sections.map((section, idx) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="flex-1 group"
                            >
                                <div className="h-2 rounded-full bg-neutral-100 group-hover:bg-primary-200 transition-colors overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-xs text-neutral-500 mt-2 text-center group-hover:text-primary-600 transition-colors">
                                    {idx + 1}. {section.title.split(' ').slice(0, 2).join(' ')}...
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="section-container py-4 lg:py-8 pb-16 lg:pb-20" style={{ paddingBottom: '3rem' }}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {group.sections.map((section, index) => {
                            const bookmarkData = {
                                id: section.id,
                                title: section.title,
                                category: group.name,
                                path: `/materi/${group.id}#${section.id}`,
                            };

                            return (
                                <motion.div
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                                >
                                    {/* Section Header */}
                                    <div className="p-6 border-b border-neutral-100 flex items-start justify-between">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-sm font-medium text-neutral-600 mb-3">
                                                Bagian {index + 1}
                                            </div>
                                            <h2 className="text-2xl font-bold text-neutral-900">
                                                {section.title}
                                            </h2>
                                            <p className="text-neutral-500 mt-1">
                                                {section.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleBookmark(bookmarkData)}
                                                className={`p-2 rounded-lg transition-colors ${isBookmarked(section.id)
                                                    ? 'text-accent-500 bg-accent-50'
                                                    : 'text-neutral-400 hover:text-accent-500 hover:bg-accent-50'
                                                    }`}
                                                title={isBookmarked(section.id) ? 'Hapus bookmark' : 'Tambah bookmark'}
                                            >
                                                {isBookmarked(section.id) ? (
                                                    <BookmarkCheck className="w-5 h-5" />
                                                ) : (
                                                    <Bookmark className="w-5 h-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Summary Card */}
                                    <div className="px-6 pt-4 print:hidden">
                                        <button
                                            onClick={() => toggleSummary(section.id)}
                                            className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl hover:from-amber-100 hover:to-yellow-100 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                                                    <Lightbulb className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="font-medium text-amber-800">Ringkasan Cepat</span>
                                            </div>
                                            {expandedSummaries[section.id] ? (
                                                <ChevronUp className="w-5 h-5 text-amber-600" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-amber-600" />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {expandedSummaries[section.id] && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-4 bg-amber-50/50 border-x border-b border-amber-200 rounded-b-xl">
                                                        <ul className="space-y-2">
                                                            <li className="flex items-start gap-2 text-sm text-amber-800">
                                                                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                                                <span><strong>Bagian {index + 1}:</strong> {section.title}</span>
                                                            </li>
                                                            <li className="flex items-start gap-2 text-sm text-amber-800">
                                                                <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                                                <span>{section.description}</span>
                                                            </li>
                                                            {section.tips && section.tips.length > 0 && (
                                                                <li className="flex items-start gap-2 text-sm text-amber-800">
                                                                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                                                    <span><strong>Tips:</strong> {section.tips[0]}</span>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Section Content */}
                                    <div className="p-6">
                                        <div
                                            className="prose prose-neutral max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-li:text-neutral-600 prose-strong:text-neutral-800 prose-h2:text-xl prose-h3:text-lg"
                                            dangerouslySetInnerHTML={{ __html: formatContent(section.content) }}
                                        />

                                        {/* Warnings */}
                                        {section.warnings && section.warnings.length > 0 && (
                                            <div className="mt-8 p-5 bg-primary-50 border-2 border-primary-200 rounded-2xl">
                                                <h4 className="font-bold text-primary-800 flex items-center gap-2 mb-4">
                                                    <XCircle className="w-6 h-6" />
                                                    ⚠️ JANGAN LAKUKAN:
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.warnings.map((warning, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-primary-700">
                                                            <span className="text-xl">❌</span>
                                                            <span>{warning}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Tips */}
                                        {section.tips && section.tips.length > 0 && (
                                            <div className="mt-6 p-5 bg-success-50 border-2 border-success-200 rounded-2xl">
                                                <h4 className="font-bold text-success-700 flex items-center gap-2 mb-4">
                                                    <CheckCircle className="w-6 h-6" />
                                                    💡 Tips Penting:
                                                </h4>
                                                <ul className="space-y-3">
                                                    {section.tips.map((tip, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-success-700">
                                                            <span className="text-xl">✓</span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Video Tutorial */}
                                        {section.videoUrl && (
                                            <VideoPlayer
                                                url={section.videoUrl}
                                                title={`Video Tutorial: ${section.title}`}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <Link href="/materi">
                                <Button variant="outline" icon={ArrowLeft}>
                                    Semua Materi
                                </Button>
                            </Link>
                            {nextGroup && (
                                <Link href={`/materi/${nextGroup.id}`}>
                                    <Button variant="primary" icon={ArrowRight} iconPosition="right">
                                        {nextGroup.name} ({nextGroup.ageRange})
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Sticky sidebar */}
                        <div className="lg:sticky lg:top-28 space-y-6">
                            {/* Emergency CTA */}
                            <Card variant="emergency" className="bg-gradient-to-br from-red-400 to-red-500">
                                <div className="text-center">
                                    <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
                                    <h3 className="font-bold text-lg mb-2">Dalam Keadaan Darurat?</h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        Buka panduan cepat dengan langkah-langkah jelas
                                    </p>
                                    <Link href="/darurat" className="block">
                                        <Button
                                            variant="outline"
                                            className="w-full bg-white text-primary-600 hover:bg-primary-50 border-white"
                                            icon={ArrowRight}
                                            iconPosition="right"
                                        >
                                            Mode Darurat
                                        </Button>
                                    </Link>
                                </div>
                            </Card>

                            {/* Table of Contents */}
                            <Card>
                                <div className="p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4">Daftar Isi</h3>
                                    <ul className="space-y-2">
                                        {group.sections.map((section, index) => (
                                            <li key={section.id}>
                                                <a
                                                    href={`#${section.id}`}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 transition-colors text-sm text-neutral-600 hover:text-neutral-900"
                                                >
                                                    <span className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-medium">
                                                        {index + 1}
                                                    </span>
                                                    {section.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>

                            {/* Other Age Groups */}
                            <Card>
                                <div className="p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4">Kategori Usia Lain</h3>
                                    <ul className="space-y-2">
                                        {ageGroups.filter(g => g.id !== category).map((g) => (
                                            <li key={g.id}>
                                                <Link
                                                    href={`/materi/${g.id}`}
                                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
                                                >
                                                    <span className="text-2xl">{g.icon}</span>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-neutral-900 text-sm">{g.name}</p>
                                                        <p className="text-xs text-neutral-500">{g.ageRange}</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>

                            {/* Emergency Numbers */}
                            <Card className="bg-primary-50 border-primary-100">
                                <div className="p-6">
                                    <h3 className="font-bold text-primary-800 mb-4 flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        Nomor Darurat
                                    </h3>
                                    <div className="space-y-3">
                                        <a
                                            href="tel:119"
                                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary-200 hover:border-primary-400 transition-colors"
                                        >
                                            <span className="font-bold text-primary-700">119</span>
                                            <span className="text-sm text-primary-600">Ambulans</span>
                                        </a>
                                        <a
                                            href="tel:112"
                                            className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary-200 hover:border-primary-400 transition-colors"
                                        >
                                            <span className="font-bold text-primary-700">112</span>
                                            <span className="text-sm text-primary-600">Darurat Terintegrasi</span>
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to format markdown-like content to HTML with e-book styling
function formatContent(content: string): string {
    let html = content
        // Handle blockquotes first (important/warning callouts)
        .replace(/> \*\*([^*]+)\*\*(.*)/g, '<div class="my-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl"><p class="font-bold text-amber-800 mb-1">$1</p><p class="text-amber-700">$2</p></div>')
        .replace(/> (.*)/g, '<div class="my-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl text-blue-800">$1</div>')

        // Headers with proper e-book styling
        .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-neutral-900 mt-8 mb-4 pb-2 border-b border-neutral-200">$1</h2>')
        .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-neutral-800 mt-6 mb-3 flex items-center gap-2"><span class="w-2 h-2 bg-primary-500 rounded-full"></span>$1</h3>')

        // Remove stray # symbols
        .replace(/^#\s*$/gm, '')
        .replace(/^\s*#\s*$/gm, '')

        // Bold text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')

        // Tables (simple format)
        .replace(/\|(.+)\|/g, (match, content) => {
            const cells = content.split('|').map((cell: string) => cell.trim());
            const isHeader = cells.some((c: string) => c.includes('---'));
            if (isHeader) return '';
            const cellHtml = cells.map((cell: string) => `<td class="px-4 py-2 border-b border-neutral-100">${cell}</td>`).join('');
            return `<tr class="hover:bg-neutral-50">${cellHtml}</tr>`;
        })

        // Unordered list items with emojis/checkmarks
        .replace(/^- (✅.*)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-5 h-5 mt-0.5 bg-green-100 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg></span><span class="text-neutral-700">$1</span></li>')
        .replace(/^- (❌.*)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-5 h-5 mt-0.5 bg-red-100 rounded-full flex items-center justify-center"><svg class="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg></span><span class="text-neutral-700">$1</span></li>')
        .replace(/^- (.+)$/gm, '<li class="flex items-start gap-3 mb-2"><span class="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-primary-500 rounded-full"></span><span class="text-neutral-700">$1</span></li>')

        // Ordered list items
        .replace(/^(\d+)\. \*\*([^*]+)\*\*(.*)$/gm, '<li class="flex items-start gap-3 mb-3"><span class="flex-shrink-0 w-6 h-6 mt-0.5 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">$1</span><span class="text-neutral-700"><strong class="font-semibold text-neutral-900">$2</strong>$3</span></li>')
        .replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-3 mb-3"><span class="flex-shrink-0 w-6 h-6 mt-0.5 bg-primary-100 rounded-full flex items-center justify-center text-xs font-bold text-primary-700">$1</span><span class="text-neutral-700">$2</span></li>')

        // Convert emoji indicators
        .replace(/✅/g, '')
        .replace(/❌/g, '')
        .replace(/⚠️/g, '<span class="text-amber-500">⚠</span>')
        .replace(/💡/g, '<span class="text-yellow-500">💡</span>')
        .replace(/🔵/g, '<span class="text-blue-500">●</span>')
        .replace(/😶|😰|😫|😨|🗣️|🔴|🤲|📌/g, '')

        // Wrap list items in containers - using simpler regex without 's' flag
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
}
