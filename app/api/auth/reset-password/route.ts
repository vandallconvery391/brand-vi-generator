import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const body = await request.json()

  const supabase = createClient()

  if ('email' in body) {
    const { error } = await supabase.auth.resetPasswordForEmail(body.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password`,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  }

  if ('token_hash' in body && 'password' in body) {
    const { error } = await supabase.auth.updateUser({
      password: body.password,
    })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { error: '参数不完整' },
    { status: 400 }
  )
}
