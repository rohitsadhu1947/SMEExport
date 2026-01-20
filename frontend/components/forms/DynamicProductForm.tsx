'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ProductField, ProductTier } from '@/types/product'
import { Input } from '@/components/ui/Input'
import { Dropdown } from '@/components/ui/Dropdown'
import { shouldShowField } from '@/lib/configurator'

interface DynamicProductFormProps {
  fields: ProductField[]
  currentTier: ProductTier
  onSubmit: (data: Record<string, any>) => void
  defaultValues?: Record<string, any>
  children?: React.ReactNode
}

export const DynamicProductForm: React.FC<DynamicProductFormProps> = ({
  fields,
  currentTier,
  onSubmit,
  defaultValues = {},
  children
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const formValues = watch()

  const visibleFields = fields.filter(field => 
    shouldShowField(field, formValues, currentTier)
  )

  const renderField = (field: ProductField) => {
    const fieldError = errors[field.field_id]?.message as string | undefined

    switch (field.type) {
      case 'text':
        return (
          <Input
            key={field.field_id}
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.field_id, {
              required: field.validation?.mandatory ? `${field.label} is required` : false,
              pattern: field.validation?.regex
                ? {
                    value: new RegExp(field.validation.regex),
                    message: `Invalid ${field.label}`
                  }
                : undefined
            })}
            error={fieldError}
            required={field.validation?.mandatory}
          />
        )

      case 'number':
        return (
          <Input
            key={field.field_id}
            type="number"
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.field_id, {
              required: field.validation?.mandatory ? `${field.label} is required` : false,
              min: field.validation?.min
                ? {
                    value: field.validation.min,
                    message: `Minimum value is ${field.validation.min}`
                  }
                : undefined,
              max: field.validation?.max
                ? {
                    value: field.validation.max,
                    message: `Maximum value is ${field.validation.max}`
                  }
                : undefined,
              valueAsNumber: true
            })}
            error={fieldError}
            required={field.validation?.mandatory}
          />
        )

      case 'dropdown':
        return (
          <Controller
            key={field.field_id}
            name={field.field_id}
            control={control}
            rules={{
              required: field.validation?.mandatory ? `${field.label} is required` : false
            }}
            render={({ field: formField }) => (
              <Dropdown
                label={field.label}
                options={field.options?.map(opt => ({ value: opt, label: opt })) || []}
                placeholder={field.placeholder || `Select ${field.label}`}
                {...formField}
                error={fieldError}
                required={field.validation?.mandatory}
              />
            )}
          />
        )

      case 'checkbox':
        return (
          <div key={field.field_id} className="flex items-center">
            <input
              type="checkbox"
              id={field.field_id}
              {...register(field.field_id)}
              className="mr-2 w-4 h-4 text-slate-700 border-gray-300 rounded focus:ring-slate-700"
            />
            <label htmlFor={field.field_id} className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {visibleFields.map(field => (
        <div key={field.field_id}>
          {renderField(field)}
        </div>
      ))}
      {children}
    </form>
  )
}
