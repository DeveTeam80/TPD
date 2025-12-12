// app/directory/page.tsx
import { Metadata } from 'next'
import DirectoryClient from '@/components/DirectoryClient'
import { peopleData } from '@/data/people'
import { industries } from '@/data/industries'
import { regions } from '@/data/regions'

export const metadata: Metadata = {
  title: 'Directory - Browse Distinguished Leaders',
  description: 'Search and discover distinguished leaders, entrepreneurs, and influential individuals from around the world.',
}

export default function DirectoryPage() {
  return (
    <div className="relative">
      <DirectoryClient 
        initialPeople={peopleData}
        industries={industries}
        regions={regions}
      />
    </div>
  )
}