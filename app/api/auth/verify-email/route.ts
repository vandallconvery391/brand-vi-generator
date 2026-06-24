import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (!token_hash || !type) {
    return NextResponse.json(
      { error: '缺少验证参数' },
      { status: 400 }
    )
  }

  const supabase = createClient()

  const { error } = await supabase.auth.exchangeCodeForSession(token_hash)

  if (error) {
    return NextResponse.redirect(new URL('/auth?error=verify-failed', request.url))
  }

  return NextResponse.redirect(new URL('/auth?verified=true', request.url))
}
