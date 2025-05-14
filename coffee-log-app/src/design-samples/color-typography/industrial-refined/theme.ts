export const industrialRefinedTheme = {
  colors: {
    primary: {
      main: '#1A1A1A',    // ダークチャコール
      light: '#333333',   // ミディアムグレー
      dark: '#000000',    // ブラック
    },
    accent: {
      main: '#C0C0C0',    // シルバー
      light: '#E0E0E0',   // ライトシルバー
      dark: '#808080',    // ダークシルバー
    },
    background: {
      main: '#F5F5F5',    // オフホワイト
      paper: '#FFFFFF',   // ホワイト
      dark: '#E0E0E0',    // ライトグレー
    },
    text: {
      primary: '#1A1A1A',   // ダークチャコール
      secondary: '#666666', // ミディアムグレー
      disabled: '#999999',  // ライトグレー
      error: '#dc2626',     // エラーメッセージ用の赤色
    },
    secondary: {
      main: '#4A4A4A',    // ダークグレー
      light: '#666666',   // ミディアムグレー
      dark: '#333333',    // ダークチャコール
    },
    highlight: {
      main: '#FFD700',    // ゴールド
      light: '#FFE44D',   // ライトゴールド
      dark: '#B8860B',    // ダークゴールド
    },
  },
  typography: {
    fontFamily: {
      heading: 'Inter, sans-serif',
      body: 'Roboto Mono, monospace',
    },
    fontSize: {
      h1: '2.5rem',
      h2: '2rem',
      h3: '1.75rem',
      h4: '1.5rem',
      h5: '1.25rem',
      h6: '1rem',
      body1: '1rem',
      body2: '0.875rem',
      caption: '0.75rem',
      button: '0.875rem',
    } as const,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      heading: 1.2,
      body: 1.5,
    },
    letterSpacing: {
      heading: '0.02em',
      body: '0.01em',
      button: '0.05em',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  borders: {
    thin: '1px solid #E0E0E0',
    medium: '2px solid #C0C0C0',
    thick: '3px solid #808080',
  },
  transitions: {
    fast: '150ms',
    medium: '300ms',
    slow: '500ms',
  },
}; 