import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WooCommerce Product Description Generator — Bulk AI Descriptions via CSV',
  description:
    'Generate hundreds of WooCommerce product descriptions in minutes. Export your products as a CSV, upload to Descri, pick a style and language, and download a ready-to-reimport file. Free to try, no plugin to install.',
  alternates: {
    canonical: 'https://www.descri.app/woocommerce-product-description-generator',
  },
  openGraph: {
    title: 'WooCommerce Product Description Generator — Descri',
    description:
      'Bulk-generate WooCommerce product descriptions from a CSV in minutes. Upload, pick a style, download a ready-to-reimport file.',
    type: 'website',
    url: 'https://www.descri.app/woocommerce-product-description-generator',
    siteName: 'Descri',
  },
}

const faqs = [
  {
    q: 'What is the best WooCommerce product description generator?',
    a: 'Descri is a bulk WooCommerce product description generator that works from a CSV file. You export your products from WooCommerce, upload the CSV to Descri, choose a writing style and language, and download a ready-to-reimport file with AI-written descriptions for every product — about 100 products in 2 minutes, with no plugin to install.',
  },
  {
    q: 'How do I generate product descriptions in bulk for WooCommerce?',
    a: 'In your WordPress admin, go to Products → All Products → Export to download a CSV. Upload that CSV to Descri, pick a style (SEO, storytelling, luxury, minimalist) and a language, then click Generate. Descri returns an enriched CSV that you reimport with the built-in WooCommerce importer (Products → Import).',
  },
  {
    q: 'Do I need a WooCommerce plugin?',
    a: 'No. Descri uses WooCommerce’s native CSV export and import, so there is no plugin to install, no API keys, and no site connection. Your store stays untouched — you only move a CSV file in and out.',
  },
  {
    q: 'Is there a free WooCommerce description generator?',
    a: 'Yes. Descri includes a free tier with 20 descriptions per month, no credit card required. Paid plans start at $9/month for 100 descriptions and $29/month for 1,000.',
  },
  {
    q: 'Will it overwrite my existing WooCommerce descriptions?',
    a: 'Only if you choose to. Descri returns the generated descriptions in a separate column of the CSV, so you can review them and decide which products to update before reimporting into WooCommerce.',
  },
]

export default function WooCommerceDescriptionGeneratorPage() {
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
          WooCommerce Product Description Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Descri is the fastest way to generate bulk product descriptions for your WooCommerce store.
          Export your products to a CSV, upload the file, pick a style and language, and download a
          ready-to-reimport CSV with AI-written descriptions — about <strong>100 products in 2 minutes</strong>,
          with no plugin to install.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
            Start free — 20 descriptions
          </Link>
          <Link href="/#how-it-works" className="btn-secondary text-base px-8 py-4">
            See how it works
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card. No plugin to install.</p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Built for WooCommerce&apos;s native CSV import/export
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            WooCommerce already ships with a CSV importer and exporter — Descri plugs straight into that
            workflow. No extra plugin slowing down your WordPress site, no API setup, no risk to your store.
            You export a CSV, enrich it with Descri, and import it back. That&apos;s the whole loop.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How to bulk-generate WooCommerce descriptions
        </h2>
        <p className="text-center text-gray-600 mb-12">Four steps, using only the built-in tools.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              step: '1',
              title: 'Export from WooCommerce',
              desc: 'In WordPress, go to Products → All Products → Export. WooCommerce generates a CSV of your catalog.',
            },
            {
              step: '2',
              title: 'Upload the CSV to Descri',
              desc: 'Drop the file into Descri. It reads your product names, attributes and categories automatically.',
            },
            {
              step: '3',
              title: 'Pick a style and language',
              desc: 'Choose SEO, storytelling, luxury or minimalist, in French, English, Spanish and more — applied to the whole catalog.',
            },
            {
              step: '4',
              title: 'Import back into WooCommerce',
              desc: 'Download the enriched CSV and reimport via Products → Import. Done in one pass, no copy-pasting.',
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

      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why a CSV tool beats a WooCommerce AI plugin
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border-2 border-red-100 bg-red-50 p-8">
              <div className="text-xl font-semibold mb-4">🔌 Yet another plugin</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'One more plugin to slow down your site',
                  'Permissions and API keys to manage',
                  'Breaks on WordPress or WooCommerce updates',
                  'Often locked to one product at a time',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border-2 border-green-100 bg-green-50 p-8">
              <div className="text-xl font-semibold mb-4">📄 Descri, just a CSV</div>
              <ul className="space-y-3 text-gray-700">
                {[
                  'Nothing installed on your WordPress site',
                  'No keys, no permissions, no connection',
                  'Unaffected by store updates',
                  'Your entire catalog in one pass',
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
          WooCommerce product descriptions — FAQ
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Generate your WooCommerce descriptions now
          </h2>
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
