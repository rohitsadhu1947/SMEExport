export type UserType = "individual" | "company"
export type Industry = "Leather" | "Carpets"
export type SkillLevel = "high" | "medium" | "low"
export type OnboardingStatus = "pending" | "verified"

export interface Registration {
  udyam_registered: boolean
  registration_number?: string
  tax_registered: boolean
  tax_id?: string
  gst_registered?: boolean
  gst_id?: string
}

export interface Banking {
  account_number?: string
  bank_name?: string
  ifsc?: string
  verified: boolean
}

export interface Contact {
  email: string
  mobile: string
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
}

export interface Phase1Scheme {
  scheme_key: string
  scheme_name: string
  applicable: boolean
  benefit: string
  phase: 1
}

export interface ArtisanProfile {
  artisan_id: string
  type: UserType
  legal_name: string
  registration: Registration
  banking: Banking
  contact: Contact
  industry: Industry
  skill_level: SkillLevel
  onboarding_status: OnboardingStatus
  phase1_schemes: Phase1Scheme[]
  created_at?: string
  updated_at?: string
}
