// src/data/regions.ts

export type TRegion = {
  id: string;
  name: string;
  href: string;
  count: number;
  thumbnail: string;
};

export const regions: TRegion[] = [
  {
    id: '1',
    name: 'North America',
    href: '/search?where=North America',
    count: 480,
    thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Europe',
    href: '/search?where=Europe',
    count: 520,
    thumbnail: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2874&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Asia',
    href: '/search?where=Asia',
    count: 630,
    thumbnail: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'South America',
    href: '/search?where=South America',
    count: 210,
    thumbnail: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2940&auto=format&fit=crop', // NEW VERIFIED LINK
  },
  {
    id: '5',
    name: 'Africa',
    href: '/search?where=Africa',
    count: 150,
    thumbnail: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2942&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Oceania',
    href: '/search?where=Oceania',
    count: 180,
    thumbnail: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop',
  },
];

