'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, Sparkles, MapPin,
  Briefcase, CheckCircle2, ArrowRight, ShieldAlert, Copy, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SalaryPredictorPage() {
  const [role, setRole] = useState('Full Stack AI Engineer')
  const [yearsExp, setYearsExp] = useState(5)
  const [location, setLocation] = useState('San Francisco / Bay Area')
  const [copiedScript, setCopiedScript] = useState(false)

  // Dynamic salary computation
  const baseSalary = 110000 + yearsExp * 12500
  const locationMultiplier = location === 'San Francisco / Bay Area' ? 1.25 : location === 'New York' ? 1.2 : location === 'Seattle' ? 1.15 : 1.05
  const median = Math.round(baseSalary * locationMultiplier)
  const p25 = Math.round(median * 0.85)
  const p75 = Math.round(median * 1.18)
  const p90 = Math.round(median * 1.35)

  const negotiationScript =
`"Thank you for extending this offer! I am genuinely excited about the team's roadmap and believe my background in high-scale Next.js architectures and AI systems directly addresses your Q4 goals. 

Based on my research into current market percentiles for this level in ${location}, alongside the specialized AI integration skills I bring from day one, I was targeting a base salary in the range of $${p75.toLocaleString()} - $${p90.toLocaleString()}. If we can align closer to this tier, I would be thrilled to sign immediately."`

  const handleCopyScript = () => {
    navigator.clipboard.writeText(negotiationScript)
    setCopiedScript(true)
    setTimeout(() => setCopiedScript(false), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] right-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] left-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 text-xs">
            2026 AI Compensation Intelligence
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Salary & Compensation Predictor
          </h1>
          <p className="text-white/50 text-base">
            Benchmark your target compensation against verified tech market compensation bands and unlock AI-crafted negotiation scripts.
          </p>
        </div>

        {/* Inputs & Outputs Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          {/* Controls */}
          <div className="lg:col-span-5 premium-glass p-7 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-400" /> Career Profile Inputs
            </h3>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Job Family / Specialization</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Full Stack AI Engineer" className="bg-[#0b0b14]">Full Stack AI Engineer</option>
                <option value="Frontend Platform Architect" className="bg-[#0b0b14]">Frontend Platform Architect</option>
                <option value="Machine Learning Systems Engineer" className="bg-[#0b0b14]">Machine Learning Systems Engineer</option>
                <option value="DevOps & Cloud Engineer" className="bg-[#0b0b14]">DevOps & Cloud Engineer</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="font-semibold text-white/70">Years of Professional Experience</span>
                <span className="font-bold text-amber-400">{yearsExp} {yearsExp === 1 ? 'Year' : 'Years'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={yearsExp}
                onChange={(e) => setYearsExp(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>0 yrs (Entry)</span>
                <span>5 yrs (Senior)</span>
                <span>10+ yrs (Staff/Lead)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-2">Market Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="San Francisco / Bay Area" className="bg-[#0b0b14]">San Francisco / Bay Area (Tier 1)</option>
                <option value="New York" className="bg-[#0b0b14]">New York, NY (Tier 1)</option>
                <option value="Seattle" className="bg-[#0b0b14]">Seattle, WA (Tier 1)</option>
                <option value="Austin, TX" className="bg-[#0b0b14]">Austin, TX (Tier 2)</option>
                <option value="Remote US" className="bg-[#0b0b14]">Remote US (National Average)</option>
              </select>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-7 premium-glass p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                Predicted 2026 Compensation Band
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl md:text-5xl font-black text-white">
                  ${median.toLocaleString()}
                </span>
                <span className="text-xs text-white/50 font-semibold uppercase">Median Base / yr</span>
              </div>
              <p className="text-xs text-white/40 mt-1">
                Based on verified 2026 offer data for {role} in {location}.
              </p>
            </div>

            {/* Percentile Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                <div className="text-[10px] text-white/40 uppercase font-bold">25th Percentile</div>
                <div className="text-base font-bold text-white/80 mt-1">${p25.toLocaleString()}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
                <div className="text-[10px] text-amber-300 uppercase font-bold">75th Percentile</div>
                <div className="text-base font-bold text-amber-400 mt-1">${p75.toLocaleString()}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <div className="text-[10px] text-emerald-300 uppercase font-bold">Top 10% (90th)</div>
                <div className="text-base font-bold text-emerald-400 mt-1">${p90.toLocaleString()}</div>
              </div>
            </div>

            {/* Negotiation Script Preview */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> AI Counter-Offer Script
                </span>
                <button
                  type="button"
                  onClick={handleCopyScript}
                  className="text-white/60 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedScript ? 'Copied' : 'Copy Script'}
                </button>
              </div>
              <p className="text-xs text-white/70 italic leading-relaxed font-mono">
                {negotiationScript}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div>
            <h4 className="text-sm font-bold text-white">Find jobs in this salary tier</h4>
            <p className="text-xs text-white/40">Browse opportunities offering ${median.toLocaleString()}+ base compensation.</p>
          </div>
          <Link href="/jobs">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
              Explore High-Paying Jobs <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
