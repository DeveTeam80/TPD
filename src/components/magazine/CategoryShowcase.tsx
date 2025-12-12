// components/magazine/CategoryShowcase.tsx
import React from 'react'
import Link from 'next/link'
import { industries } from '@/data/industries'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const CategoryShowcase = () => {
  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900 lg:py-32">
      <div className="container">
        <div className="mb-16">
          <h2 className="mb-2 font-serif text-4xl font-bold lg:text-5xl">
            Explore by Industry
          </h2>
          <div className="mt-4 h-1 w-20 rounded-full bg-primary-500" />
          <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400">
            Discover influential leaders across diverse sectors
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 6).map((industry) => (
            <Link
              key={industry.id}
              href={`/directory?industry=${industry.name}`}
              className="group relative overflow-hidden rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all hover:scale-[1.02] hover:border-primary-300 hover:shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-primary-700"
            >
              <div className="relative z-10">
                <h3 className="mb-3 font-serif text-2xl font-bold transition-colors group-hover:text-primary-600">
                  {industry.name}
                </h3>
                <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                  Discover influential leaders
                </p>
                <div className="flex items-center gap-2 font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
                  <span>Explore</span>
                  <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Decorative Element */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-100/50 transition-transform group-hover:scale-150 dark:bg-primary-900/20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase