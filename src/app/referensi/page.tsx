'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, CheckCircle, Stethoscope, Globe, BookOpen, FileCheck, Shield } from 'lucide-react';

const referenceCategories = [
    {
        title: 'Pedoman Nasional',
        icon: Stethoscope,
        color: 'emerald',
        refs: [
            { title: 'Kementerian Kesehatan RI', desc: 'Pedoman Penanganan Kegawatdaruratan pada Anak', url: 'https://www.kemkes.go.id', official: true },
            { title: 'IDAI', desc: 'Buku Ajar Pediatri Gawat Darurat', url: 'https://www.idai.or.id', official: true },
            { title: 'PERKI', desc: 'Panduan Resusitasi Jantung Paru', url: 'https://www.inaheart.org', official: true },
        ],
    },
    {
        title: 'Pedoman Internasional',
        icon: Globe,
        color: 'blue',
        refs: [
            { title: 'American Heart Association', desc: 'Guidelines for CPR and ECC', url: 'https://www.heart.org', official: true },
            { title: 'European Resuscitation Council', desc: 'Guidelines for Paediatric BLS', url: 'https://www.erc.edu', official: true },
            { title: 'ILCOR', desc: 'Consensus on CPR Science', url: 'https://www.ilcor.org' },
            { title: 'World Health Organization', desc: 'ETAT Guidelines', url: 'https://www.who.int' },
        ],
    },
    {
        title: 'Jurnal & Penelitian',
        icon: BookOpen,
        color: 'purple',
        refs: [
            { title: 'Pediatrics (AAP)', desc: 'Prevention of Choking Among Children', url: 'https://pediatrics.aappublications.org' },
            { title: 'Resuscitation Journal', desc: 'Chest Thrusts vs Back Blows', url: 'https://www.resuscitationjournal.com' },
            { title: 'Archives of Disease in Childhood', desc: 'Choking in Children: A Review', url: 'https://adc.bmj.com' },
        ],
    },
];

export default function ReferensiPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
                        <div className="badge badge-primary mb-4"><FileText className="w-4 h-4" />Referensi</div>
                        <h1 className="heading-2 mb-4">Berbasis <span className="text-gradient">Bukti Ilmiah</span></h1>
                        <p className="text-neutral-600">Semua materi berdasarkan pedoman resmi dan penelitian terkini</p>
                    </motion.div>
                </div>
            </section>

            {/* Badge */}
            <section className="py-6 bg-white border-b border-neutral-100">
                <div className="section-container max-w-4xl mx-auto">
                    <div className="card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4" style={{ background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))', color: 'white' }}>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><Shield className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                        <div>
                            <h3 className="font-bold text-sm sm:text-base">Evidence-Based Content</h3>
                            <p className="text-white/80 text-xs sm:text-sm">Semua materi telah diverifikasi sesuai standar internasional</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* References */}
            <section className="section-gap">
                <div className="section-container max-w-4xl mx-auto space-y-12">
                    {referenceCategories.map((category, catIndex) => (
                        <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIndex * 0.1 }}>
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${category.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : category.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                    <category.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{category.title}</h2>
                            </div>
                            <div className="grid gap-4">
                                {category.refs.map((ref, refIndex) => (
                                    <a key={refIndex} href={ref.url} target="_blank" rel="noopener noreferrer"
                                        className="card p-3 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4 group"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                                <h3 className="font-semibold text-neutral-900 text-sm sm:text-base break-words">{ref.title}</h3>
                                                {ref.official && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1 w-fit"><FileCheck className="w-3 h-3" />Resmi</span>}
                                            </div>
                                            <p className="text-xs sm:text-sm text-neutral-500 break-words">{ref.desc}</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Note */}
            <section className="pb-16">
                <div className="section-container max-w-4xl mx-auto">
                    <div className="card p-6 bg-amber-50 border-amber-200">
                        <h3 className="font-bold text-amber-800 mb-2">📚 Catatan Penting</h3>
                        <p className="text-amber-700 text-sm">
                            Informasi ini bersifat edukatif dan tidak menggantikan pelatihan resmi atau konsultasi medis profesional.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
