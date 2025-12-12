// src/components/SectionBrowseByRegion.tsx
'use client'

import { FC } from 'react';
import { TRegion } from '@/data/regions';
import HeadingWithSub from '@/shared/Heading';
import RegionCard from '@/components/RegionCard';
import { HeadingWithSubProps } from '@/shared/Heading';
import clsx from 'clsx';

export interface SectionBrowseByRegionProps extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string;
  heading?: string;
  regions: TRegion[];
}

const SectionBrowseByRegion: FC<SectionBrowseByRegionProps> = ({
  className = '',
  regions,
  heading = "Discover by Region",
  subHeading = "Find influential leaders from across the globe",
  dimHeading,
}) => {
  return (
    <div className={clsx('relative', className)}>
      <HeadingWithSub subHeading={subHeading} dimHeading={dimHeading}>
        {heading}
      </HeadingWithSub>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </div>
    </div>
  );
};

export default SectionBrowseByRegion;
