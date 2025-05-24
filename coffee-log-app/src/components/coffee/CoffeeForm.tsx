'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import TasteRatingInput from './TasteRatingInput'
import TasteRadarChart, { TasteRatings } from './TasteRadarChart'
import { Card } from '@/components/Card'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { useThemeStyles } from '@/theme/utils'

type CoffeeRecord = Database['public']['Tables']['coffee_records']['Insert']
type Props = {
  initialData?: Database['public']['Tables']['coffee_records']['Row']
  isEditing?: boolean
}

const roastLevels = [
  { value: 'light', label: '浅煎り' },
  { value: 'medium', label: '中煎り' },
  { value: 'medium-dark', label: '中深煎り' },
  { value: 'dark', label: '深煎り' }
]

export default function CoffeeForm({ initialData, isEditing = false }: Props) {
  const router = useRouter()
  const supabase = createClient()
  const styles = useThemeStyles()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<Partial<CoffeeRecord>>({
    shop_name: initialData?.shop_name || '',
    coffee_name: initialData?.coffee_name || '',
    country: initialData?.country || '',
    region: initialData?.region || '',
    farm: initialData?.farm || '',
    processing_method: initialData?.processing_method || '',
    roast_level: initialData?.roast_level || undefined,
    rating: initialData?.rating || 3,
    description: initialData?.description || '',
    consumed_at: initialData?.consumed_at 
      ? new Date(initialData.consumed_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    // 味わい評価の初期値設定
    acidity: initialData?.acidity || 0,
    flavor: initialData?.flavor || 0,
    sweetness: initialData?.sweetness || 0,
    mouthfeel: initialData?.mouthfeel || 0,
    body: initialData?.body || 0,
    clean_cup: initialData?.clean_cup || 0,
    balance: initialData?.balance || 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 味わい評価を更新する関数
  const handleTasteRatingsChange = (newRatings: TasteRatings) => {
    setFormData(prev => ({
      ...prev,
      ...newRatings
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('ユーザー情報の取得に失敗しました。再ログインしてください。')
        return
      }

      if (isEditing && initialData) {
        // 既存の記録を更新
        const { error: updateError } = await supabase
          .from('coffee_records')
          .update({
            ...formData,
            consumed_at: formData.consumed_at ? new Date(formData.consumed_at).toISOString() : null,
          })
          .eq('id', initialData.id)

        if (updateError) throw updateError
      } else {
        // 新しい記録を作成
        const { error: insertError } = await supabase
          .from('coffee_records')
          .insert({
            ...formData,
            user_id: user.id,
            consumed_at: formData.consumed_at ? new Date(formData.consumed_at).toISOString() : null,
          })

        if (insertError) throw insertError
      }

      // 保存成功後、一覧ページに戻る
      router.push('/coffee')
      router.refresh()
    } catch (err: any) {
      console.error('保存エラー:', err)
      setError(err.message || '保存中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  // 味わい評価用のデータ取得
  const tasteRatings: TasteRatings = {
    acidity: formData.acidity,
    flavor: formData.flavor,
    sweetness: formData.sweetness,
    mouthfeel: formData.mouthfeel,
    body: formData.body,
    clean_cup: formData.clean_cup,
    balance: formData.balance
  }

  // 入力フィールドのスタイル
  const inputStyle = {
    width: '100%',
    padding: styles.spacing('sm'),
    border: '1px solid var(--color-accent-main)',
    borderRadius: styles.borderRadius('sm'),
    fontSize: styles.typography('fontSize.body1'),
    backgroundColor: 'var(--color-background-paper)',
    color: 'var(--color-text-primary)',
    marginTop: styles.spacing('xs'),
  }

  // ラベルのスタイル
  const labelStyle = {
    display: 'block',
    marginBottom: styles.spacing('xs'),
    fontSize: styles.typography('fontSize.body2'),
    fontWeight: styles.typography('fontWeight.medium'),
    color: 'var(--color-text-primary)',
  }

  // フォームのグリッドレイアウト
  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: styles.spacing('md'),
    marginBottom: styles.spacing('md'),
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: styles.spacing('lg') }}>
        {error && (
          <div style={{ 
            padding: styles.spacing('md'),
            backgroundColor: 'var(--color-text-error)',
            borderRadius: styles.borderRadius('sm'),
            color: 'var(--color-background-paper)',
            marginBottom: styles.spacing('md'),
            border: '1px solid var(--color-text-error)',
          }}>
            <Typography variant="body2" style={{ color: 'inherit' }}>{error}</Typography>
          </div>
        )}

        <div style={{ marginBottom: styles.spacing('md') }}>
          <label htmlFor="shop_name" style={labelStyle}>
            店名 *
          </label>
          <input
            type="text"
            id="shop_name"
            name="shop_name"
            value={formData.shop_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: styles.spacing('md') }}>
          <label htmlFor="coffee_name" style={labelStyle}>
            コーヒー名
          </label>
          <input
            type="text"
            id="coffee_name"
            name="coffee_name"
            value={formData.coffee_name || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div style={gridContainerStyle}>
          <div>
            <label htmlFor="country" style={labelStyle}>
              原産国
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="region" style={labelStyle}>
              地域
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={gridContainerStyle}>
          <div>
            <label htmlFor="farm" style={labelStyle}>
              農園
            </label>
            <input
              type="text"
              id="farm"
              name="farm"
              value={formData.farm || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="processing_method" style={labelStyle}>
              精製方法
            </label>
            <input
              type="text"
              id="processing_method"
              name="processing_method"
              value={formData.processing_method || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={gridContainerStyle}>
          <div>
            <label htmlFor="roast_level" style={labelStyle}>
              焙煎度合い
            </label>
            <select
              id="roast_level"
              name="roast_level"
              value={formData.roast_level || ''}
              onChange={handleChange}
              style={{
                ...inputStyle,
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.7rem center',
                backgroundSize: '0.65rem auto',
                paddingRight: '2.5rem',
              }}
            >
              <option value="">選択してください</option>
              {roastLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="consumed_at" style={labelStyle}>
              飲んだ日
            </label>
            <input
              type="date"
              id="consumed_at"
              name="consumed_at"
              value={formData.consumed_at || ''}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginBottom: styles.spacing('lg') }}>
          <label htmlFor="rating" style={labelStyle}>
            総合評価（1〜5）: {formData.rating}
          </label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating || 3}
            onChange={handleChange}
            style={{ width: '100%', accentColor: styles.color('primary.main') }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: styles.typography('fontSize.small'),
            color: styles.color('text.secondary')
          }}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        {/* 味わい評価用の入力UI */}
        <Card>
          <div style={{ padding: styles.spacing('lg') }}>
            <TasteRatingInput 
              ratings={tasteRatings}
              onChange={handleTasteRatingsChange}
            />
            
            <div style={{ marginTop: styles.spacing('lg') }}>
              <Typography variant="h4" style={{ marginBottom: styles.spacing('sm') }}>レーダーチャートプレビュー</Typography>
              <TasteRadarChart ratings={tasteRatings} />
            </div>
          </div>
        </Card>

        <div style={{ marginTop: styles.spacing('lg') }}>
          <label htmlFor="description" style={labelStyle}>
            メモ・感想
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description || ''}
            onChange={handleChange}
            style={{ 
              ...inputStyle, 
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: styles.spacing('sm'),
          marginTop: styles.spacing('lg')
        }}>
          <Button
            variant="secondary"
            onClick={() => router.back()}
            type="button"
          >
            キャンセル
          </Button>
          <Button
            variant="primary"
            disabled={loading}
            type="submit"
          >
            {loading ? '保存中...' : isEditing ? '更新' : '保存'}
          </Button>
        </div>
      </div>
    </form>
  )
}