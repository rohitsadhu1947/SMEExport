export type DemandIndex = "high" | "medium" | "low"
export type Trend = "rising" | "stable" | "declining"
export type Market = "USA" | "EU" | "Domestic" | "Middle East"

export interface MarketIntelligence {
  industry: "Leather" | "Bhadohi Carpets"
  product: string
  market: Market
  demand_index: DemandIndex
  trend: Trend
  eligible_markets: Market[]
  price_tier: "premium" | "standard"
  base_price?: number
  suggested_price?: number
  phase2_schemes: Phase2Scheme[]
  trend_data?: {
    month: string
    value: number
  }[]
}

export interface MarketIntelligenceByMarket {
  [market: string]: {
    demand_index: DemandIndex
    trend: Trend
    price_tier: "premium" | "standard"
    base_price: number
    suggested_price: number
    trend_data: {
      month: string
      value: number
    }[]
    phase2_schemes: Phase2Scheme[]
  }
}

export interface Phase2Scheme {
  scheme_key: string
  scheme_name: string
  applicable: boolean
  benefit: string
  phase: 2
  pricing_adjustment?: number
}
