import { NextRequest, NextResponse } from 'next/server'
import marketIntelligenceData from '@/data/market-intelligence.json'
import { Industry } from '@/types/artisan'
import { Market } from '@/types/market'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const industry = searchParams.get('industry') as Industry
    const market = searchParams.get('market') as Market
    const product = searchParams.get('product')

    if (!industry || !marketIntelligenceData[industry as keyof typeof marketIntelligenceData]) {
      return NextResponse.json(
        { error: 'Invalid industry parameter' },
        { status: 400 }
      )
    }

    const industryData = marketIntelligenceData[industry as keyof typeof marketIntelligenceData]
    
    // Determine product name
    let productName = product
    if (!productName) {
      // Default product names based on industry
      if (industry === 'Leather') {
        productName = 'Leather Shoes'
      } else if (industry === 'Carpets') {
        productName = 'Bhadohi Carpets'
      }
    }
    
    // If market is specified, return market-specific intelligence
    if (market && industryData[market as keyof typeof industryData]) {
      const marketData = industryData[market as keyof typeof industryData]
      const eligibleMarkets = Object.keys(industryData) as Market[]
      
      return NextResponse.json({
        success: true,
        intelligence: {
          industry,
          product: productName,
          market,
          eligible_markets: eligibleMarkets,
          ...marketData
        }
      })
    }

    // Return all markets data
    const eligibleMarkets = Object.keys(industryData) as Market[]
    const defaultMarket = eligibleMarkets[0] || 'Domestic'
    const defaultData = industryData[defaultMarket as keyof typeof industryData]

    return NextResponse.json({
      success: true,
      intelligence: {
        industry,
        product: productName,
        market: defaultMarket,
        eligible_markets: eligibleMarkets,
        ...defaultData
      },
      allMarkets: industryData
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market intelligence' },
      { status: 500 }
    )
  }
}
