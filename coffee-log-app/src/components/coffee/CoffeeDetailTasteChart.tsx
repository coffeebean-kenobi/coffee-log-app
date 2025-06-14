'use client'

import { FC } from 'react'
import { Database } from '@/types/database.types'
import TasteRadarChart from './TasteRadarChart'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

interface CoffeeDetailTasteChartProps {
  coffee: CoffeeRecord
}

const CoffeeDetailTasteChart: FC<CoffeeDetailTasteChartProps> = ({ coffee }) => {
  // 評価データを抽出
  const tasteRatings = {
    acidity: coffee.acidity,
    flavor: coffee.flavor,
    sweetness: coffee.sweetness,
    mouthfeel: coffee.mouthfeel,
    body: coffee.body,
    clean_cup: coffee.clean_cup,
    balance: coffee.balance
  }

  // どれか1つでも値があるか確認
  const hasAnyRatings = Object.values(tasteRatings).some(val => val !== null && val !== undefined && val > 0)

  if (!hasAnyRatings) {
    return null // 評価データがなければ何も表示しない
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', minWidth: '550px' }}>
      <TasteRadarChart ratings={tasteRatings} />
    </div>
  )
}

export default CoffeeDetailTasteChart 