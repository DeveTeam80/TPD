import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import logoImage from '@/images/TPD logo.png'

interface Props {
  className?: string
  size?: string
}

const Logo: React.FC<Props> = ({ className, size = 'size-20 sm:size-20' }) => {
  return (
    <Link href="/" className={clsx('inline-block shrink-0 text-primary-600 dark:text-primary-500', className, size)}>
      <Image 
        src={logoImage}
        alt="Your Company Logo"
        width={100} 
        height={100}
        className="w-full h-full object-contain"
      />
    </Link>
  )
}

export default Logo