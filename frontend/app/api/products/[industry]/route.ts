import { NextRequest, NextResponse } from 'next/server'
import productsData from '@/data/products.json'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ industry: string }> }
) {
  try {
    const { industry } = await params
    const searchParams = request.nextUrl.searchParams
    const productName = searchParams.get('product')
    
    // If product name is provided, return that specific product
    if (productName) {
      const product = productsData[productName as keyof typeof productsData]
      if (product) {
        return NextResponse.json({
          success: true,
          product
        })
      }
    }
    
    // Otherwise, try to find first product for the industry
    const product = Object.values(productsData).find(p => p.industry === industry)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found for this industry' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product configuration' },
      { status: 500 }
    )
  }
}
