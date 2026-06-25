'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image } from 'lucide-react'

interface FileUploaderProps {
  onUpload: (url: string) => void
  projectId?: string
  bucket?: string
  accept?: string
  label?: string
}

export default function FileUploader({ 
  onUpload, 
  projectId,
  bucket = 'brand-assets',
  accept = 'image/*',
  label = '上传图片'
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      await uploadFile(files[0])
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      await uploadFile(files[0])
    }
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('文件大小不能超过5MB')
      return
    }

    setIsUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)
    if (projectId) {
      formData.append('project_id', projectId)
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '上传失败')
      }

      setPreview(data.url)
      onUpload(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : '上传失败')
    } finally {
      setIsUploading(false)
    }
  }

  const removePreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative rounded-lg overflow-hidden border-2 border-brand-500">
          <img
            src={preview}
            alt="预览"
            className="w-full h-48 object-contain bg-gray-100"
          />
          <button
            onClick={removePreview}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-brand-500 bg-brand-50'
              : 'border-gray-300 hover:border-brand-400 hover:bg-gray-50'
          } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            {isUploading ? (
              <>
                <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">上传中...</span>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <p className="text-gray-700 font-medium">{label}</p>
                  <p className="text-gray-400 text-sm mt-1">支持拖拽上传，或点击选择文件</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Image className="w-4 h-4" />
                  <span>支持 JPG, PNG, SVG, GIF (最大5MB)</span>
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
