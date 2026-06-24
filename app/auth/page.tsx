'use client'

import { useState, useEffect } from 'react'
import { Eye, EyeOff, LogIn, UserPlus, Mail, ArrowLeft } from 'lucide-react'
import { useSupabase } from '@/components/AuthProvider'

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-password'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const { client } = useSupabase()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('verified') === 'true') {
      setSuccess('邮箱验证成功！请登录')
    }
    if (params.get('error') === 'verify-failed') {
      setError('邮箱验证失败，请重试')
    }
    if (params.get('reset') === 'true') {
      setMode('reset-password')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!client) {
        setError('服务未连接，请稍后重试')
        return
      }

      if (mode === 'login') {
        const result = await client.auth.signInWithPassword({
          email,
          password,
        })

        if (result.error) {
          setError(result.error.message)
        } else {
          window.location.href = '/'
        }
      } else if (mode === 'register') {
        const result = await client.auth.signUp({
          email,
          password,
          options: {
            data: { username },
          },
        })

        if (result.error) {
          setError(result.error.message)
        } else {
          setSuccess('注册成功！请检查邮箱验证')
          setMode('login')
          setEmail('')
          setPassword('')
          setUsername('')
        }
      } else if (mode === 'forgot-password') {
        const result = await client.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?reset=true`,
        })

        if (result.error) {
          setError(result.error.message)
        } else {
          setSuccess('密码重置链接已发送到您的邮箱')
        }
      } else if (mode === 'reset-password') {
        if (password !== confirmPassword) {
          setError('两次输入的密码不一致')
          return
        }

        const result = await client.auth.updateUser({
          password,
        })

        if (result.error) {
          setError(result.error.message)
        } else {
          setSuccess('密码重置成功！请登录')
          setMode('login')
          setPassword('')
          setConfirmPassword('')
        }
      }
    } catch (err) {
      setError('发生错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  const getTitle = () => {
    switch (mode) {
      case 'login': return '登录'
      case 'register': return '注册'
      case 'forgot-password': return '忘记密码'
      case 'reset-password': return '重置密码'
    }
  }

  const getSubmitText = () => {
    switch (mode) {
      case 'login': return '登录'
      case 'register': return '注册'
      case 'forgot-password': return '发送重置链接'
      case 'reset-password': return '重置密码'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">V</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">品牌VI生成器</h1>
          <p className="text-gray-500 mt-2">创建专业的品牌视觉识别系统</p>
        </div>

        <div className="card p-6">
          {mode !== 'login' && (
            <button
              onClick={() => setMode('login')}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
          )}

          {mode === 'login' && (
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setMode('login')}
                className="flex-1 py-2 px-4 rounded-lg font-medium transition-all bg-brand-500 text-white"
              >
                <LogIn className="w-4 h-4 inline mr-2" />
                登录
              </button>
              <button
                onClick={() => setMode('register')}
                className="flex-1 py-2 px-4 rounded-lg font-medium transition-all bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                <UserPlus className="w-4 h-4 inline mr-2" />
                注册
              </button>
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-900 mb-6">{getTitle()}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="输入用户名"
                  required
                />
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'forgot-password') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="输入邮箱地址"
                  required
                />
              </div>
            )}

            {(mode === 'login' || mode === 'register' || mode === 'reset-password') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all pr-12"
                    placeholder="输入密码"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {mode === 'reset-password' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  placeholder="再次输入密码"
                  required
                />
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-500 text-sm bg-green-50 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  处理中...
                </span>
              ) : (
                getSubmitText()
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setMode('forgot-password')}
                className="text-brand-500 hover:text-brand-600 text-sm flex items-center justify-center gap-1"
              >
                <Mail className="w-4 h-4" />
                忘记密码？
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
