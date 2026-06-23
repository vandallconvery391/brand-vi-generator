'use client'

import { useState } from 'react'
import { Download, FileText, Image, Palette, Type, Eye } from 'lucide-react'

export default function BrandGuide() {
  const [selectedLogo, setSelectedLogo] = useState<string>('')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedFonts, setSelectedFonts] = useState<string[]>([])

  const mockLogos = [
    { id: '1', name: '方案一', url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20minimalist%20logo%20design%20for%20tech%20company&image_size=square_hd' },
    { id: '2', name: '方案二', url: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=elegant%20professional%20logo%20design%20for%20brand&image_size=square_hd' },
  ]

  const mockColorSchemes = [
    { id: '1', name: '深蓝商务', colors: ['#1e40af', '#3b82f6', '#f59e0b', '#64748b', '#f8fafc'] },
    { id: '2', name: '优雅紫色', colors: ['#7c3aed', '#a78bfa', '#ec4899', '#64748b', '#faf5ff'] },
  ]

  const mockFontSchemes = [
    { id: '1', name: '思源黑体组合', fonts: ['思源黑体 Bold', '思源黑体 Regular'] },
    { id: '2', name: '阿里巴巴组合', fonts: ['阿里普惠体 Bold', '阿里普惠体 Regular'] },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">品牌指南生成</h1>
          <p className="text-gray-600">整合Logo、配色、字体，一键生成专业品牌手册</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-brand-600" />
                <h2 className="text-xl font-semibold text-gray-900">品牌指南预览</h2>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-8 min-h-[600px]">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    {selectedLogo ? (
                      <img src={selectedLogo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <Image className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">您的品牌名称</h1>
                  <p className="text-gray-500">品牌标语/tagline</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">色彩系统</h3>
                  <div className="flex gap-4">
                    {selectedColors.length > 0 ? (
                      selectedColors.map((color, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-16 h-16 rounded-lg border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs text-gray-500 mt-2 font-mono">{color}</span>
                        </div>
                      ))
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
                        <Palette className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">字体规范</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {selectedFonts.length > 0 ? (
                      <>
                        <div className="text-xl font-bold text-gray-800 mb-2">标题字体: {selectedFonts[0]}</div>
                        <div className="text-gray-600">正文字体: {selectedFonts[1]}</div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-16 text-gray-400">
                        <Type className="w-6 h-6 mr-2" />
                        <span>请选择字体方案</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">应用示例</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">名片</div>
                      <div className="h-24 bg-white rounded flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-brand-500 rounded mx-auto mb-2" />
                          <div className="text-xs font-medium">品牌名称</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">社交媒体</div>
                      <div className="h-24 bg-white rounded flex items-center justify-center">
                        <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">B</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Image className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-gray-900">选择Logo</h3>
              </div>
              <div className="space-y-3">
                {mockLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedLogo === logo.url
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedLogo(logo.url)}
                  >
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-900">{logo.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-gray-900">选择配色</h3>
              </div>
              <div className="space-y-3">
                {mockColorSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedColors.length > 0 && selectedColors[0] === scheme.colors[0]
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedColors(scheme.colors)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{scheme.name}</span>
                    </div>
                    <div className="flex gap-1">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-brand-600" />
                <h3 className="font-semibold text-gray-900">选择字体</h3>
              </div>
              <div className="space-y-3">
                {mockFontSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFonts.length > 0 && selectedFonts[0] === scheme.fonts[0]
                        ? 'border-brand-500 bg-brand-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedFonts(scheme.fonts)}
                  >
                    <div className="font-medium text-gray-900 mb-1">{scheme.name}</div>
                    <div className="text-sm text-gray-500">{scheme.fonts.join(' / ')}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-primary w-full flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              导出品牌指南PDF
            </button>

            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <Eye className="w-5 h-5" />
              在线预览
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
