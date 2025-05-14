import React from 'react';
import { theme } from '../../theme';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background.main,
      fontFamily: theme.typography.fontFamily.body,
      color: theme.colors.text.primary,
    }}>
      <header style={{
        backgroundColor: theme.colors.primary.main,
        padding: theme.spacing.lg,
        borderBottom: theme.borders.medium,
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
            fontSize: theme.typography.fontSize.h1,
            letterSpacing: theme.typography.letterSpacing.heading,
          }}>
            Coffee Log
          </h1>
          <nav>
            <ul style={{
              display: 'flex',
              gap: theme.spacing.lg,
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}>
              <li>
                <a href="/" style={{
                  color: theme.colors.background.paper,
                  textDecoration: 'none',
                  fontSize: theme.typography.fontSize.body1,
                  transition: theme.transitions.fast,
                }}>
                  ホーム
                </a>
              </li>
              <li>
                <a href="/logs" style={{
                  color: theme.colors.background.paper,
                  textDecoration: 'none',
                  fontSize: theme.typography.fontSize.body1,
                  transition: theme.transitions.fast,
                }}>
                  ログ一覧
                </a>
              </li>
              <li>
                <a href="/settings" style={{
                  color: theme.colors.background.paper,
                  textDecoration: 'none',
                  fontSize: theme.typography.fontSize.body1,
                  transition: theme.transitions.fast,
                }}>
                  設定
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing.xl,
      }}>
        {children}
      </main>
    </div>
  );
}; 