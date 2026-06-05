import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Product Description Generator — 20 AI Descriptions, No Card',
  description:
    'A free product description generator for e-commerce. Get 20 AI-written descriptions per month at no cost, no credit card required. Upload a CSV, pick a style, download the results ready to import.',
  alternates: {
    canonical: 'https://www.descri.app/free-product-description-generator',
  },
  openGraph: {
    title: 'Free Product Description Generator — Descri',
    description:
      '20 free AI product descriptions per month, no credit card. Upload a CSV, pick a style, download ready-to-import results.',
    type: 'website',
    url: 'https://www.descri.app/free-product-description-generator',
    siteName: 'Descri',
  },
}

const faqs = [
  {
    q: 'Is there a truly free product description generator?',
    a: 'Yes. Descri is free to start: you get 20 AI-written product descriptions every month at no cost and with no credit card required. You upload a CSV of your products, pick a style and language, and download the results ready to import into your store.',
  },
  {
    q: 'Do I need a credit card to use the free plan?',
    a: 'No. The free plan requires no credit card and no payment details. You create an account with just an email and can generate your first 20 descriptions immediately.',
  },
  {
    q: 'What is the catch with the free tier?',
    a: 'There is no catch. The free tier is capped at 20 descriptions per month so it stays sustainable. If you need more, paid plans start at $9/month for 100 descriptions and $29/month for 1,000 — but many small stores never need to upgrade.',
  },
  {
    q: 'What do I get on the free plan?',
    a: 'The free plan includes 20 descriptions per month, the SEO and storytelling styles, French, English and Spanish, and unlimited CSV export. It is the full workflow, just with a monthly cap on the number of descriptions.',
  },
  {
    q: 'Is the free version good enough for a real store?',
    a: 'For a small catalog or to test the quality, yes. Descriptions are written by Claude (Anthropic), so the output is the same quality on the free and paid plans — the only difference is how many you can generate per month.',
  },
]

export default function FreeDescriptionGeneratorPage() {
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
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          20 descriptions free every month
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Free Product Description Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Descri is a free product description generator for e-commerce stores. You get
          <strong> 20 AI-written descriptions per month at no cost</strong>, with no credit card required —
          upload a CSV, pick a style and language, and download the results ready to import.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login" className="btn-primary text-base px-8 py-4">
            Start free — no card needed
          </Link>
          <Link href="/#how-it-works" className="btn-secondary text-base px-8 py-4">
            See how it works
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card. No trial countdown. Just free.</p>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Free, with no credit card and no trial countdown
          </h2>
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            A lot of &quot;free&quot; tools ask for your card up front or expire after 7 days. Descri&apos;s
            free plan is genuinely free: 20 descriptions every month, forever, with nothing but an email to
            sign up. It&apos;s enough to write a small catalog, or to test the quality before deciding whether
            you ever need a paid plan.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          How the free generator works
        </h2>
        <p className="text-center text-gray-600 mb-12">Three steps, zero cost.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Upload your CSV',
              desc: 'Export your products from Shopify, WooCommerce or a simple spreadsheet — name, features, category.',
            },
            {
              step: '2',
              title: 'Pick style & language',
              desc: 'SEO or storytelling, in French, English or Spanish. One click on the free plan.',
            },
            {
              step: '3',
              title: 'Download for free',
              desc: 'Get your enriched CSV with up to 20 descriptions this month, ready to reimport. No card, no charge.',
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What the free plan includes</h2>
          <div className="card">
            <ul className="space-y-3 text-gray-700">
              {[
                '20 descriptions per month',
                'SEO & storytelling styles',
                'French, English & Spanish',
                'Unlimited CSV export',
                'Same AI quality as paid plans (Claude by Anthropic)',
                'No credit card, ever',
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
          Free product description generator — FAQ
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
          <h2 className="text-3xl font-bold text-white mb-4">Start generating for free</h2>
          <p className="text-brand-100 mb-8 text-lg">20 descriptions a month. No credit card required.</p>
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
