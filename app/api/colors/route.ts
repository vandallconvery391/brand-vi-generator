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
    .from('color_schemes')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ schemes: data })
}

export async function POST(request: Request) {
  const supabase = createClient()
  
  const { project_id, name, primary_color, secondary_color, accent_color, neutral_color, background_color } = await request.json()

  const { data, error } = await supabase
    .from('color_schemes')
    .insert({
      project_id,
      name,
      primary_color,
      secondary_color,
      accent_color,
      neutral_color,
      background_color,
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

  return NextResponse.json({ scheme: data }, { status: 201 })
}
