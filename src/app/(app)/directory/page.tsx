// app/(app)/directory/page.tsx
import DirectoryClient from '@/components/DirectoryClient'
import { peopleData } from '@/data/people'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'The People\'s Directory',
  description: `Browse our comprehensive directory of ${peopleData.length}+ distinguished leaders, innovators, and visionaries from around the world. Filter by industry, location, and expertise to find the leaders shaping tomorrow.`,
  keywords: [
    'leadership directory',
    'global leaders directory',
    'business leaders',
    'technology innovators',
    'healthcare leaders',
    'sustainability champions',
    'industry experts',
    'professional profiles',
  ],
  openGraph: {
    title: 'Directory - The People\'s Directory',
    description: `Browse our comprehensive directory of ${peopleData.length}+ distinguished leaders and visionaries from around the world.`,
    url: 'https://thepeoplesdirectory.com/directory',
    images: [
      {
        url: '/og-directory.jpg',
        width: 1200,
        height: 630,
        alt: 'The People\'s Directory - Browse Leaders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Directory - The People\'s Directory',
    description: `Browse our comprehensive directory of ${peopleData.length}+ distinguished leaders and visionaries from around the world.`,
  },
  alternates: {
    canonical: '/directory',
  },
}

// Loading fallback component
function DirectoryLoading() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20 lg:py-32">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              Loading...
            </div>
            <h1 className="text-5xl font-bold text-white lg:text-6xl">
              Discover Global Leaders
            </h1>
          </div>
        </div>
      </div>
      <div className="container py-16">
        <div className="flex items-center justify-center py-32">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </div>
    </div>
  )
}

export default function DirectoryPage() {
  return (
    <div className="directory-page">
      <Suspense fallback={<DirectoryLoading />}>
        <DirectoryClient initialPeople={peopleData} />
      </Suspense>
    </div>
  )
}