// app/admin/seo/edit/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { peopleData } from '@/data/people'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function EditSEO() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const person = peopleData.find(p => p.slug === slug)

  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    ogTitle: '',
    ogDescription: '',
    robots: 'index, follow'
  })

  useEffect(() => {
    // Load existing custom SEO if it exists
    const loadCustomSEO = async () => {
      try {
        const response = await fetch(`/seo/custom/people/${slug}.json`)
        if (response.ok) {
          const data = await response.json()
          setSeoData(data)
        }
      } catch {
        // Use auto-generated as template
        if (person) {
          setSeoData({
            title: `${person.name} - ${person.industry} Leader | TPD`,
            description: `${person.name} is a distinguished ${person.industry} leader in ${person.city}, ${person.country}. ${person.influence}`,
            keywords: `${person.name}, ${person.industry}, ${person.city}, leadership`,
            ogImage: person.avatarUrl,
            ogTitle: `${person.name} - ${person.industry} Leader`,
            ogDescription: person.influence,
            robots: 'index, follow'
          })
        }
      }
    }
    loadCustomSEO()
  }, [slug, person])

  const handleSave = async () => {
    // In production, this would call an API route
    // For now, show the JSON to copy
    alert('Copy this JSON and save to: seo/custom/people/' + slug + '.json\n\n' + JSON.stringify(seoData, null, 2))
  }

  if (!person) {
    return <div>Person not found</div>
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Edit SEO: {person.name}
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Slug: <code className="rounded bg-neutral-200 px-2 py-1 dark:bg-neutral-800">{slug}</code>
          </p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Meta Title (60 chars max)
            </label>
            <input
              type="text"
              value={seoData.title}
              onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
              maxLength={60}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
            <div className="mt-1 text-xs text-neutral-500">
              {seoData.title.length}/60 characters
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Meta Description (160 chars max)
            </label>
            <textarea
              value={seoData.description}
              onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
              maxLength={160}
              rows={3}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
            <div className="mt-1 text-xs text-neutral-500">
              {seoData.description.length}/160 characters
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={seoData.keywords}
              onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="rounded-lg bg-primary-600 px-6 py-2.5 font-semibold text-white hover:bg-primary-700"
            >
              Save Custom SEO
            </button>
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-neutral-200 px-6 py-2.5 font-semibold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-4 font-semibold text-neutral-900 dark:text-white">
            Google Search Preview
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-blue-600">{seoData.title}</div>
            <div className="text-xs text-green-700">
              https://thepeoplesdirectory.com/{slug}
            </div>
            <div className="text-sm text-neutral-600">
              {seoData.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}