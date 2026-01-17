'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, LogIn, ArrowLeft, AlertCircle, User, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function LoginForm() {
    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (isRegister) {
            if (password !== confirmPassword) {
                setError('Password tidak sama');
                setIsLoading(false);
                return;
            }
            const result = await register(name, email, password);
            if (result.success) {
                router.push(redirectTo);
            } else {
                setError(result.error || 'Registrasi gagal');
            }
        } else {
            const result = await login(email, password);
            if (result.success) {
                router.push(redirectTo);
            } else {
                setError(result.error || 'Login gagal');
            }
        }

        setIsLoading(false);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Back Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Beranda</span>
                </Link>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-10">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#e03131] to-[#c92a2a] rounded-xl flex items-center justify-center shadow-lg">
                                <Heart className="w-6 h-6 text-white" fill="white" />
                            </div>
                            <span className="font-bold text-2xl text-neutral-900">
                                Tersedak<span className="text-primary-600">Care</span>
                            </span>
                        </div>
                        <h1 className="text-xl font-bold text-neutral-900 mb-2">
                            {isRegister ? 'Buat Akun Baru' : 'Masuk ke Akun'}
                        </h1>
                        <p className="text-neutral-500">
                            {isRegister ? 'Daftar untuk menyimpan progress belajar' : 'Login untuk mengakses materi dan assessment'}
                        </p>
                    </div>

                    {/* Toggle Tabs */}
                    <div className="flex bg-neutral-100 rounded-xl p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => setIsRegister(false)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isRegister ? 'bg-white shadow text-neutral-900' : 'text-neutral-500'
                                }`}
                        >
                            Masuk
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsRegister(true)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isRegister ? 'bg-white shadow text-neutral-900' : 'text-neutral-500'
                                }`}
                        >
                            Daftar
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-6">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isRegister && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nama Anda"
                                        className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        required={isRegister}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@contoh.com"
                                    className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Konfirmasi Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        required={isRegister}
                                        minLength={6}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn btn-primary py-3 justify-center disabled:opacity-60"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Memproses...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isRegister ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                                    {isRegister ? 'Daftar' : 'Masuk'}
                                </span>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-neutral-400 text-sm mt-6">
                    {isRegister
                        ? 'Dengan mendaftar, Anda menyetujui ketentuan penggunaan aplikasi'
                        : 'Dengan login, Anda menyetujui ketentuan penggunaan aplikasi'
                    }
                </p>
            </motion.div>
        </main>
    );
}

function LoginFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginFallback />}>
            <LoginForm />
        </Suspense>
    );
}
