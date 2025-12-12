// src/components/Breadcrumbs.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const pathname = usePathname()

  // Auto-generate breadcrumbs if not provided
  const breadcrumbItems = items || generateBreadcrumbs(pathname)

  // Don't show breadcrumbs on homepage
  if (pathname === '/' || breadcrumbItems.length === 0) {
    return null
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://peoplesdirectory.com'}`,
      },
      ...breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://peoplesdirectory.com'}${item.href}`,
      })),
    ],
  }

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumbs - Magazine Style */}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
          {/* Home Link */}
          <li>
            <Link
              href="/"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Home
            </Link>
          </li>

          {/* Dynamic Breadcrumb Items */}
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1

            return (
              <React.Fragment key={item.href}>
                <li>
                  <ChevronRightIcon className="h-3 w-3" />
                </li>
                <li>
                  {isLast ? (
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-neutral-900 dark:hover:text-neutral-100"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

// Helper function to auto-generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Map of routes to labels
  const routeLabels: Record<string, string> = {
    directory: 'Directory',
    about: 'About',
    contact: 'Contact',
    'sitemap-page': 'Sitemap',
    search: 'Search',
    profile: 'Profile',
  }

  let currentPath = ''

  segments.forEach((segment) => {
    currentPath += `/${segment}`
    let label = routeLabels[segment] || formatSegment(segment)
    breadcrumbs.push({
      label,
      href: currentPath,
    })
  })

  return breadcrumbs
}

// Format segment into readable label
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default Breadcrumbs