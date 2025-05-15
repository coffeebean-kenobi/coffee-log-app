import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Header } from "@/components/layout/Header";
import "./globals.css";

// Noto Sans JPフォントを設定
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans', // CSSで使用するための変数名を設定
});

export const metadata: Metadata = {
  title: "コーヒー記録アプリ",
  description: "コーヒーの情報や感想を記録するアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <ThemeProvider>
        <body className={`${notoSansJP.className} bg-background-main dark:bg-background-main min-h-screen`}>
          <Header />
          <main className="pb-20">
            {children}
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}