'use client'

import ButtonCircle from '@/shared/ButtonCircle'
import { CloseButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const _defaultNotifications = [
  {
    name: 'Sarah Mitchell',
    description: 'Featured as a Top Industry Leader',
    time: '2 hours ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop',
  },
  {
    name: 'David Chen',
    description: 'New leader profile published in Technology',
    time: '5 hours ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3687&auto=format&fit=crop',
  },
  {
    name: 'Maria Garcia',
    description: 'Nomination submitted for review',
    time: '1 day ago',
    href: '#',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop',
  },
]

interface Props {
  className?: string
  notifications?: typeof _defaultNotifications
}

const NotifyDropdown: FC<Props> = ({ className = '', notifications = _defaultNotifications }) => {
  return (
    <Popover className={className}>
      <>
        <PopoverButton as={ButtonCircle} className="relative" color="light" plain>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-primary-500"></span>
          <BellIcon className="h-5 w-5" />
        </PopoverButton>

        <PopoverPanel
          transition
          anchor={{
            to: 'bottom end',
            gap: 16,
          }}
          className="z-40 w-96 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 transition duration-200 ease-in-out data-closed:translate-y-1 data-closed:opacity-0 dark:bg-neutral-800"
        >
          <div className="relative">
            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((item, index) => (
                <CloseButton
                  as={Link}
                  key={index}
                  href={item.href}
                  className="relative flex items-start gap-4 border-b border-neutral-100 px-6 py-4 transition duration-150 ease-in-out hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-700/50"
                >
                  <Image
                    alt={item.name}
                    src={item.avatar}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{item.time}</p>
                  </div>
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-500"></span>
                </CloseButton>
              ))}
            </div>
            <div className="border-t border-neutral-200 px-6 py-3 dark:border-neutral-700">
              <Link
                href="#"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </PopoverPanel>
      </>
    </Popover>
  )
}

export default NotifyDropdown