# テーマシステムの詳細・フォームページへの適用

## 目的
コーヒー記録アプリの詳細表示ページとフォームページに、テーマシステムを一貫して適用する。ユーザー入力フォームや詳細情報の表示において、一貫したデザインと使いやすさを提供する。

## 対象ページ
- コーヒー詳細ページ (`src/app/coffee/[id]/page.tsx`)
- コーヒー追加ページ (`src/app/coffee/add/page.tsx`)
- コーヒー編集ページ (`src/app/coffee/edit/[id]/page.tsx`)

## 実装方針

### 1. フォーム要素のスタイリングを統一
- 入力フィールド、ラベル、選択ボックス、評価スライダーなどのスタイリングを統一
- テーマの色、境界線、間隔などを適用

### 2. 詳細表示の強化
- 情報階層を明確に示すタイポグラフィの使用
- カードコンポーネントを活用した情報グループ化

### 3. レスポンシブデザインの適用
- モバイルとデスクトップで最適な表示を提供
- テーマのブレークポイント設定を活用

## コーヒー詳細ページの実装例

```tsx
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';

export default async function CoffeeDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  
  const { data: coffee, error } = await supabase
    .from('coffee_records')
    .select('*')
    .eq('id', params.id)
    .single();
  
  if (error || !coffee) {
    notFound();
  }

  return (
    <Container>
      <div style={{ padding: '2rem 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem' 
        }}>
          <div>
            <Typography variant="h2">{coffee.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(coffee.consumed_at).toLocaleDateString('ja-JP')}に飲用
            </Typography>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href={`/coffee/edit/${coffee.id}`}>
              <Button variant="secondary">編集</Button>
            </Link>
            <Link href="/coffee">
              <Button variant="primary">一覧に戻る</Button>
            </Link>
          </div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <Card>
            <div style={{ padding: '1.5rem' }}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>基本情報</Typography>
              
              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body2" color="text.secondary">コーヒー名</Typography>
                <Typography variant="body1">{coffee.name}</Typography>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body2" color="text.secondary">焙煎者/ブランド</Typography>
                <Typography variant="body1">{coffee.roaster || '不明'}</Typography>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body2" color="text.secondary">原産国</Typography>
                <Typography variant="body1">{coffee.origin || '不明'}</Typography>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body2" color="text.secondary">焙煎度</Typography>
                <div style={{ 
                  backgroundColor: coffee.color || '#8D6E63', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%',
                  marginTop: '0.5rem'
                }} />
              </div>
            </div>
          </Card>
          
          <Card>
            <div style={{ padding: '1.5rem' }}>
              <Typography variant="h4" style={{ marginBottom: '1rem' }}>評価</Typography>
              
              <div style={{ marginBottom: '1rem' }}>
                <Typography variant="body2" color="text.secondary">総合評価</Typography>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginTop: '0.5rem' 
                }}>
                  <Typography variant="h3">{coffee.rating || '-'}</Typography>
                  <Typography variant="body2" color="text.secondary" style={{ marginLeft: '0.5rem' }}>/ 5</Typography>
                </div>
              </div>
              
              {coffee.aroma && (
                <div style={{ marginBottom: '1rem' }}>
                  <Typography variant="body2" color="text.secondary">香り</Typography>
                  <RatingBar value={coffee.aroma} />
                </div>
              )}
              
              {coffee.flavor && (
                <div style={{ marginBottom: '1rem' }}>
                  <Typography variant="body2" color="text.secondary">風味</Typography>
                  <RatingBar value={coffee.flavor} />
                </div>
              )}
              
              {coffee.acidity && (
                <div style={{ marginBottom: '1rem' }}>
                  <Typography variant="body2" color="text.secondary">酸味</Typography>
                  <RatingBar value={coffee.acidity} />
                </div>
              )}
              
              {coffee.body && (
                <div style={{ marginBottom: '1rem' }}>
                  <Typography variant="body2" color="text.secondary">ボディ</Typography>
                  <RatingBar value={coffee.body} />
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <Card>
          <div style={{ padding: '1.5rem' }}>
            <Typography variant="h4" style={{ marginBottom: '1rem' }}>メモ</Typography>
            <Typography variant="body1">
              {coffee.notes || 'メモはありません'}
            </Typography>
          </div>
        </Card>
      </div>
    </Container>
  );
}

// 評価バーコンポーネント
function RatingBar({ value }: { value: number }) {
  return (
    <div style={{ 
      width: '100%', 
      height: '10px', 
      backgroundColor: '#EEEEEE', 
      borderRadius: '5px',
      marginTop: '0.5rem'
    }}>
      <div style={{ 
        width: `${(value / 5) * 100}%`, 
        height: '100%', 
        backgroundColor: '#3B82F6', 
        borderRadius: '5px' 
      }} />
    </div>
  );
}
```

## コーヒー追加ページの実装例

```tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { Container } from '@/components/Container';
import { Typography } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { useThemeStyles } from '@/theme/utils';

export default function AddCoffeePage() {
  const router = useRouter();
  const supabase = createClient();
  const styles = useThemeStyles();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // フォームの状態
  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [origin, setOrigin] = useState('');
  const [color, setColor] = useState('#8D6E63');
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 現在のユーザーを取得
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('ログインが必要です');
      }
      
      const newCoffee = {
        name,
        roaster,
        origin,
        color,
        rating,
        notes,
        consumed_at: new Date().toISOString(),
        user_id: user.id,
      };
      
      const { error } = await supabase
        .from('coffee_records')
        .insert(newCoffee);
      
      if (error) throw error;
      
      router.push('/coffee');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'コーヒーの追加に失敗しました');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Container maxWidth="md">
      <div style={{ padding: styles.spacing('xl') }}>
        <Typography variant="h2" style={{ marginBottom: styles.spacing('lg') }}>
          新しいコーヒーを記録
        </Typography>
        
        <Card>
          <form onSubmit={handleSubmit} style={{ padding: styles.spacing('lg') }}>
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
                コーヒー名 *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            
            <div style={{ marginBottom: styles.spacing('md') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                焙煎者/ブランド
              </label>
              <input
                type="text"
                value={roaster}
                onChange={(e) => setRoaster(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: styles.spacing('sm'),
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                  fontSize: styles.typography('fontSize.body1'),
                }}
              />
            </div>
            
            <div style={{ marginBottom: styles.spacing('md') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                原産国
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: styles.spacing('sm'),
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                  fontSize: styles.typography('fontSize.body1'),
                }}
              />
            </div>
            
            <div style={{ marginBottom: styles.spacing('md') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                焙煎度（色）
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ 
                  width: '100px', 
                  height: '40px',
                  padding: '0',
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                }}
              />
            </div>
            
            <div style={{ marginBottom: styles.spacing('md') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                評価 (1-5)
              </label>
              <div style={{ display: 'flex', gap: styles.spacing('sm') }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      border: 'none',
                      backgroundColor: rating === value 
                        ? styles.color('primary.main') 
                        : styles.color('background.dark'),
                      color: rating === value 
                        ? styles.color('background.paper') 
                        : styles.color('text.primary'),
                      cursor: 'pointer',
                      fontWeight: styles.typography('fontWeight.medium'),
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: styles.spacing('lg') }}>
              <label style={{ 
                display: 'block', 
                marginBottom: styles.spacing('xs'),
                fontSize: styles.typography('fontSize.body2'),
                fontWeight: styles.typography('fontWeight.medium'),
              }}>
                メモ
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                style={{ 
                  width: '100%', 
                  padding: styles.spacing('sm'),
                  border: styles.borders('thin'),
                  borderRadius: styles.borderRadius('sm'),
                  fontSize: styles.typography('fontSize.body1'),
                  fontFamily: styles.typography('fontFamily.body'),
                  resize: 'vertical',
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: styles.spacing('md'), 
            }}>
              <Button 
                variant="secondary" 
                onClick={() => router.back()}
                disabled={loading}
              >
                キャンセル
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? '保存中...' : '保存する'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}
```

## 注意点

1. フォーム検証とエラー表示
   - 入力検証とエラーメッセージの一貫した表示方法を提供
   - エラー状態をテーマに合わせたスタイリングで示す

2. ローディング状態の視覚的フィードバック
   - ボタンのローディング状態を明確に表示
   - ユーザーアクションの結果を適切に通知

3. 色とコントラスト
   - フォーム要素は視認性と使いやすさを優先
   - テキストと背景のコントラストを十分に確保

4. モバイル対応
   - タッチターゲットサイズを適切に設定（最小44px）
   - スマートフォンでの使いやすさを考慮したレイアウト

5. アクセシビリティ
   - 適切なラベルとフォーム要素の関連付け
   - キーボードナビゲーションのサポート 