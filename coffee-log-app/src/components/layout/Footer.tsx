'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      className="border-t"
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* プライバシー関連リンク */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/privacy-policy" 
              className="hover:underline transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              プライバシーポリシー
            </Link>
            <Link 
              href="/terms" 
              className="hover:underline transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              利用規約
            </Link>
            <Link 
              href="/contact" 
              className="hover:underline transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              お問い合わせ
            </Link>
          </div>
          
          {/* コピーライト */}
          <p className="text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            &copy; {new Date().getFullYear()} LOGCUP - Coffee Log App
          </p>
        </div>
      </div>
    </footer>
  );
}