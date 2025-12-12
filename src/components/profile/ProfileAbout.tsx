// components/profile/ProfileAbout.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'

interface ProfileAboutProps {
  person: Person
}

const ProfileAbout: FC<ProfileAboutProps> = ({ person }) => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          About
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
          {person.bio?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Quick Stats */}
        {person.stats && (
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                {person.stats.experience}
              </div>
              <div className="mt-2 font-medium text-neutral-700 dark:text-neutral-300">
                Years Experience
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-900/20 dark:to-purple-800/20">
              <div className="text-4xl font-bold text-purple-700 dark:text-purple-400">
                {person.stats.projects}
              </div>
              <div className="mt-2 font-medium text-neutral-700 dark:text-neutral-300">
                Projects Led
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 dark:from-green-900/20 dark:to-green-800/20">
              <div className="text-4xl font-bold text-green-700 dark:text-green-400">
                {person.stats.collaborations}
              </div>
              <div className="mt-2 font-medium text-neutral-700 dark:text-neutral-300">
                Collaborations
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-6 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="text-4xl font-bold text-orange-700 dark:text-orange-400">
                {person.stats.awards}
              </div>
              <div className="mt-2 font-medium text-neutral-700 dark:text-neutral-300">
                Awards Won
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProfileAbout
