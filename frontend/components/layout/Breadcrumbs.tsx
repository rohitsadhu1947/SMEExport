import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 text-sm', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-slate-700 hover:text-slate-800 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
            )}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
