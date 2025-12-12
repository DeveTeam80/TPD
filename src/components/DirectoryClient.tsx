// components/DirectoryClient.tsx
'use client'

import React, { FC, useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ProfileCard from './ProfileCard'
import { Person } from '@/data/people'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface DirectoryClientProps {
  initialPeople: Person[]
}

const DirectoryClient: FC<DirectoryClientProps> = ({ 
  initialPeople,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // --- 1. INITIALIZE STATE FROM URL PARAMS ---
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [selectedIndustry, setSelectedIndustry] = useState(searchParams.get('industry') || 'all')
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all')
  const [sortBy, setSortBy] = useState<'name' | 'recent'>((searchParams.get('sort') as 'name' | 'recent') || 'name')
  const [showFilters, setShowFilters] = useState(false)

  // --- 2. DYNAMICALLY DERIVE OPTIONS FROM DATA ---
  const uniqueCountries = useMemo(() => {
    const countries = Array.from(new Set(initialPeople.map(p => p.country)))
    return countries.sort()
  }, [initialPeople])

  const uniqueIndustries = useMemo(() => {
    const industries = Array.from(new Set(initialPeople.map(p => p.industry)))
    return industries.sort()
  }, [initialPeople])

  // --- 3. SYNC STATE TO URL ---
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  // Update URL when filters change (debounced for search)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (searchQuery) params.set('q', searchQuery)
      else params.delete('q')

      if (selectedIndustry !== 'all') params.set('industry', selectedIndustry)
      else params.delete('industry')

      if (selectedCountry !== 'all') params.set('country', selectedCountry)
      else params.delete('country')

      if (sortBy !== 'name') params.set('sort', sortBy)
      else params.delete('sort')

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300) // 300ms debounce for search input

    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedIndustry, selectedCountry, sortBy, pathname, router, searchParams])

  // --- 4. FILTERING LOGIC ---
  const filteredPeople = useMemo(() => {
    let filtered = [...initialPeople]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(query) ||
        person.influence.toLowerCase().includes(query) ||
        person.city.toLowerCase().includes(query) ||
        person.industry.toLowerCase().includes(query) ||
        person.country.toLowerCase().includes(query)
      )
    }

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(person => person.industry === selectedIndustry)
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(person => person.country === selectedCountry)
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'recent') {
      filtered.reverse() // In production, sort by actual creation date
    }

    return filtered
  }, [initialPeople, searchQuery, selectedIndustry, selectedCountry, sortBy])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedIndustry('all')
    setSelectedCountry('all')
    setSortBy('name')
  }

  const hasActiveFilters = searchQuery || selectedIndustry !== 'all' || selectedCountry !== 'all' || sortBy !== 'name'
  const activeFilterCount = [
    searchQuery, 
    selectedIndustry !== 'all', 
    selectedCountry !== 'all'
  ].filter(Boolean).length

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-20 lg:py-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4" />
              {initialPeople.length} Distinguished Leaders
            </div>
            <h1 className="text-5xl font-bold text-white lg:text-6xl">
              Discover Global Leaders
            </h1>
            <p className="mt-6 text-xl text-neutral-300">
              Connect with influential individuals shaping industries and communities worldwide
            </p>

            {/* Search Bar - Hero Style */}
            <div className="mt-12">
              <div className="relative mx-auto max-w-2xl">
                <MagnifyingGlassIcon className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by name, industry, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-2 border-white/20 bg-white/10 py-5 pl-16 pr-6 text-lg text-white placeholder:text-neutral-400 backdrop-blur-xl transition-all focus:border-white/40 focus:bg-white/20 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`group flex items-center gap-2 rounded-full px-5 py-2.5 font-medium transition-all ${
                showFilters
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'border-2 border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600'
              }`}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Active Filter Tags */}
            <AnimatePresence>
              {selectedIndustry !== 'all' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-900 dark:bg-primary-900/30 dark:text-primary-400"
                >
                  <span className="truncate max-w-[150px]">{selectedIndustry}</span>
                  <button
                    onClick={() => setSelectedIndustry('all')}
                    className="shrink-0 rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              {selectedCountry !== 'all' && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 dark:bg-purple-900/30 dark:text-purple-400"
                >
                  <span className="truncate max-w-[150px]">{selectedCountry}</span>
                  <button
                    onClick={() => setSelectedCountry('all')}
                    className="shrink-0 rounded-full p-0.5 hover:bg-purple-200 dark:hover:bg-purple-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clear All Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Clear all
              </button>
            )}

            {/* Results Count */}
            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {filteredPeople.length} {filteredPeople.length === 1 ? 'leader' : 'leaders'}
            </div>
          </div>

          {/* Filter Dropdown Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Industry Filter */}
                    <div>
                      <label className="mb-3 block text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Industry
                      </label>
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full appearance-none rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium transition-colors focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                      >
                        <option value="all">All Industries</option>
                        {uniqueIndustries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Country Filter */}
                    <div>
                      <label className="mb-3 block text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Country
                      </label>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full appearance-none rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium transition-colors focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                      >
                        <option value="all">All Countries</option>
                        {uniqueCountries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label className="mb-3 block text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'name' | 'recent')}
                        className="w-full appearance-none rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium transition-colors focus:border-primary-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                      >
                        <option value="name">Alphabetical</option>
                        <option value="recent">Recently Added</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {filteredPeople.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredPeople.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }} // Cap delay at 0.5s
                >
                  <ProfileCard person={person} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-32 text-center"
            >
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                <MagnifyingGlassIcon className="h-12 w-12 text-neutral-400" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                No leaders found
              </h3>
              <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                Try adjusting your search or filters to find more results
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 dark:bg-white dark:text-neutral-900"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DirectoryClient