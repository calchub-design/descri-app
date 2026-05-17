import { createClient } from '@/lib/supabase/server'
import { parseCSV, buildOutputCSV } from '@/lib/csv'
import { generateDescriptionsBatch } from '@/lib/claude'
import { checkQuota, incrementUsage } from '@/lib/usage'
import { PLANS } from '@/lib/plans'

export const maxDuration = 300

export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Non authentifié' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const style = (formData.get('style') as string) || 'seo'
  const language = (formData.get('language') as string) || 'fr'

  if (!file) {
    return Response.json({ error: 'Fichier CSV manquant' }, { status: 400 })
  }

  let products: ReturnType<typeof parseCSV>
  try {
    products = parseCSV(await file.text())
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 400 })
  }

  if (products.length === 0) {
    return Response.json({ error: 'Le fichier CSV ne contient aucune ligne de données.' }, { status: 400 })
  }

  // Check quota BEFORE generation — do NOT decrement yet
  const quota = await checkQuota(user.id, products.length)
  if (!quota.allowed) {
    return Response.json({
      error: `Quota insuffisant. Il vous reste ${quota.limit - quota.used} descriptions ce mois (plan ${PLANS[quota.plan].name}).`,
    }, { status: 402 })
  }

  const plan = PLANS[quota.plan]
  if (!plan.styles.includes(style)) {
    return Response.json({ error: `Style "${style}" non disponible sur votre plan.` }, { status: 400 })
  }
  if (!plan.languages.includes(language)) {
    return Response.json({ error: `Langue "${language}" non disponible sur votre plan.` }, { status: 400 })
  }

  const encoder = new TextEncoder()

  function send(controller: ReadableStreamDefaultController, data: object) {
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const { descriptions, errors } = await generateDescriptionsBatch(
          products,
          { style, language },
          (done, total) => send(controller, { type: 'progress', done, total })
        )

        // Only charge for successfully generated descriptions
        const successCount = products.length - errors.length
        await incrementUsage(user.id, successCount)

        const outputRows = products.map((p, i) => ({
          product_name: p.product_name,
          description_generated: descriptions[i] ?? '',
          style,
          language,
        }))

        send(controller, {
          type: 'complete',
          csv: buildOutputCSV(outputRows),
          total: products.length,
          success: successCount,
          errors: errors.length > 0 ? errors : undefined,
        })
      } catch (err) {
        send(controller, { type: 'error', message: String(err) })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
