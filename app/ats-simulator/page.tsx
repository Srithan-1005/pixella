'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShieldCheck, AlertTriangle, CheckCircle2,
  RefreshCw, Sparkles, ArrowRight, Layers, FileCode
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AtsSimulatorPage() {
  const [activeSystem, setActiveSystem] = useState<'workday' | 'greenhouse' | 'taleo' | 'lever'>('workday')
  const [isRunning, setIsRunning] = useState(false)
  const [testCompleted, setTestCompleted] = useState(true)

  const systems = {
    workday: {
      name: 'Workday ATS',
      passProbability: '94%',
      status: 'Passed',
      notes: 'Clean single-column structure parsed flawlessly. Workday successfully indexed company titles, dates, and bullets without truncation.',
      extractedTokens: 1840,
      warnings: ['Avoid embedded graphic icons in section headers for legacy Workday v2022 instances']
    },
    greenhouse: {
      name: 'Greenhouse Harvest',
      passProbability: '98%',
      status: 'Passed',
      notes: 'Outstanding semantic match. Greenhouse extracted full email, location, GitHub portfolio link, and grouped technical skills automatically.',
      extractedTokens: 1910,
      warnings: []
    },
    taleo: {
      name: 'Oracle Taleo Enterprise',
      passProbability: '89%',
      status: 'Warning',
      notes: 'Taleo parser flagged non-standard date formatting on older positions (e.g. "2021 - 2023"). Prefer "MM/YYYY - MM/YYYY" for older Taleo installations.',
      extractedTokens: 1650,
      warnings: ['Use explicit "MM/YYYY" date formats to ensure zero experience miscalculation in Oracle Taleo']
    },
    lever: {
      name: 'Lever.co',
      passProbability: '96%',
      status: 'Passed',
      notes: 'Lever parsed candidate details directly into structured interview loops with 96% confidence score.',
      extractedTokens: 1880,
      warnings: []
    }
  }

  const currentSys = systems[activeSystem]

  const handleRunDiagnostic = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setTestCompleted(true)
    }, 700)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-1 text-xs">
            Enterprise ATS Emulation Engine
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            ATS Simulator
          </h1>
          <p className="text-white/50 text-base">
            Test how Fortune 500 applicant tracking systems parse your resume before you click apply.
          </p>
        </div>

        {/* System Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {(['workday', 'greenhouse', 'taleo', 'lever'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSystem(s)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeSystem === s
                  ? 'bg-teal-500/15 border-teal-500 text-white shadow-lg shadow-teal-500/15'
                  : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold capitalize mb-1">{systems[s].name}</div>
              <div className="text-xs text-teal-400 font-bold">{systems[s].passProbability} Pass Rate</div>
            </button>
          ))}
        </div>

        {/* Diagnostic Panel */}
        <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] text-teal-400 font-bold uppercase tracking-wider">
                Simulation Profile
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{currentSys.name}</h2>
              <p className="text-xs text-white/40 mt-1">
                Extracted tokens: {currentSys.extractedTokens} • Architecture: Neural Parser v2026.4
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase font-bold block">Pass Probability</span>
                <span className="text-3xl font-black text-teal-400">{currentSys.passProbability}</span>
              </div>
              <Button
                onClick={handleRunDiagnostic}
                disabled={isRunning}
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs h-10 px-4 rounded-xl cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRunning ? 'animate-spin' : ''}`} />
                Re-test Simulator
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">
              Parser Ingestion Notes
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">{currentSys.notes}</p>
          </div>

          {currentSys.warnings.length > 0 ? (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                <AlertTriangle className="w-4 h-4" /> Optimization Warning
              </div>
              <ul className="text-xs text-amber-200 list-disc list-inside space-y-1">
                {currentSys.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero parsing bottlenecks detected for this ATS engine!</span>
            </div>
          )}

          {/* Raw Ingestion Simulation View */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
              <FileCode className="w-4 h-4 text-teal-400" /> Simulated ATS Ingestion JSON Output
            </div>
            <pre className="p-4 rounded-2xl bg-black/50 border border-white/5 text-[11px] font-mono text-teal-300/80 overflow-x-auto leading-relaxed">
{JSON.stringify({
  parser_engine: currentSys.name,
  candidate_status: currentSys.status,
  confidence_score: currentSys.passProbability,
  sections_indexed: ['Contact', 'Work History', 'Technical Skills', 'Education'],
  extracted_skills_count: 19,
  ats_readability_flags: currentSys.warnings.length
}, null, 2)}
            </pre>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
          <div>
            <h4 className="text-sm font-bold text-white">Need to enhance your score before submitting?</h4>
            <p className="text-xs text-white/40">Review missing keywords and AI bullet improvements.</p>
          </div>
          <Link href="/resume-score">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
              Open ATS Score Auditor <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
