import { naturalWarmTheme as theme } from '../../color-typography/natural-warm/theme';

export const HybridLayout = () => {
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
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize.h1,
            margin: 0,
          }}>
            Coffee Log
          </h1>
          <nav style={{
            display: 'flex',
            gap: theme.spacing.lg,
          }}>
            <button style={{
              color: theme.colors.background.main,
              background: 'none',
              border: 'none',
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body1,
              cursor: 'pointer',
              padding: theme.spacing.sm,
            }}>
              ホーム
            </button>
            <button style={{
              color: theme.colors.background.main,
              background: 'none',
              border: 'none',
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body1,
              cursor: 'pointer',
              padding: theme.spacing.sm,
            }}>
              ショップ
            </button>
            <button style={{
              color: theme.colors.background.main,
              background: 'none',
              border: 'none',
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body1,
              cursor: 'pointer',
              padding: theme.spacing.sm,
            }}>
              統計
            </button>
          </nav>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing.lg,
      }}>
        {/* フィーチャーセクション */}
        <div style={{
          marginBottom: theme.spacing.xl,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.paper,
            borderRadius: theme.borderRadius.lg,
            overflow: 'hidden',
            boxShadow: theme.shadows.md,
            display: 'flex',
            height: '400px',
          }}>
            <div style={{
              flex: 1,
              padding: theme.spacing.xl,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <h2 style={{
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize.h2,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.md,
              }}>
                今日の一杯
              </h2>
              <p style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.body1,
                lineHeight: theme.typography.lineHeight.body,
                marginBottom: theme.spacing.lg,
              }}>
                エチオピア イルガチェフェの柑橘系の酸味とジャスミンのような香りが特徴的な、洗練された一杯。
              </p>
              <button style={{
                backgroundColor: theme.colors.accent.main,
                color: theme.colors.background.main,
                padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
                borderRadius: theme.borderRadius.lg,
                border: 'none',
                fontFamily: theme.typography.fontFamily.body,
                fontSize: theme.typography.fontSize.body1,
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}>
                詳細を見る
              </button>
            </div>
            <div style={{
              flex: 1,
              backgroundImage: 'url("/coffee-placeholder.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          </div>
        </div>

        {/* 統計情報 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
        }}>
          <div style={{
            backgroundColor: theme.colors.background.paper,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary.light}`,
          }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.text.primary,
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
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary.light}`,
          }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.text.primary,
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
          <div style={{
            backgroundColor: theme.colors.background.paper,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            boxShadow: theme.shadows.md,
            border: `1px solid ${theme.colors.secondary.light}`,
          }}>
            <h3 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h4,
              color: theme.colors.text.primary,
              marginBottom: theme.spacing.sm,
            }}>
              総コーヒー数
            </h3>
            <p style={{
              fontSize: theme.typography.fontSize.h2,
              color: theme.colors.accent.main,
              margin: 0,
            }}>
              156杯
            </p>
          </div>
        </div>

        {/* 最近のログ */}
        <div style={{
          backgroundColor: theme.colors.background.paper,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          border: `1px solid ${theme.colors.secondary.light}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.secondary.light}`,
          }}>
            <h2 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h3,
              color: theme.colors.text.primary,
              margin: 0,
            }}>
              最近のコーヒーログ
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: theme.spacing.lg,
            padding: theme.spacing.lg,
          }}>
            {/* ログカード */}
            <div style={{
              backgroundColor: theme.colors.background.main,
              borderRadius: theme.borderRadius.lg,
              overflow: 'hidden',
              border: `1px solid ${theme.colors.secondary.light}`,
            }}>
              <div style={{
                height: '200px',
                backgroundImage: 'url("/coffee-placeholder.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div style={{ padding: theme.spacing.lg }}>
                <h3 style={{
                  fontFamily: theme.typography.fontFamily.heading,
                  fontSize: theme.typography.fontSize.h4,
                  color: theme.colors.text.primary,
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