import React from 'react';
import { urbanIndustrialTheme as theme } from './theme';

export const UrbanIndustrialComponents: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      padding: theme.spacing.xl,
      fontFamily: theme.typography.fontFamily.body,
      minHeight: '100vh'
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
        boxShadow: theme.shadows.md
      }}>
        <h1 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h1,
          margin: 0
        }}>Coffee Log</h1>
      </header>

      {/* カード */}
      <div style={{
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
        boxShadow: theme.shadows.sm
      }}>
        <h2 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h2,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md
        }}>Today's Coffee</h2>
        <p style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.body1,
          lineHeight: theme.typography.lineHeight.body
        }}>
          エチオピア イルガチェフェのフルーツのような甘さと、バランスの取れた酸味が特徴的な一杯。
        </p>
      </div>

      {/* ボタン */}
      <button style={{
        backgroundColor: theme.colors.accent.main,
        color: theme.colors.background.paper,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        border: 'none',
        borderRadius: theme.borderRadius.sm,
        fontFamily: theme.typography.fontFamily.body,
        fontSize: theme.typography.fontSize.button,
        fontWeight: theme.typography.fontWeight.medium,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: theme.colors.accent.dark
        }
      }}>
        Add New Log
      </button>

      {/* フォーム */}
      <div style={{
        marginTop: theme.spacing.xl,
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        boxShadow: theme.shadows.sm
      }}>
        <h3 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h3,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md
        }}>Coffee Details</h3>
        <input
          type="text"
          placeholder="Coffee Name"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            marginBottom: theme.spacing.md,
            border: `1px solid ${theme.colors.background.dark}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1
          }}
        />
        <textarea
          placeholder="Notes"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colors.background.dark}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            minHeight: '100px'
          }}
        />
      </div>
    </div>
  );
}; 