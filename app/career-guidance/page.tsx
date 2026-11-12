'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Compass, Sparkles, TrendingUp, Award,
  ArrowRight, CheckCircle2, ChevronRight, BookOpen,
  Target, Layers, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CareerGuidancePage() {
  const [selectedTrack, setSelectedTrack] = useState<'ai_systems' | 'staff_frontend' | 'management'>('ai_systems')

  const tracks = {
    ai_systems: {
      title: 'AI Systems Architect & Staff Engineer',
      salaryRange: '$210,000 - $310,000',
      timeframe: '12 - 18 months',
      milestones: [
        {
          stage: 'Phase 1: Agentic Workflows & Multi-Modal Models',
          desc: 'Master LangGraph, AutoGen, and tool-calling architectures for agentic autonomy.',
          completed: true
        },
        {
          stage: 'Phase 2: High-Performance Vector Retrieval & RAG',
          desc: 'Implement hybrid lexical/dense search with HNSW indexes and low-latency reranking.',
          completed: true
        },
        {
          stage: 'Phase 3: Distributed LLM Serving & Model Distillation',
          desc: 'Deploy vLLM, TensorRT-LLM, and quantization (AWQ/GPTQ) for cost-effective inference at scale.',
          completed: false
        },
        {
          stage: 'Phase 4: Executive System Architecture & Leadership',
          desc: 'Define cross-org AI governance, latency SLOs, and mentor staff engineering candidates.',
          completed: false
        }
      ],
      skillsToAcquire: ['vLLM', 'Ray', 'CUDA Basics', 'Kubernetes GPU Scheduling', 'RAG Evaluations (Ragas)'],
      certifications: ['AWS Machine Learning Specialty', 'DeepLearning.AI LLM Systems Certification']
    },
    staff_frontend: {
      title: 'Staff Frontend & Web Platform Architect',
      salaryRange: '$195,000 - $280,000',
      timeframe: '9 - 14 months',
      milestones: [
        {
          stage: 'Phase 1: Core Web Vitals Mastery & Streaming SSR',
          desc: 'Achieve sub-800ms LCP on enterprise applications using React 19 RSC & edge workers.',
          completed: true
        },
        {
          stage: 'Phase 2: Design Systems & Multi-Brand Tokens',
          desc: 'Scale an accessible, zero-runtime CSS token architecture across 12+ company products.',
          completed: false
        },
        {
          stage: 'Phase 3: WebAssembly & 3D Interactive Canvas',
          desc: 'Integrate WebGL/Three.js or Rust WebAssembly pipelines into high-touch web apps.',
          completed: false
        }
      ],
      skillsToAcquire: ['React Server Components', 'Turborepo', 'Three.js / WebGL', 'Micro-Frontends', 'Wasm'],
      certifications: ['Google Web Performance Certified', 'Accessibility (W3C WAS / CPACC)']
    },
    management: {
      title: 'Engineering Manager & Director of Engineering',
      salaryRange: '$220,000 - $330,000',
      timeframe: '18 - 24 months',
      milestones: [
        {
          stage: 'Phase 1: Tech Lead & Sprint Ownership',
          desc: 'Manage sprint velocity, stakeholder roadmaps, and 1-on-1 career development for 6 engineers.',
          completed: true
        },
        {
          stage: 'Phase 2: Hiring & Talent Pipeline Scaling',
          desc: 'Standardize technical interview loops and hire senior and staff contributors.',
          completed: false
        },
        {
          stage: 'Phase 3: Department Budgeting & Strategic Vision',
          desc: 'Align headcount budgets, cloud spend, and product KPIs with C-suite objectives.',
          completed: false
        }
      ],
      skillsToAcquire: ['Strategic OKRs', 'Team Topologies', 'Budgeting & P&L', 'Executive Communication', 'Retention Engineering'],
      certifications: ['Scrum Master / Agile Leader', 'Reforge Engineering Executive Leadership']
    }
  }

  const currentTrack = tracks[selectedTrack]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] right-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] left-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-amber-500/10 text-amber-400 border-amber-500/20 px-4 py-1 text-xs">
            2026 AI Career Trajectory Navigator
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Personalized Career Guidance
          </h1>
          <p className="text-white/50 text-base">
            AI recommends your highest-ROI career trajectories, next promotion targets, required technical skills, and salary milestones.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { id: 'ai_systems', label: 'AI Systems Architect', badge: 'High Demand' },
            { id: 'staff_frontend', label: 'Staff Frontend Architect', badge: 'Popular' },
            { id: 'management', label: 'Engineering Manager', badge: 'Leadership' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTrack(t.id as any)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                selectedTrack === t.id
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/15'
                  : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">{t.label}</span>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-medium">
                  {t.badge}
                </span>
              </div>
              <span className="text-[11px] text-white/40">Select track roadmap</span>
            </button>
          ))}
        </div>

        {/* Roadmap Details Card */}
        <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider">
                Recommended Path
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{currentTrack.title}</h2>
              <p className="text-xs text-white/40 mt-1">Estimated runway: {currentTrack.timeframe}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                Target Compensation
              </span>
              <div className="text-2xl font-black text-white">{currentTrack.salaryRange}</div>
            </div>
          </div>

          {/* Stepped Milestones */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Progression Milestones
            </h3>
            <div className="space-y-4">
              {currentTrack.milestones.map((m, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border transition-all ${
                    m.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        m.completed ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {m.completed ? '✓' : i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{m.stage}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Certifications */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> Highest-Value Skills to Master
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentTrack.skillsToAcquire.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
                    + {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-purple-400" /> Recommended Certifications
              </h4>
              <div className="space-y-2">
                {currentTrack.certifications.map((c) => (
                  <div key={c} className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div>
            <h4 className="text-sm font-bold text-white">Want to test your compensation readiness?</h4>
            <p className="text-xs text-white/40">Check live market percentiles for this career path.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/salary-predictor">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                Launch Salary Predictor
              </Button>
            </Link>
            <Link href="/skill-gap">
              <Button size="sm" variant="outline" className="text-xs border-white/15">
                Analyze Skill Gap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
