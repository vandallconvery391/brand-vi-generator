'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, Image, Type, Plus, Trash2, Eye } from 'lucide-react'
import FileUploader from '@/components/FileUploader'

interface ContentItem {
  id: string
  section: string
  key: string
  value: string
  image_url: string
  description: string
  sort_order: number
}

interface SectionData {
  name: string
  icon: typeof Type
}

const sections: SectionData[] = [
  { name: 'hero', icon: Type },
  { name: 'features', icon: Type },
  { name: 'about', icon: Type },
  { name: 'pricing', icon: Type },
  { name: 'footer', icon: Type },
]

export default function AdminPage() {
  const [content, setContent] = useState<Record<string, ContentItem[]>>({})
  const [selectedSection, setSelectedSection] = useState('hero')
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    const response = await fetch('/api/content')
    const data = await response.json()
    setContent(data)
  }

  const handleSave = async () => {
    if (!editingItem) return
    setIsSaving(true)

    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingItem),
      })
      await fetchContent()
      setEditingItem(null)
    } catch (error) {
      alert('保存失败')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除吗？')) return
    await fetch(`/api/content?id=${id}`, { method: 'DELETE' })
    await fetchContent()
  }

  const handleImageUpload = (url: string) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, image_url: url })
    }
  }

  const handleAddItem = () => {
    setEditingItem({
      id: '',
      section: selectedSection,
      key: '',
      value: '',
      image_url: '',
      description: '',
      sort_order: (content[selectedSection]?.length || 0) + 1,
    })
  }

  const sectionContent = content[selectedSection] || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-brand-500" />
            <h1 className="text-2xl font-bold text-gray-900">内容管理</h1>
          </div>
          <p className="text-gray-500 text-sm">管理网页上的图片和文字内容</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="card">
              <h3 className="text-sm font-medium text-gray-700 mb-4 px-4 pt-4">内容区域</h3>
              <div className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.name}
                      onClick={() => setSelectedSection(section.name)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        selectedSection === section.name
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize">{section.name}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {content[section.name]?.length || 0}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <div className="card">
              <div className="flex items-center justify-between px-4 pt-4">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {selectedSection} 区域内容
                </h2>
                <button
                  onClick={handleAddItem}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  添加内容
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {sectionContent.length === 0 ? (
                  <div className="p-8 text-center">
                    <Type className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">该区域暂无内容</p>
                    <button
                      onClick={handleAddItem}
                      className="mt-4 btn-secondary text-sm"
                    >
                      添加第一条内容
                    </button>
                  </div>
                ) : (
                  sectionContent.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">{item.key}</span>
                            {item.image_url && (
                              <Image className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {item.value || item.image_url}
                          </p>
                          {item.description && (
                            <p className="text-gray-400 text-xs mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {editingItem && (
              <div className="card mt-6">
                <div className="flex items-center justify-between px-4 pt-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingItem.id ? '编辑内容' : '添加内容'}
                  </h3>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    取消
                  </button>
                </div>

                <div className="space-y-4 px-4 pb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      内容标识 (Key)
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="例如: title, description, button_text"
                      value={editingItem.key}
                      onChange={(e) => setEditingItem({ ...editingItem, key: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      文字内容 (Value)
                    </label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      placeholder="输入文字内容"
                      value={editingItem.value}
                      onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      图片 (可选)
                    </label>
                    {editingItem.image_url ? (
                      <div className="relative rounded-lg overflow-hidden border-2 border-brand-500">
                        <img
                          src={editingItem.image_url}
                          alt="预览"
                          className="w-full h-48 object-contain bg-gray-100"
                        />
                        <button
                          onClick={() => setEditingItem({ ...editingItem, image_url: '' })}
                          className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <FileUploader
                        onUpload={handleImageUpload}
                        label="上传图片"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      描述 (可选)
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="内容描述，方便管理"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      排序序号
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      value={editingItem.sort_order}
                      onChange={(e) => setEditingItem({ ...editingItem, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={!editingItem.key || isSaving}
                    className="btn-primary flex items-center gap-2 w-full"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? '保存中...' : '保存'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
