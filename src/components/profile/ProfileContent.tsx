// components/ProfileContent.tsx
import React, { FC } from 'react'
import { Person } from '../ProfileCard'
import { 
  TrophyIcon, 
  BriefcaseIcon, 
  AcademicCapIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline'

interface ProfileContentProps {
  person: Person
}

const ProfileContent: FC<ProfileContentProps> = ({ person }) => {
  return (
    <div className="space-y-16">
      {/* About Section */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
            <SparklesIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            About
          </h2>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:from-neutral-800 dark:to-neutral-900 lg:p-10">
          <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            {person.influence}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            Based in {person.city}, {person.country}, {person.name} has established themselves as a prominent figure in the {person.industry} sector, contributing significantly to their local community and industry development.
          </p>
        </div>
      </section>

      {/* Key Achievements */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
            <TrophyIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Key Achievements
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all hover:border-primary-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-4 inline-flex rounded-full bg-primary-50 p-3 dark:bg-primary-900/30">
              <BriefcaseIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Industry Leadership
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Recognized leader in {person.industry} with significant contributions to community development and industry innovation.
            </p>
          </div>

          <div className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all hover:border-primary-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
            <div className="mb-4 inline-flex rounded-full bg-purple-50 p-3 dark:bg-purple-900/30">
              <AcademicCapIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Thought Leadership
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Active contributor shaping the future of {person.industry} through innovation and community engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section>
        <div className="rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-10 text-white lg:p-12">
          <h2 className="mb-8 text-3xl font-bold">Community Impact</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <div className="mb-2 text-4xl font-bold">15+</div>
              <div className="text-primary-100">Years Experience</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">50+</div>
              <div className="text-primary-100">Projects Led</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold">100+</div>
              <div className="text-primary-100">Industry Connections</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfileContent