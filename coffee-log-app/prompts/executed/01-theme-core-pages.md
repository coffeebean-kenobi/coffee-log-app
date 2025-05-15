# テーマシステムのコアページへの適用

## 目的
コーヒー記録アプリの主要なページに、テーマシステムを一貫して適用し、デザインの統一性を確保する。既に作成したテーマコンポーネントを使用して、残りのコアページをリファクタリングする。

## 対象ページ
- プロフィールページ (`src/app/profile/page.tsx`)
- サインインページ (`src/app/signin/page.tsx`)
- サインアップページ (`src/app/signup/page.tsx`)
- コーヒー詳細ページ (`src/app/coffee/[id]/page.tsx`)

## 実装方針

### 1. 各ページの構造を保持しながらスタイリングをテーマに移行
- Tailwind CSSクラスやインラインスタイルをテーマベースのスタイリングに置き換える
- `className`ベースの要素を対応するテーマコンポーネントに置き換える

### 2. 共通コンポーネントの使用
- `Typography` - テキスト要素（h1, h2, p など）を置き換える
- `Button` - ボタン要素を置き換える
- `Card` - カード状の UI 要素を置き換える
- `Container` - レイアウト調整に使用

### 3. クライアントコンポーネントの考慮
- ステートや副作用を持つコンポーネントには "use client" ディレクティブを追加
- インタラクティブ要素を適切に処理

## プロフィールページの実装例

```tsx
"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeStyles } from '@/theme/utils';

export default function ProfilePage() {
  const supabase = createClient();
  const styles = useThemeStyles();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coffeeCount, setCoffeeCount] = useState(0);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        
        // コーヒー記録の数を取得
        const { count } = await supabase
          .from('coffee_records')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        setCoffeeCount(count || 0);
      }
      
      setLoading(false);
    }
    
    loadUser();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (loading) {
    return (
      <Container>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <Typography variant="body1">読み込み中...</Typography>
        </div>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <div style={{ 
          textAlign: 'center', 
          padding: styles.spacing('xl'),
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography variant="h3">ログインが必要です</Typography>
          <Typography variant="body1" style={{ marginTop: styles.spacing('md'), marginBottom: styles.spacing('lg') }}>
            プロフィールページを表示するには、ログインしてください。
          </Typography>
          <Button variant="primary" onClick={() => window.location.href = '/signin'}>
            ログインする
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ paddingTop: styles.spacing('xl'), paddingBottom: styles.spacing('xl') }}>
        <Typography variant="h2" style={{ marginBottom: styles.spacing('lg') }}>プロフィール</Typography>

        <Card>
          <div style={{ padding: styles.spacing('lg') }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: styles.spacing('lg') 
            }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                backgroundColor: styles.color('primary.light'),
                marginRight: styles.spacing('md'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: styles.color('background.paper'),
                fontSize: styles.typography('fontSize.h3')
              }}>
                {user.email.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <Typography variant="h4">{user.email}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(user.created_at).toLocaleDateString('ja-JP')}から利用
                </Typography>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: styles.spacing('md'),
              marginBottom: styles.spacing('lg')
            }}>
              <div style={{ 
                padding: styles.spacing('md'), 
                border: styles.borders('thin'),
                borderRadius: styles.borderRadius('md'),
                textAlign: 'center'
              }}>
                <Typography variant="h3">{coffeeCount}</Typography>
                <Typography variant="body2">記録したコーヒー</Typography>
              </div>
              {/* 他の統計情報も同様に表示可能 */}
            </div>

            <div style={{ marginTop: styles.spacing('lg') }}>
              <Button variant="secondary" onClick={handleSignOut}>
                ログアウト
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
```

## サインインページの実装例

```tsx
"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeStyles } from '@/theme/utils';
import Link from 'next/link';

export default function SignInPage() {
  const supabase = createClient();
  const styles = useThemeStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      window.location.href = '/';
    } catch (error: any) {
      setError(error.message || 'サインインに失敗しました');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm">
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: styles.spacing('xl') }}>
          <Typography variant="h2">ログイン</Typography>
          <Typography variant="body1" color="text.secondary">
            コーヒー記録アプリへようこそ
          </Typography>
        </div>
        
        <Card>
          <form onSubmit={handleSignIn} style={{ padding: styles.spacing('lg') }}>
            {error && (
              <div style={{ 
                padding: styles.spacing('md'), 
                backgroundColor: '#FFEBEE', 
                borderRadius: styles.borderRadius('sm'), 
                marginBottom: styles.spacing('md'),
                color: '#D32F2F' 
              }}>
                <Typography variant="body2">{error}</Typography>
              </div>
            )}
            
            <div style={{ marginBottom: styles.spacing('md') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: styles.spacing('sm'),
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                  fontSize: styles.typography('fontSize.body1'),
                }}
              />
            </div>
            
            <div style={{ marginBottom: styles.spacing('lg') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: styles.spacing('sm'),
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                  fontSize: styles.typography('fontSize.body1'),
                }}
              />
            </div>
            
            <Button 
              variant="primary" 
              style={{ width: '100%', marginBottom: styles.spacing('md') }}
              disabled={loading}
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </Button>
            
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2">
                アカウントをお持ちでない方は{' '}
                <Link href="/signup" style={{ 
                  color: styles.color('primary.main'), 
                  textDecoration: 'none' 
                }}>
                  新規登録
                </Link>
                {' '}してください。
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
```

## 注意点

1. サーバーコンポーネントとクライアントコンポーネントの区別
   - インタラクティブな要素や状態を持つページには "use client" ディレクティブを追加
   - クライアントコンポーネントではサーバー専用のAPIは使用できない

2. サイズやスペーシングの一貫性
   - ハードコードされた値（px単位など）の代わりにテーマの `spacing` 関数を使用
   - `typography` 関数でフォントサイズやウェイトを管理

3. 色の管理
   - ハードコードされた色コードではなく、テーマの `color` 関数を使用
   - コントラストや一貫性を考慮 