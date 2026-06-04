import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopify Product Description Generator — Bulk AI Descriptions via CSV',
  description:
    'Generate hundreds of Shopify product descriptions in minutes. Export your products as a CSV, upload to Descri, pick a style and language, and download a ready-to-reimport file. Free to try, no app to install.',
  alternates: {
    canonical: 'https://descri.app/shopify-product-description-generator',
  },
  openGraph: {
    title: 'Shopify Product Description Generator — Descri',
    description:
      'Bulk-generate Shopify product descriptions from a CSV in minutes. Upload, pick a style, download a ready-to-reimport file.',
    type: 'website',
    url: 'https://descri.app/shopify-product-description-generator',
    siteName: 'Descri',
  },
}

const faqs = [
  {
    q: 'What is the best Shopify product description generator?',
    a: 'Descri is a bulk Shopify product description generator that works from a CSV file. You export your products from Shopify, upload the CSV to Descri, choose a writing style and language, and download a ready-to-reimport file with AI-written descriptions for every product — about 100 products in 2 minutes, with no app to install.',
  },
  {
    q: 'How do I generate product descriptions in bulk for Shopify?',
    a: 'Export your products from Shopify (Products → Export → CSV), upload that CSV to Descri, pick a style (SEO, storytelling, luxury, minimalist) and a language, then click Generate. Descri returns an enriched CSV you reimport into Shopify in one step. No copy-pasting product by product.',
  },
  {
    q: 'Is there a free Shopify description generator?',
    a: 'Yes. Descri includes a free tier with 20 descriptions per month, no credit card required. Paid plans start at $9/month for 100 descriptions and $29/month for 1,000.',
  },
  {
    q: 'Do I need to install a Shopify app?',
    a: 'No. Descri works entirely through CSV import and export, so there is no Shopify app to install, no permissions to grant, and no store connection. It works with any platform that can export and import a CSV, including WooCommerce.',
  },
  {
    q: 'Why not just use ChatGPT for product descriptions?',
    a: 'ChatGPT works one product at a time, which means copy-pasting each item in and the result back out — hours of work for a real catalog. Descri processes your entire CSV at once and keeps a consistent style across every product, turning a full afternoon into about two minutes.',
  },
]

export default function ShopifyDescriptionGeneratorPage() {
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

      {/* Navbar */}
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

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Shopify Product Description Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Descri is the fastest way to generate bulk product descriptions for your Shopify store.
          Export your products to a CSV, upload the file, pick a style and language, and download a
          ready-to-reimport CSV with AI-written descriptions — about <strong>100 products in 2 minutes</strong>,
          with no app to install.
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

      {/* The problem */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Writing Shopify descriptions one by one doesn&apos;t scale
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            A store with 100, 300 or 1,000 products is impossible to write by hand. And pasting each
            product into ChatGPT individually — then copying the result back into a spreadsheet — turns
            into a full afternoon of repetitive work every time your catalog changes. Descri handles the
            whole catalog in one pass, with a consistent style across every product.
          </p>
        </div>
      </section>

      {/* How it works with Shopify */}
      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How to bulk-generate Shopify descriptions
        </h2>
        <p className="text-center text-gray-600 mb-12">Four steps, no integration required.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              step: '1',
              title: 'Export your Shopify products',
              desc: 'In your Shopify admin, go to Products → Export → CSV. You get a file with every product, including the title and details Descri needs.',
            },
            {
              step: '2',
              title: 'Upload the CSV to Descri',
              desc: 'Drop the file into Descri. It reads your product names, features and categories — no manual setup.',
            },
            {
              step: '3',
              title: 'Pick a style and language',
              desc: 'Choose SEO, storytelling, luxury or minimalist, in French, English, Spanish and more. One click applies it to the whole catalog.',
            },
            {
              step: '4',
              title: 'Download and reimport',
              desc: 'Get an enriched CSV with a description for every product, ready to reimport into Shopify in a single step. Zero copy-pasting.',
            },
          ].map((item) => (
            <div key={item.step} className="card">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Descri vs. copy-pasting into ChatGPT
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border-2 border-red-100 bg-red-50 p-8">
              <div className="text-xl font-semibold mb-4">😤 ChatGPT, one by one</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Paste each product in, copy each result back out',
                  'Style drifts from product to product',
                  '3–6 hours for a few hundred products',
                  'Repeat the whole thing every catalog update',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-green-100 bg-green-50 p-8">
              <div className="text-xl font-semibold mb-4">🚀 Descri, the whole CSV</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Upload one CSV, download one CSV',
                  'Consistent style across every product',
                  '~2 minutes for 100 products',
                  'Reimport into Shopify in one step',
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

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Shopify product descriptions — FAQ
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

      {/* CTA */}
      <section className="bg-brand-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Generate your Shopify descriptions now
          </h2>
          <p className="text-brand-100 mb-8 text-lg">
            20 free descriptions. No credit card required.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-brand-600 font-bold text-lg hover:bg-brand-50 transition-colors"
          >
            Start free
          </Link>
        </div>
      </section>

      {/* Footer */}
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
