'use client'

import { CustomLink } from '@/data/types'
import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import Link from 'next/link'
import React from 'react'

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'Directory',
    menus: [
      { href: '/directory', label: 'Browse Leaders' },
      { href: '#', label: 'By Industry' },
      { href: '#', label: 'By Region' },
      { href: '#', label: 'Recent Additions' },
    ],
  },
  {
    id: '2',
    title: 'Get Involved',
    menus: [
      { href: '#', label: 'Nominate a Leader' },
      { href: '#', label: 'Submit Your Profile' },
      { href: '#', label: 'Partner With Us' },
      { href: '#', label: 'Advertise' },
    ],
  },
  {
    id: '3',
    title: 'About',
    menus: [
      { href: '#', label: 'Our Mission' },
      { href: '#', label: 'Our Team' },
      { href: '#', label: 'Our Impact' },
      { href: '#', label: 'Contact Us' },
      { href: '#', label: 'Press & Media' },
    ],
  },
  {
    id: '4',
    title: 'Resources',
    menus: [
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Industry Insights' },
      { href: '#', label: 'Events' },
      { href: '#', label: 'FAQs' },
      { href: '#', label: 'Submission Guidelines' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white"
                href={item.href}
                onClick={(e) => {
                  if (item.href === '#') {
                    e.preventDefault()
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {/* footer */}
      <div className="nc-Footer relative border-t border-neutral-200 py-16 lg:py-28 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10">
          {/* Logo and Socials Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex flex-col gap-2">
              {/* Logo */}
              <div>
                <Logo size="size-24" />
              </div>
              
              {/* Socials in 2x2 Grid */}
              <div>
                <SocialsList1 />
              </div>
            </div>
          </div>
          
          {/* Menu Columns */}
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
        
        {/* Bottom bar */}
        <div className="container mt-12 border-t border-neutral-200 pt-8 dark:border-neutral-700">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400 sm:flex-row">
            <p>© {new Date().getFullYear()} People&apos;s Directory. All rights reserved.</p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="hover:text-black dark:hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="hover:text-black dark:hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="hover:text-black dark:hover:text-white"
                onClick={(e) => e.preventDefault()}
              >
                Cookie Policy
              </a>
              <Link
                href="/sitemap" 
                className="hover:text-black dark:hover:text-white"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer