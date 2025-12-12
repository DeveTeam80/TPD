// components/profile/ProfilePublications.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import { 
  BookOpenIcon, 
  AcademicCapIcon, 
  DocumentTextIcon, 
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline'
import Heading from '@/shared/Heading'
import clsx from 'clsx'

interface ProfilePublicationsProps {
  publications: NonNullable<Person['publications']>
}

const ProfilePublications: FC<ProfilePublicationsProps> = ({ publications }) => {
  
  const getIconAndColor = (type: string) => {
    switch (type) {
      case 'Book': 
        return { 
          icon: BookOpenIcon, 
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-600 dark:text-blue-400',
          badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
        }
      case 'Thesis': 
        return { 
          icon: AcademicCapIcon,
          bgColor: 'bg-purple-100 dark:bg-purple-900/30',
          textColor: 'text-purple-600 dark:text-purple-400',
          badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
        }
      case 'Research Paper':
        return { 
          icon: DocumentTextIcon,
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-600 dark:text-green-400',
          badgeColor: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300'
        }
      default: // Whitepaper
        return { 
          icon: DocumentTextIcon,
          bgColor: 'bg-orange-100 dark:bg-orange-900/30',
          textColor: 'text-orange-600 dark:text-orange-400',
          badgeColor: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
        }
    }
  }

  return (
    <section>
      <Heading isCenter={false}>Academic Work & Publications</Heading>

      <div className="mt-10 space-y-6">
        {publications.map((pub, index) => {
          const { icon: Icon, bgColor, textColor, badgeColor } = getIconAndColor(pub.type)
          
          return (
            <div 
              key={index} 
              className="group rounded-2xl border-2 border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-lg sm:p-8 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                {/* Icon Box */}
                <div className={clsx(
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl',
                  bgColor,
                  textColor
                )}>
                  <Icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Type Badge and Year */}
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className={clsx(
                      'rounded-full px-3 py-1 text-xs font-semibold',
                      badgeColor
                    )}>
                      {pub.type}
                    </span>
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {pub.year}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold text-neutral-900 transition-colors group-hover:text-primary-600 sm:text-2xl dark:text-neutral-100 dark:group-hover:text-primary-400">
                    {pub.title}
                  </h3>
                  
                  {/* Publisher and ISBN */}
                  <div className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {pub.publisher}
                    {pub.isbn && (
                      <span className="ml-3 font-mono text-xs text-neutral-500 dark:text-neutral-500">
                        ISBN: {pub.isbn}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {pub.description && (
                    <p className="mb-4 text-neutral-700 dark:text-neutral-300">
                      {pub.description}
                    </p>
                  )}

                  {/* Link */}
                  {pub.link && (
                    <a 
                      href={pub.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                      View Publication
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProfilePublications