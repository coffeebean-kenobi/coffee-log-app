import { classicElegantTheme as theme } from '../../color-typography/classic-elegant/theme';

export const CardBasedLayout = () => {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      minHeight: '100vh',
      fontFamily: theme.typography.fontFamily.body,
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: theme.colors.primary.main,
        color: theme.colors.background.main,
        padding: theme.spacing.lg,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <h1 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h1,
          margin: 0,
        }}>
          Coffee Log
        </h1>
      </header>

      {/* メインコンテンツ */}
      <main style={{
        padding: theme.spacing.lg,
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* 統計情報カード */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.paper,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            boxShadow: theme.shadows.md,
          }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.primary.main,
              marginBottom: theme.spacing.sm,
            }}>
              今週のコーヒー
            </h3>
            <p style={{
              fontSize: theme.typography.fontSize.h2,
              color: theme.colors.accent.main,
              margin: 0,
            }}>
              12杯
            </p>
          </div>
          <div style={{
            backgroundColor: theme.colors.background.paper,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            boxShadow: theme.shadows.md,
          }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.primary.main,
              marginBottom: theme.spacing.sm,
            }}>
              お気に入りショップ
            </h3>
            <p style={{
              fontSize: theme.typography.fontSize.h2,
              color: theme.colors.accent.main,
              margin: 0,
            }}>
              5店舗
            </p>
          </div>
        </div>

        {/* 最近のコーヒーログ */}
        <h2 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h2,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.lg,
        }}>
          最近のコーヒーログ
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.lg,
        }}>
          {/* コーヒーログカード */}
          <div style={{
            backgroundColor: theme.colors.background.paper,
            borderRadius: theme.borderRadius.md,
            boxShadow: theme.shadows.md,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '200px',
              backgroundColor: theme.colors.secondary.main,
              backgroundImage: 'url("/coffee-placeholder.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ padding: theme.spacing.lg }}>
              <h3 style={{
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize.h4,
                color: theme.colors.primary.main,
                marginBottom: theme.spacing.sm,
              }}>
                エチオピア イルガチェフェ
              </h3>
              <p style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.body1,
                marginBottom: theme.spacing.md,
              }}>
                柑橘系の酸味とジャスミンのような香りが特徴的な、洗練された一杯。
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  color: theme.colors.accent.main,
                  fontSize: theme.typography.fontSize.body2,
                }}>
                  2024年3月15日
                </span>
                <button style={{
                  backgroundColor: theme.colors.accent.main,
                  color: theme.colors.background.main,
                  padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                  borderRadius: theme.borderRadius.full,
                  border: 'none',
                  fontFamily: theme.typography.fontFamily.body,
                  fontSize: theme.typography.fontSize.body2,
                  cursor: 'pointer',
                }}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* フローティングアクションボタン */}
      <button style={{
        position: 'fixed',
        bottom: theme.spacing.xl,
        right: theme.spacing.xl,
        backgroundColor: theme.colors.accent.main,
        color: theme.colors.background.main,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        boxShadow: theme.shadows.lg,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
      }}>
        +
      </button>
    </div>
  );
}; 