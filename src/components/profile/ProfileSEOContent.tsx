// components/profile/ProfileSEOContent.tsx
import { Person } from '@/data/people'

interface Props {
  person: Person
}

export default function ProfileSEOContent({ person }: Props) {
  return (
    <>
      {/* 🔍 SEO Content - Hidden from users, visible to search engines */}
      <div className="sr-only" aria-hidden="true">
        {/* Full biographical content for SEO */}
        <h1>{person.name} - {person.influence}</h1>
        <h2>About {person.name}</h2>
        <p>
          {person.name} is a distinguished {person.industry} leader based in {person.city}, {person.country}.
          {person.bio?.join(' ')}
        </p>

        {/* Industry & Location for local SEO */}
        <h3>{person.industry} Expert in {person.city}</h3>
        <p>
          As a leading {person.industry} professional in {person.city}, {person.country}, 
          {person.name} has made significant contributions to the field.
        </p>

        {/* Achievements for rich snippets */}
        {person.achievements && person.achievements.length > 0 && (
          <>
            <h3>Achievements and Awards</h3>
            <ul>
              {person.achievements.map((achievement, idx) => (
                <li key={idx}>
                  {achievement.title} - {achievement.year}: {achievement.description}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Ventures for entity relationships */}
        {person.ventures && person.ventures.length > 0 && (
          <>
            <h3>Professional Experience</h3>
            <ul>
              {person.ventures.map((venture, idx) => (
                <li key={idx}>
                  {venture.role} at {venture.name} ({venture.period}): {venture.description}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Publications for authority */}
        {person.publications && person.publications.length > 0 && (
          <>
            <h3>Publications and Research</h3>
            <ul>
              {person.publications.map((pub, idx) => (
                <li key={idx}>
                  {pub.title} - {pub.publisher}, {pub.year}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Media mentions for credibility */}
        {person.media && person.media.length > 0 && (
          <>
            <h3>Media Appearances</h3>
            <ul>
              {person.media.map((media, idx) => (
                <li key={idx}>
                  {media.title} - {media.platform}, {media.date}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Contact information */}
        {person.socials && (
          <>
            <h3>Connect with {person.name}</h3>
            <address>
              {person.socials.email && <p>Email: {person.socials.email}</p>}
              {person.socials.linkedin && <p>LinkedIn: {person.socials.linkedin}</p>}
              {person.socials.website && <p>Website: {person.socials.website}</p>}
            </address>
          </>
        )}
      </div>
    </>
  )
}