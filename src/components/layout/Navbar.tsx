'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Heart, ChevronRight, Home, AlertTriangle, FileText, Info, LogIn, LogOut, User, BookOpen, GraduationCap, Award, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type NavLink = {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    emergency?: boolean;
};

// Public links - shown when logged out
const publicLinks: NavLink[] = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/darurat', label: 'Darurat', icon: AlertTriangle, emergency: true },
    { href: '/referensi', label: 'Referensi', icon: FileText },
    { href: '/tentang', label: 'Tentang', icon: Info },
];

// Protected links - shown when logged in
const protectedLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/materi', label: 'Materi', icon: BookOpen },
    { href: '/belajar', label: 'Belajar', icon: GraduationCap },
    { href: '/assessment', label: 'Assessment', icon: Award },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { isAuthenticated, user, logout, isLoading } = useAuth();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [pathname]);

    const navLinks = isAuthenticated ? protectedLinks : publicLinks;

    return (
        <header className={`navbar ${scrolled ? 'shadow-lg' : ''}`}>
            <div className="section-container">
                <nav className="navbar-content">
                    {/* Logo */}
                    <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-1 min-[320px]:gap-2 sm:gap-3 group">
                        <div className="relative flex-shrink-0">
                            <div className="w-7 h-7 min-[320px]:w-8 min-[320px]:h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#e03131] to-[#c92a2a] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:shadow-red-500/40 transition-shadow">
                                <Heart className="w-3.5 h-3.5 min-[320px]:w-4 min-[320px]:h-4 sm:w-5 sm:h-5 text-white" fill="white" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="hidden min-[360px]:block">
                            <span className="font-bold text-sm min-[360px]:text-base sm:text-lg text-neutral-900">
                                Tersedak<span className="text-primary-600">Care</span>
                            </span>
                            <span className="text-[9px] min-[360px]:text-[10px] sm:text-xs text-neutral-400 block">
                                {isAuthenticated ? 'Learning Portal' : 'Panduan Tersedak'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? 'active' : ''} ${link.emergency ? 'text-emergency-600 hover:bg-emergency-50' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Darurat link always visible */}
                        {isAuthenticated && (
                            <Link href="/darurat" className="nav-link text-emergency-600 hover:bg-emergency-50">
                                Darurat
                            </Link>
                        )}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-1 min-[320px]:gap-1.5 sm:gap-3">
                        {/* Auth Button */}
                        {!isLoading && (
                            isAuthenticated ? (
                                <div className="hidden sm:flex items-center gap-3">
                                    <span className="text-sm text-neutral-600 flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-full">
                                        <User className="w-4 h-4" />
                                        {user?.name}
                                    </span>
                                    <button onClick={logout} className="btn btn-sm btn-outline">
                                        <LogOut className="w-4 h-4" />
                                        Keluar
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="hidden sm:flex btn btn-sm btn-primary">
                                    <LogIn className="w-4 h-4" />
                                </Link>
                            )
                        )}

                        <a href="tel:119" className="btn btn-sm btn-emergency !px-2 min-[320px]:!px-3 sm:!px-4">
                            <Phone className="w-3.5 h-3.5 min-[320px]:w-4 min-[320px]:h-4" />
                            <span className="hidden min-[400px]:inline">119</span>
                        </a>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-1.5 min-[320px]:p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-neutral-100 transition-colors"
                        >
                            {isOpen ? <X className="w-4 h-4 min-[320px]:w-5 min-[320px]:h-5" /> : <Menu className="w-4 h-4 min-[320px]:w-5 min-[320px]:h-5" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-neutral-100 shadow-xl"
                    >
                        <div className="section-container py-4 space-y-1" style={{ paddingBottom: '20px' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl ${pathname === link.href ? 'bg-primary-50 text-primary-600' : 'hover:bg-neutral-50 text-neutral-700'
                                        } ${link.emergency ? 'text-emergency-600 bg-emergency-50' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon className="w-5 h-5" />
                                        <span className="font-medium">{link.label}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                                </Link>
                            ))}

                            {/* Darurat always visible in mobile */}
                            {isAuthenticated && (
                                <Link href="/darurat" className="flex items-center justify-between px-4 py-3 rounded-xl text-emergency-600 bg-emergency-50">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-5 h-5" />
                                        <span className="font-medium">Darurat</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            )}

                            <div className="pt-4 border-t border-neutral-100">
                                {isAuthenticated ? (
                                    <button onClick={logout} className="btn btn-outline w-full justify-center">
                                        <LogOut className="w-5 h-5" />
                                        Keluar
                                    </button>
                                ) : (
                                    <Link href="/login" className="btn btn-primary w-full justify-center">
                                        <LogIn className="w-5 h-5" />
                                        Masuk
                                    </Link>
                                )}
                            </div>

                            <div className="pt-2">
                                <a href="tel:119" className="btn btn-emergency w-full justify-center">
                                    <Phone className="w-5 h-5" />
                                    Panggil 119
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
