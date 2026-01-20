import { NextRequest, NextResponse } from 'next/server'
import { ArtisanProfile } from '@/types/artisan'
import schemesData from '@/data/schemes.json'

// In-memory storage (for POC)
let artisans: ArtisanProfile[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate artisan ID
    const artisan_id = `artisan-${Date.now()}`
    
    // Determine applicable Phase 1 schemes based on registration status
    const phase1_schemes = schemesData.phase1.map(scheme => {
      let applicable = false
      
      if (scheme.scheme_key === 'MSME' && body.registration?.udyam_registered) {
        applicable = true
      }
      if (scheme.scheme_key === 'UDYAM' && body.registration?.udyam_registered) {
        applicable = true
      }
      
      return {
        ...scheme,
        applicable,
        phase: 1 as const
      }
    })
    
    // Create artisan profile
    const artisan: ArtisanProfile = {
      artisan_id,
      type: body.type || 'individual',
      legal_name: body.legal_name || '',
      registration: {
        udyam_registered: body.registration?.udyam_registered || false,
        registration_number: body.registration?.registration_number,
        tax_registered: body.registration?.tax_registered || false,
        tax_id: body.registration?.tax_id,
        gst_registered: body.registration?.gst_registered || false,
        gst_id: body.registration?.gst_id
      },
      banking: {
        account_number: body.banking?.account_number,
        bank_name: body.banking?.bank_name,
        ifsc: body.banking?.ifsc,
        verified: body.banking?.verified || false
      },
      contact: {
        email: body.contact?.email || '',
        mobile: body.contact?.mobile || '',
        address: body.contact?.address
      },
      industry: body.industry || 'Leather',
      skill_level: body.skill_level || 'medium',
      onboarding_status: 'pending',
      phase1_schemes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    artisans.push(artisan)
    
    return NextResponse.json({
      success: true,
      artisan_id,
      artisan,
      phase1_schemes
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to onboard artisan' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ artisans })
}
