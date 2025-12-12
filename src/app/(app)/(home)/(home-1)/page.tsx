// app/page.tsx
import MagazineHero from '@/components/magazine/MagazineHero'
import FeaturedStory from '@/components/magazine/FeaturedStory'
import StoriesGrid from '@/components/magazine/StoriesGrid'
import EditorsPicks from '@/components/magazine/EditorsPicks'
import LatestIssue from '@/components/magazine/LatestIssue'
import CategoryShowcase from '@/components/magazine/CategoryShowcase'
import { peopleData } from '@/data/people'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | The People\'s Directory',
    default: 'The People\'s Directory - Global Leaders & Visionaries',
  },
  description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide. Browse profiles of influential individuals across technology, business, healthcare, sustainability, and more.',
  keywords: [
    'leadership directory',
    'global leaders',
    'visionaries',
    'innovators',
    'industry leaders',
    'business executives',
    'technology leaders',
    'healthcare innovators',
    'sustainability champions',
    'influential people',
    'professional network',
    'leadership profiles',
  ],
  authors: [{ name: 'The People\'s Directory' }],
  creator: 'The People\'s Directory',
  publisher: 'The People\'s Directory',
  metadataBase: new URL('https://thepeoplesdirectory.com'), // Update with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'The People\'s Directory - Global Leaders & Visionaries',
    description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide.',
    url: 'https://thepeoplesdirectory.com', // Update with your actual domain
    siteName: 'The People\'s Directory',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'The People\'s Directory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The People\'s Directory - Global Leaders & Visionaries',
    description: 'Discover and connect with distinguished leaders, innovators, and visionaries shaping industries worldwide.',
    images: ['/twitter-image.jpg'], // Add your Twitter image
    creator: '@thepeoplesdirectory', // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code', // Add your Google verification code
  //   // yandex: 'your-yandex-verification-code',
  //   // bing: 'your-bing-verification-code',
  // },
}

export default function HomePage() {
  const featuredPerson = peopleData[0]
  const editorsPicks = peopleData.slice(1, 4)
  const latestStories = peopleData.slice(4, 10)

  return (
    <div className="relative overflow-hidden">
      {/* Magazine Cover/Hero */}
      <MagazineHero person={featuredPerson} />

      {/* Featured Long-form Story */}
      <FeaturedStory person={featuredPerson} />

      {/* Latest Stories Grid */}
      <section className="bg-white dark:bg-neutral-950">
        <div className="container py-20 lg:py-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-4xl font-bold lg:text-5xl">
                Latest Stories
              </h2>
              <div className="mt-4 h-1 w-20 rounded-full bg-primary-500" />
            </div>
          </div>
          <StoriesGrid people={latestStories} />
        </div>
      </section>

      {/* Editor's Picks */}
      <EditorsPicks people={editorsPicks} />

      {/* This Month's Issue */}
      <LatestIssue />

      {/* Categories Showcase */}
      <CategoryShowcase />
    </div>
  )
}