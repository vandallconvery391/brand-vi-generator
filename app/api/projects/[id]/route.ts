import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('brand_projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 404 }
    )
  }

  return NextResponse.json({ project: data })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()
  
  const body = await request.json()

  const { data, error } = await supabase
    .from('brand_projects')
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

  return NextResponse.json({ project: data })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  const { error } = await supabase
    .from('brand_projects')
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
