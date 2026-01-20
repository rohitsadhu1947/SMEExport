import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for submissions (POC)
let submissions: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const submissionId = `submission-${Date.now()}`
    
    const submission = {
      submission_id: submissionId,
      artisan_id: body.artisan_id,
      product_data: body.product_data,
      production_inputs: body.production_inputs,
      market_intelligence: body.market_intelligence,
      pricing: body.pricing,
      schemes_applied: body.schemes_applied,
      status: 'submitted',
      created_at: new Date().toISOString(),
    }
    
    submissions.push(submission)
    
    return NextResponse.json({
      success: true,
      submission_id: submissionId,
      message: 'Market-ready Product Submitted',
      submission
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to submit product' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ submissions })
}
