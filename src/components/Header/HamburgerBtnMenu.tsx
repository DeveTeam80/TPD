'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useAside } from '../aside'

const HamburgerBtnMenu = ({ className }: { className?: string }) => {
  const { open: openAside } = useAside()

  return (
    <button
      type="button"
      onClick={() => openAside('sidebar-navigation')}
      className={clsx(
        '-m-2.5 flex cursor-pointer items-center justify-center rounded-lg p-2.5 hover:bg-neutral-100 focus-visible:outline-0 dark:hover:bg-neutral-700',
        className
      )}
    >
      <span className="sr-only">Open menu</span>
      <Bars3Icon className="h-6 w-6" />
    </button>
  )
}

export default HamburgerBtnMenu