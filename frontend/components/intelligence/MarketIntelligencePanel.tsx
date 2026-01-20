'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Dropdown } from '@/components/ui/Dropdown'
import { MarketIntelligence, DemandIndex, Trend, Market } from '@/types/market'
import { Phase2Scheme } from '@/types/scheme'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MarketIntelligencePanelProps {
  intelligence: MarketIntelligence
  onMarketChange?: (market: Market) => void
}

const getDemandColor = (demand: DemandIndex) => {
  switch (demand) {
    case 'high':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'low':
      return 'text-red-600 bg-red-50 border-red-200'
  }
}

const getTrendColor = (trend: Trend) => {
  switch (trend) {
    case 'rising':
      return 'text-green-600'
    case 'stable':
      return 'text-gray-600'
    case 'declining':
      return 'text-red-600'
  }
}

export const MarketIntelligencePanel: React.FC<MarketIntelligencePanelProps> = ({
  intelligence,
  onMarketChange
}) => {
  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const market = e.target.value as Market
    onMarketChange?.(market)
  }

  const marketOptions = intelligence.eligible_markets.map(market => ({
    value: market,
    label: market
  }))

  return (
    <Card className="p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Market Intelligence</h3>
        {intelligence.eligible_markets.length > 1 && (
          <Dropdown
            options={marketOptions}
            value={intelligence.market}
            onChange={handleMarketChange}
            className="w-40 text-sm"
            placeholder="Select Market"
          />
        )}
      </div>
      
      <div className="mb-4 pb-4 border-b border-gray-100">
        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Selected Market</span>
        <p className="text-lg font-semibold text-gray-900 mt-1">{intelligence.market}</p>
      </div>
      
      <div className="space-y-8">
        {/* Demand Index */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Demand Index</span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border tracking-wide ${getDemandColor(intelligence.demand_index)}`}>
              {intelligence.demand_index.toUpperCase()}
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                intelligence.demand_index === 'high' ? 'bg-green-500' :
                intelligence.demand_index === 'medium' ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{
                width: intelligence.demand_index === 'high' ? '85%' :
                       intelligence.demand_index === 'medium' ? '55%' : '30%'
              }}
            />
          </div>
        </div>

        {/* Trend Analysis */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Trend Analysis</span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              intelligence.trend === 'rising' ? 'bg-green-50 text-green-700 border border-green-200' :
              intelligence.trend === 'declining' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {intelligence.trend.charAt(0).toUpperCase() + intelligence.trend.slice(1)}
            </span>
          </div>
          {intelligence.trend_data && intelligence.trend_data.length > 0 && (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={intelligence.trend_data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={intelligence.trend === 'rising' ? '#10b981' : intelligence.trend === 'declining' ? '#ef4444' : '#6b7280'}
                  strokeWidth={2}
                  dot={{ fill: intelligence.trend === 'rising' ? '#10b981' : intelligence.trend === 'declining' ? '#ef4444' : '#6b7280', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Eligible Markets */}
        <div>
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-3">Eligible Markets</span>
          <div className="flex flex-wrap gap-2">
            {intelligence.eligible_markets.map((market, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-full text-xs font-medium border border-slate-200"
              >
                {market}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing Tier */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Pricing Tier</span>
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
              intelligence.price_tier === 'premium' 
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-gray-50 text-gray-700 border border-gray-200'
            }`}>
              {intelligence.price_tier.toUpperCase()}
            </span>
          </div>
          {intelligence.base_price && intelligence.suggested_price && (
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Base Price</span>
                <span className="font-medium text-gray-900">₹{intelligence.base_price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Suggested Price</span>
                <span className="font-semibold text-slate-900 text-lg">₹{intelligence.suggested_price.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Phase 2 Schemes */}
        {intelligence.phase2_schemes && intelligence.phase2_schemes.length > 0 && (
          <div className="border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium block mb-4">Applicable Schemes</span>
            <div className="space-y-3">
              {intelligence.phase2_schemes
                .filter((scheme: Phase2Scheme) => scheme.applicable)
                .map((scheme: Phase2Scheme, index: number) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900 text-sm mb-1">{scheme.scheme_name}</p>
                        <p className="text-xs text-blue-700 font-light">{scheme.benefit}</p>
                      </div>
                      {scheme.pricing_adjustment && (
                        <span className="bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold ml-3 flex-shrink-0">
                          +{scheme.pricing_adjustment}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
