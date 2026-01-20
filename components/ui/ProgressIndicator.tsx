import React from 'react'
import { cn } from '@/lib/utils'

interface Step {
  id: string
  label: string
  completed?: boolean
  current?: boolean
}

interface ProgressIndicatorProps {
  steps: Step[]
  className?: string
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  className
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors',
                  step.completed
                    ? 'bg-slate-700 border-slate-700 text-white'
                    : step.current
                    ? 'bg-white border-slate-700 text-slate-700'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                )}
                aria-current={step.current ? 'step' : undefined}
              >
                {step.completed ? '✓' : index + 1}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-medium text-center',
                  step.current || step.completed
                    ? 'text-slate-700'
                    : 'text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-2 transition-colors',
                  step.completed ? 'bg-slate-700' : 'bg-gray-300'
                )}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
