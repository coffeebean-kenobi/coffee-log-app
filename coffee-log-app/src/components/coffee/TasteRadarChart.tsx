'use client'

import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { FC, useEffect, useState } from 'react'
import { useTheme } from '@/theme/ThemeProvider'

// ChartJSコンポーネントの登録
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export type TasteRatings = {
  acidity?: number | null
  flavor?: number | null
  sweetness?: number | null
  mouthfeel?: number | null
  body?: number | null
  clean_cup?: number | null
  balance?: number | null
}

interface TasteRadarChartProps {
  ratings: TasteRatings
  editable?: boolean
  onChange?: (ratings: TasteRatings) => void
}

const TasteRadarChart: FC<TasteRadarChartProps> = ({ 
  ratings, 
  editable = false,
  onChange 
}) => {
  const { isDark } = useTheme();
  const isDarkMode = isDark;
  
  // デフォルト値を設定（null または undefined の場合は0に）
  const values = {
    acidity: ratings.acidity || 0,
    flavor: ratings.flavor || 0,
    sweetness: ratings.sweetness || 0,
    mouthfeel: ratings.mouthfeel || 0,
    body: ratings.body || 0,
    clean_cup: ratings.clean_cup || 0,
    balance: ratings.balance || 0
  }

  const data = {
    labels: [
      ['酸味', 'Acidity'], 
      ['フレーバー', 'Flavor'], 
      ['甘味', 'Sweetness'], 
      ['口当たり', 'Mouthfeel'], 
      ['コク', 'Body'], 
      ['クリーンカップ', 'Clean Cup'], 
      ['バランス', 'Balance']
    ],
    datasets: [
      {
        label: 'コーヒー評価',
        data: [
          values.acidity, 
          values.flavor, 
          values.sweetness, 
          values.mouthfeel, 
          values.body, 
          values.clean_cup, 
          values.balance
        ],
        backgroundColor: isDarkMode 
          ? 'rgba(96, 165, 250, 0.4)' // Blue primary in dark mode
          : 'rgba(26, 26, 26, 0.3)',   // Dark charcoal in light mode
        borderColor: isDarkMode 
          ? '#60A5FA' // Blue primary in dark mode
          : '#1A1A1A', // Dark charcoal in light mode
        borderWidth: 2,
        pointBackgroundColor: isDarkMode ? '#60A5FA' : '#1A1A1A',
        pointBorderColor: isDarkMode ? '#93C5FD' : '#333333',
        pointBorderWidth: 2,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: isDarkMode ? 'rgba(209, 213, 219, 0.3)' : 'rgba(192, 192, 192, 0.5)', // accent colors
        },
        grid: {
          color: isDarkMode ? 'rgba(209, 213, 219, 0.2)' : 'rgba(192, 192, 192, 0.3)',
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: isDarkMode ? '#D1D5DB' : '#666666', // text-secondary colors
          font: {
            size: 16,
          }
        },
        pointLabels: {
          color: isDarkMode ? '#F9FAFB' : '#1A1A1A', // text-primary colors
          font: {
            size: 16,
            weight: 'bold' as const
          },
          padding: 40
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#F9FAFB' : '#1A1A1A', // text-primary colors
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)', // background-paper
        titleColor: isDarkMode ? '#F9FAFB' : '#1A1A1A', // text-primary
        bodyColor: isDarkMode ? '#D1D5DB' : '#666666', // text-secondary
        borderColor: isDarkMode ? '#F59E0B' : '#C0C0C0', // accent colors
        borderWidth: 1,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        }
      }
    },
    maintainAspectRatio: true,
    responsive: true,
  }

  return (
    <div className="w-full mx-auto" style={{ 
      backgroundColor: isDarkMode ? 'var(--color-background-paper)' : 'var(--color-background-paper)',
      padding: '3rem',
      borderRadius: '0.5rem',
      border: `1px solid ${isDarkMode ? 'var(--color-accent-main)' : 'var(--color-accent-main)'}`,
      minWidth: '550px',
      maxWidth: '600px'
    }}>
      <Radar data={data} options={options} />
    </div>
  )
}

export default TasteRadarChart 