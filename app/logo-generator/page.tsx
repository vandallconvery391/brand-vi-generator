'use client'

import { useState } from 'react'
import { Sparkles, RefreshCw, Download, Heart, Eye } from 'lucide-react'
import FileUploader from '@/components/FileUploader'

export default function LogoGenerator() {
  const [brandName, setBrandName] = useState('')
  const [industry, setIndustry] = useState('')
  const [style, setStyle] = useState('modern')
  const [isGenerating, setIsGenerating] = useState(false)
  const [logos, setLogos] = useState<string[]>([])

  const industries = [
    '科技/互联网',
    '金融/投资',
    '教育/培训',
    '餐饮/食品',
    '零售/电商',
    '医疗/健康',
    '房地产',
    '创意设计',
    '其他',
  ]

  const styles = [
    { value: 'modern', label: '现代简约' },
    { value: 'classic', label: '经典优雅' },
    { value: 'playful', label: '活泼可爱' },
    { value: 'professional', label: '专业商务' },
    { value: 'creative', label: '创意艺术' },
  ]

  const mockLogos = [
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20minimalist%20logo%20design%20for%20tech%20company&image_size=square_hd',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=elegant%20professional%20logo%20design%20for%20financial%20company&image_size=square_hd',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=creative%20colorful%20logo%20design%20for%20creative%20agency&image_size=square_hd',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=clean%20modern%20logo%20design%20for%20education%20platform&image_size=square_hd',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=minimalist%20logo%20design%20for%20health%20brand&image_size=square_hd',
    'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20logo%20design%20for%20real%20estate%20company&image_size=square_hd',
  ]

  const handleGenerate = () => {
    if (!brandName || !industry) return
    setIsGenerating(true)
    setTimeout(() => {
      setLogos(mockLogos)
      setIsGenerating(false)
    }, 2000)
  }

  const [selectedLogo, setSelectedLogo] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">智能Logo生成器</h1>
          <p className="text-gray-600">输入品牌信息，AI为您生成专业的Logo方案</p>
        </div>

        <div className="card max-w-2xl mx-auto mb-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">品牌名称</label>
              <input
                type="text"
                className="input-field"
                placeholder="请输入您的品牌名称"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">所属行业</label>
              <select
                className="input-field"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">请选择行业</option>
                {industries.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">参考图片（可选）</label>
              <p className="text-xs text-gray-400 mb-2">上传您喜欢的设计风格图片，AI将参考其风格生成Logo</p>
              <FileUploader 
                onUpload={(url) => console.log('参考图片上传:', url)}
                label="上传参考图片"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!brandName || !industry || isGenerating}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  生成Logo方案
                </>
              )}
            </button>
          </div>
        </div>

        {logos.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">生成的Logo方案</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className={`card relative overflow-hidden cursor-pointer transition-all hover:shadow-xl ${
                    selectedLogo === logo ? 'ring-4 ring-brand-500' : ''
                  }`}
                  onClick={() => setSelectedLogo(logo)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={logo}
                      alt={`Logo方案 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900">方案 {index + 1}</p>
                    <button className="mt-2 text-brand-600 hover:text-brand-700 text-sm font-medium flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      下载
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="btn-secondary flex items-center gap-2 mx-auto">
                <RefreshCw className="w-4 h-4" />
                生成更多方案
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
