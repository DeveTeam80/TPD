// components/profile/ProfileSocials.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import { 
  GlobeAltIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface ProfileSocialsProps {
  socials: NonNullable<Person['socials']>
  personName: string
}

const ProfileSocials: FC<ProfileSocialsProps> = ({ socials, personName }) => {

  const availableSocials = [
    {
      name: 'LinkedIn',
      href: socials.linkedin,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      username: socials.linkedin ? new URL(socials.linkedin).pathname.split('/').pop() : '',
      color: 'hover:bg-[#0077b5] hover:text-white'
    },
    {
      name: 'Twitter',
      href: socials.twitter,
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      username: socials.twitter ? '@' + new URL(socials.twitter).pathname.split('/').pop() : '',
      color: 'hover:bg-[#1DA1F2] hover:text-white'
    },
    {
      name: 'Website',
      href: socials.website,
      icon: <GlobeAltIcon className="h-6 w-6" />,
      username: socials.website ? new URL(socials.website).hostname : '',
      color: 'hover:bg-blue-500 hover:text-white'
    },
    // {
    //   name: 'Email',
    //   href: `mailto:${socials.email}`,
    //   icon: <EnvelopeIcon className="h-6 w-6" />,
    //   username: socials.email,
    //   color: 'hover:bg-green-500 hover:text-white'
    // }
  ].filter(social => social.href); // Filter out socials that don't have a link

  return (
    <section>
      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Connect with {personName.split(' ')[0]}
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {availableSocials.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 rounded-2xl border-2 border-neutral-200 bg-white p-6 transition-all dark:border-neutral-700 dark:bg-neutral-900 ${social.color}`}
          >
            <div className="flex-shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-inherit">
              {social.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 text-sm font-semibold text-neutral-900 group-hover:text-inherit dark:text-neutral-100">
                {social.name}
              </div>
              <div className="truncate text-xs text-neutral-600 group-hover:text-inherit dark:text-neutral-400">
                {social.username}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ProfileSocials
