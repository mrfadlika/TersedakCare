'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
};

export default function Modal({
    isOpen,
    onClose,
    title,
    size = 'md',
    children,
    showCloseButton = true,
    closeOnBackdrop = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Focus trap
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeOnBackdrop ? onClose : undefined}
                        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50"
                        aria-hidden="true"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className={`
                relative w-full ${sizeClasses[size]}
                bg-white rounded-2xl shadow-2xl
                max-h-[90vh] overflow-hidden
                focus:outline-none
              `}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={title ? 'modal-title' : undefined}
                            tabIndex={-1}
                        >
                            {/* Header */}
                            {(title || showCloseButton) && (
                                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                                    {title && (
                                        <h2 id="modal-title" className="text-lg font-bold text-neutral-900">
                                            {title}
                                        </h2>
                                    )}
                                    {showCloseButton && (
                                        <button
                                            onClick={onClose}
                                            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors ml-auto"
                                            aria-label="Tutup modal"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

// Alert/Toast Component
interface AlertProps {
    type: 'warning' | 'danger' | 'info' | 'success';
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const alertClasses = {
    warning: 'bg-accent-50 border-accent-500 text-accent-700',
    danger: 'bg-primary-50 border-primary-500 text-primary-700',
    info: 'bg-secondary-50 border-secondary-500 text-secondary-700',
    success: 'bg-success-50 border-success-500 text-success-600',
};

export function Alert({ type, title, children, className = '' }: AlertProps) {
    return (
        <div
            className={`
        flex flex-col gap-1 p-4 rounded-xl border-l-4
        ${alertClasses[type]}
        ${className}
      `}
            role="alert"
        >
            {title && <strong className="font-semibold">{title}</strong>}
            <div className="text-sm">{children}</div>
        </div>
    );
}

// Progress Bar
interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'secondary' | 'success';
}

const progressColors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-success-500 to-success-600',
};

const progressSizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
};

export function ProgressBar({
    value,
    max = 100,
    showLabel = false,
    size = 'md',
    color = 'primary'
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className="w-full">
            <div className={`w-full bg-neutral-200 rounded-full overflow-hidden ${progressSizes[size]}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${progressColors[color]} rounded-full`}
                />
            </div>
            {showLabel && (
                <p className="text-sm text-neutral-600 mt-1 text-right">
                    {Math.round(percentage)}%
                </p>
            )}
        </div>
    );
}
