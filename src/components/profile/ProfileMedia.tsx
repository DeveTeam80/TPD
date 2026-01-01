// components/profile/ProfileMedia.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import Image from 'next/image'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { MicrophoneIcon, VideoCameraIcon, NewspaperIcon } from '@heroicons/react/24/outline'

interface ProfileMediaProps {
  media: NonNullable<Person['media']>
  personName: string
  customAlts?: Record<string, string> // Added prop
}

const ProfileMedia: FC<ProfileMediaProps> = ({ media, personName, customAlts }) => {

    const iconMap = {
        'TEDx': VideoCameraIcon,
        'Podcast': MicrophoneIcon,
        'Interview': NewspaperIcon,
        'Documentary': VideoCameraIcon
    }

    // Helper to determine best Alt Tag
    const getAlt = (title: string) => {
        if (!customAlts) return title;
        const key = title.toLowerCase().replace(/\s+/g, '_');
        // Priority: 1. Specific key, 2. Generic 'event' key, 3. Generic 'action' key, 4. Original Title
        return customAlts[key] || customAlts.event || customAlts.action || title;
    }

  return (
    <section>
      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Media & Speaking
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Featured talks, interviews, and podcast appearances from {personName}.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {media.map((mediaItem, index) => {
          const Icon = iconMap[mediaItem.type];
          return (
            <a
              key={index}
              href={mediaItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-3xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-neutral-900"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={mediaItem.thumbnail}
                  alt={getAlt(mediaItem.title)} // Updated Alt
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircleIcon className="h-20 w-20 text-white/80 transition-transform group-hover:scale-110" />
                </div>
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold backdrop-blur-sm dark:bg-black/90 dark:text-white">
                  <Icon className="h-4 w-4" />
                  {mediaItem.type}
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                  {mediaItem.views} views
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-neutral-900 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
                  {mediaItem.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium">{mediaItem.platform}</span>
                  <span>•</span>
                  <span>{mediaItem.date}</span>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default ProfileMedia