'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useToast } from '@/components/ui/Toast'

export default function SubmissionConfirmationPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [submissionId, setSubmissionId] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const id = sessionStorage.getItem('submissionId')
    if (!id) {
      showToast('warning', 'No submission found', 'Redirecting...')
      router.push('/products/select')
      return
    }
    setSubmissionId(id)
    showToast('success', 'Product submitted successfully!', 'Success')
  }, [router, showToast])

  const handleGoToDashboard = () => {
    // Clear all session data
    sessionStorage.clear()
    router.push('/welcome')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Products', href: '/products/select' },
            { label: 'Submission Complete' }
          ]}
          className="mb-8"
        />

        <Card className="p-12 text-center border border-gray-100 shadow-sm">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
              Product Submitted Successfully
            </h1>
            <p className="text-lg text-gray-600 font-light mb-6">
              Your product has been submitted to the marketplace
            </p>
          </div>

          {submissionId && (
            <Alert
              variant="success"
              message={`Submission ID: ${submissionId}`}
              className="mb-6"
            />
          )}

          <div className="bg-gray-50 rounded-xl p-8 mb-8 text-left border border-gray-100">
            <h2 className="font-semibold text-gray-900 mb-6 text-lg">What's Next?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">Your product is now visible to potential buyers</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">Market intelligence will be updated based on buyer interest</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">You'll receive notifications when buyers express interest</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-light">Track your product performance in the dashboard</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGoToDashboard}
              className="px-8 bg-slate-900 hover:bg-slate-800"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/products/select')}
              className="px-8"
            >
              Add Another Product
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
