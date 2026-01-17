'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CardProps extends HTMLMotionProps<'div'> {
    variant?: 'default' | 'glass' | 'feature' | 'emergency';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

interface CardHeaderProps {
    icon?: LucideIcon;
    iconClassName?: string;
    title: string;
    subtitle?: string;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

const variantClasses = {
    default: `
    bg-white border border-neutral-100 shadow-md
  `,
    glass: `
    bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg
  `,
    feature: `
    bg-white border border-neutral-100 shadow-md
    hover:shadow-xl hover:border-primary-100 hover:-translate-y-1
  `,
    emergency: `
    bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-2xl
  `,
};

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export function Card({
    variant = 'default',
    hover = false,
    padding = 'md',
    children,
    className = '',
    ...props
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4 } : undefined}
            className={`
        rounded-2xl transition-all duration-300
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className}
      `}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ icon: Icon, iconClassName, title, subtitle }: CardHeaderProps) {
    return (
        <div className="mb-4">
            {Icon && (
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconClassName || 'bg-primary-100 text-primary-600'}`}>
                    <Icon className="w-6 h-6" />
                </div>
            )}
            <h3 className="font-bold text-lg text-inherit">{title}</h3>
            {subtitle && (
                <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
            )}
        </div>
    );
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return (
        <div className={`text-neutral-600 ${className}`}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`mt-4 pt-4 border-t border-neutral-100 ${className}`}>
            {children}
        </div>
    );
}

// Age Badge Component
type AgeBadgeType = 'bayi' | 'balita' | 'anak';

interface AgeBadgeProps {
    type: AgeBadgeType;
    className?: string;
}

const ageBadgeClasses = {
    bayi: 'bg-accent-100 text-accent-700',
    balita: 'bg-secondary-100 text-secondary-700',
    anak: 'bg-success-100 text-success-600',
};

const ageBadgeLabels = {
    bayi: '0-1 Tahun',
    balita: '1-3 Tahun',
    anak: '3+ Tahun',
};

export function AgeBadge({ type, className = '' }: AgeBadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5 px-3 py-1
        text-sm font-semibold rounded-full
        ${ageBadgeClasses[type]}
        ${className}
      `}
        >
            {ageBadgeLabels[type]}
        </span>
    );
}

// Step Indicator
interface StepIndicatorProps {
    number: number;
    size?: 'sm' | 'md' | 'lg';
    active?: boolean;
    completed?: boolean;
}

export function StepIndicator({ number, size = 'md', active = false, completed = false }: StepIndicatorProps) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-lg',
        lg: 'w-16 h-16 text-2xl',
    };

    return (
        <div
            className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center font-bold
        transition-all duration-300
        ${completed
                    ? 'bg-success-500 text-white'
                    : active
                        ? 'bg-primary-500 text-white shadow-primary'
                        : 'bg-neutral-200 text-neutral-500'
                }
      `}
        >
            {completed ? '✓' : number}
        </div>
    );
}
