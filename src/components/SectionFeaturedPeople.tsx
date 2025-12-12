// src/components/SectionFeaturedPeople.tsx
'use client'

import { FC, useContext } from 'react'
import { ThemeContext } from '@/app/theme-provider'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useCarouselArrowButtons } from '@/hooks/use-carousel-arrow-buttons'
import clsx from 'clsx'
import { HeadingWithSubProps } from '@/shared/Heading'
import HeadingWithArrowBtns from '@/shared/HeadingWithArrowBtns'
import ProfileCard from '@/components/ProfileCard' // Import Person from ProfileCard
import { Person } from '@/data/people'

export interface SectionFeaturedPeopleProps extends Pick<HeadingWithSubProps, 'subHeading' | 'dimHeading'> {
  className?: string
  heading?: string
  people: Person[]
  emblaOptions?: EmblaOptionsType
}


const SectionFeaturedPeople: FC<SectionFeaturedPeopleProps> = ({
  className,
  subHeading,
  dimHeading,
  people,
  heading,
  emblaOptions = {
    slidesToScroll: 'auto',
  },
}) => {
  const theme = useContext(ThemeContext)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...emblaOptions,
    direction: theme?.themeDir,
  })

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = useCarouselArrowButtons(emblaApi)

  return (
    <div className={clsx('relative', className)}>
      {/* HEADING AND NAVIGATION BUTTONS */}
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

      {/* CAROUSEL */}
      <div className="embla py-10" ref={emblaRef}>
        <div className="-ms-5 embla__container pe-4 sm:-ms-7 sm:pe-7">
          {people.map((person) => (
            <div
              key={person.id}
              className="embla__slide basis-[86%] ps-5 sm:basis-1/2 sm:ps-7 md:basis-1/3 lg:basis-1/4"
            >
              <ProfileCard person={person} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionFeaturedPeople