'use client'

import { createBrowserClient } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState, type ReactNode, createContext, useContext } from 'react'

type AuthProviderProps = {
  children: ReactNode
}

type SupabaseContextType = {
  client: SupabaseClient | null
  session: string | null
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

let browserClient: SupabaseClient | null = null

function getClient() {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!url || !key || url === 'your-supabase-url' || key === 'your-supabase-anon-key') {
      return null
    }
    
    browserClient = createBrowserClient(url, key)
  }
  return browserClient
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [client] = useState(() => getClient())
  const [session, setSession] = useState<string | null>(null)

  useEffect(() => {
    if (!client) return
    
    const { data: authListener } = client.auth.onAuthStateChange((event, _session) => {
      setSession(_session?.access_token ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [client])

  useEffect(() => {
    async function getInitialSession() {
      if (!client) return
      const { data } = await client.auth.getSession()
      setSession(data.session?.access_token ?? null)
    }

    getInitialSession()
  }, [client])

  return (
    <SupabaseContext.Provider value={{ client, session }}>
      {children}
    </SupabaseContext.Provider>
  )
}
