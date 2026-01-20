'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { MarketIntelligencePanel } from '@/components/intelligence/MarketIntelligencePanel'
import { useToast } from '@/components/ui/Toast'
import { MarketIntelligence } from '@/types/market'

export default function ProductionPreviewPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [productConfig, setProductConfig] = useState<any>(null)
  const [productionInputs, setProductionInputs] = useState<any>(null)
  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const config = sessionStorage.getItem('productConfiguration')
    const inputs = sessionStorage.getItem('productionInputs')
    const intelligence = sessionStorage.getItem('marketIntelligence')

    if (!config || !inputs || !intelligence) {
      router.push('/production/input')
      return
    }

    setProductConfig(JSON.parse(config))
    setProductionInputs(JSON.parse(inputs))
    setMarketIntelligence(JSON.parse(intelligence))
  }, [router])

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    try {
      if (typeof window === 'undefined') {
        throw new Error('Cannot submit on server')
      }
      
      const artisanId = sessionStorage.getItem('artisanId')
      if (!artisanId) {
        throw new Error('Artisan ID not found')
      }
      
      const response = await fetch('/api/submit-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artisan_id: artisanId,
          product_data: productConfig,
          production_inputs: productionInputs,
          market_intelligence: marketIntelligence,
          pricing: {
            base_price: marketIntelligence?.base_price,
            suggested_price: marketIntelligence?.suggested_price,
            tier: marketIntelligence?.price_tier
          },
          schemes_applied: marketIntelligence?.phase2_schemes?.filter((s: any) => s.applicable)
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to submit product')
      }

      const data = await response.json()
      sessionStorage.setItem('submissionId', data.submission_id)
      
      showToast('success', 'Product submitted successfully!', 'Success')
      
      setTimeout(() => {
        router.push('/production/submit')
      }, 500)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      showToast('error', errorMessage, 'Submission Failed')
      setSubmitting(false)
    }
  }

  if (!productConfig || !productionInputs || !marketIntelligence) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Loading preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products/select' },
            { label: 'Configure', href: '/products/configure' },
            { label: 'Production Input', href: '/production/input' },
            { label: 'Preview' }
          ]}
          className="mb-8"
        />

        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Review & Submit
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Review all details before submitting your product to the marketplace
          </p>
        </div>

        {error && (
          <Alert variant="error" message={error} className="mb-6" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Configuration Summary */}
            <Card className="p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Configuration</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Industry</span>
                    <p className="font-medium text-gray-900">{productConfig.industry}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Product</span>
                    <p className="font-medium text-gray-900">{productConfig.product}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tier</span>
                    <p className="font-medium text-gray-900 capitalize">{productConfig.tier}</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <span className="text-xs text-gray-500 uppercase tracking-wide block mb-4">Product Specifications</span>
                  <div className="space-y-3">
                    {Object.entries(productConfig.formData || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-600 capitalize font-light">{key.replace(/_/g, ' ')}</span>
                        <span className="font-medium text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Production Inputs Summary */}
            <Card className="p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Production Details</h2>
              <div className="grid grid-cols-2 gap-5">
                {Object.entries(productionInputs).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <p className="font-medium text-gray-900">{String(value)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Market Intelligence Sidebar */}
          <div className="lg:col-span-1">
            <MarketIntelligencePanel intelligence={marketIntelligence} />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={submitting}
            className="px-6"
          >
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-slate-900 hover:bg-slate-800"
          >
            {submitting ? 'Submitting...' : 'Submit to Marketplace'}
            {!submitting && (
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
