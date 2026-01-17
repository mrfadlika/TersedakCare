'use client';

import React from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { X, Type, Eye, Zap } from 'lucide-react';

interface AccessibilityControlsProps {
    onClose?: () => void;
}

const fontSizeOptions = [
    { value: 'normal', label: 'Normal', size: 'text-sm' },
    { value: 'large', label: 'Besar', size: 'text-base' },
    { value: 'xlarge', label: 'Sangat Besar', size: 'text-lg' },
] as const;

export default function AccessibilityControls({ onClose }: AccessibilityControlsProps) {
    const {
        fontSize,
        highContrast,
        reducedMotion,
        setFontSize,
        setHighContrast,
        setReducedMotion,
    } = useAccessibility();

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-neutral-900">Aksesibilitas</h3>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                        aria-label="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Font Size */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <Type className="w-4 h-4" />
                    Ukuran Teks
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {fontSizeOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setFontSize(option.value)}
                            className={`px-3 py-2 rounded-lg font-medium transition-all ${option.size} ${fontSize === option.value
                                    ? 'bg-primary-500 text-white shadow-primary'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-200 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900 text-sm">Kontras Tinggi</p>
                        <p className="text-xs text-neutral-500">Warna lebih tegas</p>
                    </div>
                </div>
                <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${highContrast ? 'bg-primary-500' : 'bg-neutral-300'
                        }`}
                    aria-label={highContrast ? 'Matikan kontras tinggi' : 'Aktifkan kontras tinggi'}
                >
                    <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${highContrast ? 'translate-x-5' : 'translate-x-0'
                            }`}
                    />
                </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-200 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900 text-sm">Kurangi Animasi</p>
                        <p className="text-xs text-neutral-500">Untuk sensitif gerakan</p>
                    </div>
                </div>
                <button
                    onClick={() => setReducedMotion(!reducedMotion)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${reducedMotion ? 'bg-primary-500' : 'bg-neutral-300'
                        }`}
                    aria-label={reducedMotion ? 'Aktifkan animasi' : 'Kurangi animasi'}
                >
                    <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${reducedMotion ? 'translate-x-5' : 'translate-x-0'
                            }`}
                    />
                </button>
            </div>

            {/* Info */}
            <p className="text-xs text-neutral-500 text-center">
                Pengaturan akan tersimpan di perangkat Anda
            </p>
        </div>
    );
}
