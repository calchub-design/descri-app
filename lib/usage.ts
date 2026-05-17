import { createServiceClient } from './supabase/server'
import { PLANS, PlanId } from './plans'

export function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export async function getUserPlan(userId: string): Promise<PlanId> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (!data) return 'free'
  return data.plan as PlanId
}

export async function getUsage(userId: string): Promise<number> {
  const supabase = createServiceClient()
  const month = getCurrentMonth()
  const { data } = await supabase
    .from('usage')
    .select('descriptions_count')
    .eq('user_id', userId)
    .eq('month', month)
    .single()

  return data?.descriptions_count ?? 0
}

export async function checkQuota(
  userId: string,
  count: number
): Promise<{ allowed: boolean; used: number; limit: number; plan: PlanId }> {
  const plan = await getUserPlan(userId)
  const limit = PLANS[plan].descriptionsPerMonth
  const used = await getUsage(userId)

  if (used + count > limit) {
    return { allowed: false, used, limit, plan }
  }
  return { allowed: true, used, limit, plan }
}

export async function incrementUsage(userId: string, count: number): Promise<void> {
  if (count <= 0) return
  const supabase = createServiceClient()
  const month = getCurrentMonth()
  const used = await getUsage(userId)

  await supabase.from('usage').upsert(
    { user_id: userId, month, descriptions_count: used + count },
    { onConflict: 'user_id,month' }
  )
}

// Kept for backward compatibility with /api/usage route
export async function checkAndIncrementUsage(
  userId: string,
  count: number
): Promise<{ allowed: boolean; used: number; limit: number; plan: PlanId }> {
  const check = await checkQuota(userId, count)
  if (!check.allowed) return check

  await incrementUsage(userId, count)
  return { ...check, used: check.used + count }
}
