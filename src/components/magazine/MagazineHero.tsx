// components/magazine/MagazineHero.tsx
import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Person } from '@/data/people'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface MagazineHeroProps {
  person: Person
}

const MagazineHero: FC<MagazineHeroProps> = ({ person }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
      {/* Background Image with Rounded Effect */}
      <div className="absolute inset-0 p-4 lg:p-8">
        <div className="relative h-full overflow-hidden rounded-3xl lg:rounded-[3rem]">
          <Image
            src={person.avatarUrl}
            alt={person.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex h-screen min-h-[800px] items-end">
        <div className="container pb-20 lg:pb-32">
          <div className="max-w-4xl">
            {/* Issue Label */}
            <div className="mb-8 inline-flex flex-col gap-1 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 backdrop-blur-xl">
              <div className="text-sm font-bold uppercase tracking-wider text-white">
                Featured Story
              </div>
              <div className="text-xs font-medium uppercase tracking-widest text-white/60">
                Issue #{new Date().getMonth() + 1} · {new Date().getFullYear()}
              </div>
            </div>

            {/* Headline */}
            <h1 className="mb-6 font-serif text-6xl font-bold leading-[0.95] text-white lg:text-8xl">
              {person.name}
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-2xl font-light text-white/90 lg:text-3xl">
              {person.influence}
            </p>

            {/* Excerpt */}
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/80">
              {person.bio?.[0] || `An exclusive conversation with ${person.name} about leadership, innovation, and the future of ${person.industry}.`}
            </p>

            {/* CTA */}
            <Link
              href={`/${person.slug}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-semibold text-black shadow-2xl transition-all hover:scale-105 hover:shadow-[0_20px_80px_rgba(255,255,255,0.3)]"
            >
              Read the Full Story
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-3xl" />
    </div>
  )
}

export default MagazineHero