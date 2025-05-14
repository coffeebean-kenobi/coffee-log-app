export const urbanIndustrialTheme = {
  colors: {
    primary: {
      main: '#2C3E50',    // ダークブルーグレー
      light: '#34495E',
      dark: '#1A252F',
    },
    accent: {
      main: '#E74C3C',    // コーラルレッド
      light: '#EC7063',
      dark: '#C0392B',
    },
    background: {
      main: '#ECF0F1',    // ライトグレー
      paper: '#FFFFFF',
      dark: '#BDC3C7',
    },
    text: {
      primary: '#2C3E50',  // ダークブルーグレー
      secondary: '#7F8C8D', // ミディアムグレー
      disabled: '#95A5A6',  // ライトグレー
    },
    secondary: {
      main: '#3498DB',    // ブライトブルー
      light: '#5DADE2',
      dark: '#2980B9',
    },
  },
  typography: {
    fontFamily: {
      heading: 'Montserrat, sans-serif',
      body: 'Roboto, sans-serif',
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
      button: '0.875rem',
      caption: '0.75rem',
    } as const,
    fontWeight: {
      heading: 700,
      body: 400,
      bold: 700,
      medium: 500,
    },
    lineHeight: {
      heading: 1.2,
      body: 1.5,
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
    sm: '2px',
    md: '4px',
    lg: '8px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
}; 