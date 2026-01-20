export type Market = "USA" | "EU" | "Domestic" | "Middle East"
export type PriceImpact = "high" | "medium" | "low"
export type DemandLevel = "high" | "medium" | "low"
export type TrendDirection = "rising" | "stable" | "declining"

export interface MarketRequirement {
  demand: DemandLevel
  preferred: boolean
  price_multiplier: number
  trend: TrendDirection
  recommendation: string
}

export interface RawMaterialOption {
  value: string
  label: string
  description: string
  price_impact: PriceImpact
  market_requirements: {
    [market in Market]?: MarketRequirement
  }
}

export interface RawMaterial {
  id: string
  name: string
  category: string
  description: string
  options: RawMaterialOption[]
}

export interface ProductionRequirements {
  minimum_order_quantity: number
  lead_time_days: number
  certifications_required: string[]
  quality_standards: string[]
}

export interface ProductInsights {
  raw_materials: RawMaterial[]
  production_requirements: ProductionRequirements
}
