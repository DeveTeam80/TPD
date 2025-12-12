// components/ProfileHeader.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import { MapPinIcon, BriefcaseIcon, ShareIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { Person } from './ProfileCard'

interface ProfileHeaderProps {
  person: Person
}

const ProfileHeader: FC<ProfileHeaderProps> = ({ person }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
      
      <div className="container relative py-20 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center lg:flex-row lg:gap-16 lg:text-left">
            {/* Avatar with Premium Styling */}
            <div className="relative">
              <div className="relative h-56 w-56 lg:h-64 lg:w-64">
                {/* Gradient Ring */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 opacity-75 blur-xl" />
                
                {/* Image Container */}
                <div className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-white/20 backdrop-blur-sm">
                  <Image
                    src={person.avatarUrl}
                    alt={person.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                {/* Verified Badge */}
                <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 ring-4 ring-white/20">
                  <CheckBadgeIcon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-12 flex-1 lg:mt-0">
              {/* Industry Tag */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                <BriefcaseIcon className="h-4 w-4" />
                {person.industry}
              </div>

              {/* Name */}
              <h1 className="mb-4 text-5xl font-bold text-white lg:text-6xl">
                {person.name}
              </h1>
              
              {/* Title/Influence */}
              <p className="mb-6 text-2xl text-neutral-200 lg:text-3xl">
                {person.influence}
              </p>

              {/* Location */}
              <div className="mb-8 flex items-center justify-center gap-2 text-lg text-neutral-300 lg:justify-start">
                <MapPinIcon className="h-5 w-5" />
                <span>{person.city}, {person.country}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <button className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-neutral-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl">
                  <EnvelopeIcon className="h-5 w-5" />
                  Get in Touch
                </button>
                <button className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20">
                  <ShareIcon className="h-5 w-5" />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader