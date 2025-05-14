"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme, Theme } from './index';

type ThemeContextType = {
  currentTheme: Theme;
  setTheme?: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({ currentTheme: theme });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setTheme] = useState<Theme>(theme);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 