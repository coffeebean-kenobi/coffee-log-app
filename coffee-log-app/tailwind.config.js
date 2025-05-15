const { industrialRefinedTheme } = require('./src/design-samples/color-typography/industrial-refined/theme');
const { darkTheme } = require('./src/theme/dark-theme');

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
        fontFamily: {
          sans: ['var(--font-noto-sans)'],
          heading: [industrialRefinedTheme.typography.fontFamily.heading],
          body: [industrialRefinedTheme.typography.fontFamily.body],
        },
        colors: {
          background: {
            DEFAULT: 'var(--color-background-main)',
            main: 'var(--color-background-main)',
            paper: 'var(--color-background-paper)',
            dark: 'var(--color-background-dark)',
          },
          foreground: 'var(--color-text-primary)',
          primary: {
            DEFAULT: 'var(--color-primary-main)',
            main: 'var(--color-primary-main)',
            light: 'var(--color-primary-light)',
            dark: 'var(--color-primary-dark)',
            foreground: 'var(--color-background-paper)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary-main)',
            main: 'var(--color-secondary-main)',
            light: 'var(--color-secondary-light)',
            dark: 'var(--color-secondary-dark)',
            foreground: 'var(--color-background-paper)',
          },
          accent: {
            DEFAULT: 'var(--color-accent-main)',
            main: 'var(--color-accent-main)',
            light: 'var(--color-accent-light)',
            dark: 'var(--color-accent-dark)',
            foreground: 'var(--color-text-primary)',
          },
          muted: {
            DEFAULT: 'var(--color-background-dark)',
            foreground: 'var(--color-text-secondary)',
          },
          card: {
            DEFAULT: 'var(--color-background-paper)',
            foreground: 'var(--color-text-primary)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            disabled: 'var(--color-text-disabled)',
            error: 'var(--color-text-error)',
          },
          border: 'var(--color-accent-light)',
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