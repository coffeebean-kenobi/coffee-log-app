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

export default function SignInPage() {
  const supabase = createClient();
  const styles = useThemeStyles();
  const router = useRouter();
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
      
      router.push('/coffee');
      router.refresh();
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
              className="w-full mb-4"
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