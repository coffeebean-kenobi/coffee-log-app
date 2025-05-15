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
  isReady: boolean;
};

const defaultContext: ThemeContextType = {
  currentTheme: lightTheme,
  mode: 'system',
  setMode: () => {},
  isDark: false,
  isReady: false,
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // クライアントサイドでのみ実行される初期値設定のためのフック
  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // サーバーサイドレンダリング時は常にライトモードから始める（一貫性のため）
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);
  
  // トランジションを無効にする関数
  const disableTransitions = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('no-transition');
      window.setTimeout(() => {
        document.documentElement.classList.remove('no-transition');
      }, 100);
    }
  };
  
  // クライアントサイドでのみ実行される処理を制御
  useEffect(() => {
    setIsClient(true);
    
    // トランジションを一時的に無効化（初期レンダリング時のチラつき防止）
    disableTransitions();
    
    // ローカルストレージからテーマモードを読み込む
    const savedMode = localStorage.getItem('theme-mode');
    if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
      setMode(savedMode as ThemeMode);
    }
    
    // システムのダークモード設定を検出して初期状態を設定
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (savedMode === 'system' || !savedMode) {
      setIsDark(mediaQuery.matches);
    } else {
      setIsDark(savedMode === 'dark');
    }
    
    // HTML要素にdata-theme属性を設定
    document.documentElement.setAttribute('data-theme', mediaQuery.matches && (savedMode === 'system' || !savedMode) || savedMode === 'dark' ? 'dark' : 'light');
    
    // システムのダークモード設定の変更を監視
    const handleChange = () => {
      if (mode === 'system') {
        setIsDark(mediaQuery.matches);
        document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    setIsReady(true); // すべての初期化が完了
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // モード変更時の処理
  useEffect(() => {
    if (!isClient) return;
    
    // トランジションを一時的に無効化（モード切替時のチラつき防止）
    disableTransitions();
    
    // ローカルストレージに保存
    localStorage.setItem('theme-mode', mode);
    
    // モードに応じてダークモード状態を更新
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
      document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
    } else {
      setIsDark(mode === 'dark');
      document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
    }
  }, [mode, isClient]);
  
  // 現在のテーマを設定
  const currentTheme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ currentTheme, mode, setMode, isDark, isReady }}>
      {children}
    </ThemeContext.Provider>
  );
}; 