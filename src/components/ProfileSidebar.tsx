// components/ProfileSidebar.tsx
import React, { FC } from 'react'
import { Person } from './ProfileCard'
import { 
  MapPinIcon, 
  BriefcaseIcon, 
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface ProfileSidebarProps {
  person: Person
}

const ProfileSidebar: FC<ProfileSidebarProps> = ({ person }) => {
  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <div className="sticky top-24 rounded-3xl border-2 border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 lg:p-8">
        <h3 className="mb-6 text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Profile Information
        </h3>
        
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-900/30">
              <BriefcaseIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Industry
              </div>
              <div className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {person.industry}
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-700" />

          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/30">
              <MapPinIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Location
              </div>
              <div className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                {person.city}, {person.country}
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-700" />

          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-green-50 dark:bg-green-900/30">
              <GlobeAltIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Influence Reach
              </div>
              <div className="mt-1 font-semibold text-neutral-900 dark:text-neutral-100">
                Regional Leader
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full rounded-full bg-primary-600 px-6 py-4 font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <EnvelopeIcon className="h-5 w-5" />
              Contact {person.name.split(' ')[0]}
            </div>
          </button>
          <button className="w-full rounded-full border-2 border-neutral-200 px-6 py-4 font-semibold transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar