// components/profile/ProfileVentures.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface ProfileVenturesProps {
    ventures: NonNullable<Person['ventures']>
    customAlts?: Record<string, string> // Added prop
}

const ProfileVentures: FC<ProfileVenturesProps> = ({ ventures, customAlts }) => {
    
    // Helper to normalize venture names to JSON keys (e.g. "Le Mirage" -> "le_mirage")
    const getAlt = (name: string) => {
        if (!customAlts) return name;
        const key = name.toLowerCase().replace(/\s+/g, '_');
        // Priority: 1. Specific key, 2. Generic 'logos' key, 3. Original Name
        return customAlts[key] || customAlts.logos || name;
    }

    return (
        <section>
            <div className="mb-12">
                <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
                    Ventures & Companies
                </h2>
                <div className="h-1 w-16 bg-blue-500" />
            </div>

            <div className="space-y-6">
                {ventures.map((venture, index) => (
                    <div
                        key={index}
                        className="group rounded-3xl border-2 border-neutral-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
                    >
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                            {/* Logo */}
                            {venture.logo &&
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
                                    <Image
                                        src={venture.logo}
                                        alt={getAlt(venture.name)} // Updated Alt
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            }

                            {/* Content */}
                            <div className="flex-1">
                                <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="mb-1 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                                            {venture.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                                                {venture.role}
                                            </span>
                                            <span className="text-neutral-400">•</span>
                                            <span>{venture.period}</span>
                                        </div>
                                    </div>

                                    {venture.website &&
                                    <a href={venture.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                >
                                    Visit Website
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                </a>
                                    }
                                </div>
                                <p className="text-neutral-700 dark:text-neutral-300">
                                    {venture.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default ProfileVentures