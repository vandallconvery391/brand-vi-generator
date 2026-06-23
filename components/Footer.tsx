import { Palette, Github, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const links = {
    product: [
      { name: 'Logo生成器', href: '/logo-generator' },
      { name: '配色方案', href: '/color-scheme' },
      { name: '字体配对', href: '/font-pairing' },
      { name: '品牌指南', href: '/brand-guide' },
    ],
    company: [
      { name: '关于我们', href: '/about' },
      { name: '博客', href: '/blog' },
      { name: '联系我们', href: '/contact' },
      { name: '加入我们', href: '/careers' },
    ],
    support: [
      { name: '帮助中心', href: '/help' },
      { name: 'API文档', href: '/api' },
      { name: '服务条款', href: '/terms' },
      { name: '隐私政策', href: '/privacy' },
    ],
  }

  const socials = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-primary-500 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">VI生成器</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              智能品牌VI生成工具，帮助您快速创建专业、统一的品牌视觉识别系统
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">产品</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">公司</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">支持</h4>
            <ul className="space-y-2">
              {links.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 品牌VI生成器. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}
