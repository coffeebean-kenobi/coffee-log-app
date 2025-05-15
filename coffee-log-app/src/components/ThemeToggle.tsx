"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import { useThemeStyles } from '@/theme/utils';

export const ThemeToggle: React.FC = () => {
  const { mode, setMode, isDark, isReady } = useTheme();
  const styles = useThemeStyles();
  
  const handleToggle = () => {
    setMode(isDark ? 'light' : 'dark');
    // 即時にDOM属性を更新（レンダリングを待たずに視覚的な変更を即時反映）
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };
  
  const handleModeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
    // 即時にDOM属性を更新
    if (newMode === 'system') {
      const isDarkSystem = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', isDarkSystem ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', newMode);
    }
  };
  
  // コンポーネントが準備できていない場合は何も表示しない
  if (!isReady) {
    return <div className="w-20 h-8"></div>; // プレースホルダー
  }
  
  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className="p-2 rounded-md bg-transparent border-none cursor-pointer flex items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      >
        {isDark ? (
          // 太陽アイコン（ライトモードへ）
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          // 月アイコン（ダークモードへ）
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
      
      <div className="ml-2">
        <select
          value={mode}
          onChange={(e) => handleModeChange(e.target.value as 'light' | 'dark' | 'system')}
          className="px-2 py-1 rounded-md text-sm border border-gray-300 dark:border-gray-700 bg-background-paper dark:bg-background-paper text-text-primary dark:text-text-primary focus:outline-none focus:ring-1 focus:ring-primary-main"
        >
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
          <option value="system">システム設定</option>
        </select>
      </div>
    </div>
  );
}; 