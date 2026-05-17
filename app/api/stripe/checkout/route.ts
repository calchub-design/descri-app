import { createClient } from '@/lib/supabase/server'
import { stripe, getStripePriceId } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.redirect(new URL('/auth/login', request.url))
  }

  const { searchParams } = new URL(request.url)
  const plan = searchParams.get('plan') as 'starter' | 'growth' | null

  if (!plan || !['starter', 'growth'].includes(plan)) {
    return Response.json({ error: 'Plan invalide' }, { status: 400 })
  }

  const serviceSupabase = createServiceClient()
  const { data: existingSub } = await serviceSupabase
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single()

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: getStripePriceId(plan), quantity: 1 }],
    customer: existingSub?.stripe_customer_id || undefined,
    customer_email: existingSub?.stripe_customer_id ? undefined : user.email!,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    metadata: { user_id: user.id, plan },
    subscription_data: { metadata: { user_id: user.id, plan } },
  })

  return Response.redirect(session.url!)
}
