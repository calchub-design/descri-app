import { createClient } from '@/lib/supabase/server'
import { getUsage, getUserPlan } from '@/lib/usage'
import { PLANS } from '@/lib/plans'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const [plan, used] = await Promise.all([getUserPlan(user.id), getUsage(user.id)])
  const limit = PLANS[plan].descriptionsPerMonth

  return Response.json({ plan, used, limit })
}
