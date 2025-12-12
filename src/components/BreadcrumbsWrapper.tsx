// src/components/BreadcrumbsWrapper.tsx
import React from 'react'
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs'

interface BreadcrumbsWrapperProps {
  items?: BreadcrumbItem[]
  containerClassName?: string
}

const BreadcrumbsWrapper: React.FC<BreadcrumbsWrapperProps> = ({
  items,
  containerClassName = '',
}) => {
  return (
    <div className={`absolute left-0 right-0 top-20 z-10 ${containerClassName}`}>
      <div className="container py-4">
        <Breadcrumbs items={items} />
      </div>
    </div>
  )
}

export default BreadcrumbsWrapper