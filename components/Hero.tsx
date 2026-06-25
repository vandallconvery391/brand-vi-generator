'use client'

import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, TrendingUp, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { getContent, getContentValue, type ContentItem } from '@/lib/content'

export default function Hero() {
  const [content, setContent] = useState<ContentItem[]>([])

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getContent('hero') as ContentItem[]
      setContent(data)
    }
    fetchContent()
  }, [])

  const stats = [
    { icon: TrendingUp, value: getContentValue(content, 'stat1_value', '10万+'), label: getContentValue(content, 'stat1_label', '品牌使用') },
    { icon: Clock, value: getContentValue(content, 'stat2_value', '5分钟'), label: getContentValue(content, 'stat2_label', '快速生成') },
    { icon: Award, value: getContentValue(content, 'stat3_value', '98%'), label: getContentValue(content, 'stat3_label', '用户满意') },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-primary-50">
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{getContentValue(content, 'badge_text', 'AI驱动，智能设计')}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {getContentValue(content, 'title', '让品牌视觉')}
            <span className="gradient-text"> {getContentValue(content, 'title_highlight', '一键生成')}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            {getContentValue(content, 'description', '无论是初创品牌还是成熟企业，我们都能帮助您快速创建专业、统一的品牌视觉识别系统')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/logo-generator" className="btn-primary inline-flex items-center justify-center gap-2">
              {getContentValue(content, 'cta_button_text', '开始创建')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="btn-secondary">{getContentValue(content, 'demo_button_text', '观看演示')}</button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-brand-500" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
