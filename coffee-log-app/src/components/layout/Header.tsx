'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    }
    
    getUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            コーヒー記録
          </Link>

          <nav>
            <ul className="flex space-x-6">
              {!loading && user ? (
                <>
                  <li>
                    <Link href="/coffee" className="hover:underline">
                      記録一覧
                    </Link>
                  </li>
                  <li>
                    <Link href="/coffee/add" className="hover:underline">
                      新規記録
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:underline">
                      プロフィール
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="hover:underline"
                    >
                      ログアウト
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/signin" className="hover:underline">
                      ログイン
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="hover:underline">
                      ユーザー登録
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}