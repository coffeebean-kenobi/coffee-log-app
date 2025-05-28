import { Metadata } from 'next'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | LOGCUP',
  description: 'Coffee Log App（LOGCUP）のプライバシーポリシーです。',
}

export default function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>プライバシーポリシー</h1>
        
        <div className="max-w-none">
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            最終更新日: 2025年5月28日
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>1. はじめに</h2>
            <p style={{ color: 'var(--color-text)' }}>
              Coffee Log App（以下「LOGCUP」）は、ユーザーのプライバシーを尊重し、
              個人情報の保護に努めています。本プライバシーポリシーは、
              当サービスにおける個人情報の取り扱いについて説明します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>2. 収集する情報</h2>
            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>2.1 ユーザーが提供する情報</h3>
            <ul className="list-disc pl-6 mb-4" style={{ color: 'var(--color-text)' }}>
              <li>アカウント情報（メールアドレス、表示名、ユーザー名）</li>
              <li>プロフィール情報（自己紹介文）</li>
              <li>コーヒー記録データ（店舗名、コーヒー情報、評価、メモ等）</li>
            </ul>

            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>2.2 自動的に収集される情報</h3>
            <ul className="list-disc pl-6 mb-4" style={{ color: 'var(--color-text)' }}>
              <li>アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）</li>
              <li>利用状況データ（ページビュー、クリック情報、滞在時間）</li>
              <li>デバイス情報（OS、ブラウザ種別、画面解像度）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>3. 情報の利用目的</h2>
            <ul className="list-disc pl-6" style={{ color: 'var(--color-text)' }}>
              <li>サービスの提供・運営・改善</li>
              <li>ユーザーサポートの提供</li>
              <li>利用状況の分析・統計の作成</li>
              <li>不正利用の防止・セキュリティ向上</li>
              <li>法的義務の履行</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>4. クッキーについて</h2>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              当サービスでは、ユーザー体験の向上と分析のために以下のクッキーを使用します：
            </p>
            
            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>4.1 必須クッキー</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              サービスの基本機能（認証、セッション管理）に必要なクッキーです。
              これらは無効にすることができません。
            </p>

            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>4.2 分析クッキー</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              Google Analyticsを使用してサイトの利用状況を分析します。
              収集された情報は匿名化され、個人を特定することはできません。
            </p>

            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>4.3 広告クッキー</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              Google AdSenseを使用してパーソナライズされた広告を表示します。
              ユーザーは広告設定で個人に合わせた広告をオプトアウトできます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>5. 第三者サービス</h2>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>当サービスでは以下の第三者サービスを利用しています：</p>
            
            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>5.1 Supabase</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              ユーザー認証とデータベースサービスを提供します。
              <a href="https://supabase.com/privacy" className="hover:underline" style={{ color: 'var(--color-primary)' }} target="_blank" rel="noopener noreferrer">
                Supabaseプライバシーポリシー
              </a>
            </p>

            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>5.2 Google Analytics</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              サイト利用状況の分析を行います。
              <a href="https://policies.google.com/privacy" className="hover:underline" style={{ color: 'var(--color-primary)' }} target="_blank" rel="noopener noreferrer">
                Googleプライバシーポリシー
              </a>
            </p>

            <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--color-text)' }}>5.3 Google AdSense</h3>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              広告の配信を行います。ユーザーは
              <a href="https://adssettings.google.com/" className="hover:underline" style={{ color: 'var(--color-primary)' }} target="_blank" rel="noopener noreferrer">
                Google広告設定
              </a>
              でパーソナライズ広告をオプトアウトできます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>6. 情報の共有</h2>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>
              当サービスは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません：
            </p>
            <ul className="list-disc pl-6" style={{ color: 'var(--color-text)' }}>
              <li>ユーザーの同意がある場合</li>
              <li>法的義務に基づく場合</li>
              <li>サービス提供に必要な業務委託先への提供</li>
              <li>緊急時（生命、身体の安全確保）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>7. ユーザーの権利</h2>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>ユーザーは以下の権利を有します：</p>
            <ul className="list-disc pl-6" style={{ color: 'var(--color-text)' }}>
              <li>個人情報の開示・訂正・削除の請求</li>
              <li>データポータビリティの権利</li>
              <li>処理の制限・異議申し立ての権利</li>
              <li>アカウントの削除</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>8. セキュリティ</h2>
            <p style={{ color: 'var(--color-text)' }}>
              当サービスは、適切な技術的・組織的措置を講じて、
              個人情報の不正アクセス、紛失、破壊、改ざん、漏洩を防止します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>9. 国際転送</h2>
            <p style={{ color: 'var(--color-text)' }}>
              当サービスは、サービス提供のため個人情報を国外のサーバーに保存する場合があります。
              この場合、適切な保護措置を講じます。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>10. 改定</h2>
            <p style={{ color: 'var(--color-text)' }}>
              本プライバシーポリシーは、法令の改正やサービス内容の変更等により改定する場合があります。
              重要な変更がある場合は、サイト上で通知します。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>11. お問い合わせ</h2>
            <p style={{ color: 'var(--color-text)' }}>
              プライバシーに関するご質問やご要望は、
              <a href="/contact" className="hover:underline" style={{ color: 'var(--color-primary)' }}>お問い合わせページ</a>
              よりご連絡ください。
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
} 