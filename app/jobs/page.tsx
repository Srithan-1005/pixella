'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Briefcase, MapPin, DollarSign, Filter,
  Sparkles, CheckCircle2, Bookmark, BookmarkCheck,
  ArrowRight, X, ExternalLink, BrainCircuit, Shield,
  Upload, FileSpreadsheet, Plus, AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SAMPLE_JOBS, Job } from '@/lib/mock-data'
import * as XLSX from 'xlsx'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(SAMPLE_JOBS)
  const [searchQuery, setSearchQuery] = useState('')
  const [workTypeFilter, setWorkTypeFilter] = useState<'All' | 'Remote' | 'Hybrid' | 'On-site'>('All')
  const [levelFilter, setLevelFilter] = useState<'All' | 'Entry' | 'Mid' | 'Senior' | 'Lead'>('All')
  const [minMatch, setMinMatch] = useState<number>(0)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [appliedJobs, setAppliedJobs] = useState<string[]>([])
  const [applying, setApplying] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)

  // Load custom imported jobs & applications on mount
  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem('hireorbit_custom_jobs')
      if (storedJobs) {
        const custom = JSON.parse(storedJobs)
        setJobs([...custom, ...SAMPLE_JOBS])
      }

      const storedApplied = localStorage.getItem('hireorbit_applied_jobs')
      if (storedApplied) {
        const parsed = JSON.parse(storedApplied)
        setAppliedJobs(parsed.map((a: any) => a.id))
      }

      const storedSaved = localStorage.getItem('hireorbit_saved_job_ids')
      if (storedSaved) {
        setSavedJobs(JSON.parse(storedSaved))
      }

      // Fetch live records from dataset API
      fetch('/api/jobs-dataset?limit=50')
        .then((res) => res.json())
        .then((json) => {
          if (json.success && Array.isArray(json.data)) {
            const datasetJobs: Job[] = json.data.map((r: any) => ({
              id: `csv-${r.id}`,
              title: r.jobTitle,
              company: r.company,
              logo: '🏢',
              location: `${r.location}, ${r.country}`,
              workType: r.workType === 'Intern' ? 'On-site' : (r.location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid'),
              experienceLevel: (r.experience.includes('15') || r.experience.includes('12') || r.experience.includes('10')) ? 'Senior' : (r.experience.includes('0') || r.experience.includes('1')) ? 'Entry' : 'Mid',
              salary: r.salaryRange,
              salaryMin: r.salaryMin || 60000,
              salaryMax: r.salaryMax || 100000,
              postedAt: r.postingDate,
              matchScore: Math.floor(Math.random() * 12) + 86,
              skills: r.skills && r.skills.length > 0 ? r.skills : ['Teamwork', 'Communication'],
              description: r.description,
              responsibilities: r.responsibilities ? [r.responsibilities] : ['Manage deliverables', 'Collaborate across teams'],
              requirements: [r.qualifications, r.experience].filter(Boolean),
              benefits: r.benefits ? r.benefits.split(',').map((b: string) => b.trim()) : ['Health coverage', 'Flexible schedules']
            }))

            setJobs((prev) => {
              const existingIds = new Set(prev.map((j) => j.id))
              const newOnes = datasetJobs.filter((j) => !existingIds.has(j.id))
              return [...prev, ...newOnes]
            })
          }
        })
        .catch((err) => console.error('Failed to load dataset jobs:', err))
    } catch (e) {
      console.error(e)
    }
  }, [])

  // Dynamic search and filter
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchWorkType = workTypeFilter === 'All' || job.workType === workTypeFilter
      const matchLevel = levelFilter === 'All' || job.experienceLevel === levelFilter
      const matchScorePass = job.matchScore >= minMatch

      return matchSearch && matchWorkType && matchLevel && matchScorePass
    })
  }, [jobs, searchQuery, workTypeFilter, levelFilter, minMatch])

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    let updated: string[] = []
    if (savedJobs.includes(id)) {
      updated = savedJobs.filter((j) => j !== id)
    } else {
      updated = [...savedJobs, id]
    }
    setSavedJobs(updated)
    localStorage.setItem('hireorbit_saved_job_ids', JSON.stringify(updated))
  }

  const handleApply = (job: Job) => {
    setApplying(true)
    setTimeout(() => {
      setApplying(false)
      const updated = [...appliedJobs, job.id]
      setAppliedJobs(updated)

      // Also append to full application history for /profile and /applications
      try {
        const stored = localStorage.getItem('hireorbit_applied_jobs')
        const currentList = stored ? JSON.parse(stored) : []
        const newApp = {
          id: job.id,
          company: job.company,
          role: job.title,
          location: job.location,
          status: 'Applied',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          salary: job.salary
        }
        localStorage.setItem('hireorbit_applied_jobs', JSON.stringify([newApp, ...currentList]))
      } catch (e) {
        console.error(e)
      }
    }, 600)
  }

  // Handle Excel (.xlsx, .xls) and CSV parsing
  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const file = e.target.files[0]
    setImportStatus('Parsing spreadsheet file...')

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const jsonRows: any[] = XLSX.utils.sheet_to_json(worksheet)

        if (jsonRows.length === 0) {
          setImportStatus('No rows found in uploaded sheet.')
          return
        }

        const newJobs: Job[] = jsonRows.map((row, idx) => {
          // Normalize column names
          const title = row.Title || row.title || row.Role || row.role || row['Job Title'] || row.Position || 'Software Engineer'
          const company = row.Company || row.company || row.Employer || row.Organization || 'Tech Partner'
          const location = row.Location || row.location || row.City || 'Remote / Hybrid'
          const salary = row.Salary || row.salary || row.Compensation || '$120,000 - $160,000'
          const skillsRaw = row.Skills || row.skills || row['Skills Required'] || row.Technologies || 'Python, React, SQL'
          const skills = Array.isArray(skillsRaw) ? skillsRaw : String(skillsRaw).split(/[,;|]/).map(s => s.trim()).filter(Boolean)
          const desc = row.Description || row.description || row.Details || `Exciting opportunity for ${title} at ${company}.`

          return {
            id: `custom-job-${Date.now()}-${idx}`,
            title,
            company,
            logo: '💼',
            location,
            workType: location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
            experienceLevel: 'Mid',
            salary,
            salaryMin: 100000,
            salaryMax: 160000,
            postedAt: 'Just now',
            matchScore: Math.floor(Math.random() * 10) + 89,
            skills,
            description: desc,
            responsibilities: ['Collaborate across teams', 'Build production grade software', 'Deliver scalable features'],
            requirements: ['Strong technical background', 'Experience with modern frameworks'],
            benefits: ['Competitive compensation', 'Remote options', 'Health insurance']
          }
        })

        const updated = [...newJobs, ...jobs]
        setJobs(updated)
        localStorage.setItem('hireorbit_custom_jobs', JSON.stringify(newJobs))
        setImportStatus(`Successfully imported ${newJobs.length} jobs from ${file.name}!`)
        setTimeout(() => {
          setShowImportModal(false)
          setImportStatus(null)
        }, 1500)
      } catch (err: any) {
        console.error('Excel parse error:', err)
        setImportStatus('Failed to parse sheet: ' + err.message)
      }
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[15%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-25 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1 text-xs">
            Semantic AI Job Matching Engine
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Curated Career Opportunities
          </h1>
          <p className="text-white/50 text-base">
            Jobs ranked and matched based on your parsed resume embeddings, technical skills, and compensation goals.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="premium-glass p-5 rounded-3xl border border-white/10 mb-8 space-y-4 shadow-xl">
          <div className="grid md:grid-cols-12 gap-3">
            <div className="md:col-span-7 relative">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (e.g. Python, SQL, React), or company..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/30 transition-all"
              />
            </div>

            <div className="md:col-span-3 flex gap-2">
              <select
                value={workTypeFilter}
                onChange={(e) => setWorkTypeFilter(e.target.value as any)}
                className="w-1/2 px-3 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-indigo-500"
              >
                <option value="All" className="bg-[#0b0b12] text-white">All Locations</option>
                <option value="Remote" className="bg-[#0b0b12] text-white">Remote Only</option>
                <option value="Hybrid" className="bg-[#0b0b12] text-white">Hybrid</option>
                <option value="On-site" className="bg-[#0b0b12] text-white">On-site</option>
              </select>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as any)}
                className="w-1/2 px-3 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 focus:outline-none focus:border-indigo-500"
              >
                <option value="All" className="bg-[#0b0b12] text-white">All Levels</option>
                <option value="Entry" className="bg-[#0b0b12] text-white">Entry Level</option>
                <option value="Mid" className="bg-[#0b0b12] text-white">Mid Level</option>
                <option value="Senior" className="bg-[#0b0b12] text-white">Senior</option>
                <option value="Lead" className="bg-[#0b0b12] text-white">Lead / Principal</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button
                type="button"
                onClick={() => setShowImportModal(true)}
                variant="outline"
                className="w-full h-full text-xs border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                Import Excel
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-white/40">Match Threshold:</span>
              <button
                type="button"
                onClick={() => setMinMatch(0)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  minMatch === 0 ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-white/60'
                }`}
              >
                All Scores
              </button>
              <button
                type="button"
                onClick={() => setMinMatch(85)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  minMatch === 85 ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-white/60'
                }`}
              >
                85%+ Match
              </button>
              <button
                type="button"
                onClick={() => setMinMatch(90)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  minMatch === 90 ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-white/60'
                }`}
              >
                90%+ Match (Top Tier)
              </button>
            </div>

            <span className="text-indigo-400 font-semibold">
              Showing {filteredJobs.length} active opportunities
            </span>
          </div>
        </div>

        {/* Job Cards Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id)
              const isApplied = appliedJobs.includes(job.id)

              return (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedJob(job)}
                  className="premium-glass p-6 rounded-3xl border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between cursor-pointer group shadow-lg"
                >
                  <div>
                    {/* Top Row: Logo, Match Score & Bookmark */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                          {job.logo}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white/70">{job.company}</h4>
                          <span className="text-[11px] text-white/40">{job.postedAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          {job.matchScore}%
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleToggleSave(job.id, e)}
                          className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {job.title}
                    </h3>

                    {/* Badges: Location & Salary */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-4">
                      <span className="flex items-center gap-1 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/5 text-emerald-400 font-medium">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                    </div>

                    <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/5 text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] bg-white/5 border border-white/5 text-white/40">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-indigo-400 font-semibold group-hover:underline flex items-center gap-1">
                      View details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {isApplied ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Applied
                      </span>
                    ) : (
                      <Badge className="bg-white/5 text-white/60 border-white/10">
                        {job.workType}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="premium-glass p-12 rounded-3xl border border-white/10 text-center">
            <Briefcase className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-1">No matching jobs found</h3>
            <p className="text-white/40 text-xs mb-4">
              Try adjusting your search query, location filter, or lowering the match threshold.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('')
                setWorkTypeFilter('All')
                setLevelFilter('All')
                setMinMatch(0)
              }}
              variant="outline"
              size="sm"
              className="text-xs border-white/15"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Import Excel / CSV Modal */}
        <AnimatePresence>
          {showImportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="premium-glass p-8 rounded-3xl border border-white/15 max-w-lg w-full bg-[#0b0b14]/95 shadow-2xl relative"
              >
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Import Jobs from Excel / CSV</h3>
                    <p className="text-xs text-white/40">Upload any .xlsx, .xls, or .csv job dataset</p>
                  </div>
                </div>

                <div className="p-8 rounded-2xl border-2 border-dashed border-white/15 hover:border-indigo-500/50 bg-white/[0.02] text-center relative cursor-pointer mb-4">
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleExcelImport}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white mb-1">Click to browse or drop spreadsheet file</p>
                  <p className="text-[11px] text-white/40">Supports columns: Title, Company, Location, Salary, Skills</p>
                </div>

                {importStatus && (
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{importStatus}</span>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="premium-glass p-8 rounded-3xl border border-white/15 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative bg-[#0b0b14]/95 shadow-2xl"
              >
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
                    {selectedJob.logo}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedJob.title}</h2>
                    <p className="text-indigo-400 font-medium text-sm">
                      {selectedJob.company} • {selectedJob.location}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-white/60">
                      <span className="text-emerald-400 font-bold">{selectedJob.salary}</span>
                      <span>•</span>
                      <span>{selectedJob.workType}</span>
                      <span>•</span>
                      <span className="text-indigo-400 font-bold">{selectedJob.matchScore}% Profile Match</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 text-xs text-white/70">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                      About the Role
                    </h4>
                    <p className="leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Key Responsibilities
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {selectedJob.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Required Qualifications
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                      Compensation & Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.benefits.map((b, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                          ✓ {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <Link href={`/interview-prep?role=${encodeURIComponent(selectedJob.title)}`}>
                      <Button variant="outline" size="sm" className="text-xs border-white/15">
                        <BrainCircuit className="w-3.5 h-3.5 mr-1.5 text-pink-400" />
                        Practice Interview
                      </Button>
                    </Link>
                    <Link href={`/applications`}>
                      <Button variant="outline" size="sm" className="text-xs border-white/15">
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                        AI Cover Letter
                      </Button>
                    </Link>
                  </div>

                  {appliedJobs.includes(selectedJob.id) ? (
                    <Button disabled className="bg-emerald-600 text-white font-semibold text-xs h-10 px-6">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Application Submitted!
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApply(selectedJob)}
                      disabled={applying}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs h-10 px-6 shadow-lg shadow-indigo-500/25 cursor-pointer"
                    >
                      {applying ? (
                        <span className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting Application...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Quick Apply with AI Resume <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
