// app/admin/seo/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { peopleData } from '@/data/people'
import { MagnifyingGlassIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SEODashboard() {
  const [search, setSearch] = useState('')
  const [customSEOFiles, setCustomSEOFiles] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Check which profiles have custom SEO files
    const checkCustomSEO = async () => {
      const slugs = new Set<string>()
      
      for (const person of peopleData) {
        try {
          await fetch(`/seo/custom/people/${person.slug}.json`)
          slugs.add(person.slug)
        } catch {
          // No custom SEO file
        }
      }
      
      setCustomSEOFiles(slugs)
    }
    
    checkCustomSEO()
  }, [])

  const filteredPeople = peopleData.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase()) ||
    person.slug.toLowerCase().includes(search.toLowerCase()) ||
    person.industry.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-50 p-8 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
            SEO Management Dashboard
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Manage custom SEO for {peopleData.length} profiles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, slug, or industry..."
              className="w-full rounded-lg border border-neutral-200 bg-white py-3 pl-12 pr-4 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
              {peopleData.length}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Total Profiles
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {customSEOFiles.size}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Custom SEO
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {peopleData.length - customSEOFiles.size}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Auto-Generated
            </div>
          </div>
        </div>

        {/* Profiles Table */}
        <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <table className="w-full">
            <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  SEO Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {filteredPeople.map((person) => (
                <tr 
                  key={person.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-neutral-900 dark:text-white">
                      {person.name}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {person.influence}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="rounded bg-neutral-100 px-2 py-1 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {person.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {person.industry}
                  </td>
                  <td className="px-6 py-4">
                    {customSEOFiles.has(person.slug) ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircleIcon className="h-4 w-4" />
                        Custom
                      </span>
                    ) : person.seo ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Inline
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                        Auto
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${person.slug}`}
                        target="_blank"
                        className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/seo/edit/${person.slug}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit SEO
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
            Quick Commands
          </h3>
          <div className="space-y-2">
            <div className="rounded bg-neutral-100 p-3 font-mono text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <span className="text-neutral-500">$</span> npm run generate:custom-seo jane-cooper &quot;Dr. Jane Cooper&quot; &quot;Technology&quot; &quot;San Francisco&quot;
            </div>
            <div className="rounded bg-neutral-100 p-3 font-mono text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <span className="text-neutral-500">File:</span> seo/custom/people/jane-cooper.json
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}