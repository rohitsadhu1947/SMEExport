export interface Scheme {
  scheme_key: string
  scheme_name: string
  applicable: boolean
  benefit: string
  phase: 1 | 2
  pricing_adjustment?: number
}

export type Phase1Scheme = Scheme & { phase: 1 }
export type Phase2Scheme = Scheme & { phase: 2 }
