export type ProductTier = "premium" | "standard"

export interface ProductField {
  field_id: string
  type: "text" | "number" | "dropdown" | "checkbox" | "radio" | "color"
  label: string
  options?: string[]
  placeholder?: string
  validation?: {
    mandatory?: boolean
    min?: number
    max?: number
    regex?: string
  }
  conditional?: {
    depends_on?: string
    value?: string | boolean
  }
  tier_dependent?: boolean
  visible_for_tiers?: ProductTier[]
}

export interface Product {
  product_id: string
  industry: "Leather" | "Bhadohi Carpets"
  name: string
  fields: ProductField[]
  sub_products?: SubProduct[]
}

export interface SubProduct {
  sub_product_id: string
  name: string
  tier: ProductTier
  input_fields: ProductField[]
  market_pricepoints?: number[]
  market_demand?: string[]
  phase2_schemes?: Phase2Scheme[]
}

export interface Phase2Scheme {
  scheme_key: string
  scheme_name: string
  applicable: boolean
  benefit: string
  phase: 2
  pricing_adjustment?: number
}
