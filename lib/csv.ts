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

export function parseCSV(rawText: string): ProductRow[] {
  // Strip UTF-8 BOM produced by Excel
  const text = rawText.replace(/^﻿/, '').trim()
  const lines = text.split('\n')
  if (lines.length < 2) throw new Error('CSV vide ou sans donnees')

  const header = lines[0].toLowerCase().replace(/\r/g, '')
  const cols = header.split(',').map((c) => c.trim().replace(/^"|"$/g, ''))

  const nameIdx = cols.findIndex((c) => c === 'product_name' || c === 'nom_produit' || c === 'name')
  const featIdx = cols.findIndex((c) => c === 'features' || c === 'caracteristiques' || c === 'caracteristiques')
  const catIdx = cols.findIndex((c) => c === 'category' || c === 'categorie' || c === 'categorie')

  if (nameIdx === -1) throw new Error('Colonne "product_name" introuvable dans le CSV')
  if (featIdx === -1) throw new Error('Colonne "features" introuvable dans le CSV')
  if (catIdx === -1) throw new Error('Colonne "category" introuvable dans le CSV')

  const rows: ProductRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace(/\r/g, '').trim()
    if (!line) continue
    const cells = parseCSVLine(line)
    const name = cells[nameIdx]?.trim()
    const features = cells[featIdx]?.trim()
    const category = cells[catIdx]?.trim()
    if (name) rows.push({ product_name: name, features: features || '', category: category || '' })
  }

  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
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
