import ProductConfigureClient from './ProductConfigureClient'

// Force dynamic rendering - this MUST be in a Server Component to work
export const dynamic = 'force-dynamic'

export default function ProductConfigurePage() {
  return <ProductConfigureClient />
}
