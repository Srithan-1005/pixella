'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, Users, Brain, BarChart3, Settings, Plus,
  Search, Filter, Star, CheckCircle2, XCircle, Clock,
  MessageSquare, Phone, Mail, MapPin, ChevronRight,
  TrendingUp, Target, Zap, Shield, Award, Bell,
  FileText, Download, Upload, Eye, ThumbsUp, ThumbsDown,
  Calendar, DollarSign, Globe, Building, Sparkles, ArrowRight,
  ChevronDown, Layers, UserCheck, AlertTriangle, MoreHorizontal,
  Video, Mic, Send, Bot, Activity, PieChart, Flame,
  RefreshCw, ExternalLink, Edit3, Trash2, Copy, Link2,
  Lock, Unlock, UserX, Bookmark, Hash, Tag, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

/* ── Types ── */
type Tab = 'dashboard' | 'candidates' | 'jobs' | 'pipeline' | 'analytics' | 'branding' | 'ai-tools'

interface Candidate {
  id: string
  name: string
  title: string
  location: string
  experience: string
  skills: string[]
  matchScore: number
  status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'
  appliedDate: string
  salary: string
  availability: string
  avatar: string
  email: string
  phone: string
  preVerified: boolean
  anonymous?: boolean
}

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary: string
  applicants: number
  newToday: number
  status: 'Active' | 'Paused' | 'Closed'
  posted: string
  topMatch: number
}

/* ── Mock data ── */
const MOCK_CANDIDATES: Candidate[] = [
  { id: 'c1', name: 'Srithan Kontham', title: 'AI & Full Stack Engineer', location: 'Hyderabad, India', experience: '2 years', skills: ['React', 'Python', 'LLMs', 'Node.js', 'PostgreSQL'], matchScore: 97, status: 'Interview', appliedDate: 'Oct 18, 2026', salary: '₹18-28 LPA', availability: 'Immediately', avatar: 'SK', email: 'srithan@example.com', phone: '+91 62819 19862', preVerified: true },
  { id: 'c2', name: 'Priya Nair', title: 'Senior Data Scientist', location: 'Bengaluru, India', experience: '5 years', skills: ['Python', 'PyTorch', 'ML', 'Spark', 'SQL'], matchScore: 94, status: 'Screening', appliedDate: 'Oct 17, 2026', salary: '₹25-40 LPA', availability: '30 days notice', avatar: 'PN', email: 'priya@example.com', phone: '+91 98765 43210', preVerified: true },
  { id: 'c3', name: 'Arjun Mehta', title: 'DevOps Engineer', location: 'Pune, India', experience: '4 years', skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'CI/CD'], matchScore: 91, status: 'New', appliedDate: 'Oct 19, 2026', salary: '₹22-35 LPA', availability: 'Immediately', avatar: 'AM', email: 'arjun@example.com', phone: '+91 87654 32109', preVerified: false },
  { id: 'c4', name: 'Ananya Singh', title: 'Product Designer', location: 'Mumbai, India', experience: '3 years', skills: ['Figma', 'React', 'Framer', 'CSS3', 'Design Systems'], matchScore: 89, status: 'New', appliedDate: 'Oct 19, 2026', salary: '₹18-25 LPA', availability: '15 days notice', avatar: 'AS', email: 'ananya@example.com', phone: '+91 76543 21098', preVerified: false },
  { id: 'c5', name: 'Ravi Kumar', title: 'Backend Engineer (Java)', location: 'Chennai, India', experience: '6 years', skills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices'], matchScore: 88, status: 'Offer', appliedDate: 'Oct 10, 2026', salary: '₹30-45 LPA', availability: 'Negotiable', avatar: 'RK', email: 'ravi@example.com', phone: '+91 65432 10987', preVerified: true },
  { id: 'c6', name: 'Sneha Reddy', title: 'ML Engineer (NLP)', location: 'Remote', experience: '3 years', skills: ['Python', 'Hugging Face', 'BERT', 'FastAPI', 'LLMs'], matchScore: 96, status: 'Interview', appliedDate: 'Oct 15, 2026', salary: '₹28-42 LPA', availability: 'Immediately', avatar: 'SR', email: 'sneha@example.com', phone: '+91 54321 09876', preVerified: true },
  { id: 'c7', name: 'Vikram Patel', title: 'Full Stack Developer', location: 'Ahmedabad, India', experience: '2 years', skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'TypeScript'], matchScore: 85, status: 'Rejected', appliedDate: 'Oct 05, 2026', salary: '₹12-18 LPA', availability: 'Immediately', avatar: 'VP', email: 'vikram@example.com', phone: '+91 43210 98765', preVerified: false },
  { id: 'c8', name: 'Kavya Iyer', title: 'Android Developer', location: 'Hyderabad, India', experience: '4 years', skills: ['Kotlin', 'Jetpack Compose', 'Android', 'Firebase', 'REST APIs'], matchScore: 83, status: 'Hired', appliedDate: 'Sep 28, 2026', salary: '₹20-30 LPA', availability: 'Hired', avatar: 'KI', email: 'kavya@example.com', phone: '+91 32109 87654', preVerified: true },
]

const MOCK_JOBS: JobPosting[] = [
  { id: 'j1', title: 'Senior AI/ML Engineer', department: 'Engineering', location: 'Hyderabad / Remote', type: 'Full-time', salary: '₹30-50 LPA', applicants: 147, newToday: 12, status: 'Active', posted: 'Oct 14, 2026', topMatch: 97 },
  { id: 'j2', title: 'Full Stack Developer (React + Node)', department: 'Product', location: 'Bengaluru', type: 'Full-time', salary: '₹18-30 LPA', applicants: 284, newToday: 23, status: 'Active', posted: 'Oct 10, 2026', topMatch: 94 },
  { id: 'j3', title: 'Data Engineer (Python & SQL)', department: 'Data', location: 'Remote', type: 'Full-time', salary: '₹20-35 LPA', applicants: 91, newToday: 5, status: 'Active', posted: 'Oct 8, 2026', topMatch: 95 },
  { id: 'j4', title: 'DevOps Engineer (AWS & K8s)', department: 'Infrastructure', location: 'Pune / Remote', type: 'Full-time', salary: '₹22-38 LPA', applicants: 68, newToday: 3, status: 'Paused', posted: 'Sep 30, 2026', topMatch: 91 },
  { id: 'j5', title: 'Product Designer (UX/UI)', department: 'Design', location: 'Mumbai / Remote', type: 'Full-time', salary: '₹18-28 LPA', applicants: 116, newToday: 8, status: 'Active', posted: 'Oct 5, 2026', topMatch: 89 },
]

const statusColors: Record<string, string> = {
  'New': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Screening': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Interview': 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Offer': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Hired': 'bg-green-500/15 text-green-400 border-green-500/30',
  'Rejected': 'bg-red-500/15 text-red-400 border-red-500/30',
}

const jobStatusColors: Record<string, string> = {
  'Active': 'bg-emerald-500/15 text-emerald-400',
  'Paused': 'bg-amber-500/15 text-amber-400',
  'Closed': 'bg-red-500/15 text-red-400',
}

/* ── Avatar component ── */
function Avatar({ initials, size = 'md', color = 'indigo' }: { initials: string; size?: 'sm' | 'md' | 'lg'; color?: string }) {
  const sizeClasses = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }
  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 flex-shrink-0`}>
      {initials}
    </div>
  )
}

/* ── Main Component ── */
export default function RecruiterDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [searchQ, setSearchQ] = useState('')
  const [anonymousMode, setAnonymousMode] = useState(false)
  const [companyName, setCompanyName] = useState('TechCorp India')
  const [recruiterName, setRecruiterName] = useState('Elena Rostova')
  const [aiMessage, setAiMessage] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [showNewJobModal, setShowNewJobModal] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hireorbit_user')
      if (!stored) { router.replace('/login'); return }
      const u = JSON.parse(stored)
      // If they signed up as a candidate, redirect them to the candidate profile
      if (u.role && u.role !== 'recruiter') {
        router.replace('/profile')
        return
      }
      if (u.fullName) setRecruiterName(u.fullName)
      if (u.company) setCompanyName(u.company)
      setAuthChecked(true)
    } catch { router.replace('/login') }
  }, [router])

  const filteredCandidates = MOCK_CANDIDATES.filter(c => {
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    const matchSearch = !searchQ || c.name.toLowerCase().includes(searchQ.toLowerCase()) || c.title.toLowerCase().includes(searchQ.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(searchQ.toLowerCase()))
    return matchStatus && matchSearch
  })

  const handleAiQuery = () => {
    if (!aiMessage.trim()) return
    setAiLoading(true)
    setAiResponse(null)
    setTimeout(() => {
      setAiLoading(false)
      setAiResponse(`Based on your current talent pool of ${MOCK_CANDIDATES.length} candidates, I recommend prioritizing **${MOCK_CANDIDATES.filter(c => c.status === 'Interview').length} candidates** currently in the interview stage. Top recommendation: **${MOCK_CANDIDATES.filter(c => c.matchScore >= 95)[0]?.name}** (${MOCK_CANDIDATES.filter(c => c.matchScore >= 95)[0]?.matchScore}% match) — they are immediately available and pre-verified. Consider sending an offer within 48 hours as competing employers may move faster.`)
    }, 1200)
  }

  if (!authChecked) return null

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* ── Recruiter Top Banner ── */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-gradient-to-r from-violet-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-xl border-b border-purple-500/20 px-4 py-2.5">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Building className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xs text-purple-300 font-semibold tracking-wide uppercase">Recruiter Portal</span>
              <span className="text-white/60 text-xs mx-2">•</span>
              <span className="text-white text-sm font-semibold">{companyName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAnonymousMode(!anonymousMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${anonymousMode ? 'bg-violet-500/30 text-violet-300 border border-violet-500/40' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}
            >
              {anonymousMode ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              {anonymousMode ? 'DE&I Mode ON' : 'DE&I De-bias'}
            </button>
            <div className="w-px h-4 bg-white/20" />
            <Link href="/" className="text-xs text-white/50 hover:text-white transition-colors">← Job Seeker View</Link>
          </div>
        </div>
      </div>

      <div className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-8">
            {/* ── Sidebar Navigation ── */}
            <aside className="hidden lg:flex flex-col w-56 flex-shrink-0">
              <div className="sticky top-36 space-y-1">
                {[
                  { id: 'dashboard', label: 'Overview', icon: BarChart3 },
                  { id: 'candidates', label: 'Candidates', icon: Users, badge: '8' },
                  { id: 'jobs', label: 'Job Postings', icon: Briefcase, badge: '5' },
                  { id: 'pipeline', label: 'Hiring Pipeline', icon: Layers },
                  { id: 'ai-tools', label: 'AI Tools', icon: Brain, badge: 'NEW' },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'branding', label: 'Employer Brand', icon: Building },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 border border-indigo-500/30 text-white'
                        : 'text-white/55 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-indigo-400' : ''}`} />
                    {item.label}
                    {item.badge && (
                      <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md ${item.badge === 'NEW' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white' : 'bg-white/10 text-white/60'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}

                <div className="pt-4 mt-4 border-t border-white/10">
                  <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/20">
                    <div className="text-xs text-indigo-400 font-semibold mb-1">Pro Plan</div>
                    <div className="text-xs text-white/50">147 candidates · 5 active jobs</div>
                    <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                    <div className="text-[10px] text-white/40 mt-1">60% of monthly quota used</div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ─── DASHBOARD TAB ─── */}
                  {activeTab === 'dashboard' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h1 className="text-2xl font-bold text-white">Good morning, {recruiterName.split(' ')[0]} 👋</h1>
                          <p className="text-white/50 text-sm mt-0.5">Here's what's happening at <span className="text-indigo-400">{companyName}</span> today.</p>
                        </div>
                        <Button
                          onClick={() => setShowNewJobModal(true)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white gap-2 shadow-lg shadow-indigo-500/25"
                        >
                          <Plus className="w-4 h-4" /> Post New Job
                        </Button>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Applicants', value: '610', change: '+47 this week', icon: Users, color: 'indigo' },
                          { label: 'Active Jobs', value: '5', change: '2 paused', icon: Briefcase, color: 'purple' },
                          { label: 'In Interview', value: '2', change: '1 offer pending', icon: MessageSquare, color: 'pink' },
                          { label: 'Hired (Month)', value: '3', change: '+1 vs last month', icon: CheckCircle2, color: 'emerald' },
                        ].map((stat, i) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.07 }}
                            className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs text-white/50">{stat.label}</span>
                              <div className={`w-8 h-8 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                              </div>
                            </div>
                            <div className="text-3xl font-black text-white">{stat.value}</div>
                            <div className="text-[11px] text-white/40 mt-1">{stat.change}</div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Recent Applicants */}
                        <div className="lg:col-span-2 premium-glass rounded-3xl border border-white/10 p-6">
                          <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-white flex items-center gap-2">
                              <Zap className="w-4 h-4 text-amber-400" /> Top New Candidates
                            </h3>
                            <button onClick={() => setActiveTab('candidates')} className="text-xs text-indigo-400 hover:underline">View all →</button>
                          </div>
                          <div className="space-y-3">
                            {MOCK_CANDIDATES.filter(c => c.status !== 'Rejected' && c.status !== 'Hired').slice(0, 4).map((c) => (
                              <div key={c.id} onClick={() => { setSelectedCandidate(c); setActiveTab('candidates') }} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.05] cursor-pointer transition-all group">
                                <Avatar initials={c.avatar} size="sm" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-white">{anonymousMode ? '● ● ●' : c.name}</span>
                                    {c.preVerified && <Shield className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                                  </div>
                                  <div className="text-xs text-white/50">{c.title} · {c.location}</div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg border ${statusColors[c.status]}`}>{c.status}</span>
                                  <div className={`text-xs font-black ${c.matchScore >= 95 ? 'text-emerald-400' : 'text-indigo-400'}`}>{c.matchScore}%</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                          <div className="premium-glass rounded-2xl border border-white/10 p-5">
                            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
                              <Bot className="w-4 h-4 text-violet-400" /> AI Sourcing Bot
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                <div>
                                  <div className="text-xs font-semibold text-violet-300">Active Scanning</div>
                                  <div className="text-[10px] text-white/40 mt-0.5">12 passive candidates found</div>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              </div>
                              <div className="text-[11px] text-white/40 leading-relaxed">AI bot has messaged 4 top candidates asking about role interest. Awaiting 2 replies.</div>
                              <Button size="sm" variant="outline" className="w-full text-xs border-violet-500/30 text-violet-300 hover:bg-violet-500/10 gap-1.5">
                                <Activity className="w-3.5 h-3.5" /> View Bot Activity
                              </Button>
                            </div>
                          </div>

                          <div className="premium-glass rounded-2xl border border-white/10 p-5">
                            <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                              <Bell className="w-4 h-4 text-amber-400" /> Today's Actions
                            </h3>
                            <div className="space-y-2.5">
                              {[
                                { text: 'Send offer to Ravi Kumar', urgent: true },
                                { text: 'Review 12 new applications', urgent: false },
                                { text: 'Schedule interview: Sneha Reddy', urgent: false },
                                { text: 'Update JD for ML Engineer role', urgent: false },
                              ].map((a, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.urgent ? 'bg-red-400' : 'bg-indigo-400'}`} />
                                  <span className="text-xs text-white/70">{a.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── CANDIDATES TAB ─── */}
                  {activeTab === 'candidates' && (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-white">Candidate Pool</h2>
                          <p className="text-white/40 text-xs mt-0.5">{filteredCandidates.length} candidates · {anonymousMode ? '🔒 DE&I mode active' : 'Names visible'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setAnonymousMode(!anonymousMode)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${anonymousMode ? 'bg-violet-500/20 border-violet-500/40 text-violet-300' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}
                          >
                            {anonymousMode ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                            {anonymousMode ? 'Show Names' : 'Hide Bias'}
                          </button>
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs gap-1.5">
                            <Upload className="w-3.5 h-3.5" /> Import CSV
                          </Button>
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="flex flex-wrap gap-2">
                        <div className="relative flex-1 min-w-48">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            value={searchQ}
                            onChange={e => setSearchQ(e.target.value)}
                            placeholder="Search candidates, skills..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors"
                          />
                        </div>
                        <div className="flex gap-1.5">
                          {['All', 'New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'].map(s => (
                            <button
                              key={s}
                              onClick={() => setStatusFilter(s)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-4">
                        {/* Candidate List */}
                        <div className="space-y-3">
                          {filteredCandidates.map((c) => (
                            <motion.div
                              key={c.id}
                              layout
                              onClick={() => setSelectedCandidate(selectedCandidate?.id === c.id ? null : c)}
                              className={`premium-glass p-4 rounded-2xl border cursor-pointer transition-all ${selectedCandidate?.id === c.id ? 'border-indigo-500/50 bg-indigo-900/10' : 'border-white/10 hover:border-indigo-500/30'}`}
                            >
                              <div className="flex items-start gap-3">
                                <Avatar initials={c.avatar} size="md" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-white text-sm">{anonymousMode ? '● ● ●●●●●' : c.name}</span>
                                    {c.preVerified && (
                                      <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md">
                                        <Shield className="w-2.5 h-2.5" /> Pre-Verified
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-white/50 mt-0.5">{c.title}</div>
                                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                                    <span className="text-xs text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                                    <span className="text-xs text-white/40">{c.experience}</span>
                                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${statusColors[c.status]}`}>{c.status}</span>
                                    <span className={`text-xs font-black ${c.matchScore >= 95 ? 'text-emerald-400' : 'text-indigo-400'}`}>{c.matchScore}%</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {c.skills.slice(0, 3).map(sk => (
                                      <span key={sk} className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/50 border border-white/5">{sk}</span>
                                    ))}
                                    {c.skills.length > 3 && <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/5 text-white/40">+{c.skills.length - 3}</span>}
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-shrink-0">
                                  <button title="Approve" className="w-7 h-7 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 transition-colors cursor-pointer">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button title="Reject" className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 flex items-center justify-center text-red-400 transition-colors cursor-pointer">
                                    <ThumbsDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Candidate Detail Panel */}
                        <AnimatePresence>
                          {selectedCandidate ? (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="premium-glass rounded-3xl border border-indigo-500/30 p-6 sticky top-36 self-start"
                            >
                              <div className="flex items-start justify-between mb-5">
                                <div className="flex items-start gap-3">
                                  <Avatar initials={selectedCandidate.avatar} size="lg" />
                                  <div>
                                    <div className="font-bold text-white text-lg">{anonymousMode ? '● ● ●' : selectedCandidate.name}</div>
                                    <div className="text-sm text-white/50">{selectedCandidate.title}</div>
                                    {selectedCandidate.preVerified && (
                                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
                                        <Shield className="w-3 h-3" /> Background Pre-Verified
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <button onClick={() => setSelectedCandidate(null)} className="text-white/30 hover:text-white cursor-pointer">
                                  <X className="w-5 h-5" />
                                </button>
                              </div>

                              {/* Match Score Ring */}
                              <div className="flex items-center gap-4 mb-5 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-500/20">
                                <div className="text-center">
                                  <div className={`text-4xl font-black ${selectedCandidate.matchScore >= 95 ? 'text-emerald-400' : 'text-indigo-400'}`}>{selectedCandidate.matchScore}%</div>
                                  <div className="text-[10px] text-white/40 mt-1">AI Match</div>
                                </div>
                                <div className="flex-1 space-y-2">
                                  {[
                                    { label: 'Skills Match', val: selectedCandidate.matchScore - 2 },
                                    { label: 'Experience Fit', val: selectedCandidate.matchScore - 5 },
                                    { label: 'Culture Fit', val: selectedCandidate.matchScore - 8 },
                                  ].map(m => (
                                    <div key={m.label}>
                                      <div className="flex justify-between text-[10px] text-white/50 mb-0.5">
                                        <span>{m.label}</span><span>{m.val}%</span>
                                      </div>
                                      <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" style={{ width: `${m.val}%` }} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-3 mb-5">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                    <div className="text-white/40 mb-1">Location</div>
                                    <div className="text-white font-medium">{selectedCandidate.location}</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                    <div className="text-white/40 mb-1">Experience</div>
                                    <div className="text-white font-medium">{selectedCandidate.experience}</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                    <div className="text-white/40 mb-1">Salary Expectation</div>
                                    <div className="text-white font-medium">{selectedCandidate.salary}</div>
                                  </div>
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                    <div className="text-white/40 mb-1">Availability</div>
                                    <div className="text-white font-medium">{selectedCandidate.availability}</div>
                                  </div>
                                </div>

                                {!anonymousMode && (
                                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                                    <div className="flex items-center gap-2 text-xs">
                                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                                      <span className="text-white/70">{selectedCandidate.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-white/70">{selectedCandidate.phone}</span>
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <div className="text-xs text-white/40 mb-2">Skills</div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {selectedCandidate.skills.map(sk => (
                                      <span key={sk} className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">{sk}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="grid grid-cols-2 gap-2">
                                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs gap-1.5">
                                  <Calendar className="w-3.5 h-3.5" /> Schedule Interview
                                </Button>
                                <Button size="sm" variant="outline" className="border-white/15 text-xs gap-1.5">
                                  <Mail className="w-3.5 h-3.5" /> Send Message
                                </Button>
                                <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400 text-xs gap-1.5 hover:bg-emerald-500/10">
                                  <FileText className="w-3.5 h-3.5" /> Generate Offer
                                </Button>
                                <Button size="sm" variant="outline" className="border-violet-500/30 text-violet-400 text-xs gap-1.5 hover:bg-violet-500/10">
                                  <Brain className="w-3.5 h-3.5" /> AI Interview Kit
                                </Button>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="premium-glass rounded-3xl border border-white/5 p-10 flex flex-col items-center justify-center text-center">
                              <Users className="w-10 h-10 text-white/15 mb-3" />
                              <p className="text-white/30 text-sm">Select a candidate to view their profile, match breakdown, and take action.</p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* ─── JOBS TAB ─── */}
                  {activeTab === 'jobs' && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-white">Job Postings</h2>
                          <p className="text-white/40 text-xs mt-0.5">Manage active roles and track applicant funnel</p>
                        </div>
                        <Button onClick={() => setShowNewJobModal(true)} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white gap-2 shadow-lg shadow-indigo-500/25">
                          <Plus className="w-4 h-4" /> Post New Job
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {MOCK_JOBS.map((job, i) => (
                          <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap">
                                  <h3 className="font-bold text-white">{job.title}</h3>
                                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${jobStatusColors[job.status]}`}>{job.status}</span>
                                  <span className="text-[11px] text-emerald-400 font-semibold">{job.topMatch}% top match</span>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2 text-xs text-white/50">
                                  <span className="flex items-center gap-1"><Building className="w-3 h-3" />{job.department}</span>
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                                  <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted {job.posted}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-2xl font-black text-white">{job.applicants}</div>
                                  <div className="text-[10px] text-white/40">Applicants</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-black text-emerald-400">+{job.newToday}</div>
                                  <div className="text-[10px] text-white/40">Today</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <Button size="sm" variant="outline" className="text-xs border-white/15 gap-1">
                                    <Eye className="w-3 h-3" /> View
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-xs border-white/15 gap-1">
                                    <Edit3 className="w-3 h-3" /> Edit
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Pipeline mini-bar */}
                            <div className="mt-4 flex items-center gap-2">
                              {['Applied', 'Screening', 'Interview', 'Offer', 'Hired'].map((stage, si) => {
                                const counts = [job.applicants, Math.round(job.applicants * 0.25), Math.round(job.applicants * 0.08), Math.round(job.applicants * 0.03), Math.round(job.applicants * 0.01)]
                                return (
                                  <div key={stage} className="flex-1 text-center">
                                    <div className="text-xs font-bold text-white/70">{counts[si]}</div>
                                    <div className={`h-1.5 rounded-full mt-1 ${si === 0 ? 'bg-blue-500' : si === 1 ? 'bg-amber-500' : si === 2 ? 'bg-purple-500' : si === 3 ? 'bg-emerald-500' : 'bg-green-600'}`} />
                                    <div className="text-[9px] text-white/30 mt-1">{stage}</div>
                                  </div>
                                )
                              })}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ─── PIPELINE TAB ─── */}
                  {activeTab === 'pipeline' && (
                    <div className="space-y-5">
                      <div>
                        <h2 className="text-xl font-bold text-white">Hiring Pipeline</h2>
                        <p className="text-white/40 text-xs mt-0.5">Drag candidates across stages (visual board)</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto">
                        {['New', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'].map((stage) => {
                          const stageCandidates = MOCK_CANDIDATES.filter(c => c.status === stage)
                          return (
                            <div key={stage} className="min-w-[160px]">
                              <div className={`flex items-center justify-between px-3 py-2 rounded-xl mb-3 border ${statusColors[stage]}`}>
                                <span className="text-xs font-bold">{stage}</span>
                                <span className="text-xs font-black">{stageCandidates.length}</span>
                              </div>
                              <div className="space-y-2">
                                {stageCandidates.map(c => (
                                  <div key={c.id} onClick={() => { setSelectedCandidate(c); setActiveTab('candidates') }} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 cursor-pointer transition-all">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                                        {c.avatar}
                                      </div>
                                      <span className="text-xs font-semibold text-white truncate">{anonymousMode ? '● ●●●' : c.name.split(' ')[0]}</span>
                                    </div>
                                    <div className="text-[10px] text-white/40 truncate">{c.title}</div>
                                    <div className={`text-[10px] font-bold mt-1 ${c.matchScore >= 95 ? 'text-emerald-400' : 'text-indigo-400'}`}>{c.matchScore}% match</div>
                                  </div>
                                ))}
                                {stageCandidates.length === 0 && (
                                  <div className="p-4 rounded-xl border-2 border-dashed border-white/5 text-center text-[11px] text-white/20">Empty</div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* ─── AI TOOLS TAB ─── */}
                  {activeTab === 'ai-tools' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Brain className="w-5 h-5 text-violet-400" /> AI Recruiting Tools
                        </h2>
                        <p className="text-white/40 text-xs mt-0.5">Next-generation AI features for smarter, faster hiring</p>
                      </div>

                      {/* AI Chat Assistant */}
                      <div className="premium-glass rounded-3xl border border-violet-500/20 p-6">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-white">HireOrbit AI Recruiting Agent</div>
                            <div className="text-xs text-violet-400">Ask anything about your talent pipeline</div>
                          </div>
                          <div className="ml-auto flex items-center gap-1.5 text-emerald-400 text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
                          </div>
                        </div>

                        {aiResponse && (
                          <div className="mb-4 p-4 rounded-2xl bg-violet-900/20 border border-violet-500/20 text-sm text-white/80 leading-relaxed">
                            <Bot className="w-4 h-4 text-violet-400 inline mr-2" />
                            {aiResponse.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
                          </div>
                        )}
                        {aiLoading && (
                          <div className="mb-4 p-4 rounded-2xl bg-violet-900/20 border border-violet-500/20">
                            <div className="flex gap-1.5">
                              {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <input
                            value={aiMessage}
                            onChange={e => setAiMessage(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleAiQuery()}
                            placeholder="Who is the best candidate for the ML Engineer role?"
                            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                          />
                          <Button onClick={handleAiQuery} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white gap-2 px-5">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {['Rank top candidates for ML role', 'Who is immediately available?', 'Generate interview questions for Srithan', 'Compare top 3 candidates'].map(q => (
                            <button key={q} onClick={() => { setAiMessage(q); }} className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 transition-colors cursor-pointer">
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* AI Feature Cards */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            icon: Phone,
                            title: 'AI Pre-Screening Calls',
                            description: 'AI voice agent calls shortlisted candidates to verify notice period, salary, and location flexibility before you engage.',
                            badge: 'Active',
                            badgeColor: 'emerald',
                            stats: '12 calls made today',
                            cta: 'Configure Bot'
                          },
                          {
                            icon: FileText,
                            title: 'Auto Interview Rubrics',
                            description: 'Instantly generates a customized interview question set and evaluation criteria tailored to each candidate\'s resume gaps.',
                            badge: 'Ready',
                            badgeColor: 'indigo',
                            stats: '8 kits generated this week',
                            cta: 'Generate Kit'
                          },
                          {
                            icon: Shield,
                            title: 'Anti-Cheating Assessment',
                            description: 'Built-in coding sandbox with AI proctoring, tab-change locks, and anomaly detection to ensure authentic technical assessments.',
                            badge: 'Beta',
                            badgeColor: 'amber',
                            stats: '3 assessments in progress',
                            cta: 'Launch Test'
                          },
                          {
                            icon: Users,
                            title: 'Passive Talent Sourcing Bot',
                            description: 'AI agent scans passive candidate profiles 24/7 and sends personalized outreach messages to top matches on your behalf.',
                            badge: 'Active',
                            badgeColor: 'emerald',
                            stats: '47 prospects identified',
                            cta: 'View Prospects'
                          },
                          {
                            icon: TrendingUp,
                            title: 'Internal Mobility Engine',
                            description: 'Automatically flags current employees qualified for new openings before expanding to external candidates.',
                            badge: 'New',
                            badgeColor: 'violet',
                            stats: '2 internal matches found',
                            cta: 'Review Matches'
                          },
                          {
                            icon: Award,
                            title: 'Offer Letter Generator',
                            description: 'Generate branded digital offer letters with e-signature workflow, track acceptance status, and auto-trigger onboarding.',
                            badge: 'Ready',
                            badgeColor: 'indigo',
                            stats: '1 offer pending signature',
                            cta: 'Create Offer'
                          },
                        ].map((tool, i) => (
                          <motion.div
                            key={tool.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-all group"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                                <tool.icon className="w-5 h-5 text-violet-400" />
                              </div>
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md bg-${tool.badgeColor}-500/15 text-${tool.badgeColor}-400`}>{tool.badge}</span>
                            </div>
                            <h3 className="font-bold text-white text-sm mb-1">{tool.title}</h3>
                            <p className="text-xs text-white/50 leading-relaxed mb-3">{tool.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-white/30">{tool.stats}</span>
                              <Button size="sm" variant="outline" className="text-xs border-violet-500/30 text-violet-300 hover:bg-violet-500/10 gap-1">
                                {tool.cta} <ArrowRight className="w-3 h-3" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ─── ANALYTICS TAB ─── */}
                  {activeTab === 'analytics' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Hiring Analytics</h2>
                        <p className="text-white/40 text-xs mt-0.5">Data-driven insights to optimize your recruitment funnel</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Avg. Time to Hire', value: '18 days', sub: '↓ 4 days vs last month', good: true },
                          { label: 'Offer Acceptance Rate', value: '78%', sub: '↑ 6% this quarter', good: true },
                          { label: 'Cost Per Hire', value: '₹42,000', sub: '↓ ₹8K vs benchmark', good: true },
                          { label: 'Pipeline Conversion', value: '12.3%', sub: 'Industry avg: 10.1%', good: true },
                        ].map((m, i) => (
                          <div key={i} className="premium-glass p-5 rounded-2xl border border-white/10">
                            <div className="text-xs text-white/40 mb-2">{m.label}</div>
                            <div className="text-2xl font-black text-white">{m.value}</div>
                            <div className={`text-[11px] mt-1 font-medium ${m.good ? 'text-emerald-400' : 'text-red-400'}`}>{m.sub}</div>
                          </div>
                        ))}
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Funnel Chart */}
                        <div className="premium-glass rounded-3xl border border-white/10 p-6">
                          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-indigo-400" /> Hiring Funnel (All Jobs)
                          </h3>
                          <div className="space-y-3">
                            {[
                              { stage: 'Applied', count: 706, pct: 100, color: 'bg-blue-500' },
                              { stage: 'Screened', count: 284, pct: 40, color: 'bg-indigo-500' },
                              { stage: 'Interviewed', count: 89, pct: 13, color: 'bg-purple-500' },
                              { stage: 'Offers Made', count: 22, pct: 3, color: 'bg-emerald-500' },
                              { stage: 'Hired', count: 14, pct: 2, color: 'bg-green-500' },
                            ].map(f => (
                              <div key={f.stage}>
                                <div className="flex justify-between text-xs text-white/60 mb-1.5">
                                  <span>{f.stage}</span>
                                  <span className="font-bold text-white">{f.count}</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                                  <motion.div
                                    className={`h-full rounded-full ${f.color}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${f.pct}%` }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Source Breakdown */}
                        <div className="premium-glass rounded-3xl border border-white/10 p-6">
                          <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-400" /> Candidate Sources
                          </h3>
                          <div className="space-y-4">
                            {[
                              { source: 'HireOrbit Platform', pct: 45, hires: 7, color: 'from-indigo-500 to-purple-500' },
                              { source: 'LinkedIn', pct: 28, hires: 4, color: 'from-blue-500 to-blue-600' },
                              { source: 'Employee Referrals', pct: 15, hires: 2, color: 'from-emerald-500 to-teal-500' },
                              { source: 'Direct Applications', pct: 8, hires: 1, color: 'from-amber-500 to-orange-500' },
                              { source: 'AI Sourcing Bot', pct: 4, hires: 0, color: 'from-violet-500 to-pink-500' },
                            ].map(s => (
                              <div key={s.source} className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex justify-between text-xs text-white/60 mb-1">
                                    <span>{s.source}</span>
                                    <span className="text-white font-bold">{s.pct}%</span>
                                  </div>
                                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                    <motion.div
                                      className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${s.pct}%` }}
                                      transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                  </div>
                                </div>
                                <div className="text-xs text-white/40 w-16 text-right">{s.hires} hired</div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                            {[
                              { label: 'Avg. Match Score', val: '91%' },
                              { label: 'Response Rate', val: '68%' },
                              { label: 'DE&I Hires', val: '43%' },
                            ].map(s => (
                              <div key={s.label} className="p-2 rounded-xl bg-white/[0.02]">
                                <div className="text-base font-black text-white">{s.val}</div>
                                <div className="text-[10px] text-white/40">{s.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Competitor Intel */}
                      <div className="premium-glass rounded-3xl border border-amber-500/20 p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-400" /> Competitor Intelligence Dashboard
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { company: 'Competitor A', role: 'ML Engineer', salary: '₹35-50 LPA', openings: 8, trend: '+3 this month' },
                            { company: 'Competitor B', role: 'Full Stack Dev', salary: '₹20-32 LPA', openings: 15, trend: '+7 this month' },
                            { company: 'Competitor C', role: 'Data Engineer', salary: '₹25-38 LPA', openings: 4, trend: '-2 this month' },
                          ].map(c => (
                            <div key={c.company} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                              <div className="font-bold text-white text-sm">{c.company}</div>
                              <div className="text-xs text-white/50 mb-2">{c.role}</div>
                              <div className="text-sm font-bold text-amber-400">{c.salary}</div>
                              <div className="flex items-center justify-between mt-2 text-xs text-white/40">
                                <span>{c.openings} openings</span>
                                <span className={c.trend.startsWith('+') ? 'text-red-400' : 'text-emerald-400'}>{c.trend}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] text-white/30 mt-3">* Data aggregated from public job boards. Updated daily.</p>
                      </div>
                    </div>
                  )}

                  {/* ─── BRANDING TAB ─── */}
                  {activeTab === 'branding' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-white">Employer Branding</h2>
                        <p className="text-white/40 text-xs mt-0.5">Build your company career page and attract top talent</p>
                      </div>

                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Page Builder */}
                        <div className="premium-glass rounded-3xl border border-white/10 p-6">
                          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-indigo-400" /> Career Page Builder
                          </h3>
                          <div className="space-y-3">
                            {[
                              { label: 'Company Hero Banner', status: '✅ Published' },
                              { label: 'Team Culture Section', status: '✅ Published' },
                              { label: 'Employee Video Stories', status: '⚠️ Needs update' },
                              { label: 'Benefits & Perks', status: '✅ Published' },
                              { label: 'Open Roles Feed', status: '✅ Live · Auto-sync' },
                              { label: 'DE&I Statement', status: '📝 Draft' },
                            ].map(b => (
                              <div key={b.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/20 transition-all cursor-pointer group">
                                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{b.label}</span>
                                <span className="text-xs text-white/40">{b.status}</span>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 gap-2 text-sm">
                            <ExternalLink className="w-4 h-4" /> Preview Career Page
                          </Button>
                        </div>

                        {/* Talent Pool CRM */}
                        <div className="space-y-4">
                          <div className="premium-glass rounded-3xl border border-white/10 p-6">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                              <Bookmark className="w-4 h-4 text-emerald-400" /> Talent Pool CRM
                            </h3>
                            <div className="space-y-3">
                              {[
                                { pool: 'ML / AI Engineers (Future)', count: 28, lastContact: '3 days ago' },
                                { pool: 'Senior Architects', count: 14, lastContact: '1 week ago' },
                                { pool: 'Product Designers', count: 9, lastContact: '2 weeks ago' },
                              ].map(p => (
                                <div key={p.pool} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="text-sm font-semibold text-white">{p.pool}</div>
                                      <div className="text-xs text-white/40">{p.count} candidates · Last contacted {p.lastContact}</div>
                                    </div>
                                    <Button size="sm" variant="outline" className="text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 gap-1">
                                      <Send className="w-3 h-3" /> Newsletter
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button variant="outline" className="w-full border-white/10 text-white/50 hover:text-white text-sm gap-2">
                                <Plus className="w-4 h-4" /> Create New Pool
                              </Button>
                            </div>
                          </div>

                          <div className="premium-glass rounded-3xl border border-white/10 p-6">
                            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                              <Hash className="w-4 h-4 text-purple-400" /> Vendor Agency Management
                            </h3>
                            <div className="space-y-2 text-xs text-white/50">
                              <div className="flex justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <span>TalentFirst Agency</span>
                                <span className="text-emerald-400">3 submissions</span>
                              </div>
                              <div className="flex justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                                <span>HireEdge Consulting</span>
                                <span className="text-amber-400">1 pending review</span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full mt-3 border-white/10 text-white/50 hover:text-white text-sm gap-2">
                              <Plus className="w-4 h-4" /> Invite Agency
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── New Job Modal ── */}
      <AnimatePresence>
        {showNewJobModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewJobModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-xl bg-[#0a0a0f] border border-white/10 rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Post New Job</h3>
                <button onClick={() => setShowNewJobModal(false)} className="text-white/40 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Job Title', placeholder: 'e.g. Senior React Developer' },
                  { label: 'Department', placeholder: 'e.g. Engineering' },
                  { label: 'Location', placeholder: 'e.g. Hyderabad / Remote' },
                  { label: 'Salary Range', placeholder: 'e.g. ₹20-35 LPA' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-xs text-white/50 mb-1.5 block">{f.label}</label>
                    <input className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors" placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-white/50 mb-1.5 block">Job Description</label>
                  <textarea rows={3} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none" placeholder="Describe the role, responsibilities, and requirements..." />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button onClick={() => setShowNewJobModal(false)} variant="outline" className="flex-1 border-white/15">Cancel</Button>
                  <Button onClick={() => setShowNewJobModal(false)} className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    <Sparkles className="w-4 h-4 mr-2" /> Post with AI Enhancement
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="flex justify-around">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Home' },
            { id: 'candidates', icon: Users, label: 'People' },
            { id: 'jobs', icon: Briefcase, label: 'Jobs' },
            { id: 'pipeline', icon: Layers, label: 'Pipeline' },
            { id: 'ai-tools', icon: Brain, label: 'AI' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === tab.id ? 'text-indigo-400' : 'text-white/40'}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[9px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
