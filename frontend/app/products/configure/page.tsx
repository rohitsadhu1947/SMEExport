'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { DynamicProductForm } from '@/components/forms/DynamicProductForm'
import { MarketIntelligencePanel } from '@/components/intelligence/MarketIntelligencePanel'
import { Product, ProductTier } from '@/types/product'
import { MarketIntelligence, Market } from '@/types/market'
import { Industry } from '@/types/artisan'

function ProductConfigureContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry') as Industry
  const productName = searchParams.get('product') || (typeof window !== 'undefined' ? sessionStorage.getItem('selectedProduct') : null)

  const [product, setProduct] = useState<Product | null>(null)
  const [intelligence, setIntelligence] = useState<MarketIntelligence | null>(null)
  const [currentTier, setCurrentTier] = useState<ProductTier>('standard')
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)

  useEffect(() => {
    const artisanId = typeof window !== 'undefined' ? sessionStorage.getItem('artisanId') : null
    if (!artisanId || !industry) {
      router.push('/products/select')
      return
    }

    // Fetch product configuration
    const productUrl = productName 
      ? `/api/products/${encodeURIComponent(industry)}?product=${encodeURIComponent(productName)}`
      : `/api/products/${encodeURIComponent(industry)}`
    
    fetch(productUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProduct(data.product)
        }
      })

    // Fetch market intelligence
    const intelligenceUrl = productName
      ? `/api/product-intelligence?industry=${encodeURIComponent(industry)}&product=${encodeURIComponent(productName)}`
      : `/api/product-intelligence?industry=${encodeURIComponent(industry)}`
    
    fetch(intelligenceUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIntelligence(data.intelligence)
          setCurrentTier(data.intelligence.price_tier)
          setSelectedMarket(data.intelligence.market)
        }
      })
      .finally(() => setLoading(false))
  }, [industry, productName, router])

  const handleMarketChange = async (market: Market) => {
    if (!industry || !productName) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/product-intelligence?industry=${encodeURIComponent(industry)}&product=${encodeURIComponent(productName)}&market=${encodeURIComponent(market)}`)
      const data = await response.json()
      if (data.success) {
        setIntelligence(data.intelligence)
        setCurrentTier(data.intelligence.price_tier)
        setSelectedMarket(market)
      }
    } catch (error) {
      console.error('Failed to fetch market intelligence:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data)
    // Store product configuration
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('productConfiguration', JSON.stringify({
        industry,
        product: product?.name,
        tier: currentTier,
        formData: data
      }))
      sessionStorage.setItem('marketIntelligence', JSON.stringify(intelligence))
    }
    
    router.push('/production/input')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Loading configuration...</p>
        </div>
      </div>
    )
  }

  if (!product || !intelligence) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-12 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Product Not Found</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Unable to load product configuration.</p>
          <Button onClick={() => router.push('/products/select')} className="w-full">
            Back to Product Selection
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products/select' },
            { label: 'Configure Product' }
          ]}
          className="mb-8"
        />

        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
                Configure {product.name}
              </h1>
              <p className="text-lg text-gray-600 font-light">
                Define your product specifications and view market intelligence
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(`/products/${encodeURIComponent(industry)}/insights`)}
              className="flex items-center gap-2 px-4 w-full md:w-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Insights
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Configuration Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 border border-gray-100 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-1">Product Details</h2>
                    <p className="text-sm text-gray-500">Configure your product specifications</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Tier</span>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      currentTier === 'premium' 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-gray-50 text-gray-700 border border-gray-200'
                    }`}>
                      {currentTier.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <DynamicProductForm
                fields={product.fields}
                currentTier={currentTier}
                onSubmit={handleFormSubmit}
                defaultValues={formData}
              >
                <div className="mt-8 pt-6 border-t border-gray-100 flex gap-4">
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
                    className="flex-1 bg-slate-900 hover:bg-slate-800"
                  >
                    Continue to Production Input
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </DynamicProductForm>
            </Card>
          </div>

          {/* Market Intelligence Panel */}
          <div className="lg:col-span-1">
            {intelligence && (
              <MarketIntelligencePanel 
                intelligence={intelligence} 
                onMarketChange={handleMarketChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Loading configuration...</p>
        </div>
      </div>
    }>
      <ProductConfigureContent />
    </Suspense>
  )
}
