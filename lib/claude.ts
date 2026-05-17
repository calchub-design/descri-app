import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null
function getClient(): Anthropic {
  if (!_client) _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  return _client
}

const STYLE_INSTRUCTIONS: Record<string, string> = {
  seo: 'Optimisé SEO : intègre naturellement les mots-clés pertinents, structure claire avec bénéfices produit, vocabulaire que les acheteurs utilisent dans leurs recherches Google.',
  storytelling: 'Narratif et émotionnel : raconte une histoire autour du produit, crée du désir, utilise des images mentales et des émotions. Fait rêver le lecteur.',
  luxe: 'Ton premium et sophistiqué : vocabulaire exclusif et raffiné, met en avant le savoir-faire, la rareté et l\'excellence. Cible une clientèle exigeante.',
  minimaliste: 'Concis et direct : 2-3 phrases maximum. Bénéfices clés uniquement, aucun mot superflu. Style épuré et moderne.',
}

export interface ProductInput {
  product_name: string
  features: string
  category: string
}

export interface GenerationOptions {
  style: string
  language: string
}

function buildPrompt(product: ProductInput, options: GenerationOptions): string {
  const styleInstruction = STYLE_INSTRUCTIONS[options.style] || STYLE_INSTRUCTIONS.seo
  const langInstruction = options.language === 'fr'
    ? 'Réponds en français.'
    : options.language === 'es'
    ? 'Responde en español.'
    : options.language === 'de'
    ? 'Antworte auf Deutsch.'
    : options.language === 'it'
    ? 'Rispondi in italiano.'
    : 'Reply in English.'

  return `Tu es un expert en rédaction e-commerce. Génère une description produit pour une boutique en ligne.

Produit : ${product.product_name}
Caractéristiques : ${product.features}
Catégorie : ${product.category}

Style de rédaction : ${styleInstruction}
Langue : ${langInstruction}
Longueur : 80 à 150 mots (sauf style minimaliste : 2-3 phrases).

Réponds UNIQUEMENT avec le texte de la description, sans titre, sans label, sans guillemets.`
}

export async function generateDescription(
  product: ProductInput,
  options: GenerationOptions
): Promise<string> {
  const message = await getClient().messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    messages: [
      {
        role: 'user',
        content: buildPrompt(product, options),
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')
  return content.text.trim()
}

export interface BatchResult {
  descriptions: string[]
  errors: { index: number; product_name: string; reason: string }[]
}

export async function generateDescriptionsBatch(
  products: ProductInput[],
  options: GenerationOptions,
  onProgress?: (done: number, total: number) => void
): Promise<BatchResult> {
  const descriptions: string[] = new Array(products.length).fill('')
  const errors: BatchResult['errors'] = []
  const CONCURRENCY = 5

  for (let i = 0; i < products.length; i += CONCURRENCY) {
    const chunk = products.slice(i, i + CONCURRENCY)
    const settled = await Promise.allSettled(
      chunk.map((product) => generateDescription(product, options))
    )
    settled.forEach((result, j) => {
      const globalIdx = i + j
      if (result.status === 'fulfilled') {
        descriptions[globalIdx] = result.value
      } else {
        descriptions[globalIdx] = ''
        errors.push({
          index: globalIdx,
          product_name: chunk[j].product_name,
          reason: result.reason instanceof Error ? result.reason.message : String(result.reason),
        })
      }
    })
    if (onProgress) onProgress(Math.min(i + CONCURRENCY, products.length), products.length)
  }

  return { descriptions, errors }
}
