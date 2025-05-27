import { Metadata } from 'next'
import AnalyticsDashboard from './AnalyticsDashboard'

export const metadata: Metadata = {
  title: 'データ分析 | LOGCUP',
  description: 'コーヒー記録のデータ分析・可視化ページ',
}

export default function AnalyticsPage() {
  return <AnalyticsDashboard />
} 