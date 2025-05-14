import React, { useState } from 'react';
import { vintageRetroTheme as theme } from './theme';

export const VintageRetroComponents: React.FC = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      padding: theme.spacing.xl,
      fontFamily: theme.typography.fontFamily.body,
      minHeight: '100vh',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23DEB887\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.accent.light,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xl,
        boxShadow: theme.shadows.md,
        border: `2px solid ${theme.colors.accent.main}`
      }}>
        <h1 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h1,
          margin: 0,
          textAlign: 'center',
          letterSpacing: '0.05em'
        }}>Coffee Log</h1>
      </header>

      {/* カード */}
      <div style={{
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.xl,
        boxShadow: theme.shadows.sm,
        border: `1px solid ${theme.colors.primary.light}`,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '20px',
          backgroundColor: theme.colors.accent.main,
          color: theme.colors.primary.dark,
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          borderRadius: theme.borderRadius.sm,
          fontSize: theme.typography.fontSize.caption,
          fontWeight: theme.typography.fontWeight.bold
        }}>
          Today's Pick
        </div>
        <h2 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h2,
          color: theme.colors.primary.main,
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.md
        }}>Today's Coffee</h2>
        <p style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.body1,
          lineHeight: theme.typography.lineHeight.body,
          fontStyle: 'italic'
        }}>
          エチオピア イルガチェフェのフルーツのような甘さと、バランスの取れた酸味が特徴的な一杯。
        </p>
      </div>

      {/* ボタン */}
      <button 
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={{
          backgroundColor: isButtonHovered ? theme.colors.accent.light : theme.colors.accent.main,
          color: theme.colors.primary.dark,
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          border: `2px solid ${theme.colors.primary.main}`,
          borderRadius: theme.borderRadius.md,
          fontFamily: theme.typography.fontFamily.body,
          fontSize: theme.typography.fontSize.button,
          fontWeight: theme.typography.fontWeight.medium,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: isButtonHovered ? theme.shadows.md : theme.shadows.sm,
          transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)'
        }}
      >
        Add New Log
      </button>

      {/* フォーム */}
      <div style={{
        marginTop: theme.spacing.xl,
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadows.sm,
        border: `1px solid ${theme.colors.primary.light}`
      }}>
        <h3 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h3,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md,
          borderBottom: `2px solid ${theme.colors.accent.main}`,
          paddingBottom: theme.spacing.sm
        }}>Coffee Details</h3>
        <input
          type="text"
          placeholder="Coffee Name"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            marginBottom: theme.spacing.md,
            border: `1px solid ${theme.colors.primary.light}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            backgroundColor: theme.colors.background.main
          }}
        />
        <textarea
          placeholder="Notes"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colors.primary.light}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            minHeight: '100px',
            backgroundColor: theme.colors.background.main
          }}
        />
      </div>
    </div>
  );
}; 