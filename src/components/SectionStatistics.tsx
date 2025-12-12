// components/SectionStatistics.tsx
import React, { FC } from 'react'
import { GlobeAltIcon, MagnifyingGlassIcon, UserGroupIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export interface SectionStatisticsProps {
  className?: string
}

const SectionStatistics: FC<SectionStatisticsProps> = ({ className = '' }) => {
  const stats = [
    {
      icon: UserGroupIcon,
      number: '5,000+',
      label: 'Distinguished Leaders',
    },
    {
      icon: GlobeAltIcon,
      number: '150+',
      label: 'Cities Worldwide',
    },
    {
      icon: BuildingOfficeIcon,
      number: '50+',
      label: 'Industries',
    },
    {
      icon: MagnifyingGlassIcon,
      number: '100K+',
      label: 'Monthly Searches',
    },
  ]

  return (
    <div className={`nc-SectionStatistics ${className}`}>
      <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100/50 px-8 py-16 dark:from-neutral-800 dark:to-neutral-900 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-neutral-800">
                  <stat.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-neutral-900 dark:text-neutral-100 lg:text-6xl">
                {stat.number}
              </div>
              <div className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionStatistics