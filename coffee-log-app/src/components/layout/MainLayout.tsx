import React, { useState, useEffect } from 'react';
import { theme } from '../../theme';
import { isMobile } from '../../utils/responsive';
import { getAnimationStyle } from '../../utils/animations';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [activeLink, setActiveLink] = useState<string>('/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // ウィンドウサイズの変更を監視
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(isMobile());
    };

    // 初期チェック
    checkMobile();

    // リサイズイベントリスナーを追加
    window.addEventListener('resize', checkMobile);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseEnter = (path: string) => {
    setActiveLink(path);
  };

  const handleMouseLeave = () => {
    // 現在のパスを取得する実装が必要ですが、ここではシンプルにしています
    setActiveLink('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background.main,
      fontFamily: theme.typography.fontFamily.body,
      color: theme.colors.text.primary,
      ...getAnimationStyle('fadeIn'),
    }}>
      <header style={{
        backgroundColor: theme.colors.primary.main,
        padding: theme.spacing.lg,
        borderBottom: theme.borders.medium,
        boxShadow: theme.shadows.md,
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.header,
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            margin: 0,
            color: theme.colors.background.paper,
            fontFamily: theme.typography.fontFamily.heading,
            fontSize: isMobileView ? theme.typography.fontSize.h3 : theme.typography.fontSize.h1,
            letterSpacing: theme.typography.letterSpacing.heading,
            fontWeight: theme.typography.fontWeight.bold,
            transition: theme.transitions.medium,
          }}>
            Coffee Log
          </h1>

          {/* モバイルメニューボタン */}
          {isMobileView && (
            <button 
              onClick={toggleMobileMenu}
              style={{
                background: 'transparent',
                border: 'none',
                color: theme.colors.background.paper,
                fontSize: theme.typography.fontSize.h3,
                cursor: 'pointer',
                padding: theme.spacing.sm,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: theme.touchTarget.min,
                minHeight: theme.touchTarget.min,
              }}
              aria-label="メニュー"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          )}

          {/* デスクトップナビゲーション */}
          {!isMobileView && (
            <nav>
              <ul style={{
                display: 'flex',
                gap: theme.spacing.lg,
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}>
                <li>
                  <a 
                    href="/" 
                    style={{
                      color: theme.colors.background.paper,
                      textDecoration: 'none',
                      fontSize: theme.typography.fontSize.body1,
                      transition: theme.transitions.fast,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderBottom: activeLink === '/' ? `2px solid ${theme.colors.accent.main}` : '2px solid transparent',
                      fontWeight: activeLink === '/' ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
                    }}
                    onMouseEnter={() => handleMouseEnter('/')}
                    onMouseLeave={handleMouseLeave}
                  >
                    ホーム
                  </a>
                </li>
                <li>
                  <a 
                    href="/logs" 
                    style={{
                      color: theme.colors.background.paper,
                      textDecoration: 'none',
                      fontSize: theme.typography.fontSize.body1,
                      transition: theme.transitions.fast,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderBottom: activeLink === '/logs' ? `2px solid ${theme.colors.accent.main}` : '2px solid transparent',
                      fontWeight: activeLink === '/logs' ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
                    }}
                    onMouseEnter={() => handleMouseEnter('/logs')}
                    onMouseLeave={handleMouseLeave}
                  >
                    ログ一覧
                  </a>
                </li>
                <li>
                  <a 
                    href="/settings" 
                    style={{
                      color: theme.colors.background.paper,
                      textDecoration: 'none',
                      fontSize: theme.typography.fontSize.body1,
                      transition: theme.transitions.fast,
                      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                      borderBottom: activeLink === '/settings' ? `2px solid ${theme.colors.accent.main}` : '2px solid transparent',
                      fontWeight: activeLink === '/settings' ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
                    }}
                    onMouseEnter={() => handleMouseEnter('/settings')}
                    onMouseLeave={handleMouseLeave}
                  >
                    設定
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {/* モバイルメニュー */}
        {isMobileView && mobileMenuOpen && (
          <nav style={{
            backgroundColor: theme.colors.primary.main,
            padding: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderRadius: theme.borderRadius.sm,
            boxShadow: theme.shadows.md,
            animation: theme.animations.slideUp,
          }}>
            <ul style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
            }}>
              <li>
                <a 
                  href="/" 
                  style={{
                    color: theme.colors.background.paper,
                    textDecoration: 'none',
                    fontSize: theme.typography.fontSize.body1,
                    padding: theme.spacing.md,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: activeLink === '/' ? theme.colors.primary.light : 'transparent',
                    minHeight: theme.touchTarget.min,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ホーム
                </a>
              </li>
              <li>
                <a 
                  href="/logs" 
                  style={{
                    color: theme.colors.background.paper,
                    textDecoration: 'none',
                    fontSize: theme.typography.fontSize.body1,
                    padding: theme.spacing.md,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: activeLink === '/logs' ? theme.colors.primary.light : 'transparent',
                    minHeight: theme.touchTarget.min,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ログ一覧
                </a>
              </li>
              <li>
                <a 
                  href="/settings" 
                  style={{
                    color: theme.colors.background.paper,
                    textDecoration: 'none',
                    fontSize: theme.typography.fontSize.body1,
                    padding: theme.spacing.md,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: theme.borderRadius.sm,
                    backgroundColor: activeLink === '/settings' ? theme.colors.primary.light : 'transparent',
                    minHeight: theme.touchTarget.min,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  設定
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobileView ? theme.spacing.md : theme.spacing.xl,
        animation: theme.animations.fadeIn,
      }}>
        {children}
      </main>
    </div>
  );
}; 