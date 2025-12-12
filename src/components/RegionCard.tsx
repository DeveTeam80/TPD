// src/components/RegionCard.tsx
'use client'

import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TRegion } from '@/data/regions'

export interface RegionCardProps {
  className?: string
  region: TRegion
}

const RegionCard: FC<RegionCardProps> = ({ className = '', region }) => {
  const { name, count, thumbnail } = region

  return (
    <Link
      href={`/directory?country=${encodeURIComponent(name)}`}
      className={`relative flex-1 group aspect-w-4 aspect-h-3 sm:aspect-w-1 sm:aspect-h-1 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <Image
        src={thumbnail}
        alt={name}
        fill
        className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
        <h2 className="text-2xl font-bold">{name}</h2>
        <span className="mt-1 block text-sm text-neutral-200">
          {count}+ Members
        </span>
      </div>
    </Link>
  )
}

export default RegionCard