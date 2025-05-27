'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Button } from '@/components/Button'
import { Typography } from '@/components/Typography'
import { useThemeStyles } from '@/theme/utils'

type Props = {
  coffeeId: string
}

export default function DeleteCoffeeButton({ coffeeId }: Props) {
  const router = useRouter()
  const styles = useThemeStyles()
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
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}>
        <div style={{
          backgroundColor: 'var(--color-background-paper)',
          padding: styles.spacing('lg'),
          borderRadius: styles.borderRadius('md'),
          maxWidth: '400px',
          width: '100%',
          margin: styles.spacing('md'),
          border: '1px solid var(--color-accent-main)',
          boxShadow: styles.shadows('lg')
        }}>
          <Typography variant="h4" style={{ marginBottom: styles.spacing('md') }}>
            削除の確認
          </Typography>
          <Typography variant="body1" style={{ marginBottom: styles.spacing('lg') }}>
            この記録を削除してもよろしいですか？この操作は元に戻せません。
          </Typography>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: styles.spacing('sm') 
          }}>
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              style={{
                padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
                backgroundColor: 'var(--color-background-main)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-accent-main)',
                borderRadius: styles.borderRadius('sm'),
                cursor: 'pointer',
                fontSize: styles.typography('fontSize.body1'),
                opacity: isDeleting ? 0.6 : 1
              }}
            >
              キャンセル
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                padding: `${styles.spacing('sm')} ${styles.spacing('md')}`,
                backgroundColor: 'var(--color-text-error)',
                color: 'var(--color-background-paper)',
                border: 'none',
                borderRadius: styles.borderRadius('sm'),
                cursor: 'pointer',
                fontSize: styles.typography('fontSize.body1'),
                opacity: isDeleting ? 0.6 : 1
              }}
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
      style={{
        padding: `${styles.spacing('xs')} ${styles.spacing('sm')}`,
        backgroundColor: 'var(--color-text-error)',
        color: 'var(--color-background-paper)',
        fontSize: styles.typography('fontSize.sm'),
        border: 'none',
        borderRadius: styles.borderRadius('sm'),
        cursor: 'pointer'
      }}
    >
      削除
    </button>
  )
}