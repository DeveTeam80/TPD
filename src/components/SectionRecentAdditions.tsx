// components/SectionRecentAdditions.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { Person } from './ProfileCard'
import Heading from './Heading'

export interface SectionRecentAdditionsProps {
  people: Person[]
  className?: string
}

const SectionRecentAdditions: FC<SectionRecentAdditionsProps> = ({
  people,
  className = '',
}) => {
  return (
    <div className={className}>
      <Heading desc="Meet the latest leaders to join our community">
        Recently Featured Leaders
      </Heading>
      
      <div className="mt-8 space-y-4">
        {people.map((person) => (
          <Link
            key={person.id}
            href={`/${person.slug || person.id}`}  // Changed this line
            className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-primary-500 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900 sm:gap-6 sm:p-6"
          >
            {/* Avatar */}
            <div className="relative h-16 w-16 flex-shrink-0 sm:h-20 sm:w-20">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                className="rounded-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-500 transition-colors">
                {person.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                {person.influence}
              </p>
              <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {person.city}, {person.country}
                </span>
                <span className="rounded-full bg-primary-50 px-2 py-1 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
                  {person.industry}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRightIcon className="h-5 w-5 flex-shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500" />
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 font-semibold text-primary-500 hover:text-primary-600"
        >
          View all members
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default SectionRecentAdditions