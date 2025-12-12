// components/profile/ProfileHero.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import { Person } from '@/data/people'
import { 
  ShareIcon, 
  CheckBadgeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface ProfileHeroProps {
  person: Person
}

const ProfileHero: FC<ProfileHeroProps> = ({ person }) => {
  return (
    <div className="relative bg-white dark:bg-neutral-900">
      <div className="container">
        <div className="flex min-h-[600px] flex-col lg:flex-row lg:items-center">
          {/* Left: Image */}
          <div className="relative lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 lg:h-[600px]">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 px-8 py-16 lg:px-16 lg:py-20">
            {/* Tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              {person.industry}
            </div>

            {/* Name */}
            <h1 className="mb-6 text-5xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 lg:text-6xl">
              {person.name}
              <CheckBadgeIcon className="ml-3 inline h-10 w-10 text-blue-500 lg:h-12 lg:w-12" />
            </h1>

            {/* Bio */}
            <p className="mb-8 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
              {person.influence}
            </p>

            {/* Location */}
            <div className="mb-8 flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <MapPinIcon className="h-5 w-5" />
              <span>{person.city}, {person.country}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${person.socials?.email}`} className="rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                Get in Touch
              </a>
              <button className="rounded-full border-2 border-neutral-300 px-8 py-4 font-semibold transition-all hover:border-neutral-400 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
                <div className="flex items-center gap-2">
                  <ShareIcon className="h-5 w-5" />
                  Share Profile
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHero

