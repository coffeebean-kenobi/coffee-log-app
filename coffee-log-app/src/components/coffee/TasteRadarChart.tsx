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
import { FC } from 'react'

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
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1
        }
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