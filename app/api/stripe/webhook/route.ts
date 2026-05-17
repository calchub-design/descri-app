import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return Response.json({ error: `Webhook error: ${err}` }, { status: 400 })
  }

  const supabase = createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan
      const customerId = session.customer as string
      const subscriptionId = session.subscription as string

      if (!userId || !plan) break

      await supabase.from('subscriptions').upsert(
        {
          user_id: userId,
          plan,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: 'active',
          current_period_end: null,
        },
        { onConflict: 'user_id' }
      )
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.user_id
      const plan = sub.metadata?.plan || sub.items.data[0]?.price?.metadata?.plan || 'starter'
      const status = sub.status === 'active' || sub.status === 'trialing' ? 'active' : 'canceled'
      const periodEnd = new Date(sub.current_period_end * 1000).toISOString()

      if (userId) {
        await supabase.from('subscriptions').upsert(
          {
            user_id: userId,
            plan,
            stripe_customer_id: sub.customer as string,
            stripe_subscription_id: sub.id,
            status,
            current_period_end: periodEnd,
          },
          { onConflict: 'user_id' }
        )
      } else {
        await supabase
          .from('subscriptions')
          .update({ plan, status, current_period_end: periodEnd })
          .eq('stripe_subscription_id', sub.id)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const userId = sub.metadata?.user_id

      if (userId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', plan: 'free' })
          .eq('user_id', userId)
      } else {
        // Fallback: match by stripe_subscription_id if metadata is missing
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', plan: 'free' })
          .eq('stripe_subscription_id', sub.id)
      }
      break
    }
  }

  return Response.json({ received: true })
}
