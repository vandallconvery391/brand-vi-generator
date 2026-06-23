import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-primary-600 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>限时免费体验全部功能</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          开启您的品牌设计之旅
        </h2>

        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          无需专业设计知识，只需简单几步，即可创建令人印象深刻的品牌视觉识别系统
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/logo-generator" className="btn-primary inline-flex items-center justify-center gap-2 bg-white text-brand-700 hover:bg-gray-100">
            免费开始创建
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
            了解更多
          </button>
        </div>
      </div>
    </section>
  )
}
