// components/profile/ProfileAchievements.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import { TrophyIcon, SparklesIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

interface ProfileAchievementsProps {
  achievements: NonNullable<Person['achievements']>
  customAlts?: Record<string, string> // Added prop
}

const ProfileAchievements: FC<ProfileAchievementsProps> = ({ achievements, customAlts }) => {

  const iconMap = {
    award: TrophyIcon,
    recognition: CheckBadgeIcon,
    milestone: SparklesIcon,
  }

  const colorMap = {
    award: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 text-yellow-700 dark:text-yellow-400',
    recognition: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-400',
    milestone: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-400'
  }

  return (
    <section>
      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Achievements & Awards
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {achievements.map((achievement, index) => {
          const Icon = iconMap[achievement.type];
          const colors = colorMap[achievement.type];
          return (
            <div
              key={index}
              className={`group rounded-3xl bg-gradient-to-br p-8 transition-all hover:shadow-xl ${colors}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <Icon className="h-10 w-10" />
                <span className="rounded-full bg-white/50 px-3 py-1 text-sm font-bold dark:bg-black/20">
                  {achievement.year}
                </span>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {achievement.title}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                {achievement.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProfileAchievements