import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export function getStripePriceId(planId: 'starter' | 'growth'): string {
  if (planId === 'starter') return process.env.STRIPE_PRICE_STARTER!
  if (planId === 'growth') return process.env.STRIPE_PRICE_GROWTH!
  throw new Error(`Unknown plan: ${planId}`)
}
