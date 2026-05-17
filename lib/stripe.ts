import Stripe from 'stripe'

let _stripe: Stripe | null = null
export function getStripe(): Stripe {
  if (!_stripe) _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' })
  return _stripe
}

export function getStripePriceId(planId: 'starter' | 'growth'): string {
  if (planId === 'starter') return process.env.STRIPE_PRICE_STARTER!
  if (planId === 'growth') return process.env.STRIPE_PRICE_GROWTH!
  throw new Error(`Unknown plan: ${planId}`)
}
