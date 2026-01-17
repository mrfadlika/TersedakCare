'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Phone, ExternalLink } from 'lucide-react';

const quickLinks = [
    { href: '/darurat', label: 'Mode Darurat' },
    { href: '/materi', label: 'Materi Edukasi' },
    { href: '/belajar', label: 'Modul Belajar' },
    { href: '/assessment', label: 'Assessment' },
];

const references = [
    { name: 'AHA Guidelines', url: 'https://www.heart.org' },
    { name: 'ERC Guidelines', url: 'https://www.erc.edu' },
    { name: 'Kemenkes RI', url: 'https://www.kemkes.go.id' },
    { name: 'IDAI', url: 'https://www.idai.or.id' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#e03131] to-[#c92a2a] rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" fill="white" />
                            </div>
                            <span className="font-bold text-xl text-white">
                                Tersedak<span className="text-primary-400">Care</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Aplikasi edukasi kesehatan berbasis bukti ilmiah untuk penanganan tersedak pada anak.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Menu</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="footer-link">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* References */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Referensi</h4>
                        <ul className="space-y-3">
                            {references.map((ref) => (
                                <li key={ref.name}>
                                    <a
                                        href={ref.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="footer-link inline-flex items-center gap-1"
                                    >
                                        {ref.name}
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Darurat</h4>
                        <a
                            href="tel:119"
                            className="flex items-center gap-3 p-4 bg-[#e03131]/20 border border-[#e03131]/30 rounded-xl mb-4 hover:bg-[#e03131]/30 transition-colors"
                        >
                            <Phone className="w-5 h-5 text-[#ff6b6b]" />
                            <div>
                                <span className="text-white font-bold text-lg">119</span>
                                <p className="text-[#ffa8a8] text-xs">Ambulans</p>
                            </div>
                        </a>
                        <a
                            href="tel:112"
                            className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <Phone className="w-5 h-5 text-neutral-400" />
                            <div>
                                <span className="text-white font-bold text-lg">112</span>
                                <p className="text-neutral-400 text-xs">Darurat Nasional</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8">
                    <div className="bg-neutral-800/50 rounded-xl p-4 mb-8">
                        <p className="text-neutral-400 text-xs leading-relaxed text-center">
                            <strong className="text-neutral-300">Disclaimer:</strong> Informasi dalam aplikasi ini bersifat edukatif dan
                            tidak menggantikan konsultasi medis profesional. Dalam keadaan darurat, segera hubungi layanan
                            medis terdekat atau nomor darurat 119.
                        </p>
                    </div>
                    <div className="text-center text-neutral-500 text-sm">
                        <p>© 2026 Tersedak Care. Dikembangkan oleh Intechrest.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
