import { NextRequest, NextResponse } from 'next/server'
import productInsightsData from '@/data/product-insights.json'
import { Industry } from '@/types/artisan'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ industry: string }> }
) {
  try {
    const resolvedParams = await params
    let industry = decodeURIComponent(resolvedParams.industry) as Industry
    const searchParams = request.nextUrl.searchParams
    const productName = searchParams.get('product')

    // Handle URL encoding issues
    industry = industry.replace(/%20/g, ' ').trim() as Industry

    // Map industry to data key
    let dataKey: string = industry
    if (industry === 'Carpets') {
      dataKey = 'Carpets' // Updated to match new structure
    }

    // If product name is provided, try to find product-specific insights
    if (productName) {
      const decodedProduct = decodeURIComponent(productName).replace(/%20/g, ' ').trim()
      // For now, use industry-level insights (can be extended later)
      if (productInsightsData[dataKey as keyof typeof productInsightsData]) {
        const insights = productInsightsData[dataKey as keyof typeof productInsightsData]
        return NextResponse.json({
          success: true,
          insights
        })
      }
    }

    // Default: return industry-level insights
    if (!industry || !productInsightsData[dataKey as keyof typeof productInsightsData]) {
      return NextResponse.json(
        { error: `Invalid industry parameter: ${industry}` },
        { status: 400 }
      )
    }

    const insights = productInsightsData[dataKey as keyof typeof productInsightsData]

    return NextResponse.json({
      success: true,
      insights
    })
  } catch (error) {
    console.error('API: Error fetching insights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product insights' },
      { status: 500 }
    )
  }
}
