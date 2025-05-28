import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/_next/',
          '/.*'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/coffee', '/analytics', '/profile', '/privacy-policy', '/terms', '/contact'],
        disallow: ['/api/', '/admin/', '/private/', '/coffee/edit/', '/signin', '/signup'],
      },
    ],
    sitemap: 'https://coffee-log-app.vercel.app/sitemap.xml',
  }
} 