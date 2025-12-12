// components/Heading.tsx
import React, { FC, ReactNode } from 'react'

export interface HeadingProps {
  children: ReactNode
  desc?: string
  isCenter?: boolean
  className?: string
}

const Heading: FC<HeadingProps> = ({
  children,
  desc = '',
  isCenter = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl font-semibold md:text-4xl">{children}</h2>
      {desc && (
        <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
          {desc}
        </p>
      )}
    </div>
  )
}

export default Heading