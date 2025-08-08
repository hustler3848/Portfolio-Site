
"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

type Theme = "theme-dark" | "theme-light" | "theme-minimal-beige";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { name: string; value: Theme }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('theme-dark');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.body.className = theme;
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const setTheme = (newTheme: Theme) => {
    if (theme === newTheme) return;
    setThemeState(newTheme);
  };

  const themes = [
    { name: 'Default', value: 'theme-dark' as Theme },
    { name: 'Light', value: 'theme-light' as Theme },
    { name: 'Beige', value: 'theme-minimal-beige' as Theme },
  ];

  const value = useMemo(() => ({ theme, setTheme, themes }), [theme]);

  if (!isMounted) {
    // Prevent rendering of children on the server and during initial hydration
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
