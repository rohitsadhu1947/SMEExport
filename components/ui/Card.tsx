import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  onClick,
  hover = false
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 p-6 shadow-sm transition-all duration-300',
        hover && 'hover:shadow-lg hover:border-gray-200 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {children}
    </div>
  )
}
