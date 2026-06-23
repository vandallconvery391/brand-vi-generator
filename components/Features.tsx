import { Palette, Type, Sparkles, Download, Eye, Wand2 } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: '智能Logo生成',
      description: '输入品牌名称和风格偏好，AI自动生成多个差异化Logo方案',
      color: 'bg-brand-100 text-brand-600',
    },
    {
      icon: Palette,
      title: '配色方案生成器',
      description: '基于品牌调性自动生成协调的主色、辅助色、中性色组合',
      color: 'bg-primary-100 text-primary-600',
    },
    {
      icon: Type,
      title: '字体配对推荐',
      description: '根据品牌风格推荐中英文字体组合，展示实际效果',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Eye,
      title: '动态场景预览',
      description: '在虚拟场景中预览品牌VI应用效果，直观感受设计',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Download,
      title: '品牌指南导出',
      description: '一键将VI元素汇总成可下载的PDF品牌手册',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Wand2,
      title: 'AI风格迁移',
      description: '上传参考图片，AI分析并生成符合该风格的VI方案',
      color: 'bg-pink-100 text-pink-600',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            强大功能，轻松设计
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            从Logo到完整的品牌指南，我们为您提供一站式品牌设计解决方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="card group hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
