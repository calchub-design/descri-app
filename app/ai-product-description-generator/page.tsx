import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Product Description Generator — Powered by Claude, from a CSV',
  description:
    'An AI product description generator powered by Claude (Anthropic). Turn a CSV of products into ready-to-use descriptions in multiple styles and languages, then export a file you can import into any store. Free to try.',
  alternates: {
    canonical: 'https://www.descri.app/ai-product-description-generator',
  },
  openGraph: {
    title: 'AI Product Description Generator — Descri',
    description:
      'Turn a CSV of products into AI-written descriptions in multiple styles and languages. Powered by Claude (Anthropic).',
    type: 'website',
    url: 'https://www.descri.app/ai-product-description-generator',
    siteName: 'Descri',
  },
}

const faqs = [
  {
    q: 'What is the best AI product description generator?',
    a: 'Descri is an AI product description generator that turns a CSV of products into ready-to-use descriptions. It is powered by Claude (Anthropic), writes in multiple styles and languages, and exports a CSV you can import into any store — about 100 products in 2 minutes.',
  },
  {
    q: 'Which AI model writes the descriptions?',
    a: 'Descri uses Claude, the large language model from Anthropic, which is one of the strongest models for natural, well-structured writing. That is why the output reads close to what a copywriter would produce, rather than generic filler.',
  },
  {
    q: 'Is the quality of AI descriptions good enough to publish?',
    a: 'For most stores, yes. Many users publish the output directly, while others do a quick review pass. Because you choose a style and language up front, the descriptions match your brand tone instead of sounding generic.',
  },
  {
    q: 'What styles and languages can the AI write in?',
    a: 'Styles include SEO, storytelling, luxury and minimalist. Languages include French, English, Spanish, and more on higher plans (German, Italian). You pick one style and language and it applies to your whole catalog.',
  },
  {
    q: 'Can I edit the AI-generated descriptions?',
    a: 'Yes. Descri returns everything in a CSV, so you can edit any description in your spreadsheet or store before publishing. Nothing is locked — you stay in full control of the final text.',
  },
]

export default function AiDescriptionGeneratorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">
            Descri
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium text-sm">
              Connexion
            </Link>
            <Link href="/auth/login" className="btn-primary text-sm py-2 px-4">
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          AI Product Description Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Descri is an AI product description generator that turns a CSV of products into ready-to-use
          descriptions. Powered by <strong>Claude (Anthropic)</strong>, it writes in multiple styles and
          languages and exports a CSV you can import into any store — about 100 products in 2 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
            Start free — 20 descriptions
          </Link>
          <Link href="/#how-it-works" className="btn-secondary text-base px-8 py-4">
            See how it works
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card. No app to install.</p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Built on Claude, not generic filler text
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            The quality of an AI description depends on the model behind it. Descri runs on Claude by
            Anthropic — one of the strongest models for natural, structured writing — so the output reads
            like a copywriter wrote it, not like template spam. You guide it with a style and a language,
            and it does the rest across your entire catalog.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How the AI generator works
        </h2>
        <p className="text-center text-gray-600 mb-12">Three steps from CSV to publish-ready copy.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Upload your products',
              desc: 'Drop in a CSV with product name, features and category. Exports from any store work.',
            },
            {
              step: '2',
              title: 'Choose how the AI writes',
              desc: 'Pick a style — SEO, storytelling, luxury, minimalist — and a language. This shapes the AI’s tone for every product.',
            },
            {
              step: '3',
              title: 'Get publish-ready copy',
              desc: 'Download a CSV with a Claude-written description for each product. Publish as-is or edit anything you like.',
            },
          ].map((item) => (
            <div key={item.step} className="card text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            What the AI can adapt to
          </h2>
          <div className="card">
            <ul className="space-y-3 text-gray-700">
              {[
                'Styles: SEO, storytelling, luxury, minimalist',
                'Languages: French, English, Spanish (+ German & Italian on Growth)',
                'Any product type — fashion, tech, home, beauty and more',
                'Your brand tone, applied consistently across the catalog',
                'Fully editable output — you keep control of the final text',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          AI product description generator — FAQ
        </h2>
        <div className="space-y-6">
          {faqs.map((item) => (
            <div key={item.q} className="border-b border-gray-200 pb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let the AI write your catalog</h2>
          <p className="text-brand-100 mb-8 text-lg">20 free descriptions. No credit card required.</p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-brand-600 font-bold text-lg hover:bg-brand-50 transition-colors"
          >
            Start free
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-brand-600 font-bold">
            Descri
          </Link>
          <p className="text-sm text-gray-400">© 2026 Descri. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
