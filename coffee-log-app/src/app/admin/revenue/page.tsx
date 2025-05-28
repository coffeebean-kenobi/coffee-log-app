import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import RevenueDashboard from '@/components/ads/RevenueDashboard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: '収益管理 | LOGCUP Admin',
  description: 'AdSense収益とA/Bテストの管理画面',
}

// 本番環境では認証チェックを追加
export default function RevenueManagementPage() {
  return (
    <Container>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Typography variant="h1" style={{ marginBottom: '0.5rem' }}>
            収益管理ダッシュボード
          </Typography>
          <Typography variant="body1" style={{ color: 'var(--color-text-muted)' }}>
            AdSense収益の最適化とA/Bテストの管理を行います
          </Typography>
        </div>

        <Suspense fallback={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '400px'
          }}>
            <Typography variant="body1">読み込み中...</Typography>
          </div>
        }>
          <RevenueDashboard />
        </Suspense>
      </div>
    </Container>
  )
} 