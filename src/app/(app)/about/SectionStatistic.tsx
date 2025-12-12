'use client'

import { useState } from 'react'
import { UserGroupIcon, EyeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function SectionStatistic() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    {
      icon: UserGroupIcon,
      number: '5,000+',
      label: 'Leaders Featured',
      description: 'Exceptional professionals across 50+ industries and 120+ countries',
      color: 'from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-700',
      iconColor: 'text-gray-900 dark:text-white',
      textColor: 'text-gray-600 dark:text-neutral-300',
    },
    {
      icon: EyeIcon,
      number: '2.5M+',
      label: 'Monthly Profile Views',
      description: 'Connecting global audiences with inspiring leaders and their stories',
      color: 'from-gray-900 to-gray-800 dark:from-neutral-700 dark:to-neutral-600',
      iconColor: 'text-white',
      textColor: 'text-gray-400 dark:text-neutral-300',
    },
    {
      icon: ChartBarIcon,
      number: '85%',
      label: 'Network Growth Rate',
      description: 'Year-over-year expansion as more leaders join our global community of excellence',
      color: 'from-primary-600 to-primary-700',
      iconColor: 'text-white',
      textColor: 'text-primary-100',
    },
  ]

  return (
    <div className="">
      <div className="mx-auto max-w-4xl lg:mx-0">
        <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
          Making an Impact Worldwide
        </h2>
        <p className="mt-6 text-base/7 text-neutral-600 dark:text-neutral-400">
          Our platform connects exceptional leaders across industries and regions, creating a global network of
          influence, innovation, and inspiration. These numbers reflect our growing community&apos;s reach and impact.
        </p>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className={`group relative flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gradient-to-br p-8 transition-all duration-500 sm:flex-row-reverse sm:items-end lg:flex-auto lg:flex-col lg:items-start ${
                stat.color
              } ${
                hoveredStat === index
                  ? 'scale-105 shadow-2xl ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-neutral-900'
                  : ''
              }`}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div className="flex items-center gap-4">
                <Icon
                  className={`h-8 w-8 transition-all duration-500 ${stat.iconColor} ${
                    hoveredStat === index ? 'rotate-12 scale-125' : ''
                  }`}
                />
                <p
                  className={`flex-none text-3xl font-bold tracking-tight transition-all duration-300 ${stat.iconColor} ${
                    hoveredStat === index ? 'scale-110' : ''
                  }`}
                >
                  {stat.number}
                </p>
              </div>
              <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                <p className={`text-lg font-semibold tracking-tight ${stat.iconColor}`}>{stat.label}</p>
                <p className={`mt-2 text-base/7 ${stat.textColor}`}>
                  {stat.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}