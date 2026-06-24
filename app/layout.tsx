import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: '品牌VI生成器 - 智能创建专业品牌视觉',
  description: '一款智能化的品牌VI生成工具，帮助您快速创建专业的品牌视觉识别系统',
  keywords: '品牌设计, VI设计, Logo生成, 配色方案, 字体配对',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
