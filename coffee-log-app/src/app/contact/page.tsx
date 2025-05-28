import { Metadata } from 'next'
import { Container } from '@/components/Container'
import { Typography } from '@/components/Typography'
import { Card } from '@/components/Card'
import { useThemeStyles } from '@/theme/utils'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'LOGCUP（Coffee Log App）に関するご質問やお問い合わせはこちらから。',
}

export default function ContactPage() {
  return (
    <Container>
      <div style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '64rem', margin: '0 auto' }}>
        <Typography variant="h1" style={{ marginBottom: '1.5rem' }}>
          お問い合わせ
        </Typography>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* お問い合わせ方法 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem' }}>✉️</span>
                <Typography variant="h3">メールでのお問い合わせ</Typography>
              </div>
              <Typography variant="body1" style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
                ご質問やご要望がございましたら、以下のメールアドレスまでお送りください。
              </Typography>
              <Typography 
                variant="body2" 
                style={{ 
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--color-background-accent)',
                  padding: '0.75rem',
                  borderRadius: '0.375rem'
                }}
              >
                support@logcup.app
              </Typography>
            </Card>

            <Card style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem' }}>⏰</span>
                <Typography variant="h3">返信について</Typography>
              </div>
              <Typography variant="body1" style={{ color: 'var(--color-text-secondary)' }}>
                お問い合わせいただいたメールには、通常1-2営業日以内に返信いたします。
                お急ぎの場合はその旨をメールに記載してください。
              </Typography>
            </Card>
          </div>

          {/* よくある質問 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem' }}>❓</span>
                <Typography variant="h3">よくある質問</Typography>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
                    Q. アカウントの削除はできますか？
                  </Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                    A. はい、プロフィール設定画面からアカウントの削除が可能です。削除すると全てのデータが永久に削除されます。
                  </Typography>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
                    Q. 広告を非表示にできますか？
                  </Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                    A. 現在、広告の完全な非表示機能は提供していませんが、クッキー設定で広告のパーソナライゼーションを無効にできます。
                  </Typography>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
                    Q. データのエクスポートはできますか？
                  </Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                    A. 分析ページでCSV形式でのデータエクスポートが可能です。将来的には包括的なデータエクスポート機能を追加予定です。
                  </Typography>
                </div>

                <div>
                  <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>
                    Q. モバイルアプリはありますか？
                  </Typography>
                  <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                    A. 現在はWebアプリのみですが、PWA対応によりモバイル端末でもアプリのような体験が可能です。
                  </Typography>
                </div>
              </div>
            </Card>

            <Card style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.25rem' }}>💬</span>
                <Typography variant="h3">フィードバック</Typography>
              </div>
              <Typography variant="body1" style={{ color: 'var(--color-text-secondary)' }}>
                LOGCUPの改善のため、ご意見やご要望をお聞かせください。
                ユーザーの皆様の声を大切にしています。
              </Typography>
            </Card>
          </div>
        </div>

        {/* 注意事項 */}
        <Card style={{ 
          marginTop: '2rem', 
          padding: '1.5rem', 
          backgroundColor: 'var(--color-background-accent)'
        }}>
          <Typography variant="h3" style={{ marginBottom: '1rem' }}>
            お問い合わせ時の注意事項
          </Typography>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              <span>•</span>
              <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                技術的な問題については、使用環境（ブラウザ、OS等）の情報も含めてください
              </Typography>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              <span>•</span>
              <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                アカウントに関する問い合わせの際は、登録メールアドレスからお送りください
              </Typography>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.5rem', 
              marginBottom: '0.5rem' 
            }}>
              <span>•</span>
              <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                スパムメールとして誤判定されないよう、件名に「LOGCUP」を含めてください
              </Typography>
            </li>
            <li style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.5rem' 
            }}>
              <span>•</span>
              <Typography variant="body2" style={{ color: 'var(--color-text-secondary)' }}>
                営業やサービス勧誘等のメールにはお答えできません
              </Typography>
            </li>
          </ul>
        </Card>
      </div>
    </Container>
  )
} 