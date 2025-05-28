import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAdsScript from '@/components/ads/GoogleAdsScript';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import CookieConsentBanner from '@/components/privacy/CookieConsentBanner';
import AdPerformanceMonitor from '@/components/ads/AdPerformanceMonitor';
import "./globals.css";

// Noto Sans JPフォントを設定
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans', // CSSで使用するための変数名を設定
});

export const metadata: Metadata = {
  title: {
    default: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    template: '%s | LOGCUP'
  },
  description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。LOGCUPであなたのコーヒージャーニーを最適化しましょう。',
  keywords: [
    'コーヒー', 'ログ', '記録', '分析', 'カフェ', 'エスプレッソ', 'ドリップ',
    'テイスティング', 'コーヒー豆', 'ロースト', 'flavor profile', 'coffee tracking',
    'コーヒー体験', 'データ分析', 'コーヒー愛好家', 'バリスタ'
  ],
  icons: {
    icon: '/LOG.png',
    apple: '/LOG.png',
  },
  authors: [{ name: 'LOGCUP Team' }],
  creator: 'LOGCUP',
  publisher: 'LOGCUP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://coffee-log-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://coffee-log-app.vercel.app',
    title: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。LOGCUPであなたのコーヒージャーニーを最適化しましょう。',
    siteName: 'LOGCUP',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LOGCUP - コーヒーログアプリ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LOGCUP - あなたのコーヒー体験を記録・分析・発見',
    description: 'コーヒーの味わいを詳細に記録し、データ分析で新しい発見を。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // AdSense申請時に設定
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem('theme-mode') || 'system';
                  const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
                } catch (e) {}
              })();
            `,
          }}
        />
        <GoogleAdsScript />
        <GoogleAnalytics />
        {/* AdSense最適化のための追加メタタグ */}
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXXXXXX" />
        <meta name="google-adsense-platform-account" content="ca-host-pub-XXXXXXXXXXXXXXXX" />
      </head>
      <ThemeProvider>
        <body 
          className={`${notoSansJP.className} min-h-screen flex flex-col`}
          style={{
            backgroundColor: 'var(--color-background-main)',
            color: 'var(--color-text-primary)',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}
        >
          <Header />
          <main className="flex-1 pb-20">
            {children}
          </main>
          <Footer />
          <CookieConsentBanner />
          <AdPerformanceMonitor />
        </body>
      </ThemeProvider>
    </html>
  );
}