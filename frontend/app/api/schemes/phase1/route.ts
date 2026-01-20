import { NextResponse } from 'next/server'
import schemesData from '@/data/schemes.json'

export async function GET() {
  return NextResponse.json({
    schemes: schemesData.phase1
  })
}
