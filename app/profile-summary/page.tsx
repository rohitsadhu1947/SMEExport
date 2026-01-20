'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useToast } from '@/components/ui/Toast'
import { ArtisanProfile, Phase1Scheme } from '@/types/artisan'

export default function ProfileSummaryPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [artisan, setArtisan] = useState<ArtisanProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [registrationData, setRegistrationData] = useState<any>({})
  const [complianceData, setComplianceData] = useState<any>({})
  const [bankingData, setBankingData] = useState<any>({})
  const [industry, setIndustry] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    if (typeof window !== 'undefined') {
      const regData = sessionStorage.getItem('registrationData')
      const compData = sessionStorage.getItem('complianceData')
      const bankData = sessionStorage.getItem('bankingData')
      const ind = sessionStorage.getItem('selectedIndustry') || ''

      if (!regData || !compData || !bankData) {
        router.push('/welcome')
        return
      }

      setRegistrationData(JSON.parse(regData))
      setComplianceData(JSON.parse(compData))
      setBankingData(JSON.parse(bankData))
      setIndustry(ind)
    }
  }, [router])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      if (typeof window === 'undefined') {
        throw new Error('Cannot submit on server')
      }

      // Determine skill level based on registrations
      let skillLevel: 'high' | 'medium' | 'low' = 'medium'
      if (complianceData.udyam_registered && complianceData.tax_registered && complianceData.gst_registered) {
        skillLevel = 'high'
      } else if (!complianceData.udyam_registered && !complianceData.tax_registered) {
        skillLevel = 'low'
      }

      const payload = {
        type: registrationData.type,
        legal_name: registrationData.legal_name,
        contact: {
          email: registrationData.email,
          mobile: registrationData.mobile,
          address: registrationData.address,
        },
        registration: complianceData,
        banking: bankingData,
        industry,
        skill_level: skillLevel,
      }

      const response = await fetch('/api/onboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create profile')
      }

      const data = await response.json()
      setArtisan(data.artisan)
      
      // Store artisan ID for future use
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('artisanId', data.artisan_id)
        
        // Clear form data
        sessionStorage.removeItem('registrationData')
        sessionStorage.removeItem('complianceData')
        sessionStorage.removeItem('bankingData')
      }
      
      showToast('success', 'Profile created successfully!', 'Success')
      
      // Show success and redirect
      setTimeout(() => {
        router.push('/products/select')
      }, 2000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      showToast('error', errorMessage, 'Failed to Create Profile')
      setLoading(false)
    }
  }

  const steps = [
    { id: 'welcome', label: 'Welcome', completed: true },
    { id: 'register', label: 'Registration', completed: true },
    { id: 'compliance', label: 'Compliance', completed: true },
    { id: 'banking', label: 'Banking', completed: true },
    { id: 'profile', label: 'Profile', current: true },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Welcome', href: '/welcome' },
            { label: 'Registration', href: '/register' },
            { label: 'Compliance', href: '/compliance' },
            { label: 'Banking', href: '/banking' },
            { label: 'Profile Summary' }
          ]}
          className="mb-8"
        />

        <ProgressIndicator steps={steps} className="mb-10" />

        {error && (
          <Alert variant="error" message={error} className="mb-6" />
        )}

        {artisan && (
          <Alert
            variant="success"
            message="Profile created successfully! Redirecting to product selection..."
            className="mb-6"
          />
        )}

        {!mounted ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-700 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500 font-medium">Loading profile...</p>
          </div>
        ) : (
        <Card className="border border-gray-100 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Profile Summary
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Review your information before submitting
            </p>
          </div>

          <div className="space-y-8">
            {/* Registration Info */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Registration Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Type</span>
                  <span className="font-medium text-gray-900 capitalize">{registrationData.type}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Legal Name</span>
                  <span className="font-medium text-gray-900">{registrationData.legal_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</span>
                  <span className="font-medium text-gray-900">{registrationData.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Mobile</span>
                  <span className="font-medium text-gray-900">{registrationData.mobile}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Industry</span>
                  <span className="font-medium text-gray-900">{industry}</span>
                </div>
              </div>
            </div>

            {/* Compliance Info */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Compliance Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">UDYAM Registration</span>
                  <div className="flex items-center gap-2">
                    {complianceData.udyam_registered && complianceData.registration_number && (
                      <span className="text-xs text-gray-500 font-mono">{complianceData.registration_number}</span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complianceData.udyam_registered 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                      {complianceData.udyam_registered ? 'Registered' : 'Not Registered'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">Tax Registration</span>
                  <div className="flex items-center gap-2">
                    {complianceData.tax_registered && complianceData.tax_id && (
                      <span className="text-xs text-gray-500 font-mono">{complianceData.tax_id}</span>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      complianceData.tax_registered 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}>
                      {complianceData.tax_registered ? 'Registered' : 'Not Registered'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">GST Registration</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    complianceData.gst_registered 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-gray-50 text-gray-500 border border-gray-200'
                  }`}>
                    {complianceData.gst_registered ? 'Registered' : 'Not Registered'}
                  </span>
                </div>
              </div>
            </div>

            {/* Banking Info */}
            <div className="border-b border-gray-100 pb-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Banking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank</span>
                  <span className="font-medium text-gray-900">{bankingData.bank_name}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Number</span>
                  <span className="font-medium text-gray-900 font-mono">****{bankingData.account_number?.slice(-4)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">IFSC</span>
                  <span className="font-medium text-gray-900 font-mono">{bankingData.ifsc}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                    bankingData.verified 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  }`}>
                    {bankingData.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Phase 1 Schemes Preview */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Applicable Schemes (Phase 1)</h3>
              <div className="space-y-3">
                {complianceData.udyam_registered && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900 mb-1">MSME Subsidy</p>
                        <p className="text-sm text-blue-700 font-light">Tax rebates & low-interest credit</p>
                      </div>
                      <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold ml-4">Applicable</span>
                    </div>
                  </div>
                )}
                {complianceData.udyam_registered && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900 mb-1">UDYAM Registration Benefits</p>
                        <p className="text-sm text-blue-700 font-light">Priority lending & government tenders</p>
                      </div>
                      <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold ml-4">Applicable</span>
                    </div>
                  </div>
                )}
                {!complianceData.udyam_registered && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-600 font-light">No Phase 1 schemes applicable. Register for UDYAM to unlock benefits.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-100 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
                className="px-6"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading || !!artisan}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                {loading ? 'Creating Profile...' : artisan ? 'Profile Created!' : 'Complete Onboarding'}
                {!loading && !artisan && (
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </Card>
        )}
      </div>
    </div>
  )
}
