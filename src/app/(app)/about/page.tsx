'use client'

import SectionHero from '@/components/SectionHero'
import BreadcrumbsWrapper from '@/components/BreadcrumbsWrapper'
import rightImg from '@/images/about-hero-right.png'
import { Button } from '@/shared/Button'
import Input from '@/shared/Input'
import { Divider } from '@/shared/divider'
import SectionFounder from './SectionFounder'
import SectionStatistic from './SectionStatistic'
import { useState } from 'react'
import {
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UsersIcon,
  EyeIcon,
  RocketLaunchIcon,
  HeartIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  DocumentCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const PageAbout = ({ }) => {
  const [activeValue, setActiveValue] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const coreValues = [
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description:
        'We celebrate and promote the highest standards of leadership across all industries and regions.',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: UsersIcon,
      title: 'Inclusivity',
      description: 'We believe great leadership comes from diverse backgrounds and perspectives worldwide.',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Authenticity',
      description: 'We showcase genuine achievements and real impact, not just titles and accolades.',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: GlobeAltIcon,
      title: 'Connection',
      description: 'We facilitate meaningful relationships between leaders, innovators, and changemakers.',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: EyeIcon,
      title: 'Transparency',
      description: 'We maintain clear, honest standards for recognition and profile inclusion.',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Impact',
      description: 'We focus on leaders who are making tangible differences in their fields and communities.',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ]

  const workSteps = [
    {
      icon: UserGroupIcon,
      title: 'Nomination & Application',
      description:
        'Leaders can be nominated by peers or apply directly. We welcome submissions from all industries and regions.',
    },
    {
      icon: DocumentCheckIcon,
      title: 'Review & Verification',
      description:
        'Our team carefully reviews each submission, verifying achievements and assessing leadership impact and influence.',
    },
    {
      icon: CheckBadgeIcon,
      title: 'Profile Publication',
      description:
        'Approved leaders receive a comprehensive profile showcasing their achievements, impact, and contributions.',
    },
  ]

  return (
    <div className={`nc-PageAbout relative`}>
      <div className="relative container space-y-16 py-16 lg:space-y-28 lg:py-28">
        {/* Hero Section */}
        <SectionHero
          rightImg={rightImg}
          heading="Celebrating Global Leadership"
          btnText="Nominate a Leader"
          subHeading="We're dedicated to recognizing and connecting exceptional leaders across industries and regions. Our platform showcases the innovators, changemakers, and visionaries who are shaping the future of business and society."
        />

        <Divider />

        {/* Mission & Vision Section */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="group">
            <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 p-3 dark:from-primary-900/20 dark:to-primary-800/20">
              <HeartIcon className="h-8 w-8 text-primary-600 transition-transform duration-300 group-hover:scale-110 dark:text-primary-400" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-base/7 text-neutral-600 dark:text-neutral-400">
              To create a comprehensive global directory that celebrates leadership excellence, fosters meaningful
              connections, and inspires the next generation of leaders across all industries and regions.
            </p>
            <p className="mt-4 text-base/7 text-neutral-600 dark:text-neutral-400">
              We believe that recognizing and connecting great leaders creates ripple effects that drive innovation,
              collaboration, and positive change worldwide.
            </p>
          </div>
          <div className="group">
            <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-3 dark:from-blue-900/20 dark:to-blue-800/20">
              <LightBulbIcon className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:scale-110 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Vision</h2>
            <p className="mt-6 text-base/7 text-neutral-600 dark:text-neutral-400">
              To become the world&apos;s most trusted platform for discovering, connecting with, and learning from
              exceptional leaders who are making a difference in their fields.
            </p>
            <p className="mt-4 text-base/7 text-neutral-600 dark:text-neutral-400">
              We envision a world where leadership excellence is recognized, accessible, and celebrated across borders,
              industries, and communities.
            </p>
          </div>
        </div>

        <Divider />

        {/* Statistics Section */}
        <SectionStatistic />

        <Divider />

        {/* Core Values Section */}
        <div>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
              Our Core Values
            </h2>
            <p className="mt-6 text-lg/8 text-neutral-600 dark:text-neutral-400">
              These principles guide everything we do and shape how we serve our community of leaders.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {coreValues.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className={`group relative cursor-pointer rounded-2xl border border-neutral-200 p-8 transition-all duration-300 hover:shadow-xl dark:border-neutral-700 ${activeValue === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  onClick={() => setActiveValue(activeValue === index ? null : index)}
                  onMouseEnter={() => setActiveValue(index)}
                  onMouseLeave={() => setActiveValue(null)}
                >
                  <div
                    className={`mb-4 inline-flex rounded-xl p-3 transition-all duration-300 ${value.bgColor} ${activeValue === index ? 'scale-110' : ''
                      }`}
                  >
                    <Icon
                      className={`h-8 w-8 transition-all duration-300 ${value.color} ${activeValue === index ? 'rotate-12' : ''
                        }`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p
                    className={`mt-4 text-base/7 text-neutral-600 transition-all duration-300 dark:text-neutral-400 ${activeValue === index ? 'text-neutral-900 dark:text-neutral-200' : ''
                      }`}
                  >
                    {value.description}
                  </p>
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${value.color} transition-all duration-300 ${activeValue === index ? 'w-full' : 'w-0'
                      }`}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <Divider />

        {/* Team Section */}
        {/* <SectionFounder /> */}

        {/* <Divider /> */}

        {/* How It Works Section */}
        <div>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
              How We Work
            </h2>
            <p className="mt-6 text-lg/8 text-neutral-600 dark:text-neutral-400">
              Our rigorous process ensures that every leader featured in our directory meets our high standards of
              excellence and impact.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {workSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Connecting line - FIXED */}
                  {index < workSteps.length - 1 && (
                    <div className="absolute left-full top-6 hidden h-0.5 w-8 -translate-x-4 bg-gradient-to-r from-primary-400 to-primary-200 lg:block">
                      <div
                        className={`absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary-400 transition-all duration-500 ${hoveredStep === index ? 'scale-150' : 'scale-100'
                          }`}
                      />
                    </div>
                  )}

                  <div
                    className={`relative flex size-12 items-center justify-center rounded-lg bg-primary-600 text-white transition-all duration-300 ${hoveredStep === index ? 'scale-110 shadow-xl' : ''
                      }`}
                  >
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div
                    className={`mt-6 transition-all duration-300 ${hoveredStep === index ? 'translate-x-2' : ''}`}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <Icon
                        className={`h-6 w-6 text-primary-600 transition-all duration-300 dark:text-primary-400 ${hoveredStep === index ? 'scale-125' : ''
                          }`}
                      />
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-base/7 text-neutral-600 dark:text-neutral-400">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Divider />

        {/* Newsletter Section */}
        <div className="rounded-3xl bg-gradient-to-br from-primary-50 to-blue-50 py-16 dark:from-primary-900/20 dark:to-blue-900/20 sm:py-24 lg:py-32">
          <div className="px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-7">
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  Stay Connected with Leadership Excellence
                </h2>
                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                  Get monthly insights, new leader profiles, and exclusive stories delivered to your inbox.
                </p>
              </div>
              <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
                <div className="flex gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                  <Button type="submit" className="transition-all duration-300 hover:scale-105">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-4 text-sm/6 text-neutral-600 dark:text-neutral-400">
                  We respect your privacy. Read our{' '}
                  <a
                    href="#"
                    className="font-semibold text-primary-600 hover:text-primary-500"
                    onClick={(e) => e.preventDefault()}
                  >
                    privacy&nbsp;policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageAbout