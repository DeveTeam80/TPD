'use client'

import { TNavigationItem } from '@/data/navigation'
import { Link } from '@/shared/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

interface NavigationDesktopProps {
  navigation: TNavigationItem[]
}

export default function NavigationDesktop({ navigation }: NavigationDesktopProps) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-x-8">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.id}
            href={item.href || '#'}
            className={clsx(
              'text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400',
              isActive
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-neutral-700 dark:text-neutral-300'
            )}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}