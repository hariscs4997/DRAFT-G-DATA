'use client';

import React, { useState, createContext, useEffect, useContext, useMemo } from 'react';
import { Theme } from '@/types';
import { getInitialTheme } from '@/lib/theme';

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};
interface IProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.LIGHT,
  setTheme: () => {},
});

function ThemeProvider({ children }: IProps) {
  const [theme, setTheme] = useState(getInitialTheme());
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  const checkTheme = (existing: string) => {
    const root = window.document.documentElement;
    const isDark = existing === Theme.DARK;

    root.classList.remove(isDark ? Theme.LIGHT : Theme.DARK);
    root.classList.add(existing);

    localStorage.setItem('current-theme', existing);
  };

  useEffect(() => {
    checkTheme(theme);
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
