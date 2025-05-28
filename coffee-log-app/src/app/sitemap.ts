import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://coffee-log-app.vercel.app'
  
  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/coffee`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/coffee/add`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/signin`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return staticPages
} 