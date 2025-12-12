// src/data/industries.ts

// The heroicons import is no longer needed here
// import { BriefcaseIcon, ... } from '@heroicons/react/24/outline';

export type TIndustry = {
  id: string;
  name: string;
  href: string;
  count: number;
  thumbnail: string;
  iconName: 'Technology' | 'Real Estate' | 'Arts & Culture' | 'Hospitality' | 'Healthcare' | 'Business'; // Changed from 'icon'
};

export const industries: TIndustry[] = [
  {
    id: '1',
    name: 'Technology',
    href: '/search?what=Technology',
    count: 173,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto-format&fit=crop',
    iconName: 'Technology', // Changed
  },
  {
    id: '2',
    name: 'Real Estate',
    href: '/search?what=Real+Estate',
    count: 128,
    thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2896&auto-format&fit=crop',
    iconName: 'Real Estate', // Changed
  },
  {
    id: '3',
    name: 'Arts & Culture',
    href: '/search?what=Arts+Culture',
    count: 95,
    thumbnail: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=3174&auto=format&fit=crop',
    iconName: 'Arts & Culture', // Changed
  },
  {
    id: '4',
    name: 'Hospitality',
    href: '/search?what=Hospitality',
    count: 142,
    thumbnail: 'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?q=80&w=3174&auto-format&fit=crop',
    iconName: 'Hospitality', // Changed
  },
  {
    id: '5',
    name: 'Healthcare',
    href: '/search?what=Healthcare',
    count: 88,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop', // NEW, VERIFIED IMAGE
    iconName: 'Healthcare', // Changed
  },
  {
    id: '6',
    name: 'Business',
    href: '/search?what=Business',
    count: 215,
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto-format&fit=crop',
    iconName: 'Business', // Changed
  },
];