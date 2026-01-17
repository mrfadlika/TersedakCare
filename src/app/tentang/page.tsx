'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Info, Heart, Target, Shield, BookOpen, GraduationCap, Award, Users } from 'lucide-react';

const features = [
    { icon: Shield, title: 'Evidence-Based', desc: 'Pedoman AHA, ERC, Kemenkes' },
    { icon: Users, title: 'Sesuai Usia', desc: 'Bayi, balita, anak' },
    { icon: BookOpen, title: 'Komprehensif', desc: 'Penanganan & pencegahan' },
    { icon: Award, title: 'Gratis', desc: 'Akses penuh tanpa biaya' },
];

const stats = [
    { value: '3', label: 'Kategori Usia' },
    { value: '6+', label: 'Modul Belajar' },
    { value: '15+', label: 'Soal Assessment' },
    { value: '15+', label: 'Referensi' },
];

export default function TentangPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            {/* Header */}
            <section className="py-12 lg:py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto">
                        <div className="badge badge-primary mb-4"><Info className="w-4 h-4" />Tentang</div>
                        <h1 className="heading-2 mb-4">Tentang <span className="text-gradient">Tersedak Care</span></h1>
                        <p className="text-neutral-600">Aplikasi edukasi penanganan tersedak pada anak berbasis bukti ilmiah</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-8 bg-white border-b border-neutral-100">
                <div className="section-container max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="card-dark p-8 lg:p-10 text-center"
                    >
                        <Target className="w-10 h-10 mx-auto mb-4 text-primary-400" />
                        <h2 className="text-xl lg:text-2xl font-bold mb-4">Misi Kami</h2>
                        <p className="text-neutral-300 max-w-xl mx-auto">
                            Menyediakan akses mudah ke pengetahuan penanganan tersedak yang <strong className="text-white">benar dan terstandar</strong>.
                            Karena setiap detik sangat berharga dalam situasi darurat.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="section-gap">
                <div className="section-container max-w-4xl mx-auto">
                    <h2 className="heading-3 text-center mb-10">Mengapa Tersedak Care?</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {features.map((feature, index) => (
                            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                className="card-feature text-center"
                            >
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                                    <feature.icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                                <p className="text-sm text-neutral-500">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-white">
                <div className="section-container max-w-4xl mx-auto">
                    <div className="card p-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            {stats.map((stat, index) => (
                                <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                    <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                                    <div className="text-sm text-neutral-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-12">
                <div className="section-container max-w-4xl mx-auto text-center">
                    <div className="card p-8">
                        <Users className="w-10 h-10 mx-auto mb-4 text-neutral-400" />
                        <h3 className="font-semibold text-neutral-900 mb-1">Dikembangkan oleh</h3>
                        <p className="text-primary-600 font-bold text-xl">Intechrest</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pb-16">
                <div className="section-container max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="card-emergency p-8 lg:p-10 text-center"
                    >
                        <Heart className="w-10 h-10 mx-auto mb-4 text-white/90" />
                        <h2 className="text-xl lg:text-2xl font-bold mb-3">Siap Melindungi Anak Anda?</h2>
                        <p className="text-white/80 mb-6 max-w-md mx-auto">Mulai belajar sekarang</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/darurat" className="btn btn-lg" style={{ background: 'white', color: '#e03131' }}>Mode Darurat</Link>
                            <Link href="/login?redirect=/belajar" className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                                <GraduationCap className="w-5 h-5" />Mulai Belajar
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
