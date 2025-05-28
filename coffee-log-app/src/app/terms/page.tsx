import { Metadata } from 'next'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: '利用規約 | LOGCUP',
  description: 'Coffee Log App（LOGCUP）の利用規約です。',
}

export default function TermsPage() {
  return (
    <Container>
      <div className="py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>利用規約</h1>
        
        <div className="max-w-none">
          <p className="mb-6" style={{ color: 'var(--color-text-muted)' }}>
            最終更新日: 2025年5月28日
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第1条 総則</h2>
            <p style={{ color: 'var(--color-text)' }}>
              本利用規約（以下「本規約」）は、Coffee Log App（以下「当サービス」）の
              利用条件を定めるものです。ユーザーは本規約に同意の上、当サービスをご利用ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第2条 定義</h2>
            <ul className="list-disc pl-6" style={{ color: 'var(--color-text)' }}>
              <li>「当サービス」とは、Coffee Log App（LOGCUP）を指します</li>
              <li>「ユーザー」とは、当サービスを利用する個人を指します</li>
              <li>「コンテンツ」とは、文字、音声、画像等の情報を指します</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第3条 アカウント登録</h2>
            <ol className="list-decimal pl-6" style={{ color: 'var(--color-text)' }}>
              <li>ユーザーは正確な情報でアカウント登録を行う必要があります</li>
              <li>登録情報に変更がある場合は速やかに更新してください</li>
              <li>アカウント情報の管理責任はユーザーにあります</li>
              <li>第三者によるアカウント使用を発見した場合は直ちに通知してください</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第4条 禁止事項</h2>
            <p className="mb-4" style={{ color: 'var(--color-text)' }}>ユーザーは以下の行為を行ってはいけません：</p>
            <ul className="list-disc pl-6" style={{ color: 'var(--color-text)' }}>
              <li>法令に違反する行為</li>
              <li>第三者の権利を侵害する行為</li>
              <li>虚偽の情報を投稿する行為</li>
              <li>システムに負荷をかける行為</li>
              <li>商業目的での利用（当社が許可した場合を除く）</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第5条 コンテンツの取り扱い</h2>
            <ol className="list-decimal pl-6" style={{ color: 'var(--color-text)' }}>
              <li>ユーザーが投稿したコンテンツの著作権はユーザーに帰属します</li>
              <li>当社はサービス運営に必要な範囲でコンテンツを利用できます</li>
              <li>ユーザーは投稿コンテンツについて責任を負います</li>
              <li>不適切なコンテンツは当社判断で削除する場合があります</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第6条 サービスの変更・停止</h2>
            <p style={{ color: 'var(--color-text)' }}>
              当社は、ユーザーへの事前通知なしに、サービスの内容を変更し、
              または提供を停止することができるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第7条 免責事項</h2>
            <ol className="list-decimal pl-6" style={{ color: 'var(--color-text)' }}>
              <li>当社は、当サービスの完全性・正確性・確実性を保証しません</li>
              <li>システム障害等による損害について当社は責任を負いません</li>
              <li>ユーザー間トラブルについて当社は関与しません</li>
              <li>第三者サービスに起因する損害について当社は責任を負いません</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第8条 準拠法・管轄裁判所</h2>
            <p style={{ color: 'var(--color-text)' }}>
              本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-text)' }}>第9条 規約の変更</h2>
            <p style={{ color: 'var(--color-text)' }}>
              当社は、必要に応じて本規約を変更することができます。
              重要な変更については、サイト上で事前に通知します。
            </p>
          </section>
        </div>
      </div>
    </Container>
  )
} 