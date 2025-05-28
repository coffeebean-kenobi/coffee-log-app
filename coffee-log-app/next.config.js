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
    
    // Webpackの非推奨警告を抑制
    config.infrastructureLogging = {
      level: 'error',
    };

    // プロセス環境変数でNode.jsの警告を抑制
    if (isServer) {
      process.env.NODE_NO_WARNINGS = '1';
    }

    return config;
  },
  // パフォーマンス最適化
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // 画像最適化
  images: {
    domains: ['coffee-log-app.vercel.app'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Gzip圧縮とキャッシュ最適化
  compress: true,
  
  // 実験的機能（CSS最適化を無効化）
  experimental: {
    scrollRestoration: true,
  },

  // 開発中は動的機能を使用するため、静的エクスポートは無効化
  // 静的サイトとしてデプロイする場合は、環境変数 STATIC_EXPORT=true を設定
  // ...(process.env.STATIC_EXPORT === 'true' ? {
  //   output: 'export',
  //   images: {
  //     unoptimized: true,
  //   },
  // } : {}),
}

module.exports = nextConfig