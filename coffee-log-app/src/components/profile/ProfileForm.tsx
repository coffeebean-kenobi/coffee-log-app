'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  initialProfile: Profile | null
}

export default function ProfileForm({ initialProfile }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const [formData, setFormData] = useState({
    username: initialProfile?.username || '',
    display_name: initialProfile?.display_name || '',
    bio: initialProfile?.bio || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('ユーザー情報の取得に失敗しました')
      }

      // ユーザー名が変更されていて、既に使用されているかチェック
      if (formData.username && formData.username !== initialProfile?.username) {
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', formData.username)
          .single()
        
        if (existingUser && !checkError) {
          setError('このユーザー名は既に使用されています')
          setLoading(false)
          return
        }
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (updateError) throw updateError
      
      setSuccess(true)
      router.refresh()
    } catch (err: any) {
      console.error('プロフィール更新エラー:', err)
      setError(err.message || 'プロフィールの更新中にエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          プロフィールを更新しました
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            ユーザー名
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="ユーザー名"
          />
          <p className="mt-1 text-xs text-gray-500">
            他のユーザーに表示される一意のユーザー名です
          </p>
        </div>
        
        <div>
          <label htmlFor="display_name" className="block text-sm font-medium mb-1">
            表示名
          </label>
          <input
            type="text"
            id="display_name"
            name="display_name"
            value={formData.display_name || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="表示名"
          />
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            自己紹介
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="あなたのコーヒーの好みや経験について教えてください"
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleSignOut}
            className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
          >
            ログアウト
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '更新中...' : 'プロフィールを更新'}
          </button>
        </div>
      </form>
    </div>
  )
}