'use client'

import { getPeople } from '@/data/people'
import { Button } from '@/shared/Button'
import ButtonCircle from '@/shared/ButtonCircle'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ArrowRightIcon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { 
  Search01Icon, 
  UserSearchIcon, 
  Building03Icon, 
  LocationIcon,
  BriefcaseIcon 
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import _ from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

type IconType = any

interface Option {
  type: 'recommended' | 'quick-action'
  name: string
  icon: IconType
  uri: string
}

const recommended_searches: Option[] = [
  {
    type: 'recommended',
    name: 'Technology Leaders',
    icon: Search01Icon,
    uri: '/directory?industry=Technology',
  },
  {
    type: 'recommended',
    name: 'Healthcare Innovators',
    icon: Search01Icon,
    uri: '/directory?industry=Healthcare',
  },
  {
    type: 'recommended',
    name: 'Finance Executives',
    icon: Search01Icon,
    uri: '/directory?industry=Finance',
  },
]

const quickActions: Option[] = [
  {
    type: 'quick-action',
    name: 'Browse all',
    icon: UserSearchIcon,
    uri: '/directory',
  },
  {
    type: 'quick-action',
    name: 'By Industry',
    icon: BriefcaseIcon,
    uri: '/directory#industries',
  },
  {
    type: 'quick-action',
    name: 'By Region',
    icon: LocationIcon,
    uri: '/directory#regions',
  },
]

interface Props {
  type: 'type1' | 'type2'
}

const SearchModal: FC<Props> = ({ type = 'type1' }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [people, setPeople] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Debounced search logic
  useEffect(() => {
    const fetchPeople = async () => {
      if (query.length < 2) {
        setPeople([])
        return
      }
      
      setIsSearching(true)
      try {
        const allPeople = await getPeople()
        await new Promise(r => setTimeout(r, 200))
        
        const filtered = allPeople
          .filter((person: any) => 
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.influence?.toLowerCase().includes(query.toLowerCase()) ||
            person.industry?.toLowerCase().includes(query.toLowerCase()) ||
            person.city?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8)
        setPeople(filtered)
      } catch (error) {
        console.error('Search error:', error)
        setPeople([])
      } finally {
        setIsSearching(false)
      }
    }

    const debouncedFetch = _.debounce(fetchPeople, 300)
    debouncedFetch()

    return () => debouncedFetch.cancel()
  }, [query])

  const handleSelect = (value: unknown) => {
    if (value && typeof value === 'object') {
      setOpen(false)
      setQuery('')
      setPeople([])
      
      if ('uri' in value) {
        const item = value as Option
        router.push(item.uri)
      } else if ('slug' in value) {
        const person = value as any
        router.push(`/${person.slug}`)
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
    setQuery('')
    setPeople([])
  }

  // Render Triggers
  const renderTrigger = () => {
    if (type === 'type2') {
      return (
        <>
          {/* Desktop Search Bar */}
          <div className="hidden md:block w-full max-w-xs">
            <button 
              onClick={() => setOpen(true)}
              className="flex w-full items-center justify-between rounded-full border border-neutral-200 bg-neutral-50 py-2.5 pl-4 pr-2 text-sm text-neutral-500 transition-all hover:border-neutral-300 hover:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:bg-neutral-700/50"
            >
              <div className="flex items-center gap-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                <span>Search leaders...</span>
              </div>
              <div className="flex items-center gap-1 rounded border border-neutral-200 bg-white px-1.5 py-0.5 text-xs font-medium text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800">
                <span className="text-[10px]">⌘</span>K
              </div>
            </button>
          </div>

          {/* Mobile Icon Button */}
          <div className="-ms-1 md:hidden">
            <ButtonCircle plain onClick={() => setOpen(true)}>
              <HugeiconsIcon icon={Search01Icon} size={24} />
            </ButtonCircle>
          </div>
        </>
      )
    }

    return (
      <ButtonCircle plain onClick={() => setOpen(true)}>
        <HugeiconsIcon icon={Search01Icon} size={24} />
      </ButtonCircle>
    )
  }

  // Keyboard shortcut
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      // ESC to close
      if (event.key === 'Escape' && open) {
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      {renderTrigger()}

      <Dialog
        className="relative z-50"
        open={open}
        onClose={handleClose}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        {/* 🔥 FIX 1: Fixed height container - no resizing */}
        <div className="fixed inset-0 z-50 flex w-screen items-end justify-center sm:items-start sm:overflow-y-auto sm:p-4 sm:pt-16 md:pt-24">
          <DialogPanel
            transition
            className={clsx(
              // Mobile: Full screen bottom sheet with FIXED height
              "w-full transform bg-white shadow-2xl transition-all duration-300 ease-out dark:bg-neutral-900",
              // Mobile animation: slide up from bottom
              "data-[closed]:translate-y-full sm:data-[closed]:translate-y-0",
              // Desktop: Centered modal
              "sm:max-w-2xl sm:rounded-2xl sm:ring-1 sm:ring-black/5 sm:data-[closed]:scale-95 sm:data-[closed]:opacity-0 dark:sm:ring-white/10",
              // Mobile: Rounded top corners
              "rounded-t-3xl sm:rounded-b-2xl",
              // 🔥 FIX 2: Fixed height - prevents resizing
              "h-[85vh] sm:h-auto sm:max-h-[80vh]",
              // Flex layout for fixed header + scrollable content
              "flex flex-col"
            )}
          >
            <Combobox onChange={handleSelect}>
              {/* 🔥 FIXED Header - doesn't scroll */}
              <div className="shrink-0 border-b border-neutral-100 dark:border-neutral-800">
                {/* Mobile: Drag handle */}
                <div className="flex justify-center py-2 sm:hidden">
                  <div className="h-1 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                </div>

                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 sm:h-6 sm:w-6 dark:text-neutral-500"
                    aria-hidden="true"
                  />
                  <ComboboxInput
                    autoFocus
                    className="h-14 w-full border-0 bg-transparent pl-12 pr-16 text-base text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:h-16 sm:pl-14 sm:text-lg dark:text-white dark:placeholder:text-neutral-500"
                    placeholder="Search leaders..."
                    onChange={(e) => setQuery(e.target.value)}
                    displayValue={() => query}
                  />
                  
                  {/* 🔥 FIX 3: Close button with proper click handler */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleClose()
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 sm:p-1.5 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 dark:active:bg-neutral-700"
                  >
                    <XMarkIcon className="h-5 w-5 sm:h-4 sm:w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              </div>

              {/* 🔥 Scrollable Content Area - fixed height */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                
                {/* STATE: Searching */}
                {isSearching && (
                  <div className="flex h-full items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-8 w-8 animate-spin rounded-full border-3 border-neutral-200 border-t-primary-600 dark:border-neutral-700"></div>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Searching...</span>
                    </div>
                  </div>
                )}

                {/* STATE: Default View (No Query) */}
                {!query && !isSearching && (
                  <div className="p-3 sm:p-4">
                    {/* Quick Actions */}
                    <div className="mb-4">
                      <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Quick Access
                      </div>
                      <ComboboxOptions static hold className="space-y-2">
                        {quickActions.map((action) => (
                          <ComboboxOption
                            key={action.name}
                            value={action}
                            className={({ focus }) =>
                              clsx(
                                'group flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 transition-all sm:rounded-lg sm:px-3 sm:py-2.5',
                                focus ? 'bg-neutral-100 dark:bg-neutral-800' : 'active:bg-neutral-50 dark:active:bg-neutral-800/50'
                              )
                            }
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 sm:h-8 sm:w-8 dark:bg-neutral-800 dark:text-neutral-400">
                                <HugeiconsIcon icon={action.icon} size={20} className="sm:h-[18px] sm:w-[18px]" />
                              </div>
                              <span className="font-medium text-neutral-900 dark:text-neutral-100">{action.name}</span>
                            </div>
                            <ChevronRightIcon className="h-5 w-5 text-neutral-400 sm:h-4 sm:w-4" />
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    </div>

                    {/* Recommended Searches */}
                    <div className="border-t border-neutral-100 pt-4 dark:border-neutral-800">
                      <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        Recommended
                      </div>
                      <ComboboxOptions static hold className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {recommended_searches.map((item) => (
                          <ComboboxOption
                            key={item.name}
                            value={item}
                            className={({ focus }) =>
                              clsx(
                                'flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-all sm:rounded-lg sm:px-3 sm:py-2',
                                focus 
                                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' 
                                  : 'text-neutral-600 active:bg-primary-50/50 dark:text-neutral-400 dark:active:bg-primary-900/10'
                              )
                            }
                          >
                            <HugeiconsIcon icon={item.icon} size={18} className="shrink-0" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    </div>
                  </div>
                )}

                {/* STATE: Results Found */}
                {query && !isSearching && people.length > 0 && (
                  <ComboboxOptions static className="p-3 sm:p-4">
                    <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {people.length} {people.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                    </div>
                    <div className="space-y-2">
                      {people.map((person) => (
                        <ComboboxOption
                          key={person.id}
                          value={person}
                          className={({ focus }) =>
                            clsx(
                              'cursor-pointer rounded-xl p-3 transition-all sm:rounded-lg sm:p-2',
                              focus 
                                ? 'bg-neutral-100 dark:bg-neutral-800' 
                                : 'active:bg-neutral-50 dark:active:bg-neutral-800/50'
                            )
                          }
                        >
                          <PersonCard person={person} />
                        </ComboboxOption>
                      ))}
                    </div>
                  </ComboboxOptions>
                )}

                {/* STATE: No Results */}
                {query && !isSearching && people.length === 0 && (
                  <div className="flex h-full items-center justify-center py-16">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                        <HugeiconsIcon icon={UserSearchIcon} size={32} />
                      </div>
                      <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                        No leaders found
                      </h3>
                      <p className="mx-auto mt-2 max-w-xs px-4 text-sm text-neutral-500 dark:text-neutral-400">
                        We couldn&apos;t find anyone matching &ldquo;{query}&rdquo;. Try a different keyword.
                      </p>
                      <button
                        onClick={() => {
                          handleClose()
                          router.push('/directory')
                        }}
                        className="mt-6 rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95 dark:bg-white dark:text-neutral-900"
                      >
                        Browse All Leaders
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Hide on mobile when no results */}
              {query && people.length > 0 && (
                <div className="hidden shrink-0 items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-xs text-neutral-500 sm:flex dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
                  <span>{people.length} results</span>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-sans font-medium dark:border-neutral-700 dark:bg-neutral-800">↓↑</kbd> navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-sans font-medium dark:border-neutral-700 dark:bg-neutral-800">↵</kbd> select
                    </span>
                  </div>
                </div>
              )}
            </Combobox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

// Optimized Person Card
const PersonCard = ({ person }: { person: any }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Avatar */}
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-neutral-200 bg-neutral-100 sm:h-12 sm:w-12 dark:border-neutral-700 dark:bg-neutral-800">
        <Image
          sizes="56px"
          className="object-cover"
          fill
          src={person.avatarUrl || '/images/placeholder-image.png'}
          alt={person.name}
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate font-semibold text-neutral-900 dark:text-white">
            {person.name}
          </h4>
          <ArrowRightIcon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 sm:h-4 sm:w-4" />
        </div>
        
        <p className="mt-0.5 truncate text-sm text-neutral-600 dark:text-neutral-400">
          {person.influence}
        </p>
        
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-500">
          {person.industry && (
            <span className="flex items-center gap-1">
              <HugeiconsIcon icon={BriefcaseIcon} size={12} className="shrink-0" />
              <span className="truncate">{person.industry}</span>
            </span>
          )}
          {person.city && (
            <>
              <span className="hidden sm:inline">•</span>
              <span className="truncate">{person.city}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal