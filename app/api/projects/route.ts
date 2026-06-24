import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('brand_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ projects: data })
}

export async function POST(request: Request) {
  const supabase = createClient()
  
  const { name, industry, description, brand_tone } = await request.json()

  const { data, error } = await supabase
    .from('brand_projects')
    .insert({
      name,
      industry,
      description,
      brand_tone: brand_tone || 'professional',
      status: 'draft',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ project: data }, { status: 201 })
}
