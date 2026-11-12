'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3, CheckCircle2, AlertCircle, Sparkles,
  ArrowRight, BookOpen, Layers, Target, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SkillGapPage() {
  const [targetRole, setTargetRole] = useState('AI Full Stack Architect')

  const skillsData = {
    matched: [
      { name: 'React 19 & Next.js 15', level: 'Expert (95%)' },
      { name: 'TypeScript', level: 'Advanced (90%)' },
      { name: 'PostgreSQL & pgvector', level: 'Advanced (85%)' },
      { name: 'OpenAI API & Embeddings', level: 'Advanced (88%)' },
      { name: 'Node.js & FastAPI', level: 'Proficient (82%)' },
    ],
    missing: [
      { name: 'LangGraph & Agentic Memory', priority: 'High', marketDemand: '+142%', effort: '2 weeks' },
      { name: 'Kubernetes & GPU Workloads', priority: 'High', marketDemand: '+98%', effort: '3 weeks' },
      { name: 'vLLM & Local Model Serving', priority: 'Medium', marketDemand: '+85%', effort: '1 week' },
      { name: 'Ragas / LLM Evaluation Metrics', priority: 'Medium', marketDemand: '+74%', effort: '1 week' },
    ],
    learningPlan: [
      { week: 'Week 1', focus: 'Agentic Architectures with LangGraph', tasks: 'Build a multi-agent research assistant with persistent memory and tool calling.' },
      { week: 'Week 2', focus: 'vLLM & High-Throughput Inference', tasks: 'Containerize and run quantized Llama 3 models on local GPUs with continuous batching.' },
      { week: 'Week 3', focus: 'Production RAG Evaluation', tasks: 'Benchmark retrieval accuracy using context precision and faithfulness metrics in Ragas.' },
      { week: 'Week 4', focus: 'Kubernetes Pod Deployment', tasks: 'Write Helm charts to deploy autoscaling microservices with Prometheus observability.' },
    ]
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-rose-500/10 text-rose-400 border-rose-500/20 px-4 py-1 text-xs">
            2026 Skill Gap & Learning Sprint
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Skill Gap Analyzer
          </h1>
          <p className="text-white/50 text-base">
            Identify the exact missing technologies that stand between your current resume and top-tier engineering roles.
          </p>
        </div>

        {/* Target role switcher */}
        <div className="premium-glass p-4 rounded-2xl border border-white/10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-rose-400" />
            <div>
              <div className="text-[11px] text-white/40 uppercase font-semibold">Benchmarked Against</div>
              <div className="text-sm font-bold text-white">{targetRole}</div>
            </div>
          </div>

          <div className="flex gap-2">
            {['AI Full Stack Architect', 'Lead Frontend Engineer', 'Cloud Infrastructure Lead'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTargetRole(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  targetRole === r
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Matched Skills */}
          <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Existing Verified Proficiencies ({skillsData.matched.length})
              </h3>
              <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20 text-xs">
                78% Match
              </Badge>
            </div>

            <div className="space-y-2.5">
              {skillsData.matched.map((s) => (
                <div key={s.name} className="p-3 rounded-xl bg-emerald-950/15 border border-emerald-500/20 flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{s.name}</span>
                  <span className="text-emerald-400 font-bold">{s.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                Missing Critical Skills ({skillsData.missing.length})
              </h3>
              <Badge className="bg-rose-500/10 text-rose-300 border-rose-500/20 text-xs">
                Highest ROI
              </Badge>
            </div>

            <div className="space-y-2.5">
              {skillsData.missing.map((s) => (
                <div key={s.name} className="p-3 rounded-xl bg-rose-950/15 border border-rose-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">{s.name}</span>
                    <span className="text-[10px] text-white/40">Estimated effort: {s.effort}</span>
                  </div>
                  <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/20">
                    {s.marketDemand} hiring demand
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Week Learning Sprint Plan */}
        <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Recommended 4-Week Fast-Track Learning Sprint
              </h3>
              <p className="text-xs text-white/40 mt-1">
                Bridge all missing skills to raise your profile match score from 78% to 96%.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsData.learningPlan.map((p, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">
                  {p.week}
                </span>
                <h4 className="text-xs font-bold text-white">{p.focus}</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">{p.tasks}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div>
            <h4 className="text-sm font-bold text-white">Add mastered skills back to your resume</h4>
            <p className="text-xs text-white/40">Re-run your ATS evaluation to verify score gains.</p>
          </div>
          <Link href="/resume-score">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
              Recalculate ATS Score <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
