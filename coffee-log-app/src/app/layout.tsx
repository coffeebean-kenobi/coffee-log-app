import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import GoogleAdsScript from "@/components/ads/GoogleAdsScript";
import "./globals.css";

// Noto Sans JPフォントを設定
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans', // CSSで使用するための変数名を設定
});

export const metadata: Metadata = {
  title: "LOGCUP",
  description: "コーヒーの情報や感想を記録するアプリ",
  icons: {
    icon: '/LOG.png',
    apple: '/LOG.png',
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
        <GoogleAdsScript />
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
      </head>
      <ThemeProvider>
        <body 
          className={`${notoSansJP.className} min-h-screen`}
          style={{
            backgroundColor: 'var(--color-background-main)',
            color: 'var(--color-text-primary)',
            transition: 'background-color 0.3s ease, color 0.3s ease'
          }}
        >
          <Header />
          <main className="pb-20">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}