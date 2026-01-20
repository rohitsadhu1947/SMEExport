import { z } from 'zod'

export const registrationSchema = z.object({
  type: z.enum(['individual', 'company']),
  industry: z.enum(['Leather', 'Carpets']),
  legal_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().regex(/^[6-9][0-9]{9}$/, 'Invalid mobile number (10 digits starting with 6-9)'),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
})

export const complianceSchema = z.object({
  udyam_registered: z.boolean(),
  registration_number: z.string().optional(),
  tax_registered: z.boolean(),
  tax_id: z.string().optional(),
  gst_registered: z.boolean().optional(),
  gst_id: z.string().optional(),
})

export const bankingSchema = z.object({
  bank_name: z.string().min(1, 'Bank name is required'),
  account_number: z.string().min(10, 'Account number must be at least 10 digits'),
  ifsc: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
export type ComplianceFormData = z.infer<typeof complianceSchema>
export type BankingFormData = z.infer<typeof bankingSchema>
