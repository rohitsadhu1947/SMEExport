import React from 'react'
import { cn } from '@/lib/utils'

type AlertVariant = 'success' | 'error' | 'warning' | 'info'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  message: string
  className?: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  message,
  className,
  onClose
}) => {
  const variants = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  
  return (
    <div
      className={cn(
        'border rounded-lg p-4 flex items-start gap-3',
        variants[variant],
        className
      )}
      role="alert"
    >
      <span className="font-bold text-lg flex-shrink-0">{icons[variant]}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-current opacity-70 hover:opacity-100"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  )
}
