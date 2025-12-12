// src/components/ProfileCard.tsx

'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { Person } from '@/data/people'

export interface ProfileCardProps {
  className?: string
  person: Person
}

const ProfileCard: FC<ProfileCardProps> = ({ className = '', person }) => {
  const { name, influence, city, country, avatarUrl, slug, industry } = person

  return (
    <div
      className={`relative group h-full w-full p-5 sm:p-6 bg-white dark:bg-neutral-800 rounded-2xl sm:rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      {/* Main content of the card */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar Image */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-neutral-100 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary-500/50 dark:ring-neutral-700">
          <Image
            fill
            className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={avatarUrl}
            alt={name}
            sizes="(max-width: 640px) 80px, 96px"
          />
        </div>

        {/* Text Content */}
        <div className="mt-4">
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-primary-600 dark:text-neutral-100 dark:group-hover:text-primary-400">
            {name}
          </h3>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {influence}
          </p>
          
          {/* Industry Badge */}
          <div className="mt-3 inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
            {industry}
          </div>

          {/* Location */}
          <div className="mt-3 flex items-center justify-center text-xs text-neutral-500 dark:text-neutral-400">
            <MapPinIcon className="h-4 w-4 flex-shrink-0" />
            <span className="ml-1.5">{`${city}, ${country}`}</span>
          </div>
        </div>
      </div>

      {/* Overlay Link to make the entire card clickable */}
      <Link 
        href={`/${slug}`} 
        className="absolute inset-0 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900" 
      />
    </div>
  )
}

export default ProfileCard