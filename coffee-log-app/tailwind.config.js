const { industrialRefinedTheme } = require('./src/design-samples/color-typography/industrial-refined/theme');
const { darkTheme } = require('./src/theme/dark-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-noto-sans)'],
          heading: [industrialRefinedTheme.typography.fontFamily.heading],
          body: [industrialRefinedTheme.typography.fontFamily.body],
        },
        colors: {
          background: {
            DEFAULT: industrialRefinedTheme.colors.background.main,
            main: industrialRefinedTheme.colors.background.main,
            paper: industrialRefinedTheme.colors.background.paper,
            dark: industrialRefinedTheme.colors.background.dark,
          },
          foreground: industrialRefinedTheme.colors.text.primary,
          primary: {
            DEFAULT: industrialRefinedTheme.colors.primary.main,
            main: industrialRefinedTheme.colors.primary.main,
            light: industrialRefinedTheme.colors.primary.light,
            dark: industrialRefinedTheme.colors.primary.dark,
            foreground: industrialRefinedTheme.colors.background.paper,
          },
          secondary: {
            DEFAULT: industrialRefinedTheme.colors.secondary.main,
            main: industrialRefinedTheme.colors.secondary.main,
            light: industrialRefinedTheme.colors.secondary.light,
            dark: industrialRefinedTheme.colors.secondary.dark,
            foreground: industrialRefinedTheme.colors.background.paper,
          },
          accent: {
            DEFAULT: industrialRefinedTheme.colors.accent.main,
            main: industrialRefinedTheme.colors.accent.main,
            light: industrialRefinedTheme.colors.accent.light,
            dark: industrialRefinedTheme.colors.accent.dark,
            foreground: industrialRefinedTheme.colors.text.primary,
          },
          muted: {
            DEFAULT: industrialRefinedTheme.colors.background.dark,
            foreground: industrialRefinedTheme.colors.text.secondary,
          },
          card: {
            DEFAULT: industrialRefinedTheme.colors.background.paper,
            foreground: industrialRefinedTheme.colors.text.primary,
          },
          text: {
            primary: industrialRefinedTheme.colors.text.primary,
            secondary: industrialRefinedTheme.colors.text.secondary,
            disabled: industrialRefinedTheme.colors.text.disabled,
            error: industrialRefinedTheme.colors.text.error,
          },
          border: industrialRefinedTheme.colors.accent.light,
        },
        spacing: {
          'xs': industrialRefinedTheme.spacing.xs,
          'sm': industrialRefinedTheme.spacing.sm,
          'md': industrialRefinedTheme.spacing.md,
          'lg': industrialRefinedTheme.spacing.lg,
          'xl': industrialRefinedTheme.spacing.xl,
        },
        borderRadius: {
          'sm': industrialRefinedTheme.borderRadius.sm,
          'md': industrialRefinedTheme.borderRadius.md,
          'lg': industrialRefinedTheme.borderRadius.lg,
        },
        boxShadow: {
          'sm': industrialRefinedTheme.shadows.sm,
          'md': industrialRefinedTheme.shadows.md,
          'lg': industrialRefinedTheme.shadows.lg,
        },
        fontSize: {
          'h1': industrialRefinedTheme.typography.fontSize.h1,
          'h2': industrialRefinedTheme.typography.fontSize.h2,
          'h3': industrialRefinedTheme.typography.fontSize.h3,
          'h4': industrialRefinedTheme.typography.fontSize.h4,
          'h5': industrialRefinedTheme.typography.fontSize.h5,
          'h6': industrialRefinedTheme.typography.fontSize.h6,
          'body1': industrialRefinedTheme.typography.fontSize.body1,
          'body2': industrialRefinedTheme.typography.fontSize.body2,
          'caption': industrialRefinedTheme.typography.fontSize.caption,
          'button': industrialRefinedTheme.typography.fontSize.button,
        },
        fontWeight: {
          'light': industrialRefinedTheme.typography.fontWeight.light,
          'regular': industrialRefinedTheme.typography.fontWeight.regular,
          'medium': industrialRefinedTheme.typography.fontWeight.medium,
          'bold': industrialRefinedTheme.typography.fontWeight.bold,
        },
        lineHeight: {
          'heading': industrialRefinedTheme.typography.lineHeight.heading,
          'body': industrialRefinedTheme.typography.lineHeight.body,
        },
        letterSpacing: {
          'heading': industrialRefinedTheme.typography.letterSpacing.heading,
          'body': industrialRefinedTheme.typography.letterSpacing.body,
          'button': industrialRefinedTheme.typography.letterSpacing.button,
        },
        transitionDuration: {
          'fast': industrialRefinedTheme.transitions.fast,
          'medium': industrialRefinedTheme.transitions.medium,
          'slow': industrialRefinedTheme.transitions.slow,
        },
        screens: {
          'mobile': `max-width: ${industrialRefinedTheme.breakpoints.mobile}`,
          'tablet': `max-width: ${industrialRefinedTheme.breakpoints.tablet}`,
          'desktop': `min-width: ${industrialRefinedTheme.breakpoints.desktop}`,
        },
      },
    },
    plugins: [],
  }