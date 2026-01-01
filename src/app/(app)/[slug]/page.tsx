// app/profile/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { peopleData } from '@/data/people'
import ProfileDetailHero from '@/components/profile/ProfileHero'
import ProfileAbout from '@/components/profile/ProfileAbout'
import ProfileAchievements from '@/components/profile/ProfileAchievements'
import ProfileVentures from '@/components/profile/ProfileVentures'
import ProfileMedia from '@/components/profile/ProfileMedia'
import ProfileArticles from '@/components/profile/ProfileArticles'
import ProfileTestimonials from '@/components/profile/ProfileTestimonials'
import ProfileSocials from '@/components/profile/ProfileSocials'
import SectionFeaturedPeople from '@/components/SectionFeaturedPeople'
import ProfileSidebarNav from '@/components/profile/ProfileSidebarNav'
import ProfilePublications from '@/components/profile/ProfilePublications'
import ProfileSEOContent from '@/components/profile/ProfileSEOContent'
import ProfileAboutExpandable from '@/components/profile/ProfileAboutExpandable'

// --- HELPER TO LOAD CUSTOM ALTS ---
async function getCustomAlts(slug: string) {
  try {
    const data = await import(`@/seo/custom/people/${slug}.json`)
    return data.imageAlts || {}
  } catch (error) {
    // Return empty object if file doesn't exist
    return {}
  }
}

interface ProfilePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  const person = peopleData.find(p => p.slug === slug)

  if (!person) {
    return { title: 'Profile Not Found' }
  }

  // OPTIONAL: Load custom title/desc here if you aren't using useSeo.ts for this part
  // const customData = await getCustomAlts(slug); 

  return {
    title: `${person.name} - ${person.influence} | Distinguished Leaders Directory`,
    description: `${person.name} is a distinguished leader in ${person.industry} based in ${person.city}, ${person.country}. ${person.influence}`,
    openGraph: {
      title: `${person.name} - ${person.industry} Leader`,
      description: person.influence,
      images: [person.avatarUrl],
      url: `/${person.slug}`,
    },
    alternates: {
      canonical: `/${person.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return peopleData.map((person) => ({
    slug: person.slug || person.id,
  }))
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params
  const person = peopleData.find(p => p.slug === slug)

  if (!person) {
    notFound()
  }

  // --- 1. LOAD CUSTOM ALT TAGS ---
  const customAlts = await getCustomAlts(slug)

  // --- DEFINE THE SECTIONS ---
  const availableSections = [
    { 
      id: 'about', 
      label: 'About', 
      iconName: 'about' as const, 
      exists: person.bio && person.bio.length > 0 
    },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      iconName: 'achievements' as const, 
      exists: person.achievements && person.achievements.length > 0 
    },
    { 
      id: 'ventures', 
      label: 'Ventures', 
      iconName: 'ventures' as const, 
      exists: person.ventures && person.ventures.length > 0 
    },
    { 
      id: 'media', 
      label: 'Media', 
      iconName: 'media' as const, 
      exists: person.media && person.media.length > 0 
    },
    { 
      id: 'articles', 
      label: 'Articles', 
      iconName: 'articles' as const, 
      exists: person.articles && person.articles.length > 0 
    },
    { 
      id: 'testimonials', 
      label: 'Testimonials', 
      iconName: 'testimonials' as const, 
      exists: person.testimonials && person.testimonials.length > 0 
    },
    { 
      id: 'publications', 
      label: 'Publications', 
      iconName: 'articles' as const, 
      exists: person.publications && person.publications.length > 0 
    },
    { 
      id: 'connect', 
      label: 'Connect', 
      iconName: 'connect' as const, 
      exists: person.socials 
    },
  ].filter(section => section.exists)

  const relatedPeople = peopleData
    .filter(p =>
      p.id !== person.id &&
      (p.industry === person.industry || p.city === person.city)
    )
    .slice(0, 4)

  return (
    <div className="relative bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar Navigation */}
      <ProfileSidebarNav sections={availableSections} />
      
      {/* Hidden SEO Content */}
      <ProfileSEOContent person={person} />

      {/* Hero Section - PASSED customAlts prop */}
      <ProfileDetailHero 
        person={person} 
        customAlts={customAlts} 
      />

      {/* Main Content */}
      <div className="container py-16 lg:py-20">
        <div className="mx-auto max-w-6xl space-y-20 lg:space-y-32">

          {/* About & Bio */}
          {person.bio && person.bio.length > 0 && (
            <div id="about">
              <ProfileAbout person={person} />
            </div>
          )}

          {/* Achievements - Passed customAlts (might have 'awards' alt) */}
          {person.achievements && person.achievements.length > 0 && (
            <div id="achievements">
              <ProfileAchievements 
                achievements={person.achievements} 
                customAlts={customAlts}
              />
            </div>
          )}

          {/* Ventures - Passed customAlts (might have 'logos' alt) */}
          {person.ventures && person.ventures.length > 0 && (
            <div id="ventures">
              <ProfileVentures 
                ventures={person.ventures} 
                customAlts={customAlts}
              />
            </div>
          )}

          {/* Media Appearances - Passed customAlts (might have 'events' alt) */}
          {person.media && person.media.length > 0 && (
            <div id="media">
              <ProfileMedia 
                media={person.media} 
                personName={person.name}
                customAlts={customAlts}
              />
            </div>
          )}

          {/* Articles */}
          {person.articles && person.articles.length > 0 && (
            <div id="articles">
              <ProfileArticles articles={person.articles} />
            </div>
          )}

          {/* Publications */}
          {person.publications && person.publications.length > 0 && (
            <div id="publications" className="scroll-mt-24">
              <ProfilePublications publications={person.publications} />
            </div>
          )}

          {/* Testimonials */}
          {person.testimonials && person.testimonials.length > 0 && (
            <div id="testimonials">
              <ProfileTestimonials testimonials={person.testimonials} />
            </div>
          )}

          <ProfileAboutExpandable person={person} />

          {/* Social Links */}
          {person.socials && (
            <div id="connect">
              <ProfileSocials socials={person.socials} personName={person.name} />
            </div>
          )}
        </div>

        {/* Related Profiles */}
        {relatedPeople.length > 0 && (
          <div className="mt-32 border-t-2 border-neutral-200 pt-20 dark:border-neutral-800">
            <SectionFeaturedPeople
              heading="Other Distinguished Leaders"
              subHeading={`Explore more influential individuals in ${person.industry}`}
              people={relatedPeople}
            />
          </div>
        )}
      </div>
    </div>
  )
}