import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const formData = await request.formData()
  const file = formData.get('file') as File
  const bucket = formData.get('bucket') as string || 'brand-assets'
  const projectId = formData.get('project_id') as string

  if (!file) {
    return NextResponse.json(
      { error: '未选择文件' },
      { status: 400 }
    )
  }

  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
  const filePath = projectId ? `${projectId}/${fileName}` : fileName

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    )
  }

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(uploadData.path)

  if (projectId) {
    await supabase.from('brand_assets').insert({
      project_id: projectId,
      asset_type: 'upload',
      file_name: file.name,
      file_url: urlData.publicUrl,
      file_size: file.size,
    })
  }

  return NextResponse.json({
    success: true,
    url: urlData.publicUrl,
    path: uploadData.path,
    fileName: file.name,
  })
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { path, bucket } = await request.json()

  if (!path) {
    return NextResponse.json(
      { error: '缺少文件路径' },
      { status: 400 }
    )
  }

  const { error } = await supabase.storage
    .from(bucket || 'brand-assets')
    .remove([path])

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
