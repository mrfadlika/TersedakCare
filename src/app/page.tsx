'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Shield,
  Phone,
  ArrowRight,
  Sparkles,
  Clock,
  Award,
  Users,
} from 'lucide-react';

const stats = [
  { value: '3.9M+', label: 'Kasus/Tahun', icon: AlertTriangle },
  { value: '<4min', label: 'Waktu Kritis', icon: Clock },
  { value: '119', label: 'Nomor Darurat', icon: Phone },
  { value: '95%+', label: 'Dapat Dicegah', icon: Shield },
];

const ageCategories = [
  { id: 'bayi', name: 'Bayi', age: '0-12 Bulan', icon: '👶', technique: 'Back Blows & Chest Thrusts' },
  { id: 'balita', name: 'Balita', age: '1-3 Tahun', icon: '🧒', technique: 'Abdominal Thrusts' },
  { id: 'anak', name: 'Anak', age: '3+ Tahun', icon: '👦', technique: 'Heimlich Maneuver' },
];

const features = [
  { icon: Shield, title: 'Evidence-Based', desc: 'Berdasarkan pedoman resmi AHA, ERC, dan Kemenkes RI' },
  { icon: BookOpen, title: 'Materi Lengkap', desc: 'Panduan penanganan untuk setiap kelompok usia anak' },
  { icon: GraduationCap, title: 'Assessment', desc: 'Pre-test dan post-test untuk mengukur pemahaman' },
  { icon: Award, title: 'Gratis & Terbuka', desc: 'Akses penuh ke semua fitur tanpa biaya apapun' },
];

export default function HomePage() {
  // Mouse tracking state for interactive background
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* Hero Section with Mouse Following Effect */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
        style={{
          background: `
            radial-gradient(
              800px circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(6, 182, 212, 0.12),
              transparent 40%
            ),
            radial-gradient(
              600px circle at ${mousePosition.x + 15}% ${mousePosition.y + 15}%,
              rgba(168, 85, 247, 0.08),
              transparent 40%
            ),
            radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, #f8fafc 0%, white 100%)
          `
        }}
      >
        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-4 h-4 bg-cyan-400/20 rounded-full blur-sm"
            style={{
              left: `${mousePosition.x * 0.7}%`,
              top: `${mousePosition.y * 0.7}%`,
              transition: 'all 0.4s ease-out'
            }}
          />
          <div
            className="absolute w-6 h-6 bg-purple-400/15 rounded-full blur-md"
            style={{
              left: `${mousePosition.x * 1.2}%`,
              top: `${mousePosition.y * 1.2}%`,
              transition: 'all 0.6s ease-out'
            }}
          />
          <div
            className="absolute w-3 h-3 bg-primary-400/25 rounded-full blur-sm"
            style={{
              left: `${100 - mousePosition.x * 0.5}%`,
              top: `${mousePosition.y * 0.9}%`,
              transition: 'all 0.5s ease-out'
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto py-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-neutral-700">Evidence-Based Practice</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="heading-1 mb-6"
            >
              Panduan Penanganan{' '}
              <span className="text-gradient">Tersedak</span>{' '}
              pada Anak
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-neutral-600 text-lg mb-10 max-w-xl mx-auto"
            >
              Pelajari cara menangani anak tersedak dengan <strong>benar, cepat, dan aman</strong>.
              Aplikasi edukasi berbasis bukti ilmiah untuk orang tua dan tenaga kesehatan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/darurat" className="btn btn-lg btn-emergency">
                <AlertTriangle className="w-5 h-5" />
                Mode Darurat
              </Link>
              <Link href="/login?redirect=/belajar" className="btn btn-lg btn-secondary">
                <GraduationCap className="w-5 h-5" />
                Mulai Belajar
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-3" />
                <div className="text-2xl lg:text-3xl font-bold text-neutral-900">{stat.value}</div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Categories */}
      <section className="section-gap bg-neutral-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="badge badge-primary mb-4">
              <Users className="w-3.5 h-3.5" />
              Kategori Usia
            </div>
            <h2 className="heading-2 mb-4">Pilih Sesuai Usia Anak</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Teknik penanganan berbeda untuk setiap kelompok usia
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ageCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/login?redirect=/materi/${cat.id}`} className="age-card block">
                  <span className="age-card-icon">{cat.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-neutral-900 text-lg">{cat.name}</div>
                    <div className="text-sm text-neutral-500">{cat.age}</div>
                    <div className="text-xs text-primary-600 font-medium mt-1">{cat.technique}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-gap bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Kenapa Tersedak Care?</h2>
            <p className="text-neutral-600 max-w-md mx-auto">
              Aplikasi edukasi terlengkap untuk penanganan tersedak pada anak
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-feature text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="section-gap bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-emergency text-center py-16 px-8"
          >
            <Phone className="w-12 h-12 mx-auto mb-4 text-white/90" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Dalam Keadaan Darurat?
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Jika anak tidak sadar atau tidak bernapas, segera hubungi layanan darurat medis
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:119" className="btn btn-lg" style={{ background: 'white', color: '#e03131' }}>
                <Phone className="w-5 h-5" />
                Panggil 119
              </a>
              <Link href="/darurat" className="btn btn-lg btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                <AlertTriangle className="w-5 h-5" />
                Mode Darurat
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-gap bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/login?redirect=/materi" className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <div className="font-bold text-neutral-900">Materi Edukasi</div>
                <div className="text-sm text-neutral-500">Baca panduan lengkap</div>
              </div>
            </Link>
            <Link href="/login?redirect=/belajar" className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <div className="font-bold text-neutral-900">Modul Belajar</div>
                <div className="text-sm text-neutral-500">Step-by-step learning</div>
              </div>
            </Link>
            <Link href="/login?redirect=/assessment" className="card p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <Award className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-neutral-900">Assessment</div>
                <div className="text-sm text-neutral-500">Uji pengetahuan Anda</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
