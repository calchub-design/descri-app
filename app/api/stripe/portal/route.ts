import { createClient, createServiceClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

// Redirige l'abonné vers le portail client Stripe (gestion / annulation / factures)
export async function GET(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.redirect(new URL('/auth/login', request.url))
  }

  const serviceSupabase = createServiceClient()
  const { data: sub } = await serviceSupabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!sub?.stripe_customer_id) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    })
    return Response.redirect(session.url)
  } catch {
    // Portail non configuré côté Stripe — retour dashboard plutôt qu'une 500
    return Response.redirect(new URL('/dashboard', request.url))
  }
}
