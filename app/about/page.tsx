'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, ShieldCheck, Target, BrainCircuit, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge className="mb-3 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1 text-xs">
            About HireOrbit
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Democratizing Career Growth with AI
          </h1>
          <p className="text-white/50 text-base leading-relaxed">
            We built HireOrbit to give ambitious engineers, designers, and tech professionals an unfair advantage in the hiring market.
          </p>
        </div>

        <div className="premium-glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-8 mb-8 text-sm text-white/70 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
            <p>
              Traditional job hunting is broken. Applicants fire hundreds of resumes into the &quot;black box&quot; of Applicant Tracking Systems without knowing why they get rejected, while recruiters sift through thousands of mismatched submissions.
            </p>
            <p className="mt-3">
              HireOrbit brings transparency and intelligence to the equation. Using state-of-the-art semantic matching, simulated ATS parsing engines, and real-time interview coaching, we empower candidates to put their best foot forward and connect with teams building the future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <h4 className="font-bold text-white text-sm">Semantic Matching</h4>
              <p className="text-white/50">Dense vector representations match skills and potential beyond simple keyword matching.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">ATS Transparency</h4>
              <p className="text-white/50">Audit parseability against real Workday, Greenhouse, and Taleo algorithms.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <BrainCircuit className="w-5 h-5 text-pink-400" />
              <h4 className="font-bold text-white text-sm">Adaptive Coaching</h4>
              <p className="text-white/50">Interactive AI mock interviews with instant feedback using the STAR framework.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/dashboard/upload-resume">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 h-12 rounded-xl text-sm">
              Launch Your Career Orbit <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
