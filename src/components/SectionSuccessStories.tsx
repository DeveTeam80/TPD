// components/SectionSuccessStories.tsx
import React, { FC } from 'react'
import Heading from './Heading'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

export interface SectionSuccessStoriesProps {
  className?: string
}

const SectionSuccessStories: FC<SectionSuccessStoriesProps> = ({ className = '' }) => {
  const testimonials = [
    {
      name: 'Michael Chen',
      title: 'Real Estate Developer',
      location: 'Singapore',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      quote: 'Being featured in this directory increased my profile visibility by 300%. I now receive inquiries from international partners regularly.',
      metric: '300% increase in visibility',
    },
    {
      name: 'Sarah Williams',
      title: 'Healthcare Entrepreneur',
      location: 'London',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      quote: 'The platform helped me establish my digital presence and connect with like-minded leaders across Europe. Invaluable for networking.',
      metric: '50+ new connections',
    },
    {
      name: 'David Rodriguez',
      title: 'Tech Innovator',
      location: 'Miami',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      quote: 'Finally, a platform that understands the importance of local influence. My profile ranks on the first page of Google now.',
      metric: 'First page Google ranking',
    },
  ]

  return (
    <div className={`nc-SectionSuccessStories ${className}`}>
      <Heading
        desc="Hear from leaders who have expanded their reach through our platform"
        isCenter
      >
        Success Stories
      </Heading>
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative rounded-3xl border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900"
          >
            {/* Stars */}
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="mb-6 text-neutral-700 dark:text-neutral-300">
              &ldquo;{testimonial.quote}&rdquo;

            </p>

            {/* Metric Badge */}
            <div className="mb-6 inline-block rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-400">
              {testimonial.metric}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {testimonial.title} • {testimonial.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionSuccessStories