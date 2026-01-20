'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Dropdown } from '@/components/ui/Dropdown'
import { ProductInsights, RawMaterial, Market, MarketRequirement } from '@/types/product-insights'
import { Industry } from '@/types/artisan'

// Force dynamic rendering to prevent static prerendering issues with useParams and API calls
export const dynamic = 'force-dynamic'

export default function ProductInsightsPage() {
  const router = useRouter()
  const params = useParams()
  const industry = params.industry as Industry
  const [insights, setInsights] = useState<ProductInsights | null>(null)
  const [selectedMarket, setSelectedMarket] = useState<Market>('USA')
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setIsVisible(true)
    
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.01,
      rootMargin: '0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
          // Unobserve after animation is triggered to improve performance
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-animate')
      elements.forEach((el) => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isInViewport) {
          // Immediately show elements already in viewport
          el.classList.add('animate-fade-in')
        } else {
          // Observe elements not yet in viewport
          observer.observe(el)
        }
      })
    }, 100)

    return () => {
      const elements = document.querySelectorAll('.scroll-animate')
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [insights]) // Re-run when insights data changes

  useEffect(() => {
    if (!industry) {
      router.push('/products/select')
      return
    }

    const fetchInsights = async () => {
      try {
        setLoading(true)
        // Decode the industry parameter in case it's URL encoded
        const decodedIndustry = decodeURIComponent(industry)
        const encodedIndustry = encodeURIComponent(decodedIndustry)
        
        // Get product name from URL params or sessionStorage
        const urlParams = new URLSearchParams(window.location.search)
        const productName = urlParams.get('product') || sessionStorage.getItem('selectedProduct')
        
        let apiUrl = `/api/product-insights/${encodedIndustry}`
        if (productName) {
          apiUrl += `?product=${encodeURIComponent(productName)}`
        }
        
        console.log('Fetching insights for industry:', decodedIndustry, 'product:', productName)
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Insights data received:', data)
        
        if (data.success && data.insights) {
          console.log('Setting insights:', data.insights)
          setInsights(data.insights)
        } else {
          console.error('Failed to load insights:', data.error || 'Unknown error')
        }
      } catch (error) {
        console.error('Error fetching insights:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [industry, router])

  const getMarketColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low':
        return 'text-gray-600 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'declining':
        return (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        )
    }
  }

  const getPriceImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low':
        return 'text-gray-600 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Loading insights...</p>
        </div>
      </div>
    )
  }

  if (!insights) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-12 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Insights Not Available</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Unable to load product insights for {industry || 'this product'}.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()} className="flex-1">
              Back
            </Button>
            <Button onClick={() => router.push('/products/select')} className="flex-1">
              Select Product
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const decodedIndustry = industry ? decodeURIComponent(industry).replace(/%20/g, ' ').trim() : ''
  const urlParamsForName = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const selectedProductForName = urlParamsForName?.get('product') || (typeof window !== 'undefined' ? sessionStorage.getItem('selectedProduct') : null)
  const productName = selectedProductForName || (decodedIndustry === 'Leather' ? 'Leather Shoes' : decodedIndustry === 'Carpets' ? 'Bhadohi Carpets' : 'Product')
  const availableMarkets: Market[] = ['USA', 'EU', 'Domestic', 'Middle East']
  const marketOptions = availableMarkets.map(market => ({
    value: market,
    label: market
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products/select' },
            { label: productName, href: `/products/configure?industry=${encodeURIComponent(industry)}` },
            { label: 'Product Insights' }
          ]}
          className="mb-8"
        />

        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
                Product Insights
              </h1>
              <p className="text-xl text-gray-600 font-light max-w-3xl">
                Detailed requirements and market-specific insights for {productName}
              </p>
            </div>
            <div className="hidden md:block">
              <Dropdown
                options={marketOptions}
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value as Market)}
                className="w-48"
                placeholder="Select Market"
              />
            </div>
          </div>
          <div className="md:hidden mb-6">
            <Dropdown
              options={marketOptions}
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value as Market)}
              className="w-full"
              placeholder="Select Market"
            />
          </div>
        </div>

        {/* Raw Materials Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Raw Materials & Components
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Market-specific requirements and pricing impact analysis
            </p>
          </div>

          <div className="space-y-6">
            {insights && insights.raw_materials && insights.raw_materials.length > 0 ? (
              insights.raw_materials.map((material, materialIndex) => (
              <div
                key={material.id}
                className="scroll-animate"
                style={{ animationDelay: `${materialIndex * 100}ms` }}
              >
              <Card className="p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2 block">
                        {material.category}
                      </span>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                        {material.name}
                      </h3>
                      <p className="text-gray-600 font-light">
                        {material.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {material.options && material.options.length > 0 ? (
                    material.options
                      .filter(option => {
                        const marketData = option.market_requirements?.[selectedMarket]
                        return !!marketData
                      })
                      .map((option, optionIndex) => {
                        const marketData = option.market_requirements[selectedMarket]!
                        return (
                          <div
                            key={option.value}
                            className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg scroll-animate ${
                              marketData.preferred
                                ? 'border-amber-200 bg-amber-50/50'
                                : 'border-gray-100 bg-white'
                            }`}
                            style={{ animationDelay: `${(materialIndex * 100) + (optionIndex * 50)}ms` }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                                  {option.label}
                                </h4>
                                <p className="text-sm text-gray-600 font-light mb-3">
                                  {option.description}
                                </p>
                              </div>
                              {marketData.preferred && (
                                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full flex-shrink-0 ml-3">
                                  Recommended
                                </span>
                              )}
                            </div>

                            {/* Market Requirements */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Demand</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMarketColor(marketData.demand)}`}>
                                  {marketData.demand.toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Trend</span>
                                <div className="flex items-center gap-2">
                                  {getTrendIcon(marketData.trend)}
                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                                    marketData.trend === 'rising' ? 'bg-green-50 text-green-700 border-green-200' :
                                    marketData.trend === 'declining' ? 'bg-red-50 text-red-700 border-red-200' :
                                    'bg-gray-50 text-gray-700 border-gray-200'
                                  }`}>
                                    {marketData.trend.charAt(0).toUpperCase() + marketData.trend.slice(1)}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Price Impact</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriceImpactColor(option.price_impact)}`}>
                                  {option.price_impact.toUpperCase()}
                                </span>
                              </div>

                              <div className="flex items-center justify-between py-2">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Price Multiplier</span>
                                <span className="text-lg font-semibold text-gray-900">
                                  {marketData.price_multiplier > 1 ? '+' : ''}
                                  {((marketData.price_multiplier - 1) * 100).toFixed(0)}%
                                </span>
                              </div>
                            </div>

                            {/* Recommendation */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <p className="text-sm text-gray-700 font-light leading-relaxed">
                                  {marketData.recommendation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                  ) : (
                    <div className="col-span-2 p-6 text-center text-gray-500">
                      No options available for {selectedMarket} market
                    </div>
                  )}
                </div>
              </Card>
              </div>
              ))
            ) : (
              <Card className="p-8 border border-gray-100">
                <p className="text-gray-600 text-center">No raw materials data available.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Production Requirements */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Production Requirements
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Essential requirements for production and compliance
            </p>
          </div>

          <Card className="p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-3">
                  Order Requirements
                </span>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Minimum Order Quantity</span>
                    <span className="font-semibold text-gray-900">{insights.production_requirements.minimum_order_quantity} units</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Lead Time</span>
                    <span className="font-semibold text-gray-900">{insights.production_requirements.lead_time_days} days</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-3">
                  Certifications & Standards
                </span>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Certifications Required</span>
                    <div className="flex flex-wrap gap-2">
                      {insights.production_requirements.certifications_required.map((cert, index) => (
                        <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Quality Standards</span>
                    <div className="flex flex-wrap gap-2">
                      {insights.production_requirements.quality_standards.map((standard, index) => (
                        <span key={index} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="px-6 w-full sm:w-auto"
          >
            Back
          </Button>
          <Button
            onClick={() => router.push(`/products/configure?industry=${encodeURIComponent(industry)}`)}
            className="flex-1 bg-slate-900 hover:bg-slate-800"
          >
            Configure Product
            <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
