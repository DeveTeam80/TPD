// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Use the domain from your schemas
  const baseUrl = 'https://www.thepeoplesdirectory.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',      // Prevent crawling backend API routes
        '/admin/',    // Protect admin areas (if you have them)
        '/private/',  // Protect private pages
        '/_next/',    // Next.js internal files
        '/static/',   // Static assets
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}