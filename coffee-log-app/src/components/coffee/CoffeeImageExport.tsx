'use client'

import { FC, useRef, useState } from 'react'
import { Database } from '@/types/database.types'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { Card } from '@/components/Card'
import TasteRadarChart from './TasteRadarChart'
import SocialShareButtons from './SocialShareButtons'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Row']

interface CoffeeImageExportProps {
  coffee: CoffeeRecord
}

const CoffeeImageExport: FC<CoffeeImageExportProps> = ({ coffee }) => {
  const exportRef = useRef<HTMLDivElement>(null)
  const [imageData, setImageData] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleSaveImage = () => {
    if (!exportRef.current) return

    setIsGenerating(true)

    // html2canvas を動的にインポートして実行
    import('html2canvas').then((html2canvas) => {
      html2canvas.default(exportRef.current!, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        width: 900,
        height: 1400,
        onclone: (clonedDoc: Document) => {
          // Chart.jsのCanvasを静的な画像に変換
          const originalCanvases = exportRef.current?.querySelectorAll('canvas')
          const clonedCanvases = clonedDoc.querySelectorAll('canvas')
          
          originalCanvases?.forEach((originalCanvas, index) => {
            const clonedCanvas = clonedCanvases[index]
            if (clonedCanvas && originalCanvas) {
              const ctx = clonedCanvas.getContext('2d')
              if (ctx) {
                ctx.drawImage(originalCanvas, 0, 0)
              }
            }
          })
        }
      } as any).then((canvas) => {
        // 画像データを保存（シェア用）
        const dataUrl = canvas.toDataURL('image/png')
        setImageData(dataUrl)
        
        // 画像をダウンロード
        const link = document.createElement('a')
        link.download = `coffee-record-${coffee.coffee_name}-${coffee.shop_name}.png`
        link.href = dataUrl
        link.click()
        
        setIsGenerating(false)
      }).catch((error) => {
        console.error('画像の保存に失敗しました:', error)
        alert('画像の保存に失敗しました')
        setIsGenerating(false)
      })
    }).catch((error) => {
      console.error('html2canvasの読み込みに失敗しました:', error)
      alert('画像保存機能の読み込みに失敗しました')
      setIsGenerating(false)
    })
  }

  const tasteRatings = {
    acidity: coffee.acidity,
    flavor: coffee.flavor,
    sweetness: coffee.sweetness,
    mouthfeel: coffee.mouthfeel,
    body: coffee.body,
    clean_cup: coffee.clean_cup,
    balance: coffee.balance
  }

  const hasAnyRatings = Object.values(tasteRatings).some(val => val !== null && val !== undefined && val > 0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-lg font-medium text-gray-700">
        シェアする
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={handleSaveImage} 
          variant="secondary" 
          className="text-sm"
          disabled={isGenerating}
        >
          {isGenerating ? '生成中...' : '画像で保存'}
        </Button>
        
        <SocialShareButtons coffee={coffee} imageData={imageData} showTitle={false} />
      </div>
      
      {/* 非表示の画像出力用カード */}
      <div 
        ref={exportRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          width: '900px',
          padding: '50px',
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            margin: '0 0 15px 0',
            lineHeight: '1.2'
          }}>
            {coffee.shop_name}
          </h1>
          <h2 style={{ 
            fontSize: '28px', 
            margin: '0',
            opacity: '0.9'
          }}>
            {coffee.coffee_name}
          </h2>
        </div>

        <div style={{ display: 'grid', gap: '25px', marginBottom: '40px' }}>
          {coffee.country && (
            <div>
              <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                原産国
              </div>
              <div style={{ fontSize: '20px', color: '#1f2937' }}>{coffee.country}</div>
            </div>
          )}
          
          {coffee.region && (
            <div>
              <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                地域
              </div>
              <div style={{ fontSize: '20px', color: '#1f2937' }}>{coffee.region}</div>
            </div>
          )}
          
          {coffee.processing_method && (
            <div>
              <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                精製方法
              </div>
              <div style={{ fontSize: '20px', color: '#1f2937' }}>{coffee.processing_method}</div>
            </div>
          )}
          
          {coffee.roast_level && (
            <div>
              <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                焙煎度
              </div>
              <div style={{ fontSize: '20px', color: '#1f2937' }}>{coffee.roast_level}</div>
            </div>
          )}

          {coffee.description && (
            <div>
              <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                感想・メモ
              </div>
              <div style={{ 
                fontSize: '18px', 
                color: '#1f2937',
                lineHeight: '1.6',
                padding: '20px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                {coffee.description}
              </div>
            </div>
          )}

          <div>
            <div style={{ fontWeight: '600', fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
              記録日時
            </div>
            <div style={{ fontSize: '18px', color: '#1f2937' }}>
              {coffee.consumed_at ? new Date(coffee.consumed_at).toLocaleString('ja-JP') : '日付不明'}
            </div>
          </div>
        </div>

        {hasAnyRatings && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontWeight: '600', fontSize: '24px', color: '#1f2937', marginBottom: '25px', textAlign: 'center' }}>
              テイスティング評価
            </div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              padding: '40px',
              backgroundColor: '#f9fafb',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              minHeight: '600px'
            }}>
              <div style={{ width: '550px', height: '550px' }}>
                <TasteRadarChart ratings={tasteRatings} />
              </div>
            </div>
          </div>
        )}

        <div style={{
          textAlign: 'center',
          padding: '25px',
          borderTop: '2px solid #e5e7eb',
          color: '#6b7280',
          fontSize: '16px'
        }}>
          Coffee Log App で記録
        </div>
      </div>
    </div>
  )
}

export default CoffeeImageExport 