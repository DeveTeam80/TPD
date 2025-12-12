// components/SectionHowItWorks.tsx
import React, { FC } from 'react'
import Heading from '@/components/Heading'
import { CheckBadgeIcon, MagnifyingGlassIcon, RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline'

export interface SectionHowItWorksProps {
  className?: string
}

const SectionHowItWorks: FC<SectionHowItWorksProps> = ({ className = '' }) => {
  const steps = [
    {
      icon: UserGroupIcon,
      title: 'Get Featured',
      description: 'Submit your profile or get nominated by your community to be featured in our directory.',
    },
    {
      icon: CheckBadgeIcon,
      title: 'Build Your Presence',
      description: 'Create a comprehensive profile showcasing your achievements, expertise, and community impact.',
    },
    {
      icon: MagnifyingGlassIcon,
      title: 'Get Discovered',
      description: 'Appear in search results when people look for leaders and experts in your industry and location.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Expand Your Reach',
      description: 'Connect with opportunities beyond your local community and establish your digital presence.',
    },
  ]

  return (
    <div className={`nc-SectionHowItWorks ${className}`}>
      <Heading
        desc="From profile creation to global visibility in four simple steps"
        isCenter
      >
        How It Works
      </Heading>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center"
          >
            {/* Step Number */}
            <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
              {index + 1}
            </div>
            
            {/* Icon */}
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-500/10">
              <step.icon className="h-10 w-10 text-primary-500" />
            </div>
            
            {/* Content */}
            <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionHowItWorks