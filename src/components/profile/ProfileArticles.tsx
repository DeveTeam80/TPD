// components/profile/ProfileArticles.tsx
import React, { FC } from 'react'
import { Person } from '@/data/people'
import { DocumentTextIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

interface ProfileArticlesProps {
  articles: NonNullable<Person['articles']>
}

const ProfileArticles: FC<ProfileArticlesProps> = ({ articles }) => {
  return (
    <section>
      <div className="mb-12">
        <h2 className="mb-2 text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          Articles & Publications
        </h2>
        <div className="h-1 w-16 bg-blue-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {articles.map((article, index) => (
          <article
            key={index}
            className="group rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
          >
            <div className="mb-4 flex items-start justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                article.type === 'Written By'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
              }`}>
                {article.type}
              </span>
              <DocumentTextIcon className="h-6 w-6 text-neutral-400" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {article.title}
            </h3>
            <div className="mb-3 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">{article.publication}</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
            <p className="mb-4 text-neutral-700 dark:text-neutral-300 line-clamp-2">
              {article.excerpt}
            </p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Read Full Article
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProfileArticles
