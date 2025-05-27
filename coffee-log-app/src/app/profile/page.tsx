"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeStyles } from '@/theme/utils';
import ProfileForm from '@/components/profile/ProfileForm';
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row']

export default function ProfilePage() {
  const supabase = createClient();
  const styles = useThemeStyles();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        
        // プロフィール情報を取得
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profile);
        
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
          <Button variant="primary" onClick={() => window.location.href = '/signin'} type="button">
            ログインする
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ paddingTop: styles.spacing('xl'), paddingBottom: styles.spacing('xl') }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: styles.spacing('lg') 
        }}>
          <Typography variant="h2">プロフィール</Typography>
          <Button 
            variant="secondary" 
            onClick={() => setShowEditForm(!showEditForm)}
            type="button"
          >
            {showEditForm ? 'プロフィール表示' : 'プロフィール編集'}
          </Button>
        </div>

        {showEditForm ? (
          <ProfileForm initialProfile={profile} />
        ) : (
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
                  backgroundColor: 'var(--color-primary-light)',
                  marginRight: styles.spacing('md'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-background-paper)',
                  fontSize: styles.typography('fontSize.h3')
                }}>
                  {(profile?.display_name || user.email).substring(0, 1).toUpperCase()}
                </div>
                <div>
                  <Typography variant="h4">
                    {profile?.display_name || user.email}
                  </Typography>
                  {profile?.username && (
                    <Typography variant="body2" color="secondary">
                      @{profile.username}
                    </Typography>
                  )}
                  <Typography variant="body2" color="secondary">
                    {new Date(user.created_at).toLocaleDateString('ja-JP')}から利用
                  </Typography>
                </div>
              </div>

              {profile?.bio && (
                <div style={{ marginBottom: styles.spacing('lg') }}>
                  <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>
                    自己紹介
                  </Typography>
                  <Typography variant="body1">{profile.bio}</Typography>
                </div>
              )}

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: styles.spacing('md'),
                marginBottom: styles.spacing('lg')
              }}>
                <div style={{ 
                  padding: styles.spacing('md'), 
                  border: '1px solid var(--color-accent-main)',
                  borderRadius: styles.borderRadius('md'),
                  textAlign: 'center'
                }}>
                  <Typography variant="h3">{coffeeCount}</Typography>
                  <Typography variant="body2">記録したコーヒー</Typography>
                </div>
              </div>

              <div style={{ marginTop: styles.spacing('lg') }}>
                <Button variant="secondary" onClick={handleSignOut} type="button">
                  ログアウト
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
}