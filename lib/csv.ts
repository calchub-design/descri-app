import Papa from 'papaparse'

export interface ProductRow {
  product_name: string
  features: string
  category: string
}

export interface OutputRow {
  product_name: string
  description_generated: string
  style: string
  language: string
}

// Borne la taille des features pour limiter les tokens envoyés à l'IA
const MAX_FEATURES_LENGTH = 500

// Alias acceptés par colonne, par ordre de priorité (normalisés : minuscules, sans accents).
// Couvre le format Descri, les exports Shopify (Title / Body (HTML) / Type / Tags)
// et WooCommerce (Name / Description / Short description / Categories).
const NAME_ALIASES = ['product_name', 'nom_produit', 'name', 'nom', 'title', 'titre', 'produit']
const FEATURES_ALIASES = [
  'features',
  'caracteristiques',
  'body (html)',
  'body_html',
  'short description',
  'description courte',
  'description',
]
const CATEGORY_ALIASES = [
  'category',
  'categorie',
  'categories',
  'type',
  'product type',
  'product_type',
  'product category',
  'tags',
  'etiquettes',
]

function normalizeHeader(cell: string): string {
  return cell
    .replace(/^﻿/, '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function findColumn(headers: string[], aliases: string[]): number {
  for (const alias of aliases) {
    const idx = headers.indexOf(alias)
    if (idx !== -1) return idx
  }
  return -1
}

function cleanCell(value: string | undefined): string {
  if (!value) return ''
  // Supprime les balises HTML (ex: Body (HTML) de Shopify) et normalise les espaces
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function parseCSV(rawText: string): ProductRow[] {
  const text = rawText.replace(/^﻿/, '').trim()

  const result = Papa.parse<string[]>(text, {
    skipEmptyLines: 'greedy',
  })

  const data = result.data
  if (!data || data.length < 2) throw new Error('CSV vide ou sans donnees')

  const headers = data[0].map(normalizeHeader)

  const nameIdx = findColumn(headers, NAME_ALIASES)
  const featIdx = findColumn(headers, FEATURES_ALIASES)
  const catIdx = findColumn(headers, CATEGORY_ALIASES)

  if (nameIdx === -1) {
    throw new Error(
      'Colonne produit introuvable. Utilisez "product_name" (ou "Title" pour un export Shopify, "Name" pour WooCommerce).'
    )
  }

  const rows: ProductRow[] = []
  for (let i = 1; i < data.length; i++) {
    const cells = data[i]
    const name = cleanCell(cells[nameIdx])
    if (!name) continue
    const features = featIdx !== -1 ? cleanCell(cells[featIdx]).slice(0, MAX_FEATURES_LENGTH) : ''
    const category = catIdx !== -1 ? cleanCell(cells[catIdx]) : ''
    rows.push({ product_name: name, features, category })
  }

  return rows
}

export function buildOutputCSV(rows: OutputRow[]): string {
  const header = 'product_name,description_generated,style,language'
  const lines = rows.map((row) => {
    const name = `"${row.product_name.replace(/"/g, '""')}"`
    // Replace newlines with spaces for universal CSV compatibility
    const cleanDesc = row.description_generated.replace(/\r?\n/g, ' ').trim()
    const desc = `"${cleanDesc.replace(/"/g, '""')}"`
    const style = `"${row.style}"`
    const lang = `"${row.language}"`
    return `${name},${desc},${style},${lang}`
  })
  return [header, ...lines].join('\n')
}
