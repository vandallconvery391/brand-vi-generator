import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const section = searchParams.get('section')

  let query = supabase.from('website_content').select('*')

  if (section) {
    query = query.eq('section', section)
  }

  query = query.order('sort_order')

  const { data, error } = await query

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  const grouped: Record<string, typeof data> = {}
  data.forEach((item) => {
    if (!grouped[item.section]) {
      grouped[item.section] = []
    }
    grouped[item.section].push(item)
  })

  return NextResponse.json(section ? data : grouped)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const body = await request.json()

  const { section, key, value, image_url, description, sort_order } = body

  if (!section || !key) {
    return NextResponse.json(
      { error: 'section 和 key 为必填项' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('website_content')
    .upsert({
      section,
      key,
      value,
      image_url,
      description,
      sort_order: sort_order || 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data, { status: 200 })
}

export async function PUT(request: Request) {
  const supabase = createClient()
  const body = await request.json()

  const { id, value, image_url, description, sort_order } = body

  if (!id) {
    return NextResponse.json(
      { error: 'id 为必填项' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('website_content')
    .update({
      value,
      image_url,
      description,
      sort_order,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'id 为必填项' },
      { status: 400 }
    )
  }

  const { error } = await supabase
    .from('website_content')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
