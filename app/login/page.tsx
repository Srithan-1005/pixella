'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Lock, Mail, Eye, EyeOff, CheckCircle2, UserCheck, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [demoRole, setDemoRole] = useState<'candidate' | 'recruiter'>('candidate')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Check if user already has a stored account with a role
      const existingUser = localStorage.getItem('hireorbit_user')
      let savedRole: 'candidate' | 'recruiter' = 'candidate'
      if (existingUser) {
        try {
          const parsed = JSON.parse(existingUser)
          if (parsed.role === 'recruiter') savedRole = 'recruiter'
        } catch { /* ignore */ }
      }
      const username = email ? email.split('@')[0] : 'Srithan Kontham'
      const formattedName = username.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      localStorage.setItem('hireorbit_user', JSON.stringify({
        fullName: existingUser ? JSON.parse(existingUser).fullName || formattedName : formattedName,
        email: email || 'konthamsrithan@gmail.com',
        phone: existingUser ? JSON.parse(existingUser).phone || '+91 6281919862' : '+91 6281919862',
        location: existingUser ? JSON.parse(existingUser).location || 'Hyderabad, India' : 'Hyderabad, India',
        title: existingUser ? JSON.parse(existingUser).title || 'AI & Full Stack Engineer' : 'AI & Full Stack Engineer',
        company: existingUser ? JSON.parse(existingUser).company || '' : '',
        role: savedRole,
        atsScore: existingUser ? JSON.parse(existingUser).atsScore || 96 : 96
      }))
      setTimeout(() => {
        setLoading(false)
        // Route based on role
        if (savedRole === 'recruiter') {
          router.push('/recruiter')
        } else {
          router.push('/profile')
        }
      }, 500)
    } catch (err) {
      console.error(err)
      setTimeout(() => {
        setLoading(false)
        router.push('/profile')
      }, 500)
    }
  }

  const handleQuickDemo = (role: 'candidate' | 'recruiter') => {
    setLoading(true)
    if (role === 'candidate') {
      setEmail('konthamsrithan@gmail.com')
      setPassword('••••••••••••')
      localStorage.setItem('hireorbit_user', JSON.stringify({
        fullName: 'Srithan Kontham',
        email: 'konthamsrithan@gmail.com',
        phone: '+91 6281919862',
        location: 'Hyderabad, India',
        title: 'AI & Full Stack Engineer',
        role: 'candidate',
        atsScore: 96
      }))
    } else {
      setEmail('recruiter.demo@hireorbit.dev')
      setPassword('••••••••••••')
      localStorage.setItem('hireorbit_user', JSON.stringify({
        fullName: 'Elena Rostova',
        email: 'elena@neuralorbit.dev',
        phone: '+1 (555) 890-1234',
        location: 'San Francisco, CA',
        title: 'Technical Talent Acquisition Lead',
        company: 'NeuralOrbit Labs',
        role: 'recruiter',
        atsScore: 99
      }))
    }
    setTimeout(() => {
      setLoading(false)
      // ── Route based on role ──
      if (role === 'recruiter') {
        router.push('/recruiter')
      } else {
        router.push('/profile')
      }
    }, 450)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-[#030303] flex items-center justify-center relative overflow-hidden">
      {/* Background radial glows */}
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-40 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[5%] right-[-15%] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Brand header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/25">
              <div className="w-full h-full bg-[#0b0b0f] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold tracking-tight text-white block">
                Hire<span className="text-indigo-400">Orbit</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-white/40 font-semibold">
                AI Career Cloud
              </span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-white/40 text-sm mt-1">Sign in to your AI Career Dashboard</p>
        </div>

        {/* Form container */}
        <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl bg-[#09090f]/80">
          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-300 font-medium">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Instant Demo Mode:</span>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemo('candidate')}
                className="px-2.5 py-1 rounded-lg bg-indigo-600/60 hover:bg-indigo-600 text-white font-semibold text-[11px] transition-all cursor-pointer"
              >
                Candidate
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('recruiter')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] transition-all cursor-pointer"
              >
                Recruiter
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Social login divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <span className="relative px-3 bg-[#09090f] text-[11px] text-white/40 uppercase tracking-wider">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickDemo('candidate')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('candidate')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 text-xs font-semibold transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.27-2.09 3.67-5.17 3.67-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.28v3.15C3.26 21.36 7.36 24 12 24z" />
                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.39l3.99-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.28 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
              </svg>
              Google
            </button>
          </div>

          <div className="mt-8 text-center text-xs text-white/50">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold underline-offset-4 hover:underline">
              Sign up for free
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
