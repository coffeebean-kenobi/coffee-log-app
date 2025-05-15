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
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }
    
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-background-paper dark:bg-background-paper border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-text-primary dark:text-text-primary no-underline flex items-center gap-2">
            <Image src="/LogCup_logo.png" alt="LOGCUP" width={32} height={32} />
            <Typography variant="h5">LOGCUP</Typography>
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-4">
              {!loading && user ? (
                <>
                  <Link 
                    href="/coffee" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/coffee') 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Typography variant="body1">コーヒー一覧</Typography>
                  </Link>
                  <Link 
                    href="/coffee/add" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/coffee/add') 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Typography variant="body1">新規追加</Typography>
                  </Link>
                  <Link 
                    href="/profile" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/profile') 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Typography variant="body1">プロフィール</Typography>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-md transition-colors text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
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
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Typography variant="body1">ログイン</Typography>
                  </Link>
                  <Link 
                    href="/signup" 
                    className={`px-3 py-2 rounded-md transition-colors ${
                      isActive('/signup') 
                        ? 'bg-gray-100 dark:bg-gray-800 text-primary-main dark:text-primary-light' 
                        : 'text-text-primary dark:text-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Typography variant="body1">ユーザー登録</Typography>
                  </Link>
                </>
              )}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
};