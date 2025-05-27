'use client'

import { AnalyticsData } from '@/types/analytics'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { useThemeStyles } from '@/theme/utils'

interface Props {
  data: AnalyticsData
  disabled?: boolean
}

export default function ExportButton({ data, disabled }: Props) {
  const styles = useThemeStyles()

  const handleExport = () => {
    const csvData = generateCSV(data)
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `coffee-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const generateCSV = (data: AnalyticsData): string => {
    const headers = ['項目', '値']
    const rows = [
      ['総記録数', `${data.totalRecords}`],
      ['平均評価', `${data.averageRating.toFixed(1)}`],
      ['お気に入り店舗', data.favoriteShop || ''],
      ['主要原産地', data.mostCommonOrigin || ''],
      ['主要抽出方法', data.mostCommonBrewMethod || ''],
      ['', ''],
      ['味覚プロファイル', ''],
      ['酸味', `${data.tasteProfile.acidity.toFixed(1)}`],
      ['フレーバー', `${data.tasteProfile.flavor.toFixed(1)}`],
      ['ボディ', `${data.tasteProfile.body.toFixed(1)}`],
      ['バランス', `${data.tasteProfile.balance.toFixed(1)}`],
      ['総合評価', `${data.tasteProfile.overall.toFixed(1)}`],
      ['アロマ', `${data.tasteProfile.aroma.toFixed(1)}`],
      ['アフターテイスト', `${data.tasteProfile.aftertaste.toFixed(1)}`]
    ]

    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
  }

  return (
    <button
      onClick={handleExport}
      disabled={disabled || data.totalRecords === 0}
      style={{
        padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
        fontSize: styles.typography('fontSize.sm'),
        backgroundColor: styles.color('secondary.main'),
        color: styles.color('text.primary'),
        borderRadius: styles.borderRadius('md'),
        border: 'none',
        cursor: disabled || data.totalRecords === 0 ? 'not-allowed' : 'pointer',
        opacity: disabled || data.totalRecords === 0 ? 0.5 : 1,
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!disabled && data.totalRecords > 0) {
          e.currentTarget.style.backgroundColor = `${styles.color('secondary.main')}cc`
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && data.totalRecords > 0) {
          e.currentTarget.style.backgroundColor = styles.color('secondary.main')
        }
      }}
    >
      📊 CSVエクスポート
    </button>
  )
} 