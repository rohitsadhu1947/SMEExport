import { NextRequest, NextResponse } from 'next/server'
import mockArtisansData from '@/data/mock-artisans.json'

// In-memory storage (for POC)
let artisans = [...mockArtisansData.artisans]

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const artisan = artisans.find(a => a.artisan_id === id)
    
    if (!artisan) {
      return NextResponse.json(
        { error: 'Artisan not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ artisan })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch artisan' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const index = artisans.findIndex(a => a.artisan_id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Artisan not found' },
        { status: 404 }
      )
    }
    
    artisans[index] = {
      ...artisans[index],
      ...body,
      updated_at: new Date().toISOString()
    }
    
    return NextResponse.json({ artisan: artisans[index] })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update artisan' },
      { status: 500 }
    )
  }
}
