'use client'

export const dynamic = 'force-dynamic'

import React from 'react'

import { useState, useRef, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { PLANS, STYLE_LABELS, LANGUAGE_LABELS, PlanId } from '@/lib/plans'
import Link from 'next/link'

interface UsageData {
  used: number
  limit: number
  plan: PlanId
}

interface PartialError {
  index: number
  product_name: string
  reason: string
}

interface GenerationState {
  status: 'idle' | 'generating' | 'done' | 'error'
  progress: number
  total: number
  successCount: number
  partialErrors: PartialError[]
  csvOutput: string
  error: string
}

const INITIAL_GEN: GenerationState = {
  status: 'idle',
  progress: 0,
  total: 0,
  successCount: 0,
  partialErrors: [],
  csvOutput: '',
  error: '',
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState<{ email: string } | null>(null)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<string[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [style, setStyle] = useState('seo')
  const [language, setLanguage] = useState('fr')
  const [gen, setGen] = useState<GenerationState>(INITIAL_GEN)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth/login'); return }
      setUser({ email: user.email! })

      const res = await fetch('/api/usage')
      if (res.ok) setUsage(await res.json())
    }
    load()
  }, [router, supabase])

  function processCSVText(file: File, text: string) {
    const lines = text.trim().split('\n').filter(Boolean)
    setRowCount(Math.max(0, lines.length - 1))
    setCsvPreview(lines.slice(0, 4))
    setCsvFile(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setGen(INITIAL_GEN)

    const isXlsx = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')

    if (isXlsx) {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        try {
          const buffer = ev.target?.result as ArrayBuffer
          const XLSX = await import('xlsx')
          const workbook = XLSX.read(buffer, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const csvText = XLSX.utils.sheet_to_csv(worksheet)
          const csvBlob = new Blob([csvText], { type: 'text/csv' })
          const csvFileObj = new File([csvBlob], file.name.replace(/\.xlsx?$/, '.csv'), { type: 'text/csv' })
          processCSVText(csvFileObj, csvText)
        } catch {
          setGen((g) => ({ ...g, status: 'error', error: 'Impossible de lire le fichier Excel. Verifiez le format.' }))
        }
      }
      reader.readAsArrayBuffer(file)
    } else {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result as string
        processCSVText(file, text)
      }
      reader.readAsText(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const validExt = file?.name.endsWith('.csv') || file?.name.endsWith('.xlsx') || file?.name.endsWith('.xls')
    if (file && validExt) {
      const input = fileInputRef.current
      if (input) {
        const dt = new DataTransfer()
        dt.items.add(file)
        input.files = dt.files
        input.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }
  }, [])

  async function handleGenerate() {
    if (!csvFile) return
    setGen({ ...INITIAL_GEN, status: 'generating', total: rowCount })

    const formData = new FormData()
    formData.append('file', csvFile)
    formData.append('style', style)
    formData.append('language', language)

    try {
      const res = await fetch('/api/generate', { method: 'POST', body: formData })

      if (!res.ok) {
        const err = await res.json()
        setGen((g) => ({ ...g, status: 'error', error: err.error || 'Erreur inconnue' }))
        return
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() ?? ''

        for (const event of events) {
          if (!event.startsWith('data: ')) continue
          const data = JSON.parse(event.slice(6))

          if (data.type === 'progress') {
            setGen((g) => ({ ...g, progress: data.done, total: data.total }))
          } else if (data.type === 'complete') {
            setGen((g) => ({
              ...g,
              status: 'done',
              csvOutput: data.csv,
              progress: data.total,
              total: data.total,
              successCount: data.success ?? data.total,
              partialErrors: data.errors ?? [],
            }))
            const res2 = await fetch('/api/usage')
            if (res2.ok) setUsage(await res2.json())
          } else if (data.type === 'error') {
            setGen((g) => ({ ...g, status: 'error', error: data.message }))
          }
        }
      }
    } catch (err) {
      setGen((g) => ({ ...g, status: 'error', error: String(err) }))
    }
  }

  function handleDownload() {
    if (!gen.csvOutput) return
    const blob = new Blob([gen.csvOutput], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `descriptions_${style}_${language}_${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const plan = usage ? PLANS[usage.plan] : null
  const availableStyles = plan ? plan.styles : PLANS.free.styles
  const availableLanguages = plan ? plan.languages : PLANS.free.languages
  const canGenerate = usage ? rowCount > 0 && rowCount <= (usage.limit - usage.used) : false
  const progressPct = gen.total > 0 ? Math.round((gen.progress / gen.total) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-600">Descri</Link>
          <div className="flex items-center gap-4">
            {user && <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>}
            {usage && usage.plan === 'free' && (
              <Link href="/#pricing" className="btn-primary text-sm py-2 px-4">
                Passer a Starter
              </Link>
            )}
            <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-800">
              Deconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Usage bar */}
        {usage && (
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-semibold text-gray-900">Plan {PLANS[usage.plan].name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {usage.used} / {usage.limit} descriptions ce mois
                </span>
              </div>
              {usage.plan !== 'growth' && (
                <Link href="/api/stripe/checkout?plan=growth" className="text-sm text-brand-600 font-medium hover:text-brand-700">
                  Passer au Growth &rarr;
                </Link>
              )}
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
              />
            </div>
            {usage.used >= usage.limit && (
              <p className="text-sm text-red-600 mt-2">
                Quota mensuel atteint.{' '}
                <Link href="/api/stripe/checkout?plan=growth" className="underline">Passer au plan superieur</Link>
                {' '}ou attendez le {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString('fr-FR')}.
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload CSV / Excel */}
          <div className="card space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">1. Fichier produits</h2>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              {csvFile ? (
                <div>
                  <div className="text-3xl mb-2">📄</div>
                  <p className="font-medium text-gray-900">{csvFile.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{rowCount} produits detectes</p>
                </div>
              ) : (
                <div>
                  <div className="text-3xl mb-2">📤</div>
                  <p className="font-medium text-gray-900">Glissez votre fichier ici</p>
                  <p className="text-sm text-gray-500 mt-1">CSV ou Excel (.xlsx) — cliquez pour selectionner</p>
                </div>
              )}
            </div>

            {csvPreview.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-xs text-gray-600 overflow-x-auto">
                {csvPreview.map((line, i) => (
                  <div key={i} className={i === 0 ? 'text-gray-400' : ''}>{line}</div>
                ))}
              </div>
            )}

            <details className="text-sm text-gray-500">
              <summary className="cursor-pointer font-medium text-brand-600 hover:text-brand-700">
                Voir le format attendu
              </summary>
              <div className="mt-2 bg-gray-50 rounded-lg p-3 font-mono text-xs">
                <div className="text-gray-400">product_name,features,category</div>
                <div>&quot;Montre cuir&quot;,&quot;acier,cuir,50m&quot;,&quot;montres&quot;</div>
                <div>&quot;Sac beige&quot;,&quot;cuir,dore,3 compart.&quot;,&quot;maroquinerie&quot;</div>
              </div>
            </details>
          </div>

          {/* Configuration */}
          <div className="card space-y-5">
            <h2 className="text-lg font-semibold text-gray-900">2. Configuration</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Style de redaction</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(STYLE_LABELS).map(([key, label]) => {
                  const available = availableStyles.includes(key)
                  return (
                    <button
                      key={key}
                      onClick={() => available && setStyle(key)}
                      disabled={!available}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        style === key
                          ? 'bg-brand-600 text-white border-brand-600'
                          : available
                          ? 'border-gray-300 text-gray-700 hover:border-brand-400'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {label}
                      {!available && <span className="ml-1 text-xs">Growth</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Langue de sortie</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(LANGUAGE_LABELS).map(([key, label]) => {
                  const available = availableLanguages.includes(key)
                  return (
                    <button
                      key={key}
                      onClick={() => available && setLanguage(key)}
                      disabled={!available}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        language === key
                          ? 'bg-brand-600 text-white border-brand-600'
                          : available
                          ? 'border-gray-300 text-gray-700 hover:border-brand-400'
                          : 'border-gray-200 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {usage && rowCount > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <p>
                  <strong>{rowCount}</strong> descriptions a generer &bull;{' '}
                  <strong>{usage.limit - usage.used}</strong> restantes ce mois
                </p>
                {rowCount > usage.limit - usage.used && (
                  <p className="text-red-600 mt-1">
                    Quota insuffisant. Reduisez votre fichier ou{' '}
                    <Link href="/api/stripe/checkout?plan=growth" className="underline">upgradez</Link>.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Generate button */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Generer</h2>

          {gen.status === 'idle' && (
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || !csvFile}
              className="btn-primary w-full py-4 text-base"
            >
              Generer {rowCount > 0 ? `${rowCount} descriptions` : 'les descriptions'}
            </button>
          )}

          {gen.status === 'generating' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Generation en cours...</span>
                <span>{gen.progress} / {gen.total}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                {progressPct}% — environ {Math.ceil((gen.total - gen.progress) * 2)} secondes restantes
              </p>
            </div>
          )}

          {gen.status === 'done' && (
            <div className="space-y-4">
              {gen.partialErrors.length === 0 ? (
                <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-green-800">
                      {gen.total} descriptions generees !
                    </p>
                    <p className="text-sm text-green-700">Votre CSV est pret a telecharger et reimporter.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="font-semibold text-yellow-800">
                        {gen.successCount}/{gen.total} descriptions generees — {gen.partialErrors.length} echec{gen.partialErrors.length > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-yellow-700">
                        Le CSV contient les descriptions reussies. Les lignes en echec ont une description vide.
                      </p>
                    </div>
                  </div>
                  <details className="text-sm">
                    <summary className="cursor-pointer text-yellow-700 font-medium hover:text-yellow-800">
                      Voir les {gen.partialErrors.length} produit{gen.partialErrors.length > 1 ? 's' : ''} en echec
                    </summary>
                    <ul className="mt-2 space-y-1 bg-yellow-50 rounded-lg p-3 font-mono text-xs text-yellow-900">
                      {gen.partialErrors.map((e) => (
                        <li key={e.index}>
                          <span className="font-semibold">#{e.index + 1} {e.product_name}</span>
                          <span className="text-yellow-600 ml-2">— {e.reason}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={handleDownload} className="btn-primary flex-1 py-3">
                  Telecharger le CSV {gen.partialErrors.length > 0 ? 'partiel' : 'enrichi'}
                </button>
                <button
                  onClick={() => setGen(INITIAL_GEN)}
                  className="btn-secondary px-6 py-3"
                >
                  Nouveau fichier
                </button>
              </div>
            </div>
          )}

          {gen.status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4 text-red-700">
                <p className="font-semibold mb-1">Erreur lors de la generation</p>
                <p className="text-sm">{gen.error}</p>
              </div>
              <button
                onClick={() => setGen(INITIAL_GEN)}
                className="btn-secondary w-full"
              >
                Reessayer
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
