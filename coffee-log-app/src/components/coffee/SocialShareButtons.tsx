'use client'

import { FC } from 'react'
import { Database } from '@/types/database.types'
import { Button } from '@/components/Button'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

interface SocialShareButtonsProps {
  coffee: CoffeeRecord
  imageData?: string // Base64画像データ
  showTitle?: boolean // タイトル表示制御
}

const SocialShareButtons: FC<SocialShareButtonsProps> = ({ coffee, imageData, showTitle = true }) => {
  
  // コーヒー記録のテキストを生成
  const generateShareText = () => {
    const text = `☕ ${coffee.shop_name} - ${coffee.coffee_name}

🌍 ${coffee.country || ''}
📍 ${coffee.region || ''}
🔥 ${coffee.roast_level || ''}

${coffee.description || ''}

#コーヒー #coffee #カフェ巡り`
    
    return text.trim()
  }

  // クリップボードコピー
  const copyToClipboard = async () => {
    const text = `${generateShareText()}\n\n${window.location.href}`
    try {
      await navigator.clipboard.writeText(text)
      alert('コーヒー記録の情報をクリップボードにコピーしました！')
    } catch (error) {
      console.error('クリップボードへのコピーに失敗しました:', error)
      alert('クリップボードへのコピーに失敗しました。お使いのブラウザではこの機能がサポートされていない可能性があります。')
    }
  }

  return (
    <Button onClick={copyToClipboard} variant="secondary" className="text-sm">
      テキストをコピー
    </Button>
  )
}

export default SocialShareButtons 