import { modernMinimalTheme as theme } from '../../color-typography/modern-minimal/theme';

export const ListBasedLayout = () => {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      minHeight: '100vh',
      fontFamily: theme.typography.fontFamily.body,
    }}>
      {/* ヘッダー */}
      <header style={{
        backgroundColor: theme.colors.background.paper,
        padding: theme.spacing.lg,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: theme.shadows.sm,
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize.h1,
            color: theme.colors.primary.main,
            margin: 0,
          }}>
            Coffee Log
          </h1>
          <button style={{
            backgroundColor: theme.colors.accent.main,
            color: theme.colors.background.paper,
            padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
            borderRadius: theme.borderRadius.md,
            border: 'none',
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            cursor: 'pointer',
          }}>
            新規ログ
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: theme.spacing.lg,
      }}>
        {/* 統計情報 */}
        <div style={{
          display: 'flex',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.paper,
          borderRadius: theme.borderRadius.md,
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h5,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xs,
            }}>
              今週のコーヒー
            </h3>
            <p style={{
              fontSize: theme.typography.fontSize.h3,
              color: theme.colors.primary.main,
              margin: 0,
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              12杯
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h5,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.xs,
            }}>
              お気に入りショップ
            </h3>
            <p style={{
              fontSize: theme.typography.fontSize.h3,
              color: theme.colors.primary.main,
              margin: 0,
              fontWeight: theme.typography.fontWeight.bold,
            }}>
              5店舗
            </p>
          </div>
        </div>

        {/* コーヒーログリスト */}
        <div style={{
          backgroundColor: theme.colors.background.paper,
          borderRadius: theme.borderRadius.md,
          overflow: 'hidden',
        }}>
          {/* リストヘッダー */}
          <div style={{
            padding: theme.spacing.md,
            borderBottom: `1px solid ${theme.colors.background.dark}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h2 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.primary.main,
              margin: 0,
            }}>
              最近のコーヒーログ
            </h2>
            <select style={{
              padding: theme.spacing.xs,
              border: `1px solid ${theme.colors.background.dark}`,
              borderRadius: theme.borderRadius.sm,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body2,
            }}>
              <option>最新順</option>
              <option>評価順</option>
            </select>
          </div>

          {/* リストアイテム */}
          <div style={{
            borderBottom: `1px solid ${theme.colors.background.dark}`,
            padding: theme.spacing.md,
            display: 'flex',
            gap: theme.spacing.md,
            alignItems: 'center',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: theme.colors.secondary.main,
              borderRadius: theme.borderRadius.sm,
              backgroundImage: 'url("/coffee-placeholder.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize.h5,
                color: theme.colors.primary.main,
                margin: 0,
                marginBottom: theme.spacing.xs,
              }}>
                エチオピア イルガチェフェ
              </h3>
              <p style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.body2,
                margin: 0,
                marginBottom: theme.spacing.xs,
              }}>
                柑橘系の酸味とジャスミンのような香りが特徴的な、洗練された一杯。
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.caption,
                }}>
                  2024年3月15日
                </span>
                <div style={{
                  display: 'flex',
                  gap: theme.spacing.xs,
                }}>
                  <span style={{
                    color: theme.colors.accent.main,
                    fontSize: theme.typography.fontSize.body2,
                  }}>
                    ★★★★☆
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}; 