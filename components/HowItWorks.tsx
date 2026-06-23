import { Type, Palette, Download, Sparkles } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Type,
      title: '输入品牌信息',
      description: '告诉我们您的品牌名称、行业属性和风格偏好',
    },
    {
      step: 2,
      icon: Sparkles,
      title: 'AI智能生成',
      description: '我们的AI引擎根据您的需求生成多个VI方案',
    },
    {
      step: 3,
      icon: Palette,
      title: '自定义调整',
      description: '在预览中实时调整配色、字体等细节',
    },
    {
      step: 4,
      icon: Download,
      title: '导出使用',
      description: '一键导出完整的品牌指南和设计文件',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            四步创建专业品牌VI
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            简单直观的流程，让您快速拥有专业的品牌视觉识别系统
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-brand-500 to-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center mx-auto -mt-2 mb-4">
                    <span className="text-brand-600 font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
