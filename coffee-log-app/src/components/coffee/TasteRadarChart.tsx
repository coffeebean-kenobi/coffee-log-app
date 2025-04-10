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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if we're in the browser and if dark mode is enabled
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
      
      // Listen for changes in color scheme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);
  
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
      '酸味 (Acidity)', 
      'フレーバー (Flavor)', 
      '甘味 (Sweetness)', 
      '口当たり (Mouthfeel)', 
      'コク (Body)', 
      'クリーンカップ', 
      'バランス (Balance)'
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
          ? 'rgba(96, 165, 250, 0.3)' // More visible in dark mode
          : 'rgba(75, 192, 192, 0.2)',
        borderColor: isDarkMode 
          ? 'rgba(96, 165, 250, 1)' // primary color in dark mode
          : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'transparent',
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        },
        pointLabels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        }
      },
      tooltip: {
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
        bodyColor: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  )
}

export default TasteRadarChart 