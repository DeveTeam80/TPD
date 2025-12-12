'use client'

import { FC, FormEvent, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { MagnifyingGlassIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

// Define the types for our active fields
type ActiveField = 'what' | 'where' | null

const DirectoryHero: FC = ({ }) => {
  const [whatQuery, setWhatQuery] = useState('')
  const [whereQuery, setWhereQuery] = useState('')

  const whatInputRef = useRef<HTMLInputElement>(null)  // Add this
  const whereInputRef = useRef<HTMLInputElement>(null) // Add this

  // ... rest of your code
  // State to manage which search field is active
  const [activeField, setActiveField] = useState<ActiveField>(null)

  const containerRef = useRef<HTMLFormElement>(null)

  // Handle clicks outside the search form to close the active field
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveField(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (activeField === 'what') {
      whatInputRef.current?.focus()
    } else if (activeField === 'where') {
      whereInputRef.current?.focus()
    }
  }, [activeField])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setActiveField(null)

    // Build query params
    const params = new URLSearchParams()
    if (whatQuery) params.set('q', whatQuery)
    if (whereQuery) params.set('location', whereQuery)

    // Navigate to directory with search params
    window.location.href = `/directory?${params.toString()}`
  }

  return (
    <div className="relative bg-black pb-20 md:py-32 lg:py-48">
      {/* BACKGROUND IMAGE */}
      <div className="absolute top-0 bottom-0 right-0 w-full md:w-1/2 xl:w-3/5">
        <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-black via-black/70 to-transparent md:block" />
        <Image
          fill
          className="object-cover"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="Abstract modern architecture background"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 text-neutral-100 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h1 className="mt-3 text-4xl font-bold !leading-tight md:text-5xl xl:text-6xl">
            The Premier Directory of Distinguished Leaders
          </h1>
          <p className="mt-6 text-base text-neutral-300 lg:text-xl">
            Discover individuals and pioneers making their mark in cities worldwide.
          </p>

          {/* SEARCH FORM - PLATINUM & CHARCOAL STYLE */}
          <form
            ref={containerRef}
            className="relative mt-11 w-full max-w-4xl"
            onSubmit={handleSubmit}
          >
            <div className="flex w-full rounded-full bg-zinc-900/80 p-1.5 shadow-xl backdrop-blur-lg border border-zinc-700/50">

              {/* "WHAT" FIELD */}
              <div
                className={clsx(
                  "relative flex flex-1 cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 text-left transition-all duration-300 ease-in-out",
                  activeField === 'what'
                    ? "bg-white text-zinc-900 shadow-lg"
                    : "hover:bg-zinc-800/60 text-neutral-100"
                )}
                onClick={() => setActiveField('what')}
              >
                <BriefcaseIcon className={clsx(
                  "h-4 w-4 flex-shrink-0 transition-colors duration-300",
                  activeField === 'what' ? "text-zinc-600" : "text-neutral-400"
                )} />
                {activeField === 'what' ? (
                  <input
                    ref={whatInputRef}
                    type="text"
                    className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0 border-none p-0 m-0"
                    placeholder="Name or Industry..."
                    value={whatQuery}
                    onChange={(e) => setWhatQuery(e.target.value)}
                  />
                ) : (
                  <span className="block text-sm text-neutral-400 truncate">
                    {whatQuery || "Name or Industry..."}
                  </span>
                )}
              </div>

              {/* "WHERE" FIELD */}
              <div
                className={clsx(
                  "relative flex flex-1 cursor-pointer items-center gap-2.5 rounded-full px-5 py-3 text-left transition-all duration-300 ease-in-out",
                  activeField === 'where'
                    ? "bg-white text-zinc-900 shadow-lg"
                    : "hover:bg-zinc-800/60 text-neutral-100"
                )}
                onClick={() => setActiveField('where')}
              >
                <MapPinIcon className={clsx(
                  "h-4 w-4 flex-shrink-0 transition-colors duration-300",
                  activeField === 'where' ? "text-zinc-600" : "text-neutral-400"
                )} />
                {activeField === 'where' ? (
                  <input
                    ref={whereInputRef}
                    type="text"
                    className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-0 border-none p-0 m-0"
                    placeholder="City, Country..."
                    value={whereQuery}
                    onChange={(e) => setWhereQuery(e.target.value)}
                  />
                ) : (
                  <span className="block text-sm text-neutral-400 truncate">
                    {whereQuery || "City, Country..."}
                  </span>
                )}
              </div>
              {/* Polished Submit Button */}
              <div className="flex-shrink-0 pl-1">
                <button
                  type="submit"
                  className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </button>
              </div>
            </div>

            {/* --- DROPDOWN SUGGESTIONS PANEL --- */}
            {activeField && (
              <div className="absolute top-[110%] w-full rounded-3xl bg-white p-6 text-zinc-900 shadow-2xl border border-zinc-200">
                {activeField === 'what' && (
                  <div>
                    <h3 className="font-bold text-zinc-900">Suggested Industries</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-600 lg:grid-cols-3">
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Real Estate</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Hospitality</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Arts & Culture</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Technology</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Healthcare</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Philanthropy</li>
                    </ul>
                  </div>
                )}
                {activeField === 'where' && (
                  <div>
                    <h3 className="font-bold text-zinc-900">Search by Region</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-600 lg:grid-cols-3">
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">North America</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Europe</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Asia</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">South America</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Africa</li>
                      <li className="cursor-pointer hover:text-zinc-900 transition-colors">Oceania</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default DirectoryHero