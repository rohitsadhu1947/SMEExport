'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, type RegistrationFormData } from '@/lib/validation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { ProgressIndicator } from '@/components/ui/ProgressIndicator'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useToast } from '@/components/ui/Toast'

export default function RegisterPage() {
  const router = useRouter()
  const { showToast } = useToast()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      type: 'individual',
      industry: undefined,
    }
  })

  const userType = watch('type')

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      if (typeof window === 'undefined') return
      
      // Store registration data in sessionStorage
      sessionStorage.setItem('registrationData', JSON.stringify(data))
      sessionStorage.setItem('selectedIndustry', data.industry)
      showToast('success', 'Registration information saved', 'Success')
      router.push('/compliance')
    } catch (error) {
      console.error('Registration error:', error)
      showToast('error', 'Failed to save registration data', 'Error')
    }
  }

  const industryOptions = [
    { value: 'Leather', label: 'Leather' },
    { value: 'Carpets', label: 'Carpets' }
  ]

  const steps = [
    { id: 'welcome', label: 'Welcome', completed: true },
    { id: 'register', label: 'Registration', current: true },
    { id: 'compliance', label: 'Compliance' },
    { id: 'banking', label: 'Banking' },
    { id: 'profile', label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs - very subtle */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-slate-100/20 via-slate-50/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-gradient-to-br from-slate-100/15 via-transparent to-slate-50/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-slate-100/18 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        
        {/* Very subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.02]"></div>
        
        {/* Subtle animated gradient sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/10 to-transparent animate-gradient-x"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <Breadcrumbs
          items={[
            { label: 'Welcome', href: '/welcome' },
            { label: 'Registration' }
          ]}
          className="mb-8"
        />

        <ProgressIndicator steps={steps} className="mb-10" />

        <Card className="border border-gray-100/80 shadow-xl bg-white/90 backdrop-blur-md">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-lg text-gray-600 font-light">
              Start your journey to global markets
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Industry Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Industry <span className="text-red-500">*</span>
              </label>
              <select
                {...register('industry')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition-colors bg-white ${
                  errors.industry ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.industry ? 'true' : 'false'}
              >
                <option value="">Choose your industry...</option>
                {industryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="mt-1 text-sm text-red-500" role="alert">
                  {errors.industry.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Select the industry you operate in to customize your experience
              </p>
            </div>

            {/* User Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="individual"
                    {...register('type')}
                    className="mr-2"
                  />
                  <span>Individual</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="company"
                    {...register('type')}
                    className="mr-2"
                  />
                  <span>Company</span>
                </label>
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            {/* Legal Name */}
            <Input
              label={`${userType === 'company' ? 'Company' : 'Full'} Name`}
              {...register('legal_name')}
              error={errors.legal_name?.message}
              required
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              helperText="We'll use this to send you important updates"
              required
            />

            {/* Mobile */}
            <Input
              label="Mobile Number"
              type="tel"
              {...register('mobile')}
              error={errors.mobile?.message}
              helperText="10-digit mobile number starting with 6-9"
              required
            />

            {/* Address Fields (Optional) */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Address (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Street"
                  {...register('address.street')}
                />
                <Input
                  label="City"
                  {...register('address.city')}
                />
                <Input
                  label="State"
                  {...register('address.state')}
                />
                <Input
                  label="ZIP Code"
                  {...register('address.zip')}
                />
                <Input
                  label="Country"
                  {...register('address.country')}
                  defaultValue="India"
                />
              </div>
            </div>

            {/* Tooltip for GST/Tax */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> You can add GST/Tax/UDYAM registration details in the next step.
              </p>
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
                {isSubmitting ? 'Processing...' : 'Continue to Compliance'}
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
