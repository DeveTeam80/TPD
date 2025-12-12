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
  title: 'The Premier Directory - A Digital Magazine of Distinguished Leaders',
  description: 'Discover the stories behind the world\'s most influential leaders, innovators, and visionaries.',
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