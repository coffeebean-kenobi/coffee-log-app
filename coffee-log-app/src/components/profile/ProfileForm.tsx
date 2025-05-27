'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Database } from '@/types/database.types'
import { Card } from '@/components/Card'
import { Typography } from '@/components/Typography'
import { Button } from '@/components/Button'
import { useThemeStyles } from '@/theme/utils'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  initialProfile: Profile | null
}

export default function ProfileForm({ initialProfile }: Props) {
  const router = useRouter()
  const styles = useThemeStyles()
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

  return (
    <Card>
      <div style={{ padding: styles.spacing('lg') }}>
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
        
        {success && (
          <div style={{ 
            padding: styles.spacing('md'),
            backgroundColor: 'var(--color-highlight-light)',
            borderRadius: styles.borderRadius('sm'),
            color: 'var(--color-primary-main)',
            marginBottom: styles.spacing('md'),
            border: '1px solid var(--color-highlight-main)',
          }}>
            <Typography variant="body2" style={{ color: 'inherit' }}>プロフィールを更新しました</Typography>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing('lg') }}>
          <div>
            <label htmlFor="username" style={labelStyle}>
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              style={inputStyle}
              placeholder="ユーザー名"
            />
            <Typography variant="body2" style={{ 
              marginTop: styles.spacing('xs'),
              color: 'var(--color-text-secondary)'
            }}>
              他のユーザーに表示される一意のユーザー名です
            </Typography>
          </div>
          
          <div>
            <label htmlFor="display_name" style={labelStyle}>
              表示名
            </label>
            <input
              type="text"
              id="display_name"
              name="display_name"
              value={formData.display_name || ''}
              onChange={handleChange}
              style={inputStyle}
              placeholder="表示名"
            />
          </div>
          
          <div>
            <label htmlFor="bio" style={labelStyle}>
              自己紹介
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio || ''}
              onChange={handleChange}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '100px'
              }}
              placeholder="あなたのコーヒーの好みや経験について教えてください"
            />
          </div>
          
                     <div style={{ 
             display: 'flex', 
             justifyContent: 'space-between',
             marginTop: styles.spacing('md')
           }}>
             <button
               onClick={handleSignOut}
               type="button"
               style={{
                 padding: styles.spacing('sm'),
                 backgroundColor: 'var(--color-text-error)',
                 color: 'var(--color-background-paper)',
                 border: 'none',
                 borderRadius: styles.borderRadius('sm'),
                 cursor: 'pointer',
                 fontSize: styles.typography('fontSize.body1')
               }}
             >
               ログアウト
             </button>
             
             <Button
               variant="primary"
               disabled={loading}
               type="submit"
             >
               {loading ? '更新中...' : 'プロフィールを更新'}
             </Button>
           </div>
        </form>
      </div>
    </Card>
  )
}