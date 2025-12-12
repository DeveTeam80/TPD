'use client'

import React, { FC, useState, useEffect } from 'react'
import {
  UserIcon,
  TrophyIcon,
  BriefcaseIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  LinkIcon,
  ChevronLeftIcon,
  Squares2X2Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

export interface NavLink {
  id: string
  label: string
  iconName: 'about' | 'achievements' | 'ventures' | 'media' | 'articles' | 'testimonials' | 'connect'
}

const iconMap = {
  about: UserIcon,
  achievements: TrophyIcon,
  ventures: BriefcaseIcon,
  media: SpeakerWaveIcon,
  articles: DocumentTextIcon,
  testimonials: ChatBubbleBottomCenterTextIcon,
  connect: LinkIcon,
}

interface ProfileSidebarNavProps {
  sections: NavLink[]
}

const ProfileSidebarNav: FC<ProfileSidebarNavProps> = ({ sections }) => {
  const [isDesktopOpen, setIsDesktopOpen] = useState(false) 
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let currentSection: string | null = null
      const offset = window.innerWidth < 768 ? window.innerHeight * 0.4 : window.innerHeight * 0.3

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section.id
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() 
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const getMobileButtonIcon = () => {
    if (isMobileOpen) return <XMarkIcon className="h-6 w-6" />
    if (activeSection) {
      const activeNav = sections.find(s => s.id === activeSection)
      if (activeNav) {
        const ActiveIcon = iconMap[activeNav.iconName]
        return <ActiveIcon className="h-6 w-6" />
      }
    }
    return <Squares2X2Icon className="h-6 w-6" />
  }

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end md:hidden">
        <div 
          className={clsx(
            "flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white/90 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] dark:border-neutral-700 dark:bg-neutral-900/90",
            isMobileOpen ? "w-[85vw] max-w-sm px-2 py-2" : "w-14 h-14 p-0 justify-center"
          )}
        >
          <div className={clsx("flex w-full items-center justify-between px-2", !isMobileOpen && "hidden")}>
             {sections.map((section) => {
              const Icon = iconMap[section.iconName]
              const isActive = activeSection === section.id
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setIsMobileOpen(false)}
                  className={clsx(
                    'group relative flex flex-col items-center justify-center p-2 transition-all duration-200',
                    isActive ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-neutral-400 hover:text-neutral-600'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {isActive && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-blue-600 dark:bg-blue-400" />}
                </Link>
              )
            })}
          </div>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={clsx(
              !isMobileOpen && "absolute inset-0 flex items-center justify-center",
              "shrink-0 rounded-full p-2 text-neutral-800 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-800"
            )}
          >
            {getMobileButtonIcon()}
          </button>
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div
        className={clsx(
          'hidden md:block',
          'fixed left-6 top-1/2 z-40 -translate-y-1/2',
          'transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          isDesktopOpen ? 'w-64' : 'w-16'
        )}
      >
        <div className="relative flex flex-col justify-center rounded-2xl border border-neutral-100 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-neutral-800 dark:bg-neutral-900">
          
          <button
            onClick={() => setIsDesktopOpen(!isDesktopOpen)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-neutral-100 bg-white text-neutral-400 shadow-sm transition-all duration-300 hover:scale-110 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-800"
          >
            <ChevronLeftIcon 
              className={clsx(
                'h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]', 
                !isDesktopOpen && 'rotate-180'
              )} 
            />
          </button>

          <nav className="flex flex-col gap-1">
            {sections.map((section, index) => {
              const Icon = iconMap[section.iconName]
              const isActive = activeSection === section.id
              
              return (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  style={{
                    transitionDelay: isDesktopOpen ? `${index * 30}ms` : '0ms'
                  }}
                  className={clsx(
                    'group relative flex items-center overflow-hidden',
                    'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                    isDesktopOpen ? 'px-3 py-2.5 rounded-xl' : 'justify-center p-2.5 rounded-xl',
                    isActive 
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' 
                      : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800'
                  )}
                >
                  {/* Icon */}
                  <Icon 
                    className={clsx(
                      'h-5 w-5 shrink-0',
                      'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                      isActive && 'scale-110',
                      !isActive && 'group-hover:scale-110 group-hover:rotate-3'
                    )} 
                  />

                  {/* Label with smooth transition */}
                  <span
                    className={clsx(
                      'whitespace-nowrap text-sm font-medium',
                      'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                      isDesktopOpen 
                        ? 'ml-3 opacity-100 translate-x-0' 
                        : 'ml-0 w-0 opacity-0 -translate-x-2'
                    )}
                  >
                    {section.label}
                  </span>

                  {/* Active indicator dot - only visible when closed */}
                  {isActive && !isDesktopOpen && (
                    <span className="absolute right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default ProfileSidebarNav