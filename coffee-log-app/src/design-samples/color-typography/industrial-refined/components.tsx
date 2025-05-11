import React, { useState } from 'react';
import { industrialRefinedTheme as theme } from './theme';

export const IndustrialRefinedComponents: React.FC = () => {
  const [showNewLog, setShowNewLog] = useState(false);

  const NewLogForm = () => (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: theme.spacing.xl,
      backgroundColor: theme.colors.background.paper,
      borderRadius: theme.borderRadius.sm,
      border: theme.borders.thin,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <h2 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h2,
          margin: 0,
          color: theme.colors.primary.main,
        }}>新規ログ</h2>
        <button
          onClick={() => setShowNewLog(false)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: theme.typography.fontSize.h4,
            color: theme.colors.text.secondary,
            cursor: 'pointer',
            padding: theme.spacing.sm,
          }}
        >
          ×
        </button>
      </div>

      <form style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: theme.spacing.sm,
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.body2,
          }}>
            コーヒー名
          </label>
          <input
            type="text"
            style={{
              width: '100%',
              padding: theme.spacing.md,
              border: theme.borders.thin,
              borderRadius: theme.borderRadius.sm,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body1,
            }}
            placeholder="例：エチオピア イルガチェフェ"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: theme.spacing.sm,
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.body2,
          }}>
            抽出方法
          </label>
          <select style={{
            width: '100%',
            padding: theme.spacing.md,
            border: theme.borders.thin,
            borderRadius: theme.borderRadius.sm,
            fontFamily: theme.typography.fontFamily.body,
            fontSize: theme.typography.fontSize.body1,
            backgroundColor: theme.colors.background.paper,
          }}>
            <option>ドリップ</option>
            <option>エスプレッソ</option>
            <option>フレンチプレス</option>
            <option>エアロプレス</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: theme.spacing.sm,
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.body2,
          }}>
            メモ
          </label>
          <textarea
            style={{
              width: '100%',
              padding: theme.spacing.md,
              border: theme.borders.thin,
              borderRadius: theme.borderRadius.sm,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body1,
              minHeight: '120px',
              resize: 'vertical',
            }}
            placeholder="コーヒーの特徴や感想を記録..."
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: theme.spacing.md,
          marginTop: theme.spacing.lg,
        }}>
          <button
            onClick={() => setShowNewLog(false)}
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.xl}`,
              border: theme.borders.thin,
              borderRadius: theme.borderRadius.sm,
              backgroundColor: theme.colors.background.paper,
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.button,
              cursor: 'pointer',
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            style={{
              padding: `${theme.spacing.md} ${theme.spacing.xl}`,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.background.paper,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.button,
              cursor: 'pointer',
            }}
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );

  if (showNewLog) {
    return <NewLogForm />;
  }

  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      minHeight: '100vh',
      color: theme.colors.text.primary
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing.xl,
      }}>
        {/* ヘッダー */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${theme.spacing.md} 0`,
          borderBottom: theme.borders.medium,
          marginBottom: theme.spacing.xl
        }}>
          <h1 style={{
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: theme.typography.fontSize.h1,
            margin: 0,
            letterSpacing: theme.typography.letterSpacing.heading,
            color: theme.colors.primary.main
          }}>Coffee Log</h1>
          <button 
            onClick={() => setShowNewLog(true)}
            style={{
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.background.paper,
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              border: 'none',
              borderRadius: theme.borderRadius.sm,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.button,
              fontWeight: theme.typography.fontWeight.medium,
              letterSpacing: theme.typography.letterSpacing.button,
              cursor: 'pointer',
              transition: theme.transitions.fast
            }}
          >
            + NEW LOG
          </button>
        </header>

        {/* フィルターとソート */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.paper,
          border: theme.borders.thin,
          borderRadius: theme.borderRadius.sm
        }}>
          <div style={{ display: 'flex', gap: theme.spacing.md }}>
            <select style={{
              border: theme.borders.thin,
              padding: theme.spacing.sm,
              backgroundColor: theme.colors.background.paper,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body2
            }}>
              <option>すべてのコーヒー</option>
              <option>エチオピア</option>
              <option>コロンビア</option>
              <option>ブラジル</option>
            </select>
            <select style={{
              border: theme.borders.thin,
              padding: theme.spacing.sm,
              backgroundColor: theme.colors.background.paper,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: theme.typography.fontSize.body2
            }}>
              <option>最新順</option>
              <option>評価順</option>
              <option>名前順</option>
            </select>
          </div>
          <div style={{
            fontSize: theme.typography.fontSize.caption,
            color: theme.colors.text.secondary
          }}>
            全12件
          </div>
        </div>

        {/* リスト */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.md
        }}>
          {/* リストアイテム */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: theme.spacing.lg,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background.paper,
            border: theme.borders.thin,
            borderRadius: theme.borderRadius.sm,
            transition: theme.transitions.fast,
            cursor: 'pointer',
            ':hover': {
              borderColor: theme.colors.accent.main,
              boxShadow: theme.shadows.sm
            }
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: theme.colors.background.dark,
              borderRadius: theme.borderRadius.sm,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.caption
            }}>
              PHOTO
            </div>
            <div>
              <h3 style={{
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize.h4,
                margin: `0 0 ${theme.spacing.xs} 0`,
                color: theme.colors.primary.main
              }}>エチオピア イルガチェフェ</h3>
              <p style={{
                margin: 0,
                fontSize: theme.typography.fontSize.body1,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.body
              }}>
                フルーツのような甘さと、バランスの取れた酸味が特徴的な一杯。
              </p>
              <div style={{
                display: 'flex',
                gap: theme.spacing.md,
                marginTop: theme.spacing.sm,
                fontSize: theme.typography.fontSize.body2,
                color: theme.colors.text.disabled
              }}>
                <span>2024/03/15</span>
                <span>評価: ★★★★☆</span>
                <span>抽出方法: ドリップ</span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: theme.colors.primary.main,
              fontSize: theme.typography.fontSize.h2,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              →
            </div>
          </div>

          {/* 2つ目のリストアイテム */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: theme.spacing.lg,
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background.paper,
            border: theme.borders.thin,
            borderRadius: theme.borderRadius.sm,
            transition: theme.transitions.fast,
            cursor: 'pointer',
            ':hover': {
              borderColor: theme.colors.accent.main,
              boxShadow: theme.shadows.sm
            }
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              backgroundColor: theme.colors.background.dark,
              borderRadius: theme.borderRadius.sm,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.caption
            }}>
              PHOTO
            </div>
            <div>
              <h3 style={{
                fontFamily: theme.typography.fontFamily.heading,
                fontSize: theme.typography.fontSize.h4,
                margin: `0 0 ${theme.spacing.xs} 0`,
                color: theme.colors.primary.main
              }}>コロンビア スプレモ</h3>
              <p style={{
                margin: 0,
                fontSize: theme.typography.fontSize.body1,
                color: theme.colors.text.secondary,
                lineHeight: theme.typography.lineHeight.body
              }}>
                ナッツのような香りと、まろやかな口当たりが特徴。
              </p>
              <div style={{
                display: 'flex',
                gap: theme.spacing.md,
                marginTop: theme.spacing.sm,
                fontSize: theme.typography.fontSize.body2,
                color: theme.colors.text.disabled
              }}>
                <span>2024/03/14</span>
                <span>評価: ★★★★☆</span>
                <span>抽出方法: エスプレッソ</span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: theme.colors.primary.main,
              fontSize: theme.typography.fontSize.h2,
              fontWeight: theme.typography.fontWeight.bold
            }}>
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 