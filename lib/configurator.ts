import { ProductField, ProductTier } from '@/types/product'

export function shouldShowField(
  field: ProductField,
  formValues: Record<string, any>,
  currentTier: ProductTier
): boolean {
  // Check if field is tier-dependent
  if (field.tier_dependent && field.visible_for_tiers) {
    if (!field.visible_for_tiers.includes(currentTier)) {
      return false
    }
  }

  // Check conditional logic
  if (field.conditional && field.conditional.depends_on) {
    const { depends_on, value } = field.conditional
    const dependentValue = formValues[depends_on]

    if (dependentValue !== value) {
      return false
    }
  }

  return true
}

export function getVisibleFields(
  fields: ProductField[],
  formValues: Record<string, any>,
  currentTier: ProductTier
): ProductField[] {
  return fields.filter(field => shouldShowField(field, formValues, currentTier))
}
