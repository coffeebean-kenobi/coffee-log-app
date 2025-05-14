import { classicElegantTheme as theme } from './theme';

export const ClassicElegantComponents = () => {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      padding: theme.spacing.xl,
      fontFamily: theme.typography.fontFamily.body,
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.background.main,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xl,
      }}>
        <h1 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h1,
          margin: 0,
        }}>
          Coffee Log
        </h1>
      </header>

      {/* カード */}
      <div style={{
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        boxShadow: theme.shadows.md,
        marginBottom: theme.spacing.xl,
      }}>
        <h2 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h3,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md,
        }}>
          Today's Coffee
        </h2>
        <p style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.body1,
          lineHeight: theme.typography.lineHeight.body,
        }}>
          A perfectly brewed cup of Ethiopian Yirgacheffe with notes of citrus and jasmine.
        </p>
      </div>

      {/* ボタン */}
      <button style={{
        backgroundColor: theme.colors.accent.main,
        color: theme.colors.background.main,
        padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
        borderRadius: theme.borderRadius.full,
        border: 'none',
        fontFamily: theme.typography.fontFamily.body,
        fontSize: theme.typography.fontSize.body1,
        fontWeight: theme.typography.fontWeight.medium,
        cursor: 'pointer',
        marginBottom: theme.spacing.xl,
      }}>
        Add New Log
      </button>

      {/* 入力フォーム */}
      <div style={{
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        boxShadow: theme.shadows.sm,
      }}>
        <h3 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h4,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.md,
        }}>
          Coffee Details
        </h3>
        <input
          type="text"
          placeholder="Coffee Name"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            marginBottom: theme.spacing.md,
            border: `1px solid ${theme.colors.secondary.main}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
          }}
        />
        <textarea
          placeholder="Notes"
          style={{
            width: '100%',
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colors.secondary.main}`,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            minHeight: '100px',
          }}
        />
      </div>
    </div>
  );
}; 