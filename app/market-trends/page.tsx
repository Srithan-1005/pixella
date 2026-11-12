'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingUp, Sparkles, Compass, Flame,
  DollarSign, Globe, Building2, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function MarketTrendsPage() {
  const trendingSkills = [
    { name: 'Agentic AI Workflows (LangGraph/AutoGen)', growth: '+142%', category: 'AI/ML', avgSalary: '$195k' },
    { name: 'Rust & Systems WebAssembly', growth: '+98%', category: 'Backend/Systems', avgSalary: '$180k' },
    { name: 'React 19 & Next.js 15 Server Components', growth: '+76%', category: 'Frontend', avgSalary: '$165k' },
    { name: 'pgvector & Hybrid Vector Search', growth: '+68%', category: 'Database', avgSalary: '$170k' },
    { name: 'Kubernetes GPU Operator Scheduling', growth: '+62%', category: 'DevOps/Cloud', avgSalary: '$185k' },
  ]

  const topHiringCompanies = [
    { name: 'OpenAI Ecosystem', openings: '240+ roles', focus: 'Model evaluations, distributed training, frontend web' },
    { name: 'Anthropic & Tier-1 Labs', openings: '180+ roles', focus: 'AI alignment, safety pipelines, systems engineering' },
    { name: 'Fintech & Stripe Partners', openings: '310+ roles', focus: 'Real-time payment rails, fraud detection, UI architecture' },
    { name: 'Autonomous Enterprise Cloud', openings: '420+ roles', focus: 'Kubernetes orchestration, SOC2 compliance, edge proxies' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1 text-xs">
            2026 Live Tech Hiring Radar
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Market Trends Dashboard
          </h1>
          <p className="text-white/50 text-base">
            Real-time analytics on tech hiring volume, high-growth frameworks, remote flexibility, and compensation surges.
          </p>
        </div>

        {/* High Level Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="premium-glass p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-white/50 font-medium">Remote Work Index</span>
            <div className="text-2xl font-bold text-white mt-1">68.4%</div>
            <span className="text-[10px] text-emerald-400 font-medium">↑ +3.2% vs 2025</span>
          </div>
          <div className="premium-glass p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-white/50 font-medium">Avg Engineering Base</span>
            <div className="text-2xl font-bold text-white mt-1">$162,000</div>
            <span className="text-[10px] text-emerald-400 font-medium">↑ +5.8% YoY</span>
          </div>
          <div className="premium-glass p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-white/50 font-medium">AI Integration Rate</span>
            <div className="text-2xl font-bold text-white mt-1">84% of Roles</div>
            <span className="text-[10px] text-purple-400 font-medium">Require LLM familiarity</span>
          </div>
          <div className="premium-glass p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-white/50 font-medium">Avg Time to Hire</span>
            <div className="text-2xl font-bold text-white mt-1">18 Days</div>
            <span className="text-[10px] text-indigo-400 font-medium">Accelerated via AI screening</span>
          </div>
        </div>

        {/* Trending Skills Table */}
        <div className="premium-glass p-7 rounded-3xl border border-white/10 shadow-2xl mb-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-400" /> Fastest Growing Skills in 2026
            </h3>
            <span className="text-xs text-white/40">Ranked by hiring posting surge</span>
          </div>

          <div className="space-y-3">
            {trendingSkills.map((s, i) => (
              <div
                key={s.name}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-bold text-white/50 text-[11px]">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="font-bold text-white">{s.name}</span>
                    <span className="text-white/40 block text-[10px]">{s.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-white/40 block">Avg Salary</span>
                    <span className="font-semibold text-emerald-400">{s.avgSalary}</span>
                  </div>
                  <Badge className="bg-rose-500/15 text-rose-300 border-rose-500/30 font-bold">
                    {s.growth} YoY
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Hiring Ecosystems */}
        <div className="premium-glass p-7 rounded-3xl border border-white/10 shadow-2xl mb-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/10">
            <Building2 className="w-4 h-4 text-indigo-400" /> Leading Hiring Sectors & Ecosystems
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {topHiringCompanies.map((c) => (
              <div key={c.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="text-indigo-400 font-semibold">{c.openings}</span>
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">{c.focus}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div>
            <h4 className="text-sm font-bold text-white">Position yourself for trending 2026 roles</h4>
            <p className="text-xs text-white/40">Audit your resume to see how many trending skills you already possess.</p>
          </div>
          <Link href="/resume-score">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
              Check Your Skill Alignment <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
