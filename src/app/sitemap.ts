// app/sitemap.ts
import { MetadataRoute } from 'next'
import { peopleData } from '@/data/people'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.thepeoplesdirectory.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/directory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // People profile pages
  const peoplePages: MetadataRoute.Sitemap = peopleData.map((person) => ({
    url: `${baseUrl}/${person.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...peoplePages]
}