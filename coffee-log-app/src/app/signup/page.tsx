"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeStyles } from '@/theme/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const supabase = createClient();
  const styles = useThemeStyles();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('パスワードは6文字以上必要です');
      setLoading(false);
      return;
    }
    
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      // メール確認が必要な場合
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setMessage('このメールアドレスは既に登録されています');
        setLoading(false);
        return;
      }

      // プロフィールの作成
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id }]);

        if (profileError) {
          console.error('プロフィール作成エラー:', profileError);
        }
      }

      // メール確認が必要かどうかによって処理を分岐
      if (data.user && !data.user.confirmed_at) {
        setMessage('登録確認メールを送信しました。メールを確認してアカウントを有効化してください。');
      } else {
        router.push('/coffee');
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message || 'ユーザー登録に失敗しました');
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
          <Typography variant="h2">ユーザー登録</Typography>
          <Typography variant="body1" color="text.secondary">
            アカウントを作成してコーヒー記録を始めましょう
          </Typography>
        </div>
        
        <Card>
          <form onSubmit={handleSignUp} style={{ padding: styles.spacing('lg') }}>
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
            
            {message && (
              <div style={{ 
                padding: styles.spacing('md'), 
                backgroundColor: '#E8F5E9', 
                borderRadius: styles.borderRadius('sm'), 
                marginBottom: styles.spacing('md'),
                color: '#2E7D32' 
              }}>
                <Typography variant="body2">{message}</Typography>
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
                パスワード（6文字以上）
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
              className="w-full mb-4"
              disabled={loading}
            >
              {loading ? '登録中...' : 'ユーザー登録'}
            </Button>
            
            <div style={{ textAlign: 'center' }}>
              <Typography variant="body2">
                既にアカウントをお持ちの方は{' '}
                <Link href="/signin" style={{ 
                  color: styles.color('primary.main'), 
                  textDecoration: 'none' 
                }}>
                  こちらからログイン
                </Link>
              </Typography>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}