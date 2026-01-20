'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Dropdown } from '@/components/ui/Dropdown'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Industry } from '@/types/artisan'

interface ProductionInputs {
  quantity: number
  packaging: string
  shoe_type?: string
  stitching_type?: string
  weave_type?: string
  dimensions_length?: number
  dimensions_width?: number
}

export default function ProductionInputPage() {
  const router = useRouter()
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [productConfig, setProductConfig] = useState<any>(null)
  const [tier, setTier] = useState<'premium' | 'standard'>('standard')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProductionInputs>()

  useEffect(() => {
    const config = sessionStorage.getItem('productConfiguration')
    const intelligence = sessionStorage.getItem('marketIntelligence')
    
    if (!config || !intelligence) {
      router.push('/products/select')
      return
    }

    const parsedConfig = JSON.parse(config)
    const parsedIntelligence = JSON.parse(intelligence)
    
    setIndustry(parsedConfig.industry)
    setProductConfig(parsedConfig)
    setTier(parsedIntelligence.price_tier)
  }, [router])

  const onSubmit = async (data: ProductionInputs) => {
    try {
      const artisanId = sessionStorage.getItem('artisanId')
      const productConfig = JSON.parse(sessionStorage.getItem('productConfiguration') || '{}')
      const marketIntelligence = JSON.parse(sessionStorage.getItem('marketIntelligence') || '{}')

      sessionStorage.setItem('productionInputs', JSON.stringify(data))
      
      router.push('/production/preview')
    } catch (error) {
      console.error('Error saving production inputs:', error)
    }
  }

  const packagingOptions = industry === 'Leather' 
    ? [
        { value: 'Box', label: 'Box' },
        { value: 'Bag', label: 'Bag' },
        { value: 'Custom', label: 'Custom Packaging' }
      ]
    : [
        { value: 'Roll', label: 'Roll' },
        { value: 'Box', label: 'Box' },
        { value: 'Custom', label: 'Custom Packaging' }
      ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products/select' },
            { label: 'Configure', href: '/products/configure' },
            { label: 'Production Input' }
          ]}
          className="mb-8"
        />

        <Card className="p-8 border border-gray-100 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Production Input Details
            </h1>
            <p className="text-lg text-gray-600 font-light">
              {industry && `Enter production specifications for ${industry}`}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry-specific fields */}
            {industry === 'Leather' && (
              <>
                <Dropdown
                  label="Shoe Type"
                  options={[
                    { value: 'Formal', label: 'Formal' },
                    { value: 'Casual', label: 'Casual' },
                    { value: 'Sports', label: 'Sports' }
                  ]}
                  {...register('shoe_type', { required: 'Shoe type is required' })}
                  error={errors.shoe_type?.message}
                  required
                />

                {tier === 'premium' && (
                  <Dropdown
                    label="Stitching Type"
                    options={[
                      { value: 'Standard', label: 'Standard' },
                      { value: 'Premium', label: 'Premium Hand-stitched' }
                    ]}
                    {...register('stitching_type')}
                    error={errors.stitching_type?.message}
                  />
                )}
              </>
            )}

            {industry === 'Carpets' && (
              <>
                <Dropdown
                  label="Weave Type"
                  options={[
                    { value: 'Hand-knotted', label: 'Hand-knotted' },
                    { value: 'Machine-made', label: 'Machine-made' },
                    { value: 'Hand-woven', label: 'Hand-woven' }
                  ]}
                  {...register('weave_type', { required: 'Weave type is required' })}
                  error={errors.weave_type?.message}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Length (ft)"
                    type="number"
                    {...register('dimensions_length', {
                      required: 'Length is required',
                      min: { value: 2, message: 'Minimum length is 2ft' },
                      valueAsNumber: true
                    })}
                    error={errors.dimensions_length?.message}
                    required
                  />
                  <Input
                    label="Width (ft)"
                    type="number"
                    {...register('dimensions_width', {
                      required: 'Width is required',
                      min: { value: 2, message: 'Minimum width is 2ft' },
                      valueAsNumber: true
                    })}
                    error={errors.dimensions_width?.message}
                    required
                  />
                </div>
              </>
            )}

            {/* Common fields */}
            <Input
              label="Quantity"
              type="number"
              {...register('quantity', {
                required: 'Quantity is required',
                min: { value: 1, message: 'Minimum quantity is 1' },
                valueAsNumber: true
              })}
              error={errors.quantity?.message}
              required
            />

            <Dropdown
              label="Packaging Options"
              options={packagingOptions}
              {...register('packaging', { required: 'Packaging option is required' })}
              error={errors.packaging?.message}
              required
            />

            <div className="flex gap-4 pt-6 border-t border-gray-100 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-6"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? 'Processing...' : 'Preview & Submit'}
                {!isSubmitting && (
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
