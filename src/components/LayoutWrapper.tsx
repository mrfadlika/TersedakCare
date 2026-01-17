'use client';

import { ReactNode } from 'react';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';

interface LayoutWrapperProps {
    children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
    return (
        <AuthProvider>
            <AccessibilityProvider>
                <ScrollToTop />
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1 pt-16 lg:pt-20">{children}</main>
                    <Footer />
                </div>
            </AccessibilityProvider>
        </AuthProvider>
    );
}
