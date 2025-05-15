"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { theme as lightTheme, Theme } from './index';
import { darkTheme } from './dark-theme';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  currentTheme: Theme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const defaultContext: ThemeContextType = {
  currentTheme: lightTheme,
  mode: 'system',
  setMode: () => {},
  isDark: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);
  
  // ローカルストレージからテーマモードを読み込む
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
        setMode(savedMode as ThemeMode);
      }
    }
  }, []);
  
  // システムのダークモード設定を検出
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        if (mode === 'system') {
          setIsDark(mediaQuery.matches);
        }
      };
      
      // 初期設定
      if (mode === 'system') {
        setIsDark(mediaQuery.matches);
      } else {
        setIsDark(mode === 'dark');
      }
      
      // 変更の監視
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);
  
  // モード変更時にローカルストレージに保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', mode);
    }
  }, [mode]);
  
  // HTML要素にdata-theme属性を設定
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);
  
  // 現在のテーマを設定
  const currentTheme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ currentTheme, mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}; 