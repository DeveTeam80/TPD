// app/sitemap-page/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { peopleData } from '@/data/people'
import { industries } from '@/data/industries'
import { 
  HomeIcon, 
  UserGroupIcon, 
  InformationCircleIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  UserIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  PaintBrushIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Sitemap - People\'s Directory',
  description: 'Navigate through all pages of People\'s Directory. Find leaders, explore industries, and discover global talent.',
}

// Icon mapping function
function getIndustryIcon(iconName: string) {
  const iconMap: Record<string, React.ReactNode> = {
    'Technology': <ComputerDesktopIcon className="h-6 w-6" />,
    'Real Estate': <BuildingOffice2Icon className="h-6 w-6" />,
    'Arts & Culture': <PaintBrushIcon className="h-6 w-6" />,
    'Hospitality': <BuildingStorefrontIcon className="h-6 w-6" />,
    'Healthcare': <HeartIcon className="h-6 w-6" />,
    'Business': <ChartBarIcon className="h-6 w-6" />,
  }
  return iconMap[iconName] || <BriefcaseIcon className="h-6 w-6" />
}

export default function SitemapPage() {
  // Group people by country for better organization
  const peopleByCountry = peopleData.reduce((acc, person) => {
    if (!acc[person.country]) {
      acc[person.country] = []
    }
    acc[person.country].push(person)
    return acc
  }, {} as Record<string, typeof peopleData>)

  const countries = Object.keys(peopleByCountry).sort()

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-white py-16 dark:from-neutral-950 dark:to-neutral-900 lg:py-24">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl lg:text-6xl dark:text-neutral-100">
            Site Map
          </h1>
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            Navigate through all pages of People&apos;s Directory
          </p>
        </div>

        {/* Main Pages Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/30">
              <HomeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Main Pages
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SitemapCard
              href="/"
              icon={<HomeIcon className="h-6 w-6" />}
              title="Home"
              description="Discover global leaders"
            />
            <SitemapCard
              href="/directory"
              icon={<UserGroupIcon className="h-6 w-6" />}
              title="Directory"
              description={`Browse ${peopleData.length} leaders`}
            />
            <SitemapCard
              href="/about"
              icon={<InformationCircleIcon className="h-6 w-6" />}
              title="About"
              description="Learn about our mission"
            />
            {/* <SitemapCard
              href="/contact"
              icon={<EnvelopeIcon className="h-6 w-6" />}
              title="Contact"
              description="Get in touch with us"
            /> */}
          </div>
        </section>

        {/* Industries Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <BriefcaseIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Browse by Industry
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {industries.map((industry) => {
              const count = peopleData.filter(p => p.industry === industry.name).length
              return (
                <Link
                  key={industry.id}
                  href={`/directory?industry=${encodeURIComponent(industry.name)}`}
                  className="group flex items-center gap-4 rounded-2xl border-2 border-neutral-200 bg-white p-4 transition-all hover:border-primary-500 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-500"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-100 transition-colors group-hover:bg-primary-100 dark:bg-neutral-700 dark:group-hover:bg-primary-900/30">
                    <div className="text-neutral-600 group-hover:text-primary-600 dark:text-neutral-400 dark:group-hover:text-primary-400">
                      {getIndustryIcon(industry.iconName)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate font-semibold text-neutral-900 dark:text-neutral-100">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {count} {count === 1 ? 'leader' : 'leaders'}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* People by Country Section */}
        <section>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <MapPinIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Leaders by Country
            </h2>
          </div>
          <div className="space-y-8">
            {countries.map((country) => {
              const leaders = peopleByCountry[country].sort((a, b) => a.name.localeCompare(b.name))
              return (
                <div key={country} className="rounded-3xl border-2 border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800 lg:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      {country}
                    </h3>
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                      {leaders.length}
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {leaders.map((person) => (
                      <Link
                        key={person.id}
                        href={`/${person.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 transition-all hover:border-primary-500 hover:bg-primary-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-primary-500 dark:hover:bg-primary-900/20"
                      >
                        <UserIcon className="h-5 w-5 flex-shrink-0 text-neutral-400 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {person.name}
                          </p>
                          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                            {person.city}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-16 rounded-2xl bg-neutral-100 p-8 text-center dark:bg-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

// Reusable Card Component
function SitemapCard({ 
  href, 
  icon, 
  title, 
  description 
}: { 
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border-2 border-neutral-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-primary-500"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-primary-100 group-hover:text-primary-600 dark:bg-neutral-700 dark:text-neutral-400 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </Link>
  )
}