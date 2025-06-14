'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    
    getUser();

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'var(--color-background-paper)',
      borderBottom: '1px solid var(--color-accent-main)',
    }}>
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-text-primary dark:text-text-primary no-underline flex items-center gap-2" onClick={closeMobileMenu}>
            <Image src="/LOG.png" alt="LOGCUP" width={40} height={40} />
            <Typography variant="h5">LOGCUP</Typography>
          </Link>
          
          <div className="flex items-center gap-4">
            {/* デスクトップナビゲーション */}
            <nav className="hidden md:flex items-center gap-4">
              {!loading && user ? (
                <>
                  <Link 
                    href="/coffee" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/coffee') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">コーヒー一覧</Typography>
                  </Link>
                  <Link 
                    href="/coffee/add" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/coffee/add') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">新規追加</Typography>
                  </Link>
                  <Link 
                    href="/analytics" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/analytics') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">分析</Typography>
                  </Link>
                  <Link 
                    href="/profile" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/profile') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">プロフィール</Typography>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-md transition-colors text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark"
                  >
                    <Typography variant="body1">ログアウト</Typography>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/signin') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">ログイン</Typography>
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/signup') 
                        ? 'bg-accent-light dark:bg-accent-dark text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-accent-light dark:hover:bg-accent-dark'
                    }`}
                  >
                    <Typography variant="body1">ユーザー登録</Typography>
                  </Link>
                </>
              )}
            </nav>

            <ThemeToggle />

            {/* モバイルメニューボタン */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md transition-all duration-200"
              aria-label="メニュー"
              style={{ 
                minWidth: '44px', 
                minHeight: '44px',
                backgroundColor: 'transparent',
                border: '2px solid var(--color-accent-main)',
                color: 'var(--color-text-primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <span className="block w-6 h-6 relative">
                <span 
                  className={`block absolute h-0.5 w-6 transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'}`}
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                ></span>
                <span 
                  className={`block absolute h-0.5 w-6 transform transition duration-300 ease-in-out translate-y-2 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                ></span>
                <span 
                  className={`block absolute h-0.5 w-6 transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-4'}`}
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                ></span>
              </span>
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden"
            style={{
              borderTop: '2px solid var(--color-accent-main)',
              backgroundColor: 'var(--color-background-paper)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <nav className="py-4 space-y-2">
              {!loading && user ? (
                <>
                  <Link 
                    href="/coffee" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/coffee') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/coffee') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/coffee') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/coffee') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/coffee')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/coffee')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">コーヒー一覧</Typography>
                  </Link>
                  <Link 
                    href="/coffee/add" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/coffee/add') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/coffee/add') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/coffee/add') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/coffee/add') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/coffee/add')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/coffee/add')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">新規追加</Typography>
                  </Link>
                  <Link 
                    href="/analytics" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/analytics') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/analytics') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/analytics') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/analytics') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/analytics')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/analytics')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">分析</Typography>
                  </Link>
                  <Link 
                    href="/profile" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/profile') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/profile') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/profile') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/profile') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/profile')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/profile')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">プロフィール</Typography>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-3 rounded-md transition-all duration-200"
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: 'transparent',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <Typography variant="body1">ログアウト</Typography>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/signin') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/signin') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/signin') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/signin') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/signin')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/signin')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">ログイン</Typography>
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`block px-3 py-3 rounded-md transition-all duration-200 ${
                      isActive('/signup') 
                        ? '' 
                        : ''
                    }`}
                    onClick={closeMobileMenu}
                    style={{ 
                      minHeight: '44px',
                      backgroundColor: isActive('/signup') ? 'var(--color-primary-main)' : 'transparent',
                      color: isActive('/signup') ? 'var(--color-background-paper)' : 'var(--color-text-primary)',
                      border: isActive('/signup') ? 'none' : '1px solid var(--color-accent-main)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive('/signup')) {
                        e.currentTarget.style.backgroundColor = 'var(--color-accent-light)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive('/signup')) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Typography variant="body1">ユーザー登録</Typography>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};