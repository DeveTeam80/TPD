// components/magazine/LatestIssue.tsx
import React from 'react'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'

const LatestIssue = () => {
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-neutral-950 lg:py-32">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-primary-200 bg-primary-50 px-6 py-3 dark:border-primary-900/30 dark:bg-primary-900/20">
            <SparklesIcon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              New Issue Available
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-8 font-serif text-6xl font-bold lg:text-7xl">
            {currentMonth} Issue
          </h2>

          {/* Description */}
          <p className="mb-12 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
            Featuring exclusive interviews with industry pioneers, in-depth profiles, 
            and insights from the world&apos;s most influential leaders.
          </p>

          {/* CTA */}
          <Link
            href="/directory"
            className="group inline-flex items-center gap-3 rounded-full bg-neutral-900 px-10 py-5 font-bold uppercase tracking-wider text-white shadow-2xl transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
          >
            Explore This Issue
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LatestIssue