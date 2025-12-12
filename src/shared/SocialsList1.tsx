import { Facebook01Icon, InstagramIcon, Linkedin02Icon, Mail01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  className?: string
  socials?: typeof socialsDemo
}

const socialsDemo = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1KJDj9XBqx/',
    icon: Facebook01Icon,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/thepeopledirectory/',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/the-people-s-directory-212619399/',
    icon: Linkedin02Icon,
  },
  {
    name: 'Email',
    href: 'mailto:contact@peoplesdirectory.com',
    icon: Mail01Icon,
  },
]

const SocialsList1: FC<Props> = ({ className, socials = socialsDemo }) => {
  return (
    <div className={clsx('grid grid-cols-2 gap-4', className)}>
      {socials.map((item, index) => (
        <Link
          href={item.href}
          className="group flex items-center gap-x-2.5 text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white"
          key={index}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HugeiconsIcon icon={item.icon} size={20} />
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default SocialsList1