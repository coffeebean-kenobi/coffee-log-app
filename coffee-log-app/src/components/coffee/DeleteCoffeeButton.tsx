'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Props = {
  coffeeId: string
}

export default function DeleteCoffeeButton({ coffeeId }: Props) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const supabase = createClient()

  const handleDelete = async () => {
    setIsDeleting(true)
    
    try {
      const { error } = await supabase
        .from('coffee_records')
        .delete()
        .eq('id', coffeeId)
      
      if (error) throw error
      
      router.push('/coffee')
      router.refresh()
    } catch (err) {
      console.error('削除エラー:', err)
      alert('削除中にエラーが発生しました')
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-card p-6 rounded-lg max-w-sm w-full border border-border shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-card-foreground">削除の確認</h3>
          <p className="mb-6 text-card-foreground">この記録を削除してもよろしいですか？この操作は元に戻せません。</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-foreground bg-background border border-border rounded hover:bg-secondary transition-colors"
              disabled={isDeleting}
            >
              キャンセル
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              disabled={isDeleting}
            >
              {isDeleting ? '削除中...' : '削除する'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
    >
      削除
    </button>
  )
}