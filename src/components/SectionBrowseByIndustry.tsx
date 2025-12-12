// src/components/SectionBrowseByIndustry.tsx
'use client'

import { FC, useContext } from 'react';
import { ThemeContext } from '@/app/theme-provider';
import type { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons';
import clsx from 'clsx';
import { HeadingWithSubProps } from '@/shared/Heading';
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns';
import { TIndustry } from '@/data/industries'; // Import our Industry type
import IndustryCard from '@/components/IndustryCard'; // Import our new card

export interface SectionBrowseByIndustryProps extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string;
  heading?: string;
  industries: TIndustry[]; // Use TIndustry
  emblaOptions?: EmblaOptionsType;
}

const SectionBrowseByIndustry: FC<SectionBrowseByIndustryProps> = ({
  className,
  subHeading,
  dimHeading,
  industries, // Use industries
  heading,
  emblaOptions = { slidesToScroll: 'auto' },
}) => {
  const theme = useContext(ThemeContext);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: theme?.themeDir,
  });

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi);

  return (
    <div className={clsx('relative', className)}>
      <HeadingWithArrowBtns
        hasNextPrev
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
        onClickPrev={onPrevButtonClick}
        onClickNext={onNextButtonClick}
        subHeading={subHeading}
        dimHeading={dimHeading}
      >
        {heading}
      </HeadingWithArrowBtns>

      <div className="embla py-4" ref={emblaRef}>
        <div className="-ms-5 embla__container pe-5 sm:-ms-7 sm:pe-7">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4"
            >
              {/* Use our new IndustryCard */}
              <IndustryCard industry={industry} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionBrowseByIndustry;