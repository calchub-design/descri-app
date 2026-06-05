import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bulk Product Description Generator — Write Your Whole Catalog at Once',
  description:
    'Generate product descriptions in bulk from a CSV. Upload your full catalog, pick a style and language, and download a description for every product in about 2 minutes. Works with any platform. Free to try.',
  alternates: {
    canonical: 'https://www.descri.app/bulk-product-description-generator',
  },
  openGraph: {
    title: 'Bulk Product Description Generator — Descri',
    description:
      'Write your entire catalog at once from a CSV. Upload, pick a style, download a description for every product.',
    type: 'website',
    url: 'https://www.descri.app/bulk-product-description-generator',
    siteName: 'Descri',
  },
}

const faqs = [
  {
    q: 'What is the best bulk product description generator?',
    a: 'Descri is a bulk product description generator that writes descriptions for your entire catalog at once from a CSV file. You upload a CSV of your products, choose a style and language, and download a file with a description for every product — about 100 products in 2 minutes, working with any e-commerce platform.',
  },
  {
    q: 'How many product descriptions can I generate at once?',
    a: 'You can process your entire catalog in a single CSV — hundreds or thousands of products in one upload. The free plan covers 20 descriptions per month, the Starter plan 100, and the Growth plan 1,000, with the same one-upload workflow at every size.',
  },
  {
    q: 'Which platforms does it work with?',
    a: 'Any platform that can export and import a CSV: Shopify, WooCommerce, Magento, PrestaShop, BigCommerce, or even a plain Excel spreadsheet. Descri is platform-agnostic because it works on the CSV file, not a store integration.',
  },
  {
    q: 'What CSV format do I need for bulk generation?',
    a: 'Three columns are enough: product_name, features (comma-separated attributes), and category. Most store exports already include these, and a sample file is available in the dashboard.',
  },
  {
    q: 'How long does bulk generation take?',
    a: 'About two minutes for 100 products. Instead of pasting items into ChatGPT one at a time, Descri processes the whole CSV in one pass and keeps the style consistent across every product.',
  },
]

export default function BulkDescriptionGeneratorPage() {
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
          Bulk Product Description Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Descri is a bulk product description generator that writes descriptions for your entire catalog
          at once. Upload a CSV of your products, choose a style and language, and download a file with a
          description for every product — about <strong>100 products in 2 minutes</strong>, on any platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
            Start free — 20 descriptions
          </Link>
          <Link href="/#how-it-works" className="btn-secondary text-base px-8 py-4">
            See how it works
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">Works with Shopify, WooCommerce, or any CSV.</p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            One CSV in, one CSV out — your whole catalog at once
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            Writing descriptions product by product doesn&apos;t scale past a few dozen items. Descri takes
            your full export and processes every row in a single pass, so a 500-product catalog is the same
            amount of work as a 5-product one: upload once, download once. And because it&apos;s the same
            engine across the catalog, the tone stays consistent from the first product to the last.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How bulk generation works</h2>
        <p className="text-center text-gray-600 mb-12">Three steps, any catalog size.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Upload your catalog CSV',
              desc: 'Export from any platform — Shopify, WooCommerce, Magento, or Excel. Three columns are enough: name, features, category.',
            },
            {
              step: '2',
              title: 'Choose style & language',
              desc: 'Pick SEO, storytelling, luxury or minimalist, in the language of your store. Applied to every row.',
            },
            {
              step: '3',
              title: 'Download the full file',
              desc: 'Get back a CSV with a description for every product, ready to reimport. Hundreds of products in one go.',
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Manual vs. bulk generation
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border-2 border-red-100 bg-red-50 p-8">
              <div className="text-xl font-semibold mb-4">😤 One product at a time</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Copy in, copy out, repeat 300 times',
                  'Hours of identical, draining work',
                  'Tone drifts as you get tired',
                  'Have to redo it on every catalog change',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-green-100 bg-green-50 p-8">
              <div className="text-xl font-semibold mb-4">🚀 Whole catalog in one pass</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Upload once, download once',
                  '~2 minutes for 100 products',
                  'Consistent tone across everything',
                  'Re-run anytime your catalog updates',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Bulk product descriptions — FAQ
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
          <h2 className="text-3xl font-bold text-white mb-4">Generate your whole catalog now</h2>
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
