// components/magazine/EditorsPicks.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '@/data/people'
import { StarIcon } from '@heroicons/react/24/solid'

interface EditorsPicksProps {
  people: Person[]
}

const EditorsPicks: FC<EditorsPicksProps> = ({ people }) => {
  return (
    <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <StarIcon className="h-7 w-7 text-yellow-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-yellow-400">
                Curated Selection
              </span>
            </div>
            <h2 className="font-serif text-4xl font-bold text-white lg:text-5xl">
              Editor's Picks
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-yellow-400" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {people.map((person, index) => (
            <Link
              key={person.id}
              href={`/${person.slug}`}
              className="group"
            >
              <article className="relative h-full overflow-hidden rounded-3xl bg-neutral-800 transition-all hover:scale-[1.02] hover:shadow-2xl">
                {/* Number Badge */}
                <div className="absolute left-6 top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 font-serif text-2xl font-bold text-neutral-900 shadow-xl">
                  {index + 1}
                </div>

                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={person.avatarUrl}
                    alt={person.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="mb-3 inline-block rounded-full bg-yellow-400/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-400">
                    {person.industry}
                  </span>
                  <h3 className="mb-3 font-serif text-2xl font-bold text-white">
                    {person.name}
                  </h3>
                  <p className="mb-4 text-neutral-400">
                    {person.influence}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="h-1 w-1 rounded-full bg-neutral-500" />
                    {person.city}, {person.country}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EditorsPicks