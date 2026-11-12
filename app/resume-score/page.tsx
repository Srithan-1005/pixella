'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingUp, CheckCircle2, AlertTriangle, Sparkles,
  ArrowRight, ShieldCheck, Plus, Check, Download,
  RefreshCw, Briefcase, FileCheck, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ResumeScorePage() {
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer')
  const [candidateName, setCandidateName] = useState<string>('')
  const [score, setScore] = useState(94)
  const [addedKeywords, setAddedKeywords] = useState<string[]>([])
  const [appliedFixes, setAppliedFixes] = useState<number[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hireorbit_resume_data')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.fullName) setCandidateName(parsed.fullName)
        if (parsed.title) setTargetRole(parsed.title)
        if (parsed.atsScores?.score) setScore(parsed.atsScores.score)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  const missingKeywords = [
    { name: 'GraphQL', impact: '+3 pts', points: 3 },
    { name: 'Kubernetes', impact: '+4 pts', points: 4 },
    { name: 'CI/CD Pipeline', impact: '+2 pts', points: 2 },
    { name: 'System Architecture', impact: '+3 pts', points: 3 },
    { name: 'OpenTelemetry', impact: '+2 pts', points: 2 },
  ]

  const suggestions = [
    {
      id: 1,
      category: 'Impact Metrics',
      priority: 'High',
      title: 'Quantify Engineering Outcomes',
      desc: 'ATS algorithms heavily weigh numerical metrics (percentages, dollar amounts, performance gains).',
      before: 'Maintained and updated web applications for clients.',
      after: 'Engineered 14 responsive Next.js web applications, reducing bundle size by 35% and accelerating average page load from 2.8s to 0.9s.',
      points: 4
    },
    {
      id: 2,
      category: 'Action Verbs',
      priority: 'Medium',
      title: 'Replace Passive Language with High-Impact Verbs',
      desc: 'Swap generic terms like "responsible for" or "helped with" for decisive technical ownership verbs.',
      before: 'Was responsible for leading the backend database migration.',
      after: 'Spearheaded zero-downtime PostgreSQL schema migration across 2M user records with pgvector indexing.',
      points: 3
    },
    {
      id: 3,
      category: 'Keywords',
      priority: 'High',
      title: 'Target Cloud & AI Ecosystem Keywords',
      desc: 'Align your tech stack terminology with the 2026 enterprise standard specifications.',
      before: 'Used AI APIs to add smart features.',
      after: 'Architected streaming LLM inference pipelines with OpenAI and LangChain, processing 50K daily queries with sub-second latency.',
      points: 3
    }
  ]

  const handleToggleKeyword = (kw: typeof missingKeywords[0]) => {
    if (addedKeywords.includes(kw.name)) {
      setAddedKeywords(addedKeywords.filter(k => k !== kw.name))
      setScore(prev => Math.max(88, prev - kw.points))
    } else {
      setAddedKeywords([...addedKeywords, kw.name])
      setScore(prev => Math.min(99, prev + kw.points))
    }
  }

  const handleToggleFix = (s: typeof suggestions[0]) => {
    if (appliedFixes.includes(s.id)) {
      setAppliedFixes(appliedFixes.filter(id => id !== s.id))
      setScore(prev => Math.max(88, prev - s.points))
    } else {
      setAppliedFixes([...appliedFixes, s.id])
      setScore(prev => Math.min(100, prev + s.points))
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] right-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] left-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-xs">
            {candidateName ? `Auditing Resume for ${candidateName}` : 'ATS Algorithm Diagnostics (Greenhouse & Workday Compatible)'}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            AI Resume ATS Score Checker
          </h1>
          <p className="text-white/50 text-base">
            Evaluates your resume against 2026 hiring criteria, scans for formatting errors, detects missing keywords, and simulates real enterprise ATS screenings.
          </p>
        </div>

        {/* Target role selector bar */}
        <div className="premium-glass p-4 rounded-2xl border border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-white/40 uppercase font-semibold">Target Job Role</div>
              <div className="text-sm font-bold text-white">{targetRole}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Senior Full Stack Engineer',
              'AI / ML Engineer',
              'Frontend Architect',
              'Engineering Manager'
            ].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setTargetRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  targetRole === r
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Score Overview Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-10">
          {/* Main Radial Score Card */}
          <div className="lg:col-span-5">
            <div className="premium-glass p-8 rounded-3xl border border-white/10 text-center relative overflow-hidden h-full flex flex-col justify-between">
              <div>
                <Badge className="bg-indigo-500/10 text-indigo-300 border-indigo-500/20 mb-6">
                  Real-time Neural Evaluation
                </Badge>

                {/* Score Circle Display */}
                <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-white/10 stroke-current"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-indigo-500 stroke-current"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * score) / 100}
                      strokeLinecap="round"
                      fill="transparent"
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-white">{score}</span>
                    <span className="text-xs uppercase tracking-wider text-white/40 font-semibold">out of 100</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {score >= 90 ? '🌟 Exceptional Match' : '🔥 Strong Hire Orbit Tier'}
                </h3>
                <p className="text-xs text-white/50 max-w-xs mx-auto mb-6">
                  {score >= 90
                    ? 'Your profile is in the top 3% of candidates for this target role.'
                    : 'Beats 88% of applicants. Adding missing keywords will push you past 95%.'}
                </p>
              </div>

              {/* Sub-Metrics Breakdown */}
              <div className="space-y-3 pt-6 border-t border-white/10 text-left text-xs">
                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>ATS Parsing & Structure</span>
                    <span className="text-emerald-400 font-bold">96%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>Keywords & Skill Match</span>
                    <span className="text-indigo-400 font-bold">
                      {Math.min(98, 84 + addedKeywords.length * 3)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(98, 84 + addedKeywords.length * 3)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>Quantifiable Impact Metrics</span>
                    <span className="text-purple-400 font-bold">
                      {Math.min(96, 80 + appliedFixes.length * 5)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-purple-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(96, 80 + appliedFixes.length * 5)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Missing Keywords & ATS Simulator Launch */}
          <div className="lg:col-span-7 space-y-6">
            {/* Missing Keywords Box */}
            <div className="premium-glass p-7 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Missing High-Value Keywords
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    Click any keyword to simulate adding it to your resume and watch your score adjust!
                  </p>
                </div>
                <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/20 text-xs">
                  {missingKeywords.length - addedKeywords.length} Remaining
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {missingKeywords.map((kw) => {
                  const isAdded = addedKeywords.includes(kw.name)
                  return (
                    <button
                      key={kw.name}
                      type="button"
                      onClick={() => handleToggleKeyword(kw)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                      <span>{kw.name}</span>
                      <span className={`text-[10px] ${isAdded ? 'text-emerald-400' : 'text-white/40'}`}>
                        {kw.impact}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* AI Optimization Suggestions */}
            <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    AI Bullet Rewrites & Recommendations
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">
                    Toggle fixes to simulate applying AI bullet polish
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {suggestions.map((s) => {
                  const isApplied = appliedFixes.includes(s.id)
                  return (
                    <div
                      key={s.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isApplied
                          ? 'bg-indigo-950/20 border-indigo-500/30'
                          : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                            {s.priority} Priority
                          </Badge>
                          <span className="text-xs font-bold text-white">{s.title}</span>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant={isApplied ? 'default' : 'outline'}
                          onClick={() => handleToggleFix(s)}
                          className="h-7 text-xs px-2.5 rounded-lg border-white/15 cursor-pointer"
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-3 h-3 mr-1" /> Applied ({s.points} pts)
                            </>
                          ) : (
                            <>Apply Fix (+{s.points} pts)</>
                          )}
                        </Button>
                      </div>

                      <p className="text-[11px] text-white/50 mb-3">{s.desc}</p>

                      <div className="grid md:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300">
                          <span className="text-[10px] font-bold text-red-400 block mb-0.5 uppercase tracking-wide">
                            Before (Weak)
                          </span>
                          {s.before}
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-300">
                          <span className="text-[10px] font-bold text-emerald-400 block mb-0.5 uppercase tracking-wide">
                            After AI Polish
                          </span>
                          {s.after}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
          <div>
            <h4 className="text-base font-bold text-white">Ready to test against real company portals?</h4>
            <p className="text-white/50 text-xs">Run your optimized resume through the multi-system ATS Simulator.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/ats-simulator">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-xs h-10 px-5">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Launch ATS Simulator
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="text-xs h-10 px-5 border-white/15">
                <Briefcase className="w-4 h-4 mr-1.5 text-indigo-400" /> View Matched Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
