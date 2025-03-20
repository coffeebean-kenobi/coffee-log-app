/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ビルド時にESLintの警告を無視する
    ignoreDuringBuilds: true,
  },
  // 必要に応じて他の設定を追加
}

module.exports = nextConfig