// src/components/SectionNominateLeader.tsx
'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { FC } from 'react'
import { useRouter } from 'next/navigation'

// A more fitting default image for a professional directory
// REMOVED: import defaultImg from '@/images/nominate-leader.jpg'

interface Props {
  className?: string
  rightImg?: string | StaticImageData
}

const SectionNominateLeader: FC<Props> = ({ 
  className, 
  rightImg = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop" 
}) => {
  const router = useRouter();

  const handleNominateClick = () => {
    // Navigate to the nomination page/form
    router.push('/nominate');
  };

  return (
    <div className={clsx('relative flex flex-col items-center lg:flex-row', className)}>
      <div className="mb-14 shrink-0 lg:mr-10 lg:mb-0 lg:w-2/5">
        <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
          Help Build The Directory
        </span>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Know an Influential Leader?</h2>
        <span className="mt-8 block text-neutral-500 dark:text-neutral-400">
          Our directory is built by the community. Nominate a respected individual who is making their mark to be featured. Everyone&apos;s welcome to contribute.
        </span>
        <ButtonPrimary className="mt-8" onClick={handleNominateClick}>
          Nominate a Leader
        </ButtonPrimary>
      </div>
      <div className="grow">
        <Image
          alt="Two professionals in a discussion"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="rounded-2xl lg:rounded-3xl"
          // Use the prop for the image source
          src={rightImg}
          width={800} // Example width
          height={600} // Example height
        />
      </div>
    </div>
  )
}

export default SectionNominateLeader


