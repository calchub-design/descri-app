'use client'

export const dynamic = 'force-dynamic'

import React from 'react'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center mb-8 text-brand-600 font-bold text-2xl">
          Descri
        </Link>

        <div className="card">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
              <p className="text-gray-600">
                Un lien de connexion a été envoyé à <strong>{email}</strong>.<br />
                Cliquez dessus pour accéder à votre tableau de bord.
              </p>
              <p className="text-sm text-gray-400 mt-4">Pas reçu ? Vérifiez vos spams.</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Connexion</h1>
              <p className="text-gray-600 mb-6">
                Entrez votre email pour recevoir un lien de connexion instantané.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Envoi en cours...' : 'Recevoir mon lien de connexion'}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Pas encore de compte ?{' '}
                <span className="text-brand-600">
                  Le lien crée votre compte automatiquement.
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
