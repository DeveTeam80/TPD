// components/profile/ProfileTestimonials.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

interface ProfileTestimonialsProps {
  testimonials: NonNullable<Person['testimonials']>
}

const ProfileTestimonials: FC<ProfileTestimonialsProps> = ({ testimonials }) => {
  return (
    <section>
      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Testimonials
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 dark:from-neutral-800 dark:to-neutral-900"
          >
            <div className="mb-4 flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>

            <p className="mb-6 text-lg italic leading-relaxed text-neutral-700 dark:text-neutral-300">
              "{testimonial.quote}"
            </p>

            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProfileTestimonials
