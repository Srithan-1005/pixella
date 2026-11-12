'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Briefcase, Sparkles, CheckCircle2, Clock,
  FileText, Copy, Check, Download, Send, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Application {
  id: string
  company: string
  role: string
  location: string
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer'
  date: string
  salary: string
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'cover_letter'>('tracker')
  const [applications, setApplications] = useState<Application[]>([
    { id: 'app-1', company: 'NeuralOrbit Labs', role: 'Senior Full Stack AI Engineer', location: 'San Francisco, CA', status: 'Interview', date: 'Oct 14, 2026', salary: '$185,000' },
    { id: 'app-2', company: 'Veloce Cloud', role: 'Frontend Platform Architect', location: 'New York, NY', status: 'Screening', date: 'Oct 16, 2026', salary: '$190,000' },
    { id: 'app-3', company: 'Synthetix AI', role: 'AI Product Engineer', location: 'Remote', status: 'Applied', date: 'Oct 18, 2026', salary: '$150,000' },
    { id: 'app-4', company: 'Aetheria Dynamics', role: 'Senior Software Engineer', location: 'Austin, TX', status: 'Offer', date: 'Oct 02, 2026', salary: '$165,000' },
  ])

  // Cover Letter state
  const [companyName, setCompanyName] = useState('NeuralOrbit Labs')
  const [jobTitle, setJobTitle] = useState('Senior Full Stack AI Engineer')
  const [tone, setTone] = useState<'Professional' | 'Confident' | 'Passionate'>('Confident')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState(
`Dear Hiring Team at NeuralOrbit Labs,

I am writing to express my enthusiastic interest in the Senior Full Stack AI Engineer position. With over 5 years of experience architecting high-scale web applications with React, Next.js, and TypeScript, combined with hands-on production deployment of generative AI reasoning pipelines and vector retrieval architectures, I am eager to contribute to NeuralOrbit's ambitious technical vision.

In my recent engineering role at Apex Cloud Innovations, I spearheaded the migration of our core platform to Next.js App Router and integrated real-time vector embeddings with pgvector. This initiative reduced search query latency by 45% and bolstered organic platform engagement by 120%. My background directly aligns with your requirements for high-performance React architectures, sub-second API endpoints, and clean micro-interactions.

I would welcome the opportunity to discuss how my engineering craft and passion for AI user experiences can accelerate your product roadmap. Thank you for your time and consideration.

Sincerely,
Alex Vance`
  )
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedLetter(
`Dear Hiring Team at ${companyName},

I am writing to express my strong candidacy for the ${jobTitle} opportunity. Having closely followed ${companyName}'s recent product launches, I am deeply impressed by your commitment to technical rigor and exceptional product design.

As a Senior Full Stack Engineer, I specialize in building fault-tolerant, scalable web ecosystems using Next.js, Node.js, and modern AI model integrations. At my previous company, I led a squad of 4 developers to redesign our core client portal, resulting in a 35% reduction in bundle size and a 99.9% uptime record over 18 months.

I am eager to bring this same level of technical ownership, speed, and collaborative energy to the ${jobTitle} role at ${companyName}.

Warm regards,
Alex Vance`
      )
    }, 800)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1 text-xs">
            Auto Application Tracking & AI Cover Letters
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Application Pipeline & Assistant
          </h1>
          <p className="text-white/50 text-base">
            Track submitted applications across stages and generate tailored, high-converting cover letters in seconds.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-8">
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('tracker')}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Application Tracker ({applications.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cover_letter')}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'cover_letter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              AI Cover Letter Generator
            </button>
          </div>
        </div>

        {activeTab === 'tracker' ? (
          <div className="space-y-6">
            {/* Status Kanban Counts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { status: 'Applied', color: 'text-blue-400', count: applications.filter(a => a.status === 'Applied').length },
                { status: 'Screening', color: 'text-amber-400', count: applications.filter(a => a.status === 'Screening').length },
                { status: 'Interview', color: 'text-purple-400', count: applications.filter(a => a.status === 'Interview').length },
                { status: 'Offer', color: 'text-emerald-400', count: applications.filter(a => a.status === 'Offer').length },
              ].map(st => (
                <div key={st.status} className="premium-glass p-4 rounded-2xl border border-white/10">
                  <span className="text-xs text-white/50 font-medium">{st.status}</span>
                  <div className={`text-2xl font-bold mt-1 ${st.color}`}>{st.count}</div>
                </div>
              ))}
            </div>

            {/* Application List */}
            <div className="premium-glass p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" /> Active Job Applications
                </h3>
                <Link href="/jobs">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Apply to New Job
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{app.role}</span>
                        <Badge
                          className={`text-[10px] ${
                            app.status === 'Offer'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : app.status === 'Interview'
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                              : app.status === 'Screening'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                          }`}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-white/50 mt-1">
                        {app.company} • {app.location} • Applied on {app.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-white/70">{app.salary}</span>
                      <Link href={`/interview-prep?role=${encodeURIComponent(app.role)}`}>
                        <Button variant="outline" size="sm" className="text-xs border-white/15 h-8">
                          Prep Interview
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Cover Letter Generator Tab */
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 premium-glass p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Letter Parameters
              </h3>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Target Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Position Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5">Tone of Voice</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Confident', 'Professional', 'Passionate'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        tone === t
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : 'border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs h-11 rounded-xl shadow-lg shadow-indigo-500/25 mt-2 cursor-pointer"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Synthesizing Letter...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Re-generate Letter
                  </span>
                )}
              </Button>
            </div>

            {/* Letter Preview */}
            <div className="lg:col-span-7 premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" /> Generated Preview
                </span>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    variant="outline"
                    className="text-xs border-white/15 h-8"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              <textarea
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                rows={14}
                className="w-full p-4 rounded-2xl bg-black/40 border border-white/5 text-xs text-white/80 font-mono leading-relaxed resize-none focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
