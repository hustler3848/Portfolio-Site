"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

type Theme = "theme-dark" | "theme-light" | "theme-cyberpunk" | "theme-beige";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  themes: { name: string; value: Theme }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const hexToHsl = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0% 0%';
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `${h} ${s}% ${l}%`;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('theme-dark');
  const [accentColor, setAccentColorState] = useState('#00f6ff');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const storedAccent = localStorage.getItem('accentColor');
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    if (storedAccent) {
      setAccentColorState(storedAccent);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.className = theme;
      localStorage.setItem('theme', theme);
      const root = document.documentElement;
      root.style.setProperty('--accent', hexToHsl(accentColor));
      root.style.setProperty('--ring', hexToHsl(accentColor));
      root.style.setProperty('--primary', hexToHsl(accentColor));
    }
  }, [theme, accentColor, isMounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
    localStorage.setItem('accentColor', color);
  };

  const themes = [
    { name: 'Default', value: 'theme-dark' as Theme },
    { name: 'Light', value: 'theme-light' as Theme },
    { name: 'Cyberpunk', value: 'theme-cyberpunk' as Theme },
    { name: 'Beige', value: 'theme-beige' as Theme }
  ];

  const value = useMemo(() => ({ theme, setTheme, accentColor, setAccentColor, themes }), [theme, accentColor]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
