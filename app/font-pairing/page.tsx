'use client'

import { useState } from 'react'
import { Type, Check, RefreshCw } from 'lucide-react'

export default function FontPairing() {
  const [style, setStyle] = useState('modern')
  const [fontPairs, setFontPairs] = useState<FontPair[]>([])

  interface FontPair {
    name: string
    heading: string
    body: string
    sample: string
  }

  const styles = [
    { value: 'modern', label: '现代简约' },
    { value: 'classic', label: '经典优雅' },
    { value: 'playful', label: '活泼可爱' },
    { value: 'professional', label: '专业商务' },
    { value: 'creative', label: '创意艺术' },
  ]

  const mockFonts: FontPair[] = [
    {
      name: '思源黑体组合',
      heading: '思源黑体 Bold',
      body: '思源黑体 Regular',
      sample: '品牌VI生成器 Brand VI Generator',
    },
    {
      name: '兰亭黑组合',
      heading: '兰亭粗黑',
      body: '兰亭黑 Regular',
      sample: '品牌VI生成器 Brand VI Generator',
    },
    {
      name: 'Noto组合',
      heading: 'Noto Sans SC Bold',
      body: 'Noto Sans SC Regular',
      sample: '品牌VI生成器 Brand VI Generator',
    },
    {
      name: '站酷高端组合',
      heading: '站酷高端黑',
      body: '站酷快乐体',
      sample: '品牌VI生成器 Brand VI Generator',
    },
    {
      name: '阿里巴巴组合',
      heading: '阿里普惠体 Bold',
      body: '阿里普惠体 Regular',
      sample: '品牌VI生成器 Brand VI Generator',
    },
    {
      name: '苹方组合',
      heading: '苹方 Bold',
      body: '苹方 Regular',
      sample: '品牌VI生成器 Brand VI Generator',
    },
  ]

  const handleGenerate = () => {
    setFontPairs(mockFonts)
  }

  const [selectedPair, setSelectedPair] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">字体配对推荐</h1>
          <p className="text-gray-600">根据品牌风格，推荐专业的中英文字体组合</p>
        </div>

        <div className="card max-w-2xl mx-auto mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">设计风格</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {styles.map((item) => (
                  <button
                    key={item.value}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      style === item.value
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setStyle(item.value)}
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
              <Type className="w-5 h-5" />
              获取字体推荐
            </button>
          </div>
        </div>

        {fontPairs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">推荐的字体组合</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fontPairs.map((pair, index) => (
                <div
                  key={index}
                  className={`card cursor-pointer transition-all hover:shadow-xl ${
                    selectedPair === index ? 'ring-4 ring-brand-500' : ''
                  }`}
                  onClick={() => setSelectedPair(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{pair.name}</h3>
                    {selectedPair === index && (
                      <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-2xl font-bold text-gray-800 mb-2">{pair.sample.split(' ')[0]}</div>
                    <div className="text-gray-600">{pair.sample.split(' ')[1]}</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">标题字体</span>
                      <span className="font-medium text-gray-900">{pair.heading}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">正文字体</span>
                      <span className="font-medium text-gray-900">{pair.body}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      查看详细效果
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
