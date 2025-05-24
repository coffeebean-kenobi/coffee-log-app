const { industrialRefinedTheme } = require('./src/design-samples/color-typography/industrial-refined/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
      extend: {
        colors: {
          primary: {
            main: industrialRefinedTheme.colors.primary.main,
            light: industrialRefinedTheme.colors.primary.light,
            dark: industrialRefinedTheme.colors.primary.dark,
          },
          secondary: {
            main: industrialRefinedTheme.colors.secondary.main,
            light: industrialRefinedTheme.colors.secondary.light,
            dark: industrialRefinedTheme.colors.secondary.dark,
          },
          accent: {
            main: industrialRefinedTheme.colors.accent.main,
            light: industrialRefinedTheme.colors.accent.light,
            dark: industrialRefinedTheme.colors.accent.dark,
          },
          background: {
            main: industrialRefinedTheme.colors.background.main,
            paper: industrialRefinedTheme.colors.background.paper,
            dark: industrialRefinedTheme.colors.background.dark,
          },
          text: {
            primary: industrialRefinedTheme.colors.text.primary,
            secondary: industrialRefinedTheme.colors.text.secondary,
            disabled: industrialRefinedTheme.colors.text.disabled,
            error: industrialRefinedTheme.colors.text.error,
          },
          highlight: {
            main: industrialRefinedTheme.colors.highlight.main,
            light: industrialRefinedTheme.colors.highlight.light,
            dark: industrialRefinedTheme.colors.highlight.dark,
          },
        },
        fontFamily: {
          sans: ['Noto Sans JP', 'Inter', 'sans-serif'],
          mono: ['Roboto Mono', 'monospace'],
        },
        fontSize: industrialRefinedTheme.typography.fontSize,
        fontWeight: industrialRefinedTheme.typography.fontWeight,
        letterSpacing: industrialRefinedTheme.typography.letterSpacing,
        lineHeight: industrialRefinedTheme.typography.lineHeight,
        spacing: industrialRefinedTheme.spacing,
        borderRadius: industrialRefinedTheme.borderRadius,
        boxShadow: {
          sm: industrialRefinedTheme.shadows.sm,
          md: industrialRefinedTheme.shadows.md,
          lg: industrialRefinedTheme.shadows.lg,
        },
      },
    },
    plugins: [],
  }