// components/magazine/FeaturedStory.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '@/data/people'
import { ClockIcon } from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
interface FeaturedStoryProps {
  person: Person
}

const FeaturedStory: FC<FeaturedStoryProps> = ({ person }) => {
  return (
    <article className="bg-white dark:bg-neutral-950">
      <div className="container py-20 lg:py-32">
        <div className="mx-auto max-w-4xl">
          {/* Category Tag */}
          <div className="mb-8 flex items-center gap-4">
            <span className="rounded-full bg-primary-100 px-5 py-2 text-sm font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              {person.industry}
            </span>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <ClockIcon className="h-4 w-4" />
              8 min read
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-8 font-serif text-5xl font-bold leading-tight lg:text-6xl">
            The Visionary Behind {person.industry} Transformation
          </h2>

          {/* Subtitle */}
          <p className="mb-10 text-2xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            How {person.name} is reshaping the future of {person.industry} from {person.city}
          </p>

          {/* Author Info */}
          <div className="mb-12 flex items-center gap-4 rounded-2xl border-l-4 border-primary-500 bg-neutral-50 p-6 dark:bg-neutral-900">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-white dark:ring-neutral-800">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">By Editorial Team</div>
              <div className="text-sm text-neutral-500">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {person.bio?.map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
            
            {!person.bio && (
              <>
                <p className="mb-6 text-lg leading-relaxed">
                  In the heart of {person.city}, {person.name} has been quietly revolutionizing 
                  the {person.industry} landscape. What started as a bold vision has transformed 
                  into a movement that&apos;s reshaping how we think about innovation and leadership.
                </p>
                <p className="mb-6 text-lg leading-relaxed">
                  &ldquo;The future belongs to those who dare to imagine it differently,&rdquo; {person.name.split(' ')[0]} reflects. 
                  This philosophy has guided every decision, every pivot, and every triumph along an extraordinary journey.
                </p>
              </>
            )}
          </div>

          {/* Stats if available */}
          {person.stats && (
            <div className="my-12 grid gap-6 rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 p-10 dark:from-primary-900/20 dark:to-primary-800/20 sm:grid-cols-4">
              <div>
                <div className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                  {person.stats.experience}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                  {person.stats.projects}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Projects Led
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                  {person.stats.collaborations}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Collaborations
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                  {person.stats.awards}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Awards Won
                </div>
              </div>
            </div>
          )}

          {/* Read More CTA */}
          <div className="mt-12 rounded-3xl bg-neutral-50 p-8 dark:bg-neutral-900">
            <Link
              href={`/${person.slug}`}
              className="group inline-flex items-center gap-3 text-xl font-semibold transition-colors hover:text-primary-600"
            >
              Continue Reading the Full Profile
              <ArrowRightIcon className="h-6 w-6 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default FeaturedStory