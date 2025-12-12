// components/magazine/StoriesGrid.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '@/data/people'

interface StoriesGridProps {
  people: Person[]
}

const StoriesGrid: FC<StoriesGridProps> = ({ people }) => {
  const [featured, ...rest] = people

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      {/* Large Featured Story */}
      <Link 
        href={`/${featured?.slug}`}
        className="group lg:col-span-7"
      >
        <article className="h-full">
          <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={featured?.avatarUrl}
              alt={featured?.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {featured?.industry}
              </span>
              <h3 className="font-serif text-4xl font-bold text-white lg:text-5xl">
                {featured?.name}
              </h3>
            </div>
          </div>
          <p className="mb-3 text-xl font-light text-neutral-600 dark:text-neutral-400">
            {featured?.influence}
          </p>
          <p className="line-clamp-3 text-neutral-600 dark:text-neutral-400">
            {featured?.bio?.[0] || `An exclusive conversation about innovation and leadership in ${featured?.industry}.`}
          </p>
        </article>
      </Link>

      {/* Side Stories */}
      <div className="space-y-8 lg:col-span-5">
        {rest.slice(0, 3).map((person) => (
          <Link
            key={person.id}
            href={`/${person.slug}`}
            className="group block"
          >
            <article className="flex gap-6 rounded-3xl border-2 border-transparent p-4 transition-all hover:border-primary-200 hover:bg-neutral-50 dark:hover:border-primary-900/30 dark:hover:bg-neutral-900">
              <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={person.avatarUrl}
                  alt={person.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1">
                <span className="mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                  {person.industry}
                </span>
                <h3 className="mb-2 font-serif text-xl font-bold transition-colors group-hover:text-primary-600">
                  {person.name}
                </h3>
                <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {person.influence}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Bottom Row - 3 Equal Cards */}
      <div className="lg:col-span-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {rest.slice(3, 6).map((person) => (
            <Link
              key={person.id}
              href={`/${person.slug}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-neutral-900">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={person.avatarUrl}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="mb-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
                    {person.industry}
                  </span>
                  <h3 className="mb-2 font-serif text-xl font-bold transition-colors group-hover:text-primary-600">
                    {person.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                    {person.influence}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoriesGrid