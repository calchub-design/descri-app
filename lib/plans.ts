export type PlanId = 'free' | 'starter' | 'growth'

export interface Plan {
  id: PlanId
  name: string
  price: number
  descriptionsPerMonth: number
  styles: string[]
  languages: string[]
  stripePriceEnvKey: string | null
}

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Essai gratuit',
    price: 0,
    descriptionsPerMonth: 20,
    styles: ['seo', 'storytelling'],
    languages: ['fr', 'en', 'es'],
    stripePriceEnvKey: null,
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 9,
    descriptionsPerMonth: 100,
    styles: ['seo', 'storytelling'],
    languages: ['fr', 'en', 'es'],
    stripePriceEnvKey: 'STRIPE_PRICE_STARTER',
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    price: 29,
    descriptionsPerMonth: 1000,
    styles: ['seo', 'storytelling', 'luxe', 'minimaliste'],
    languages: ['fr', 'en', 'es', 'de', 'it'],
    stripePriceEnvKey: 'STRIPE_PRICE_GROWTH',
  },
}

export const STYLE_LABELS: Record<string, string> = {
  seo: 'SEO',
  storytelling: 'Storytelling',
  luxe: 'Luxe',
  minimaliste: 'Minimaliste',
}

export const LANGUAGE_LABELS: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
}
