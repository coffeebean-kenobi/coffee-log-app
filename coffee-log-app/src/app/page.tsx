"use client";

import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-server'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { useThemeStyles } from '@/theme/utils'

export default function Home() {
  const styles = useThemeStyles()
  
  // クライアントコンポーネントではSupabaseのServer APIは使用できないので、
  // ユーザーがログインしているかどうかはクライアントサイドで確認するロジックが必要
  // 一旦このデモではログインしていないと仮定
  const isLoggedIn = false

  return (
    <Container>
      <div style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: styles.spacing('md'),
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: styles.spacing('md') }}>
          <Image src="/LogCup_logo.png" alt="LOGCUP" width={80} height={80} />
        </div>
        <Typography variant="h1">LOGCUP</Typography>
        <Typography 
          variant="body1" 
          style={{ 
            maxWidth: '32rem', 
            marginBottom: styles.spacing('lg')
          }}
        >
          飲んだコーヒーの情報や感想を記録して、あなただけのコーヒージャーナルを作りましょう。
        </Typography>
        
        <div style={{ 
          display: 'flex', 
          gap: styles.spacing('md'),
          marginBottom: styles.spacing('xl')
        }}>
          {isLoggedIn ? (
            <>
              <Link href="/coffee">
                <Button variant="primary">記録を見る</Button>
              </Link>
              <Link href="/coffee/add">
                <Button variant="secondary">新しい記録を追加</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="primary">ログイン</Button>
              </Link>
              <Link href="/signup">
                <Button variant="secondary">ユーザー登録</Button>
              </Link>
            </>
          )}
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: styles.spacing('lg'), 
          width: '100%', 
          maxWidth: '1024px',
          marginTop: styles.spacing('xl'),
          marginBottom: styles.spacing('xl')
        }}>
          <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Typography variant="h4">記録する</Typography>
            <Typography variant="body1">飲んだコーヒーの店名、豆の情報、評価、感想を簡単に記録できます。</Typography>
          </Card>
          
          <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Typography variant="h4">振り返る</Typography>
            <Typography variant="body1">過去に飲んだコーヒーを簡単に検索、フィルタリングして振り返ることができます。</Typography>
          </Card>
          
          <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Typography variant="h4">発見する</Typography>
            <Typography variant="body1">あなたの好みのパターンを見つけて、新しいコーヒーとの出会いを楽しみましょう。</Typography>
          </Card>
        </div>
      </div>
    </Container>
  )
}