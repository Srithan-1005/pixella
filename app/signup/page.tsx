'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Lock, Mail, User, Briefcase, Building, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  const router = useRouter()
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [targetTitle, setTargetTitle] = useState('')
  const [company, setCompany] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (role === 'recruiter') {
        // Save recruiter account data
        localStorage.setItem('hireorbit_user', JSON.stringify({
          fullName: name,
          email: email,
          phone: '',
          location: '',
          title: 'Recruiter',
          company: company || 'My Company',
          role: 'recruiter',
          atsScore: 0
        }))
      } else {
        // Save candidate account data
        localStorage.setItem('hireorbit_user', JSON.stringify({
          fullName: name,
          email: email,
          phone: '',
          location: '',
          title: targetTitle || 'Professional',
          role: 'candidate',
          atsScore: 0
        }))
      }
    } catch (err) {
      console.error(err)
    }
    setTimeout(() => {
      setLoading(false)
      // ── Route based on role ──
      if (role === 'recruiter') {
        router.push('/recruiter')
      } else {
        router.push('/dashboard/upload-resume')
      }
    }, 500)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-[#030303] flex items-center justify-center relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] right-[-15%] opacity-40 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[5%] left-[-15%] opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl relative z-10"
      >
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
          <h1 className="text-3xl font-bold text-white tracking-tight">Create Your Account</h1>
          <p className="text-white/40 text-sm mt-1">Accelerate your career with next-generation AI intelligence</p>
        </div>

        <div className="premium-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl bg-[#09090f]/80">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setRole('candidate')}
              className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'candidate'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              Job Seeker / Student
            </button>
            <button
              type="button"
              onClick={() => setRole('recruiter')}
              className={`py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                role === 'recruiter'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Recruiter / Hiring Team
            </button>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                  />
                </div>
              </div>

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
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                  />
                </div>
              </div>

              <div>
                {role === 'recruiter' ? (
                  <>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. TechCorp India"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                      Target Role / Domain
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={targetTitle}
                        onChange={(e) => setTargetTitle(e.target.value)}
                        placeholder="e.g. AI / Full Stack Engineer"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              {role === 'recruiter' ? (
                <>
                  <div className="text-xs font-semibold text-white/80">Recruiter Free Plan Includes:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-white/60">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Post up to 5 Jobs</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI Candidate Matching</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hiring Pipeline Board</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Analytics Dashboard</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-semibold text-white/80">Included with Free Account:</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-white/60">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant ATS Resume Score</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Semantic Job Matching</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI Mock Interview Prep</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2026 Salary Benchmarks</div>
                  </div>
                </>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 text-white font-semibold rounded-xl shadow-lg mt-3 ${
                role === 'recruiter'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-violet-500/25'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-indigo-500/25'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {role === 'recruiter' ? 'Setting Up Recruiter Portal...' : 'Creating Account...'}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {role === 'recruiter' ? 'Launch Recruiter Portal' : 'Get Started Free'} <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-white/50">
            Already have an account?{' '}
            <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline-offset-4 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
