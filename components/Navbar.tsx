'use client'

import { useState } from 'react'
import { Menu, X, Palette, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useSupabase } from './AuthProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { client, session } = useSupabase()

  const navLinks = [
    { name: '首页', href: '/' },
    { name: 'Logo生成器', href: '/logo-generator' },
    { name: '配色方案', href: '/color-scheme' },
    { name: '字体配对', href: '/font-pairing' },
    { name: '品牌指南', href: '/brand-guide' },
  ]

  const handleLogout = async () => {
    await client?.auth.signOut()
    window.location.href = '/auth'
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-primary-500 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">VI生成器</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-brand-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-brand-600 font-medium transition-colors"
              >
                <User className="w-4 h-4" />
                <span>退出登录</span>
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <>
                <Link href="/auth" className="btn-secondary">登录</Link>
                <Link href="/auth" className="btn-primary">免费试用</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-brand-600 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-2">
                {session ? (
                  <button onClick={handleLogout} className="btn-secondary flex-1">退出登录</button>
                ) : (
                  <>
                    <Link href="/auth" className="btn-secondary flex-1" onClick={() => setIsOpen(false)}>登录</Link>
                    <Link href="/auth" className="btn-primary flex-1" onClick={() => setIsOpen(false)}>免费试用</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
