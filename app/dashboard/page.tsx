'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText, TrendingUp, Target, BrainCircuit,
  Briefcase, ArrowRight, Sparkles, CheckCircle2,
  Clock, Plus, Bookmark, Compass, ShieldCheck, DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SAMPLE_RESUME, SAMPLE_JOBS } from '@/lib/mock-data'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications'>('overview')
  const [userName, setUserName] = useState(SAMPLE_RESUME.fullName)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hireorbit_user')
      if (stored) {
        const u = JSON.parse(stored)
        if (u.fullName) setUserName(u.fullName)
      }
    } catch { /* ignore */ }
  }, [])

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-30 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Welcome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Welcome back, {userName} 👋
              </h1>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                Active Job Search
              </Badge>
            </div>
            <p className="text-white/40 text-sm">
              Your AI Career Agent has indexed 18 new high-match positions today.
            </p>
          </div>

          <div className="flex gap-2.5">
            <Link href="/dashboard/upload-resume">
              <Button variant="outline" size="sm" className="text-xs border-white/15">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Update Resume
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs">
                <Target className="w-3.5 h-3.5 mr-1.5" /> Find Jobs
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/resume-score" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium">ATS Resume Score</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white group-hover:text-indigo-400 transition-colors">88%</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-medium">↑ +4% since last optimization</div>
            </div>
          </Link>

          <Link href="/jobs" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium">Matched Roles</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors">42</div>
              <div className="text-[11px] text-purple-400 mt-1 font-medium">18 roles &gt; 90% compatibility</div>
            </div>
          </Link>

          <Link href="/applications" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-pink-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium">Active Applications</span>
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white group-hover:text-pink-400 transition-colors">7</div>
              <div className="text-[11px] text-pink-400 mt-1 font-medium">2 in Interview Round</div>
            </div>
          </Link>

          <Link href="/interview-prep" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 font-medium">Mock Practice</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <BrainCircuit className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">12</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-medium">Avg Score: 8.8 / 10</div>
            </div>
          </Link>
        </div>

        {/* Quick Access Action Hub */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/resume-score" className="block">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-indigo-950/20 border border-indigo-500/30 hover:border-indigo-400 transition-all group">
              <Sparkles className="w-6 h-6 text-indigo-400 mb-3 group-hover:rotate-12 transition-transform" />
              <h3 className="text-base font-bold text-white mb-1">Check ATS Score</h3>
              <p className="text-xs text-white/50 mb-3">Scan missing keywords and boost Workday / Greenhouse pass rate.</p>
              <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Launch Auditor <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link href="/interview-prep" className="block">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-900/40 to-pink-950/20 border border-pink-500/30 hover:border-pink-400 transition-all group">
              <BrainCircuit className="w-6 h-6 text-pink-400 mb-3 group-hover:rotate-12 transition-transform" />
              <h3 className="text-base font-bold text-white mb-1">Practice Interview</h3>
              <p className="text-xs text-white/50 mb-3">Simulate technical coding & behavioral STAR interview sessions.</p>
              <span className="text-xs font-semibold text-pink-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Start Session <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          <Link href="/career-guidance" className="block">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-950/20 border border-purple-500/30 hover:border-purple-400 transition-all group">
              <Compass className="w-6 h-6 text-purple-400 mb-3 group-hover:rotate-12 transition-transform" />
              <h3 className="text-base font-bold text-white mb-1">Career Roadmaps</h3>
              <p className="text-xs text-white/50 mb-3">Personalized trajectory to Senior, Staff, or Architect level.</p>
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Roadmap <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Top Job Matches */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" /> Top Matched Roles Today
              </h3>
              <Link href="/jobs" className="text-xs text-indigo-400 hover:underline">
                View all 42 jobs
              </Link>
            </div>

            <div className="space-y-3">
              {SAMPLE_JOBS.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-wrap items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                      {job.logo}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{job.title}</h4>
                      <p className="text-xs text-white/50">{job.company} • {job.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-emerald-400 font-semibold">{job.salary}</span>
                        <span className="text-white/20">•</span>
                        <span className="text-[11px] text-indigo-400 font-bold">{job.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href="/jobs">
                      <Button size="sm" variant="outline" className="text-xs border-white/15">
                        Details
                      </Button>
                    </Link>
                    <Link href="/jobs">
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                        Quick Apply
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Platform Toolkit
            </h3>

            <div className="premium-glass p-6 rounded-3xl border border-white/10 space-y-3 text-xs">
              <Link href="/ats-simulator" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span className="font-semibold text-white/80 group-hover:text-white">ATS Simulator</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/salary-predictor" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white/80 group-hover:text-white">Salary Predictor</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/skill-gap" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  <span className="font-semibold text-white/80 group-hover:text-white">Skill Gap Analysis</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/market-trends" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-white/80 group-hover:text-white">Market Trends 2026</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
