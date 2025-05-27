// Google AdSense設定
export const adsenseConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID || '',
  enabled: process.env.NODE_ENV === 'production',
  testMode: process.env.NODE_ENV === 'development'
}

// 広告ユニット設定
export const adUnits = {
  banner: {
    desktop: {
      width: 728,
      height: 90,
      format: 'auto',
      slot: '1234567890' // 後でAdSenseダッシュボードから取得
    },
    mobile: {
      width: 320,
      height: 50,
      format: 'auto', 
      slot: '1234567891'
    }
  },
  sidebar: {
    width: 300,
    height: 250,
    format: 'auto',
    slot: '1234567892'
  },
  inArticle: {
    format: 'fluid',
    layout: 'in-article',
    slot: '1234567893'
  }
}

// 広告配置設定
export const adPlacements = {
  header: false, // ヘッダーには配置しない（UX重視）
  sidebar: true,
  afterContent: true,
  betweenRecords: true, // コーヒー記録間
  analyticsPage: true
} 