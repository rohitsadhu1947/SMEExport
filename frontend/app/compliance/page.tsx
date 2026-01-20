'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { complianceSchema, type ComplianceFormData } from '@/lib/validation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useToast } from '@/components/ui/Toast'

type ComplianceStatus = 'verified' | 'pending' | 'not_registered'

export default function CompliancePage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [udyamStatus, setUdyamStatus] = useState<ComplianceStatus>('not_registered')
  const [taxStatus, setTaxStatus] = useState<ComplianceStatus>('not_registered')
  const [gstStatus, setGstStatus] = useState<ComplianceStatus>('not_registered')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      udyam_registered: false,
      tax_registered: false,
      gst_registered: false,
    }
  })

  const udyamRegistered = watch('udyam_registered')
  const taxRegistered = watch('tax_registered')
  const gstRegistered = watch('gst_registered')

  useEffect(() => {
    const registrationData = sessionStorage.getItem('registrationData')
    if (!registrationData) {
      router.push('/register')
    }
  }, [router])

  useEffect(() => {
    if (udyamRegistered) {
      setUdyamStatus('pending')
      // Simulate verification
      setTimeout(() => setUdyamStatus('verified'), 1000)
    } else {
      setUdyamStatus('not_registered')
    }
  }, [udyamRegistered])

  useEffect(() => {
    if (taxRegistered) {
      setTaxStatus('pending')
      setTimeout(() => setTaxStatus('verified'), 1000)
    } else {
      setTaxStatus('not_registered')
    }
  }, [taxRegistered])

  useEffect(() => {
    if (gstRegistered) {
      setGstStatus('pending')
      setTimeout(() => setGstStatus('verified'), 1000)
    } else {
      setGstStatus('not_registered')
    }
  }, [gstRegistered])

  const onSubmit = async (data: ComplianceFormData) => {
    try {
      if (typeof window === 'undefined') return
      
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData') || '{}')
      sessionStorage.setItem('complianceData', JSON.stringify(data))
      showToast('success', 'Compliance information saved', 'Success')
      router.push('/banking')
    } catch (error) {
      console.error('Compliance error:', error)
      showToast('error', 'Failed to save compliance data', 'Error')
    }
  }

  const getStatusColor = (status: ComplianceStatus) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'not_registered':
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusText = (status: ComplianceStatus) => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'pending':
        return 'Verifying...'
      case 'not_registered':
        return 'Not Registered'
    }
  }

  const steps = [
    { id: 'welcome', label: 'Welcome', completed: true },
    { id: 'register', label: 'Registration', completed: true },
    { id: 'compliance', label: 'Compliance', current: true },
    { id: 'banking', label: 'Banking' },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Welcome', href: '/welcome' },
            { label: 'Registration', href: '/register' },
            { label: 'Compliance' }
          ]}
          className="mb-8"
        />

        <ProgressIndicator steps={steps} className="mb-10" />

        <Card className="border border-gray-100 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Compliance Verification
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Verify your business registrations and certifications
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* UDYAM Registration */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">UDYAM Registration</h3>
                  <p className="text-sm text-gray-500 font-light">MSME registration benefits</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${getStatusColor(udyamStatus)}`}>
                  {getStatusText(udyamStatus)}
                </div>
              </div>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  {...register('udyam_registered')}
                  className="mr-2"
                />
                <span>I have UDYAM registration</span>
              </label>
              {udyamRegistered && (
                <Input
                  label="UDYAM Registration Number"
                  {...register('registration_number')}
                  placeholder="UDYAM-XX-XX-XXXXXXX"
                  error={errors.registration_number?.message}
                />
              )}
              {!udyamRegistered && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://udyamregistration.gov.in', '_blank')}
                >
                  Guide Me to Register
                </Button>
              )}
            </div>

            {/* Tax Registration */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">Tax Registration</h3>
                  <p className="text-sm text-gray-500 font-light">PAN/Tax ID verification</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${getStatusColor(taxStatus)}`}>
                  {getStatusText(taxStatus)}
                </div>
              </div>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  {...register('tax_registered')}
                  className="mr-2"
                />
                <span>I have Tax/PAN registration</span>
              </label>
              {taxRegistered && (
                <Input
                  label="PAN/Tax ID"
                  {...register('tax_id')}
                  placeholder="ABCDE1234F"
                  error={errors.tax_id?.message}
                />
              )}
            </div>

            {/* GST Registration */}
            <div className="border border-gray-200 rounded-xl p-6 bg-white hover:border-gray-300 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">GST Registration</h3>
                  <p className="text-sm text-gray-500 font-light">Optional for some businesses</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide ${getStatusColor(gstStatus)}`}>
                  {getStatusText(gstStatus)}
                </div>
              </div>
              <label className="flex items-center mb-3">
                <input
                  type="checkbox"
                  {...register('gst_registered')}
                  className="mr-2"
                />
                <span>I have GST registration</span>
              </label>
              {gstRegistered && (
                <Input
                  label="GST ID"
                  {...register('gst_id')}
                  placeholder="07ABCDE1234F1Z5"
                  error={errors.gst_id?.message}
                />
              )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-100 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-6"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? 'Processing...' : 'Continue to Banking'}
                {!isSubmitting && (
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
