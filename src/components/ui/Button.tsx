'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-[#0891b2] hover:bg-[#0e7490] text-white font-semibold
    shadow-[0_10px_40px_-10px_rgba(6,182,212,0.5)]
    hover:shadow-[0_15px_50px_-10px_rgba(6,182,212,0.6)]
    hover:-translate-y-0.5
  `,
    secondary: `
    bg-[#1e293b] hover:bg-[#0f172a] text-white font-semibold
    shadow-[0_10px_30px_-10px_rgba(15,23,42,0.4)]
    hover:shadow-[0_15px_40px_-10px_rgba(15,23,42,0.5)]
    hover:-translate-y-0.5
  `,
    emergency: `
    bg-[#e03131] hover:bg-[#c92a2a] text-white font-semibold
    shadow-[0_10px_40px_-10px_rgba(224,49,49,0.5)]
    hover:shadow-[0_15px_50px_-10px_rgba(224,49,49,0.6)]
    hover:-translate-y-0.5
  `,
    outline: `
    bg-transparent border-2 border-[#cbd5e1] text-[#334155] font-semibold
    hover:border-[#0891b2] hover:text-[#0891b2] hover:bg-[#ecfeff]
  `,
    ghost: `
    bg-transparent text-[#475569] font-medium
    hover:bg-[#f1f5f9]
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm gap-1.5 rounded-lg',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3 text-base gap-2.5 rounded-xl',
    xl: 'px-8 py-4 text-lg gap-3 rounded-2xl',
};

const iconSizes: Record<ButtonSize, number> = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
};

export default function Button({
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`
        inline-flex items-center justify-center
        transition-all duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0891b2] focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${variantStyles[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg
                        className="animate-spin"
                        width={iconSizes[size]}
                        height={iconSizes[size]}
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Memuat...</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && (
                        <Icon size={iconSizes[size]} />
                    )}
                    {children}
                    {Icon && iconPosition === 'right' && (
                        <Icon size={iconSizes[size]} />
                    )}
                </>
            )}
        </motion.button>
    );
}
