// components/SectionTrustSignals.tsx
import React, { FC } from 'react'
import Heading from './Heading'

export interface SectionTrustSignalsProps {
  className?: string
}

const SectionTrustSignals: FC<SectionTrustSignalsProps> = ({ className = '' }) => {
  return (
    <div className={`nc-SectionTrustSignals ${className}`}>
      <Heading desc="Trusted by distinguished leaders worldwide" isCenter>
        Recognition & Trust
      </Heading>
      <div className="mt-12 rounded-3xl bg-neutral-100 px-8 py-16 dark:bg-neutral-800">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg text-neutral-600 dark:text-neutral-300">
            Our platform has been recognized for connecting influential leaders and creating opportunities for digital visibility. Featured profiles benefit from enhanced search rankings and increased professional networking opportunities.
          </p>
          {/* Add logos here when you have partnerships */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
            {/* Logo placeholders - replace with actual partner logos */}
            <div className="text-2xl font-bold">Partner Logo 1</div>
            <div className="text-2xl font-bold">Partner Logo 2</div>
            <div className="text-2xl font-bold">Partner Logo 3</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTrustSignals