'use client'

export const dynamic = 'force-dynamic'

import React, { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4" />
        <p className="text-gray-600">Connexion en cours...</p>
      </div>
    </div>
  )
}

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')

    if (error) {
      router.push(`/auth/login?error=${encodeURIComponent(errorDescription ?? error)}`)
      return
    }

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          router.push(`/auth/login?error=${encodeURIComponent(error.message)}`)
        } else {
          router.push('/dashboard')
        }
      })
    } else {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
          subscription.unsubscribe()
          router.push('/dashboard')
        }
      })
    }
  }, [router, searchParams, supabase])

  return <Spinner />
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <CallbackHandler />
    </Suspense>
  )
}
