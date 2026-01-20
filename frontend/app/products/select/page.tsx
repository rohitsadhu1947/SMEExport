'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Industry } from '@/types/artisan'

export default function ProductSelectPage() {
  const router = useRouter()
  const [industry, setIndustry] = useState<Industry | null>(null)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    const artisanId = sessionStorage.getItem('artisanId')
    const storedIndustry = sessionStorage.getItem('selectedIndustry') as Industry
    
    if (!artisanId) {
      router.push('/welcome')
      return
    }
    
    if (storedIndustry) {
      setIndustry(storedIndustry)
    }
    
    setLoading(false)
  }, [router])

  const allProducts = [
    {
      id: 'leather-shoes',
      name: 'Leather Shoes',
      productKey: 'Leather Shoes',
      industry: 'Leather' as Industry,
      description: 'Premium quality leather footwear crafted for global markets. Handcrafted excellence meets modern design.',
      tagline: 'Crafted for Excellence',
      icon: '👞',
      gradient: 'from-amber-50 via-white to-amber-50',
      accentColor: 'amber',
      features: ['Premium Materials', 'Global Standards', 'Customizable']
    },
    {
      id: 'leather-bags',
      name: 'Leather Bags',
      productKey: 'Leather Bags',
      industry: 'Leather' as Industry,
      description: 'Elegant leather bags combining functionality with timeless style. Perfect for professional and casual use.',
      tagline: 'Style Meets Function',
      icon: '👜',
      gradient: 'from-amber-50 via-white to-amber-50',
      accentColor: 'amber',
      features: ['Durable Construction', 'Premium Finishing', 'Multiple Styles']
    },
    {
      id: 'leather-belts',
      name: 'Leather Belts',
      productKey: 'Leather Belts',
      industry: 'Leather' as Industry,
      description: 'Classic leather belts with modern designs. Essential accessories for every wardrobe.',
      tagline: 'Timeless Elegance',
      icon: '👔',
      gradient: 'from-amber-50 via-white to-amber-50',
      accentColor: 'amber',
      features: ['Quality Hardware', 'Various Widths', 'Custom Buckles']
    },
    {
      id: 'bhadohi-carpets',
      name: 'Bhadohi Carpets',
      productKey: 'Bhadohi Carpets',
      industry: 'Carpets' as Industry,
      description: 'Traditional handcrafted carpets with contemporary designs. Heritage meets innovation.',
      tagline: 'Heritage Craftsmanship',
      icon: '🧶',
      gradient: 'from-blue-50 via-white to-blue-50',
      accentColor: 'blue',
      features: ['Hand-knotted', 'Traditional Patterns', 'Export Ready']
    },
    {
      id: 'persian-carpets',
      name: 'Persian Carpets',
      productKey: 'Persian Carpets',
      industry: 'Carpets' as Industry,
      description: 'Luxurious Persian-style carpets with intricate patterns. Premium quality for discerning customers.',
      tagline: 'Artisan Excellence',
      icon: '🎨',
      gradient: 'from-blue-50 via-white to-blue-50',
      accentColor: 'blue',
      features: ['Intricate Designs', 'Premium Materials', 'Luxury Market']
    },
    {
      id: 'modern-carpets',
      name: 'Modern Carpets',
      productKey: 'Modern Carpets',
      industry: 'Carpets' as Industry,
      description: 'Contemporary carpet designs for modern interiors. Combining traditional craftsmanship with modern aesthetics.',
      tagline: 'Contemporary Style',
      icon: '🏠',
      gradient: 'from-blue-50 via-white to-blue-50',
      accentColor: 'blue',
      features: ['Modern Designs', 'Versatile Styles', 'Wide Appeal']
    }
  ]

  // Filter products based on selected industry
  const products = allProducts.filter(product => product.industry === industry)

  const handleSelectProduct = (productKey: string, productIndustry: Industry) => {
    sessionStorage.setItem('selectedProduct', productKey)
    sessionStorage.setItem('selectedProductIndustry', productIndustry)
    router.push(`/products/configure?industry=${encodeURIComponent(productIndustry)}&product=${encodeURIComponent(productKey)}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Select Product' }
          ]}
          className="mb-8"
        />

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Choose Your Product
          </h1>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            {industry 
              ? `Select a product category for ${industry} to begin configuration`
              : 'Select a product category to begin configuration'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`
                  h-full border-2 transition-all duration-500 ease-out
                  ${hoveredCard === product.id 
                    ? 'border-slate-300 shadow-2xl scale-[1.02]' 
                    : 'border-gray-100 shadow-sm hover:shadow-xl'
                  }
                  bg-gradient-to-br ${product.gradient}
                  overflow-hidden
                `}
              >
                <div className="p-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`
                      w-20 h-20 rounded-2xl flex items-center justify-center text-5xl
                      bg-white shadow-lg transition-transform duration-500
                      ${hoveredCard === product.id ? 'scale-110 rotate-3' : ''}
                    `}>
                      {product.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        {product.tagline}
                      </p>
                      <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="pt-4 border-t border-gray-200">
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg 
                              className="w-4 h-4 text-slate-700 mr-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="pt-6 space-y-3" onClick={(e) => e.stopPropagation()}>
                      <Button
                        onClick={() => handleSelectProduct(product.productKey, product.industry)}
                        className={`
                          w-full transition-all duration-300
                          ${hoveredCard === product.id 
                            ? 'bg-slate-900 text-white shadow-lg' 
                            : 'bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white'
                          }
                        `}
                      >
                        Configure Product
                        <svg 
                          className="w-4 h-4 ml-2 inline-block transition-transform duration-300"
                          style={{ transform: hoveredCard === product.id ? 'translateX(4px)' : 'translateX(0)' }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/products/${encodeURIComponent(product.industry)}/insights?product=${encodeURIComponent(product.productKey)}`)
                        }}
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View Insights
                        <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`
                  absolute top-0 right-0 w-64 h-64 rounded-full opacity-[0.03]
                  bg-slate-900 transition-all duration-700 ease-out
                  ${hoveredCard === product.id ? 'scale-150 opacity-[0.05]' : 'scale-75 opacity-[0.02]'}
                  -translate-y-1/2 translate-x-1/2
                `} />
              </Card>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need help choosing? <a href="#" className="text-slate-700 hover:text-slate-900 font-medium underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  )
}
