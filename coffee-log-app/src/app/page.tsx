"use client";

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import StrategicAdPlacement from '@/components/ads/StrategicAdPlacement'
import { useThemeStyles } from '@/theme/utils'

export default function Home() {
  const styles = useThemeStyles()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

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
        {/* コンテンツ上部広告 */}
        <StrategicAdPlacement placementId="content-top" className="mb-8" />

        <div style={{ marginBottom: styles.spacing('md') }}>
          <Image src="/LOG.png" alt="LOGCUP" width={90} height={90} />
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
          {loading ? (
            <Typography variant="body2">読み込み中...</Typography>
          ) : user ? (
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

        {/* 中間広告 */}
        <StrategicAdPlacement 
          placementId="content-middle" 
          className="my-8"
        />
        
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

        {/* コンテンツ下部広告 */}
        <StrategicAdPlacement placementId="content-bottom" className="mt-8" />
      </div>
    </Container>
  )
}