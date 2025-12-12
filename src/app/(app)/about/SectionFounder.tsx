// src/app/(app)/about/SectionFounder.tsx
const FOUNDERS = [
  {
    id: '1',
    name: `Sarah Mitchell`,
    job: 'Founder & CEO',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3687&auto=format&fit=crop',
  },
  {
    id: '2',
    name: `James Anderson`,
    job: 'Co-founder & CTO',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3687&auto=format&fit=crop',
  },
  {
    id: '3',
    name: `Maria Garcia`,
    job: 'Head of Community',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop',
  },
  {
    id: '4',
    name: `David Chen`,
    job: 'Director of Partnerships',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3687&auto=format&fit=crop',
  },
  {
    id: '5',
    name: `Aisha Patel`,
    job: 'Content Director',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3764&auto=format&fit=crop',
  },
  {
    id: '6',
    name: `Michael O'Brien`, // Fixed apostrophe
    job: 'Lead Designer',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3744&auto=format&fit=crop',
  },
]

export default function SectionFounder() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl lg:text-5xl">
          Meet Our Team
        </h2>
        <p className="mt-6 text-lg/8 text-neutral-600 dark:text-neutral-400">
          We&apos;re a passionate team dedicated to celebrating leadership excellence and fostering meaningful connections
          across industries and borders.
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-6"
      >
        {FOUNDERS.map((person) => (
          <li key={person.id}>
            <img alt={person.name} src={person.avatar} className="mx-auto size-24 rounded-full object-cover" />
            <h3 className="mt-6 text-base/7 font-semibold tracking-tight">{person.name}</h3>
            <p className="text-sm/6 text-neutral-600 dark:text-neutral-400">{person.job}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}