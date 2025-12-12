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
// HUGEICONS: These are DATA OBJECTS, not components
import { 
  Search01Icon, 
  UserSearchIcon, 
  Building03Icon, 
  LocationIcon,
  BriefcaseIcon 
} from '@hugeicons/core-free-icons'
// HUGEICONS: This is the actual component renderer
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import _ from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

// FIX 1: Change type to 'any' because HugeIcons are complex SVG objects, not React Components
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
    uri: '/directory?industry=technology',
  },
  {
    type: 'recommended',
    name: 'Healthcare Innovators',
    icon: Search01Icon,
    uri: '/directory?industry=healthcare',
  },
  {
    type: 'recommended',
    name: 'Finance Executives',
    icon: Search01Icon,
    uri: '/directory?industry=finance',
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
    uri: '/directory?filter=industry',
  },
  {
    type: 'quick-action',
    name: 'By Region',
    icon: LocationIcon,
    uri: '/directory?filter=region',
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
        // Simulate network delay for smoother UI feel if local
        await new Promise(r => setTimeout(r, 200)) 
        
        const filtered = allPeople
          .filter((person: any) => 
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.influence?.toLowerCase().includes(query.toLowerCase()) ||
            person.industry?.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
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
      if ('uri' in value) {
        const item = value as Option
        if (item.type === 'recommended') {
          router.push(item.uri)
        } else {
          router.push(item.uri)
        }
      } else if ('slug' in value) {
        const person = value as any
        router.push(`/${person.slug}`)
      }
    }
  }

  // --- Render Triggers ---
  const renderTrigger = () => {
    if (type === 'type2') {
      return (
        <>
          {/* Desktop Trigger */}
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

          {/* Mobile Trigger */}
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

  // Keyboard shortcut listener
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      {renderTrigger()}

      <Dialog
        className="relative z-50"
        open={open}
        onClose={() => {
          setOpen(false)
          setQuery('')
        }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-50 flex w-screen items-start justify-center overflow-y-auto p-4 pt-16 sm:pt-24">
          <DialogPanel
            transition
            className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-neutral-900 dark:ring-white/10"
          >
            <Combobox onChange={handleSelect}>
              {/* Search Header */}
              <div className="relative border-b border-neutral-100 dark:border-neutral-800">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-4 h-6 w-6 text-neutral-400 dark:text-neutral-500"
                  aria-hidden="true"
                />
                <ComboboxInput
                  autoFocus
                  className="h-14 w-full border-0 bg-transparent pl-12 pr-12 text-base text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-lg dark:text-white dark:placeholder:text-neutral-500"
                  placeholder="Search by name, company, or industry..."
                  onChange={(e) => setQuery(e.target.value)}
                  displayValue={() => query}
                />
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-3.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-medium text-neutral-500 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                >
                  ESC
                </button>
              </div>

              {/* Results Container */}
              <div className="max-h-[60vh] overflow-y-auto scroll-smooth">
                
                {/* STATE: Searching */}
                {isSearching && (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 border-t-blue-600 dark:border-neutral-700"></div>
                  </div>
                )}

                {/* STATE: Default View (No Query) */}
                {!query && !isSearching && (
                  <div className="p-2">
                    <div className="mb-2 px-2 pt-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Quick Access
                    </div>
                    <ComboboxOptions static hold className="space-y-1">
                      {quickActions.map((action) => (
                        <ComboboxOption
                          key={action.name}
                          value={action}
                          className={({ focus }) =>
                            clsx(
                              'group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors',
                              focus ? 'bg-neutral-100 dark:bg-neutral-800' : 'text-neutral-600 dark:text-neutral-300'
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                              <HugeiconsIcon icon={action.icon} size={18} />
                            </div>
                            <span className="font-medium">{action.name}</span>
                          </div>
                          <ChevronRightIcon className="h-4 w-4 text-neutral-400 opacity-0 group-data-[focus]:opacity-100" />
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>

                    <div className="mt-4 mb-2 border-t border-neutral-100 px-2 pt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
                      Recommended
                    </div>
                    <ComboboxOptions static hold className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                      {recommended_searches.map((item) => (
                        <ComboboxOption
                          key={item.name}
                          value={item}
                          className={({ focus }) =>
                            clsx(
                              'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                              focus ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' : 'text-neutral-600 dark:text-neutral-400'
                            )
                          }
                        >
                          <HugeiconsIcon icon={item.icon} size={16} />
                          <span className="text-sm font-medium">{item.name}</span>
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  </div>
                )}

                {/* STATE: Results Found */}
                {query && !isSearching && people.length > 0 && (
                  <ComboboxOptions static className="p-2">
                    <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Profiles matching &ldquo;{query}&rdquo;

                    </div>
                    {people.map((person) => (
                      <ComboboxOption
                        key={person.id}
                        value={person}
                        className={({ focus }) =>
                          clsx(
                            'group cursor-pointer rounded-xl p-2 transition-all',
                            focus ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-transparent'
                          )
                        }
                      >
                        <PersonCard person={person} />
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}

                {/* STATE: No Results */}
                {query && !isSearching && people.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
                      {/* FIX 2: Use Wrapper Component */}
                      <HugeiconsIcon icon={UserSearchIcon} size={24} />
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      No leaders found
                    </h3>
                    <p className="mx-auto mt-1 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                      We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try searching for a different keyword.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {query && people.length > 0 && (
                <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-4 py-3 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-400">
                  <span>{people.length} results</span>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-sans font-medium dark:border-neutral-700 dark:bg-neutral-800">↓↑</kbd> to navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-sans font-medium dark:border-neutral-700 dark:bg-neutral-800">↵</kbd> to select
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

// Optimized Person Card for Search Result
const PersonCard = ({ person }: { person: any }) => {
  return (
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
        <Image
          sizes="48px"
          className="object-cover"
          fill
          src={person.avatarUrl || '/images/placeholder-image.png'}
          alt={person.name}
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="truncate font-semibold text-neutral-900 dark:text-white">
            {person.name}
          </h4>
          {/* Active indicator (visible only on focus via parent group class) */}
          <ArrowRightIcon className="h-4 w-4 -translate-x-2 text-neutral-400 opacity-0 transition-all group-data-[focus]:translate-x-0 group-data-[focus]:opacity-100" />
        </div>
        
        <p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
          {person.influence}
        </p>
        
        <div className="mt-0.5 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
          {person.industry && (
            <span className="flex items-center gap-1">
              {/* FIX 3: Use Wrapper Component */}
              <HugeiconsIcon icon={BriefcaseIcon} size={12} />
              {person.industry}
            </span>
          )}
          {person.city && (
            <>
              <span>•</span>
              <span className="truncate">{person.city}, {person.country}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal