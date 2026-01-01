// components/profile/ProfileAboutExpandable.tsx
'use client'

import { Person } from '@/data/people'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ProfileAboutExpandable({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Always visible preview */}
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">About {person.name}</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          {person.bio?.[0]?.substring(0, 200)}...
        </p>
      </div>

      {/* Expandable full content - SEO indexed but hidden by default */}
      <div className={expanded ? 'block' : 'hidden'}>
        <div className="prose dark:prose-invert mt-4 max-w-none">
          {person.bio?.slice(1).map((paragraph, idx) => (
            <p key={idx} className="text-neutral-600 dark:text-neutral-400">
              {paragraph}
            </p>
          ))}
          
          {/* Full professional background */}
          {person.ventures && (
            <>
              <h3>Professional Experience</h3>
              {person.ventures.map((venture, idx) => (
                <div key={idx}>
                  <h4>{venture.role} at {venture.name}</h4>
                  <p>{venture.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Expand/Collapse button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400"
      >
        {expanded ? 'Show Less' : 'Read Full Biography'}
        <ChevronDownIcon 
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
        />
      </button>
    </div>
  )
}