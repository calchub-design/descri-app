import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://descri.app'),
  title: 'BulkDescribe — Générateur de descriptions produits en masse',
  description: 'Uploadez votre CSV produits, téléchargez vos descriptions générées par IA en 2 minutes. Sans intégration, sans copier-coller.',
  alternates: {
    canonical: 'https://descri.app',
  },
  openGraph: {
    title: 'BulkDescribe — Génération en masse par CSV',
    description: '100 descriptions produits en 2 minutes. Upload CSV → Download CSV.',
    type: 'website',
    url: 'https://descri.app',
    siteName: 'BulkDescribe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BulkDescribe — Génération en masse par CSV',
    description: '100 descriptions produits en 2 minutes. Upload CSV → Download CSV.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
