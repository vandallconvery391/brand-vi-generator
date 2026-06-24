import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('project_id')

  if (!projectId) {
    return NextResponse.json(
      { error: 'project_id is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('logo_generations')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ logos: data })
}

export async function POST(request: Request) {
  const supabase = createClient()
  
  const { project_id, design_type, keywords, svg_data, png_url } = await request.json()

  const { data, error } = await supabase
    .from('logo_generations')
    .insert({
      project_id,
      design_type,
      keywords,
      svg_data,
      png_url,
      selected: false,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ logo: data }, { status: 201 })
}
