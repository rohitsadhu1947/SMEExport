'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bankingSchema, type BankingFormData } from '@/lib/validation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Dropdown } from '@/components/ui/Dropdown'
import { Card } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useToast } from '@/components/ui/Toast'

const banks = [
  { value: 'SBI', label: 'State Bank of India' },
  { value: 'HDFC', label: 'HDFC Bank' },
  { value: 'ICICI', label: 'ICICI Bank' },
  { value: 'Axis', label: 'Axis Bank' },
  { value: 'PNB', label: 'Punjab National Bank' },
]

export default function BankingPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<BankingFormData>({
    resolver: zodResolver(bankingSchema),
  })

  const bankName = watch('bank_name')
  const accountNumber = watch('account_number')
  const ifsc = watch('ifsc')

  useEffect(() => {
    const complianceData = sessionStorage.getItem('complianceData')
    if (!complianceData) {
      router.push('/compliance')
    }
  }, [router])

  const handleVerify = async () => {
    if (!bankName || !accountNumber || !ifsc) {
      showToast('warning', 'Please fill in all bank details', 'Incomplete Information')
      return
    }

    setVerificationStatus('verifying')
    // Simulate bank verification
    setTimeout(() => {
      setVerificationStatus('verified')
      showToast('success', 'Bank account verified successfully', 'Verification Complete')
    }, 2000)
  }

  const onSubmit = async (data: BankingFormData) => {
    try {
      if (typeof window === 'undefined') return
      
      if (verificationStatus !== 'verified') {
        showToast('error', 'Please verify your bank account before continuing', 'Verification Required')
        return
      }
      
      const registrationData = JSON.parse(sessionStorage.getItem('registrationData') || '{}')
      const complianceData = JSON.parse(sessionStorage.getItem('complianceData') || '{}')
      
      sessionStorage.setItem('bankingData', JSON.stringify({
        ...data,
        verified: verificationStatus === 'verified'
      }))
      
      showToast('success', 'Banking information saved', 'Success')
      router.push('/profile-summary')
    } catch (error) {
      console.error('Banking error:', error)
      showToast('error', 'Failed to save banking information', 'Error')
    }
  }

  const steps = [
    { id: 'welcome', label: 'Welcome', completed: true },
    { id: 'register', label: 'Registration', completed: true },
    { id: 'compliance', label: 'Compliance', completed: true },
    { id: 'banking', label: 'Banking', current: true },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Welcome', href: '/welcome' },
            { label: 'Registration', href: '/register' },
            { label: 'Compliance', href: '/compliance' },
            { label: 'Banking' }
          ]}
          className="mb-8"
        />

        <ProgressIndicator steps={steps} className="mb-10" />

        <Card className="border border-gray-100 shadow-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Banking Information
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Link your bank account for seamless transactions
            </p>
          </div>

          {verificationStatus === 'verified' && (
            <Alert
              variant="success"
              message="Bank account verified successfully!"
              className="mb-8 border border-green-200"
            />
          )}

          {verificationStatus === 'failed' && (
            <Alert
              variant="error"
              message="Verification failed. Please check your details and try again."
              className="mb-8 border border-red-200"
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Dropdown
              label="Select Bank"
              options={banks}
              placeholder="Choose your bank..."
              {...register('bank_name')}
              error={errors.bank_name?.message}
              required
            />

            <Input
              label="Account Number"
              type="text"
              {...register('account_number')}
              error={errors.account_number?.message}
              helperText="Enter your bank account number"
              required
            />

            <Input
              label="IFSC Code"
              type="text"
              {...register('ifsc')}
              error={errors.ifsc?.message}
              helperText="Format: ABCD0123456"
              placeholder="ABCD0123456"
              required
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleVerify}
                disabled={!bankName || !accountNumber || !ifsc || verificationStatus === 'verifying' || verificationStatus === 'verified'}
                className="px-6"
              >
                {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Account'}
              </Button>
            </div>

            {verificationStatus === 'verified' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm text-green-800 font-medium">
                    Account verified and ready for transactions
                  </p>
                </div>
              </div>
            )}

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
                disabled={isSubmitting || verificationStatus !== 'verified'}
                className="flex-1 bg-slate-900 hover:bg-slate-800"
              >
                {isSubmitting ? 'Processing...' : 'Continue to Profile Summary'}
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
