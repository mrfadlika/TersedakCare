'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'xlarge';
  highContrast: boolean;
  reducedMotion: boolean;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setHighContrast: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrastState] = useState(false);
  const [reducedMotion, setReducedMotionState] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const savedFontSize = localStorage.getItem('a11y-fontSize') as 'normal' | 'large' | 'xlarge';
    const savedHighContrast = localStorage.getItem('a11y-highContrast') === 'true';
    const savedReducedMotion = localStorage.getItem('a11y-reducedMotion') === 'true';
    
    if (savedFontSize) setFontSizeState(savedFontSize);
    if (savedHighContrast) setHighContrastState(savedHighContrast);
    if (savedReducedMotion) setReducedMotionState(savedReducedMotion);
  }, []);

  useEffect(() => {
    // Apply to document
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-high-contrast', String(highContrast));
    document.documentElement.setAttribute('data-reduced-motion', String(reducedMotion));
  }, [fontSize, highContrast, reducedMotion]);

  const setFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSizeState(size);
    localStorage.setItem('a11y-fontSize', size);
  };

  const setHighContrast = (value: boolean) => {
    setHighContrastState(value);
    localStorage.setItem('a11y-highContrast', String(value));
  };

  const setReducedMotion = (value: boolean) => {
    setReducedMotionState(value);
    localStorage.setItem('a11y-reducedMotion', String(value));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        reducedMotion,
        setFontSize,
        setHighContrast,
        setReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
