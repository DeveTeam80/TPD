// app/sitemap.ts
import { MetadataRoute } from 'next'
import { peopleData } from '@/data/people'
import { industries } from '@/data/industries'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://peoplesdirectory.com' // Replace with your actual domain

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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // People profile pages
  const peoplePages: MetadataRoute.Sitemap = peopleData.map((person) => ({
    url: `${baseUrl}/${person.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Industry pages (if you have them)
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/directory?industry=${encodeURIComponent(industry.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...peoplePages, ...industryPages]
}