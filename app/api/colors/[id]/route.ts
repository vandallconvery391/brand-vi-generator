import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('color_schemes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    )
  }

  return NextResponse.json({ scheme: data })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  
  const body = await request.json()

  const { data, error } = await supabase
    .from('color_schemes')
    .update(body)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ scheme: data })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const { error } = await supabase
    .from('color_schemes')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true })
}
