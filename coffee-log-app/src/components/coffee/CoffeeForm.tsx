'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import TasteRatingInput from './TasteRatingInput'
import TasteRadarChart, { TasteRatings } from './TasteRadarChart'

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="shop_name" className="block text-sm font-medium">
          店名 *
        </label>
        <input
          type="text"
          id="shop_name"
          name="shop_name"
          value={formData.shop_name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="coffee_name" className="block text-sm font-medium">
          コーヒー名
        </label>
        <input
          type="text"
          id="coffee_name"
          name="coffee_name"
          value={formData.coffee_name || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium">
            原産国
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="region" className="block text-sm font-medium">
            地域
          </label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="farm" className="block text-sm font-medium">
            農園
          </label>
          <input
            type="text"
            id="farm"
            name="farm"
            value={formData.farm || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="processing_method" className="block text-sm font-medium">
            精製方法
          </label>
          <input
            type="text"
            id="processing_method"
            name="processing_method"
            value={formData.processing_method || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="roast_level" className="block text-sm font-medium">
            焙煎度合い
          </label>
          <select
            id="roast_level"
            name="roast_level"
            value={formData.roast_level || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
          <label htmlFor="consumed_at" className="block text-sm font-medium">
            飲んだ日
          </label>
          <input
            type="date"
            id="consumed_at"
            name="consumed_at"
            value={formData.consumed_at || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium">
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
          className="mt-1 block w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {/* 味わい評価用の入力UI */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <TasteRatingInput 
          ratings={tasteRatings}
          onChange={handleTasteRatingsChange}
        />
        
        <div className="mt-6">
          <h4 className="text-md font-medium mb-2">レーダーチャートプレビュー</h4>
          <TasteRadarChart ratings={tasteRatings} />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          メモ・感想
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? '保存中...' : isEditing ? '更新' : '保存'}
        </button>
      </div>
    </form>
  )
}