/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ビルド時にESLintの警告を無視する
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Webpackの設定を最適化
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
    };
    
    // 非推奨警告を抑制
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
  // パフォーマンス最適化
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // 必要に応じて他の設定を追加
}

module.exports = nextConfig