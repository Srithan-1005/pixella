'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Mail, Phone, MapPin, Briefcase,
  GraduationCap, Award, Sparkles, CheckCircle2,
  Clock, TrendingUp, Target, Bookmark, Edit3,
  FileText, ExternalLink, ArrowRight, ShieldCheck, X, Check,
  Video, Globe, Github, Plus, Play, Pause, Eye, Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SAMPLE_RESUME, SAMPLE_JOBS } from '@/lib/mock-data'

export default function ProfilePage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'applications' | 'saved' | 'resume' | 'portfolio'>('details')
  const [isEditing, setIsEditing] = useState(false)
  const [anonymousProfile, setAnonymousProfile] = useState(false)
  const [videoPitchActive, setVideoPitchActive] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [portfolioProjects, setPortfolioProjects] = useState([
    {
      id: 'p1',
      title: 'NeuralHire AI Agent',
      desc: 'Multi-modal autonomous agent that conducts conversational candidate pre-screening and semantic resume scoring.',
      tech: ['Next.js', 'FastAPI', 'PyTorch', 'LangChain'],
      liveUrl: 'https://github.com/candidate/neuralhire',
      github: 'https://github.com/candidate/neuralhire'
    },
    {
      id: 'p2',
      title: 'High-Throughput Vector Search Pipeline',
      desc: 'Distributed embeddings indexing pipeline using pgvector and Redis caching capable of 12,000 queries/sec.',
      tech: ['Python', 'PostgreSQL', 'Docker', 'Redis'],
      liveUrl: 'https://github.com/candidate/vector-pipeline',
      github: 'https://github.com/candidate/vector-pipeline'
    }
  ])

  // Profile state with localStorage persistence
  const [profile, setProfile] = useState({
    fullName: SAMPLE_RESUME.fullName,
    title: SAMPLE_RESUME.title,
    email: SAMPLE_RESUME.email,
    phone: SAMPLE_RESUME.phone,
    location: SAMPLE_RESUME.location,
    summary: SAMPLE_RESUME.summary,
    atsScore: 96,
  })

  const [skills, setSkills] = useState(SAMPLE_RESUME.skills)
  const [experience, setExperience] = useState(SAMPLE_RESUME.experience)
  const [education, setEducation] = useState(SAMPLE_RESUME.education)

  // Application tracker state
  const [appliedJobs, setAppliedJobs] = useState([
    { id: 'app-1', company: 'NeuralOrbit Labs', role: 'Senior Full Stack AI Engineer', location: 'San Francisco, CA', status: 'Interview', date: 'Oct 14, 2026', salary: '$165,000 - $210,000' },
    { id: 'app-2', company: 'Dataspark Analytics', role: 'Data Engineer (Python & SQL)', location: 'Hyderabad, India', status: 'Screening', date: 'Oct 16, 2026', salary: '$95,000 - $135,000' },
    { id: 'app-3', company: 'Cognitive Nexus', role: 'Generative AI & LLM Systems Developer', location: 'Bengaluru, India', status: 'Applied', date: 'Oct 18, 2026', salary: '$110,000 - $150,000' },
    { id: 'app-4', company: 'TekTalis Systems', role: 'Full Stack Web Developer (React & Node.js)', location: 'Hyderabad, India', status: 'Offer', date: 'Oct 08, 2026', salary: '$70,000 - $95,000' },
  ])

  // Saved jobs state
  const [savedJobs, setSavedJobs] = useState(SAMPLE_JOBS.slice(0, 3))

  useEffect(() => {
    try {
      // ── Auth guard: redirect to login if no user ──
      const storedUser = localStorage.getItem('hireorbit_user')
      if (!storedUser) {
        router.replace('/login')
        return
      }
      setAuthChecked(true)

      const u = JSON.parse(storedUser)
      setProfile((prev) => ({
        ...prev,
        fullName: u.fullName || prev.fullName,
        email: u.email || prev.email,
        title: u.title || prev.title,
        phone: u.phone || prev.phone,
        location: u.location || prev.location,
        atsScore: u.atsScore || prev.atsScore,
      }))

      const storedResume = localStorage.getItem('hireorbit_resume_data')
      if (storedResume) {
        const parsed = JSON.parse(storedResume)
        setProfile((prev) => ({
          ...prev,
          fullName: parsed.fullName || prev.fullName,
          title: parsed.title || prev.title,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
          location: parsed.location || prev.location,
          summary: parsed.summary || prev.summary,
          atsScore: parsed.atsScores?.score || prev.atsScore,
        }))
        if (parsed.skills) setSkills(parsed.skills)
        if (parsed.experience) setExperience(parsed.experience)
        if (parsed.education) setEducation(parsed.education)
      }

      const storedApps = localStorage.getItem('hireorbit_applied_jobs')
      if (storedApps) {
        setAppliedJobs(JSON.parse(storedApps))
      }
    } catch (e) {
      console.error('Error loading profile data:', e)
    }
  }, [router])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    localStorage.setItem('hireorbit_user', JSON.stringify(profile))
  }

  // Show nothing while auth check runs (avoids flash of content)
  if (!authChecked) return null

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Profile Hero Card */}
        <div className="premium-glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl mb-8 relative overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-xl shadow-indigo-500/20">
                  <div className="w-full h-full bg-[#0b0b14] rounded-[22px] flex items-center justify-center text-3xl font-black text-indigo-400">
                    {profile.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#030303] flex items-center justify-center text-[10px] text-black font-bold">
                  ✓
                </div>
              </div>

              {/* Name & Contact */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    {profile.fullName}
                  </h1>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">
                    Profile Verified
                  </Badge>
                </div>
                <p className="text-indigo-400 font-semibold text-sm mb-2">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-white/40" /> {profile.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-white/40" /> {profile.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-white/40" /> {profile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="text-xs border-white/15 h-10 px-4 cursor-pointer hover:bg-white/10"
              >
                <Edit3 className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Edit Profile
              </Button>
              <Link href="/dashboard/upload-resume">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs h-10 px-4">
                  <FileText className="w-3.5 h-3.5 mr-1.5" /> Update Resume
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[11px] text-white/40 uppercase font-semibold block">Total Applied</span>
              <span className="text-2xl font-black text-white mt-0.5 block">{appliedJobs.length}</span>
              <span className="text-[10px] text-emerald-400 font-medium">Active tracking</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[11px] text-white/40 uppercase font-semibold block">Saved Jobs</span>
              <span className="text-2xl font-black text-white mt-0.5 block">{savedJobs.length}</span>
              <span className="text-[10px] text-indigo-400 font-medium">Bookmarked</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[11px] text-white/40 uppercase font-semibold block">Resume ATS Score</span>
              <span className="text-2xl font-black text-indigo-400 mt-0.5 block">{profile.atsScore}%</span>
              <span className="text-[10px] text-indigo-300 font-medium">Top 5% candidate</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[11px] text-white/40 uppercase font-semibold block">Mock Interviews</span>
              <span className="text-2xl font-black text-white mt-0.5 block">12</span>
              <span className="text-[10px] text-purple-400 font-medium">Avg Score 8.8/10</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            { id: 'details', label: 'Profile & Skills' },
            { id: 'applications', label: `Applied Jobs (${appliedJobs.length})` },
            { id: 'saved', label: `Saved Jobs (${savedJobs.length})` },
            { id: 'resume', label: 'Resume & Documents' },
            { id: 'portfolio', label: 'Portfolio & Pitch Video' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Profile Details & Skills */}
        {activeTab === 'details' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Summary */}
              <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-400" /> Professional Summary
                </h3>
                <p className="text-xs text-white/70 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {profile.summary}
                </p>
              </div>

              {/* Work Experience */}
              <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" /> Experience Timeline
                </h3>
                <div className="space-y-4">
                  {experience.map((exp: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{exp.role}</span>
                        <span className="text-white/40">{exp.period}</span>
                      </div>
                      <div className="text-[11px] text-indigo-400">{exp.company} • {exp.location}</div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-white/60">
                        {exp.bullets?.map((b: string, bi: number) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" /> Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-bold text-white block">{edu.degree}</span>
                        <span className="text-white/50">{edu.institution}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-indigo-400 font-semibold block">{edu.year}</span>
                        <span className="text-white/40">{edu.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Skills Pills */}
            <div className="lg:col-span-4 space-y-6">
              <div className="premium-glass p-7 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Technical Skills
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-[11px] text-white/50 uppercase font-bold block mb-2">Frontend</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.frontend?.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-white/50 uppercase font-bold block mb-2">Backend & Databases</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.backend?.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-white/50 uppercase font-bold block mb-2">AI, Cloud & Tools</span>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.ai_cloud?.map((s: string) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Applied Jobs History */}
        {activeTab === 'applications' && (
          <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" /> Applied Positions Tracking
                </h3>
                <p className="text-xs text-white/40 mt-0.5">Real-time status updates from recruiters and hiring portals</p>
              </div>
              <Link href="/jobs">
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                  Apply to More Jobs
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {appliedJobs.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
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
                    <p className="text-xs text-white/50">
                      {app.company} • {app.location} • Applied on {app.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-emerald-400">{app.salary}</span>
                    <Link href={`/interview-prep?role=${encodeURIComponent(app.role)}`}>
                      <Button variant="outline" size="sm" className="text-xs border-white/15 h-8">
                        Practice Interview
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Saved Jobs */}
        {activeTab === 'saved' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobs.map((job) => (
              <div key={job.id} className="premium-glass p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                        {job.logo}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white/80">{job.company}</h4>
                        <span className="text-[10px] text-white/40">{job.location}</span>
                      </div>
                    </div>
                    <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px]">
                      {job.matchScore}% Match
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{job.title}</h3>
                  <div className="text-xs text-emerald-400 font-semibold mb-3">{job.salary}</div>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-white/40">{job.workType}</span>
                  <Link href="/jobs">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs h-8">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Resume & Documents */}
        {activeTab === 'resume' && (
          <div className="premium-glass p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" /> Active Verified Resume
                </h3>
                <p className="text-xs text-white/40 mt-0.5">Parsed via HireOrbit OCR Engine</p>
              </div>
              <div className="flex gap-2">
                <Link href="/dashboard/upload-resume">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                    Upload New Version
                  </Button>
                </Link>
                <Link href="/resume-score">
                  <Button size="sm" variant="outline" className="text-xs border-white/15">
                    Run ATS Audit
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Target Role: {profile.title}</span>
                <span className="text-emerald-400 font-bold">ATS Score: {profile.atsScore}%</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Extracted Skills: {[...(skills.frontend || []), ...(skills.backend || []), ...(skills.ai_cloud || [])].join(', ')}
              </p>
            </div>
          </div>
        )}

        {/* Tab 5: Portfolio & Video Pitch */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {/* 60-Second Video Pitch Section */}
            <div className="premium-glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">60-Second Video Introduction (Elevator Pitch)</h3>
                  </div>
                  <p className="text-xs text-white/40 mt-1">
                    Recruiters are 4.5x more likely to shortlist candidates with an authentic 30–60 second introduction.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setVideoPitchActive(true)
                      setIsPlayingVideo(!isPlayingVideo)
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-xs h-9 px-4 cursor-pointer"
                  >
                    {isPlayingVideo ? <Pause className="w-3.5 h-3.5 mr-1.5" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                    {videoPitchActive ? (isPlayingVideo ? 'Pause Pitch' : 'Play Pitch') : 'Record / Upload Pitch'}
                  </Button>
                </div>
              </div>

              {/* Video Pitch Player / Placeholder */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video max-h-72 bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950/90 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center mb-3 shadow-xl shadow-indigo-500/20">
                  <Video className="w-8 h-8 text-indigo-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {videoPitchActive ? (isPlayingVideo ? 'Playing Elevator Pitch (0:24 / 0:58)' : 'Video Pitch Ready (0:58)') : 'No Video Pitch Uploaded Yet'}
                </h4>
                <p className="text-xs text-white/50 max-w-md">
                  {videoPitchActive
                    ? '"Hi, I\'m Srithan. I build scalable full-stack applications and integrate generative AI pipelines that solve real-world problems..."'
                    : 'Record a quick intro on your webcam or upload an MP4/WebM clip (30-60 sec) highlighting your background and projects.'}
                </p>
                {videoPitchActive && (
                  <div className="w-full max-w-md mt-4 bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-500 rounded-full ${isPlayingVideo ? 'w-2/5 animate-pulse' : 'w-full'}`} />
                  </div>
                )}
              </div>
            </div>

            {/* Featured Projects & Code Repositories */}
            <div className="premium-glass p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-400" /> Featured Engineering Projects & Portfolio
                  </h3>
                  <p className="text-xs text-white/40 mt-1">Verified work samples and open source repositories indexed by AI matching</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newProj = {
                      id: `p-${Date.now()}`,
                      title: 'Autonomous Code Review Bot',
                      desc: 'GitHub Action utilizing AST analysis and LLM agents to detect race conditions and security vulnerabilities.',
                      tech: ['TypeScript', 'GitHub API', 'Node.js'],
                      liveUrl: 'https://github.com/candidate/review-bot',
                      github: 'https://github.com/candidate/review-bot'
                    }
                    setPortfolioProjects([...portfolioProjects, newProj])
                  }}
                  className="text-xs border-white/15 cursor-pointer hover:bg-white/10"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioProjects.map((proj) => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-[10px]">Verified Code</Badge>
                      </div>
                      <p className="text-xs text-white/60 mb-4 leading-relaxed">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tech.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-white/70 border border-white/10 font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs">
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors ml-auto">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DE&I Anonymous Profile Privacy Controls */}
            <div className="premium-glass p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">DE&I Anonymous Profile Mode</h3>
                    <p className="text-xs text-white/40">Hides name, gender, photos, and age from recruiter search to prevent cognitive bias</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAnonymousProfile(!anonymousProfile)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    anonymousProfile
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {anonymousProfile ? '✓ Anonymous Mode Active' : 'Enable Anonymous Mode'}
                </button>
              </div>
              <p className="text-xs text-white/50 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {anonymousProfile
                  ? '🔒 Your profile appears to recruiters as "Verified Candidate #SK489", displaying only your verified skills, experience level, and test scores. Your personal contact info is revealed only after an interview invitation is accepted.'
                  : 'ℹ️ Your standard public profile with full name and verified links is currently visible to authorized recruiters.'}
              </p>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="premium-glass p-8 rounded-3xl border border-white/15 max-w-lg w-full bg-[#0b0b14]/95 shadow-2xl relative"
              >
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-bold text-white mb-4">Edit Profile Information</h3>

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-white/70 mb-1.5 font-semibold">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1.5 font-semibold">Professional Headline / Title</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-white/70 mb-1.5 font-semibold">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1.5 font-semibold">Phone</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1.5 font-semibold">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1.5 font-semibold">Summary</label>
                    <textarea
                      rows={3}
                      value={profile.summary}
                      onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="border-white/10 text-xs"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-xs">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
