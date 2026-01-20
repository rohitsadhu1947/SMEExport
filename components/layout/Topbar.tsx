import React from 'react'
import { cn } from '@/lib/utils'

interface TopbarProps {
  title?: string
  children?: React.ReactNode
  className?: string
}

export const Topbar: React.FC<TopbarProps> = ({ title, children, className }) => {
  return (
    <header className={cn(
      'bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between',
      className
    )}>
      {title && (
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      )}
      {children && (
        <div className="flex items-center gap-4">
          {children}
        </div>
      )}
    </header>
  )
}
