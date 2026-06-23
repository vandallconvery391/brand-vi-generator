'use client'

import { useState } from 'react'
import { Palette, RefreshCw, Copy, Check } from 'lucide-react'

export default function ColorScheme() {
  const [brandTone, setBrandTone] = useState('professional')
  const [colorSchemes, setColorSchemes] = useState<ColorScheme[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  interface ColorScheme {
    name: string
    primary: string
    secondary: string
    accent: string
    neutral: string
    background: string
  }

  const brandTones = [
    { value: 'professional', label: '专业商务' },
    { value: 'creative', label: '创意艺术' },
    { value: 'playful', label: '活泼可爱' },
    { value: 'minimal', label: '简约清新' },
    { value: 'luxury', label: '高端奢华' },
  ]

  const mockSchemes: ColorScheme[] = [
    {
      name: '深蓝商务',
      primary: '#1e40af',
      secondary: '#3b82f6',
      accent: '#f59e0b',
      neutral: '#64748b',
      background: '#f8fafc',
    },
    {
      name: '活力橙黄',
      primary: '#ea580c',
      secondary: '#fb923c',
      accent: '#16a34a',
      neutral: '#64748b',
      background: '#fff7ed',
    },
    {
      name: '优雅紫色',
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#ec4899',
      neutral: '#64748b',
      background: '#faf5ff',
    },
    {
      name: '自然清新',
      primary: '#059669',
      secondary: '#10b981',
      accent: '#3b82f6',
      neutral: '#64748b',
      background: '#f0fdf4',
    },
    {
      name: '经典黑白',
      primary: '#1f2937',
      secondary: '#4b5563',
      accent: '#ef4444',
      neutral: '#9ca3af',
      background: '#f9fafb',
    },
    {
      name: '温暖珊瑚',
      primary: '#f97316',
      secondary: '#fdba74',
      accent: '#06b6d4',
      neutral: '#64748b',
      background: '#fffbeb',
    },
  ]

  const handleGenerate = () => {
    setColorSchemes(mockSchemes)
  }

  const copyToClipboard = (color: string, index: number) => {
    navigator.clipboard.writeText(color)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getColorName = (color: string) => {
    const colorMap: Record<string, string> = {
      '#1e40af': '主色',
      '#3b82f6': '辅助色',
      '#f59e0b': '强调色',
      '#64748b': '中性色',
      '#f8fafc': '背景色',
      '#ea580c': '主色',
      '#fb923c': '辅助色',
      '#16a34a': '强调色',
      '#fff7ed': '背景色',
      '#7c3aed': '主色',
      '#a78bfa': '辅助色',
      '#ec4899': '强调色',
      '#faf5ff': '背景色',
      '#059669': '主色',
      '#10b981': '辅助色',
      '#3b82f6': '强调色',
      '#f0fdf4': '背景色',
      '#1f2937': '主色',
      '#4b5563': '辅助色',
      '#ef4444': '强调色',
      '#f9fafb': '背景色',
      '#f97316': '主色',
      '#fdba74': '辅助色',
      '#06b6d4': '强调色',
      '#fffbeb': '背景色',
    }
    return colorMap[color] || '颜色'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">配色方案生成器</h1>
          <p className="text-gray-600">基于品牌调性，AI为您生成协调的配色方案</p>
        </div>

        <div className="card max-w-2xl mx-auto mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌调性</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {brandTones.map((item) => (
                  <button
                    key={item.value}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      brandTone === item.value
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setBrandTone(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Palette className="w-5 h-5" />
              生成配色方案
            </button>
          </div>
        </div>

        {colorSchemes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">生成的配色方案</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorSchemes.map((scheme, index) => (
                <div key={index} className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                    <button className="btn-secondary text-sm">应用方案</button>
                  </div>
                  
                  <div className="space-y-3">
                    {[scheme.primary, scheme.secondary, scheme.accent, scheme.neutral, scheme.background].map((color, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color, index * 5 + idx)}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">{getColorName(color)}</div>
                          <div className="text-sm text-gray-500 font-mono">{color}</div>
                        </div>
                        <button
                          onClick={() => copyToClipboard(color, index * 5 + idx)}
                          className="w-8 h-8 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                        >
                          {copiedIndex === index * 5 + idx ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      微调此方案
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
