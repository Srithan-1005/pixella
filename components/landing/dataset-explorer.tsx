'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Briefcase, MapPin, DollarSign, Calendar,
  Filter, ArrowUpDown, ArrowUp, ArrowDown, ExternalLink,
  ChevronLeft, ChevronRight, Eye, RefreshCw, AlertCircle,
  Building2, CheckCircle2, Bookmark, BookmarkCheck,
  Layers, Sparkles, X, List, LayoutGrid
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { GlassButton } from '@/components/ui/glass-button'
import { JobDatasetRecord } from '@/lib/dataset'

interface DatasetApiResponse {
  success: boolean
  data: JobDatasetRecord[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
  stats: {
    totalJobs: number
    filteredMatches: number
    uniqueCompanies: number
    uniqueLocations: number
    workTypeCounts: Record<string, number>
    avgSalary: string
  }
  error?: string
}

export function DatasetExplorer() {
  const [data, setData] = useState<JobDatasetRecord[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filtering & Pagination State
  const [search, setSearch] = useState('')
  const [workType, setWorkType] = useState('All')
  const [sortBy, setSortBy] = useState<'date' | 'salary' | 'title' | 'company'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  
  // Total stats from API
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  })
  const [stats, setStats] = useState({
    totalJobs: 0,
    uniqueCompanies: 0,
    uniqueLocations: 0,
    avgSalary: '$78,500',
  })

  // View mode: table or card grid
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // Selected job for quick preview modal
  const [selectedRecord, setSelectedRecord] = useState<JobDatasetRecord | null>(null)
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [appliedIds, setAppliedIds] = useState<string[]>([])
  const [applySuccess, setApplySuccess] = useState<string | null>(null)

  // Load saved / applied states from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('hireorbit_saved_job_ids')
      if (saved) setSavedIds(JSON.parse(saved))
      const applied = localStorage.getItem('hireorbit_applied_jobs')
      if (applied) {
        const parsed = JSON.parse(applied)
        setAppliedIds(parsed.map((a: any) => a.id))
      }
    } catch {
      // ignore
    }
  }, [])

  // Fetch from API
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search,
        workType,
        sortBy,
        sortOrder,
      })

      const res = await fetch(`/api/jobs-dataset?${params.toString()}`)
      if (!res.ok) {
        throw new Error(`Failed to load dataset (status: ${res.status})`)
      }

      const json: DatasetApiResponse = await res.json()
      if (!json.success) {
        throw new Error(json.error || 'Failed to fetch dataset')
      }

      setData(json.data)
      setPaginationInfo(json.pagination)
      if (json.stats) {
        setStats({
          totalJobs: json.stats.totalJobs,
          uniqueCompanies: json.stats.uniqueCompanies,
          uniqueLocations: json.stats.uniqueLocations,
          avgSalary: json.stats.avgSalary,
        })
      }
    } catch (err: any) {
      console.error('Dataset fetch error:', err)
      setError(err.message || 'Error parsing dataset. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Trigger re-fetch when filters change (reset page to 1 on filter/search change)
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData()
    }, 200)

    return () => clearTimeout(handler)
  }, [search, workType, sortBy, sortOrder, page])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleWorkTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkType(e.target.value)
    setPage(1)
  }

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    let updated: string[] = []
    if (savedIds.includes(id)) {
      updated = savedIds.filter((item) => item !== id)
    } else {
      updated = [...savedIds, id]
    }
    setSavedIds(updated)
    try {
      localStorage.setItem('hireorbit_saved_job_ids', JSON.stringify(updated))
    } catch {
      // ignore
    }
  }

  const handleApply = (record: JobDatasetRecord, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    if (appliedIds.includes(record.id)) return

    const updated = [...appliedIds, record.id]
    setAppliedIds(updated)
    setApplySuccess(record.id)

    try {
      const stored = localStorage.getItem('hireorbit_applied_jobs')
      const currentList = stored ? JSON.parse(stored) : []
      const newApp = {
        id: record.id,
        company: record.company,
        role: record.jobTitle,
        location: `${record.location}, ${record.country}`,
        status: 'Applied',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        salary: record.salaryRange,
      }
      localStorage.setItem('hireorbit_applied_jobs', JSON.stringify([newApp, ...currentList]))
    } catch {
      // ignore
    }

    setTimeout(() => {
      setApplySuccess(null)
    }, 2500)
  }

  return (
    <section id="dataset-explorer" className="py-24 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="orbit-glow glow-indigo top-[10%] right-[-10%] opacity-20 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[10%] left-[-10%] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1.5 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-indigo-400" />
            Live CSV Dataset Integration
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Global Job Market Dataset
          </h2>
          <p className="text-white/60 text-base md:text-lg">
            Directly parsed and synchronized from <code className="text-indigo-400 bg-white/5 px-2 py-0.5 rounded text-sm font-mono">job_descriptions.csv</code>. 
            Filter, search, inspect salaries, and apply in real-time.
          </p>
        </div>

        {/* Dataset High-Level Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl premium-glass border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.totalJobs.toLocaleString()}+</div>
              <div className="text-xs text-white/50">Curated Dataset Records</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl premium-glass border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.uniqueCompanies}+</div>
              <div className="text-xs text-white/50">Hiring Organizations</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl premium-glass border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-emerald-400">{stats.avgSalary}</div>
              <div className="text-xs text-white/50">Median Compensation</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl premium-glass border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">{stats.uniqueLocations}+</div>
              <div className="text-xs text-white/50">Global Locations</div>
            </div>
          </div>
        </div>

        {/* Search, Filter & View Controls */}
        <div className="p-4 md:p-6 rounded-3xl premium-glass border border-white/10 mb-6 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search dataset by role, company, skills, or city..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder:text-white/40 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Work Type Filter */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5">
                <Filter className="w-3.5 h-3.5 text-white/40" />
                <select
                  value={workType}
                  onChange={handleWorkTypeChange}
                  className="bg-transparent text-xs text-white/80 focus:outline-none pr-2 py-1.5 cursor-pointer"
                >
                  <option value="All" className="bg-[#0b0b12] text-white">All Work Types</option>
                  <option value="Full-Time" className="bg-[#0b0b12] text-white">Full-Time</option>
                  <option value="Intern" className="bg-[#0b0b12] text-white">Intern</option>
                  <option value="Contract" className="bg-[#0b0b12] text-white">Contract</option>
                  <option value="Temporary" className="bg-[#0b0b12] text-white">Temporary</option>
                </select>
              </div>

              {/* Sort By Field */}
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-2xl px-3 py-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-white/40" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-white/80 focus:outline-none pr-2 py-1.5 cursor-pointer"
                >
                  <option value="date" className="bg-[#0b0b12] text-white">Sort by Date</option>
                  <option value="salary" className="bg-[#0b0b12] text-white">Sort by Salary</option>
                  <option value="title" className="bg-[#0b0b12] text-white">Sort by Title</option>
                  <option value="company" className="bg-[#0b0b12] text-white">Sort by Company</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  title={`Order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                  className="p-1 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
                >
                  {sortOrder === 'asc' ? <ArrowUp className="w-3.5 h-3.5 text-indigo-400" /> : <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'table' ? 'bg-indigo-600 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-white/40 hover:text-white'}`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area: Loading, Error, or Data display */}
        {loading ? (
          /* Loading Skeleton State */
          <div className="premium-glass rounded-3xl border border-white/10 p-8 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse" />
              <div className="h-6 w-24 bg-white/10 rounded-lg animate-pulse" />
            </div>
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="flex items-center justify-between py-3 px-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="space-y-2">
                  <div className="h-5 w-64 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 w-40 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="h-6 w-24 bg-emerald-500/10 rounded-full animate-pulse" />
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse hidden md:block" />
                <div className="h-8 w-20 bg-indigo-500/10 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error State with Retry */
          <div className="premium-glass rounded-3xl border border-rose-500/20 bg-rose-500/5 p-10 text-center max-w-xl mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Unable to Load Dataset</h3>
            <p className="text-white/60 text-sm mb-6">{error}</p>
            <GlassButton
              onClick={fetchData}
              className="bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/40 text-rose-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry Dataset Load
            </GlassButton>
          </div>
        ) : data.length === 0 ? (
          /* Empty Search / Filter State */
          <div className="premium-glass rounded-3xl border border-white/10 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Matching Dataset Records</h3>
            <p className="text-white/50 text-sm mb-6">
              No entries found matching "{search}". Try searching for another role, tech stack, or resetting filters.
            </p>
            <GlassButton
              onClick={() => {
                setSearch('')
                setWorkType('All')
                setPage(1)
              }}
              className="bg-white/10 hover:bg-white/15 border-white/10 text-white"
            >
              Reset Filters
            </GlassButton>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="premium-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs text-white/50 font-semibold uppercase tracking-wider">
                    <th className="py-4 px-6">Job Title & Role</th>
                    <th className="py-4 px-6">Company</th>
                    <th className="py-4 px-6">Salary Range</th>
                    <th className="py-4 px-6">Location</th>
                    <th className="py-4 px-6">Work Type</th>
                    <th className="py-4 px-6">Date Posted</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {data.map((record) => {
                    const isSaved = savedIds.includes(record.id)
                    const isApplied = appliedIds.includes(record.id)

                    return (
                      <tr
                        key={record.id}
                        onClick={() => setSelectedRecord(record)}
                        className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                      >
                        {/* Title & Role */}
                        <td className="py-4 px-6">
                          <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {record.jobTitle}
                          </div>
                          <div className="text-xs text-white/40 flex items-center gap-2 mt-0.5">
                            <span>{record.role}</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-white/30">{record.experience}</span>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="text-white/80 font-medium">{record.company}</span>
                          </div>
                          {record.qualifications && (
                            <span className="text-[11px] text-white/40 block">{record.qualifications}</span>
                          )}
                        </td>

                        {/* Salary Range */}
                        <td className="py-4 px-6">
                          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-mono text-xs">
                            {record.salaryRange}
                          </Badge>
                        </td>

                        {/* Location */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-white/70 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <span className="truncate max-w-[140px]">{record.location}, {record.country}</span>
                          </div>
                        </td>

                        {/* Work Type */}
                        <td className="py-4 px-6">
                          <Badge
                            className={`text-xs ${
                              record.workType === 'Full-Time'
                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                : record.workType === 'Intern'
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            {record.workType}
                          </Badge>
                        </td>

                        {/* Date Posted */}
                        <td className="py-4 px-6 text-white/50 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-white/30" />
                            {record.postingDate}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedRecord(record)}
                              title="Quick View Details"
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => handleToggleSave(record.id, e)}
                              title={isSaved ? 'Job Saved' : 'Save Job'}
                              className={`p-2 rounded-xl transition-all ${
                                isSaved
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white'
                              }`}
                            >
                              {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={(e) => handleApply(record, e)}
                              disabled={isApplied}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                isApplied
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default'
                                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                              }`}
                            >
                              {isApplied ? 'Applied' : 'Apply'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid Cards View */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((record) => {
              const isSaved = savedIds.includes(record.id)
              const isApplied = appliedIds.includes(record.id)

              return (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className="p-6 rounded-3xl premium-glass border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <Badge className="bg-white/5 text-white/50 border-white/5 text-[10px] mb-2">
                          {record.workType}
                        </Badge>
                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {record.jobTitle}
                        </h3>
                        <p className="text-xs text-white/40 mt-0.5">{record.company} • {record.role}</p>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono shrink-0">
                        {record.salaryRange}
                      </Badge>
                    </div>

                    <p className="text-xs text-white/60 line-clamp-2 mb-4 leading-relaxed">
                      {record.description || record.responsibilities}
                    </p>

                    {/* Skill Tags */}
                    {record.skills && record.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {record.skills.slice(0, 3).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                        {record.skills.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-lg text-[10px] text-white/40">
                            +{record.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                    <div className="flex items-center gap-1.5 truncate max-w-[150px]">
                      <MapPin className="w-3.5 h-3.5 text-white/30 shrink-0" />
                      <span className="truncate">{record.location}, {record.country}</span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleToggleSave(record.id, e)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isSaved ? 'text-amber-400' : 'text-white/40 hover:text-white'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={(e) => handleApply(record, e)}
                        disabled={isApplied}
                        className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                          isApplied
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {isApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && paginationInfo.totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl premium-glass border border-white/5">
            <div className="text-xs text-white/50">
              Showing page <span className="text-white font-semibold">{paginationInfo.page}</span> of{' '}
              <span className="text-white font-semibold">{paginationInfo.totalPages}</span>{' '}
              ({paginationInfo.total.toLocaleString()} filtered jobs)
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!paginationInfo.hasPrev}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
                  let pNum = i + 1
                  if (paginationInfo.totalPages > 5 && paginationInfo.page > 3) {
                    pNum = paginationInfo.page - 3 + i
                    if (pNum > paginationInfo.totalPages) {
                      pNum = paginationInfo.totalPages - (4 - i)
                    }
                  }
                  return (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`w-8 h-8 rounded-xl text-xs font-medium transition-all ${
                        paginationInfo.page === pNum
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {pNum}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(paginationInfo.totalPages, p + 1))}
                disabled={!paginationInfo.hasNext}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Slide-Over Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0b0b14] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedRecord(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs">
                    {selectedRecord.workType}
                  </Badge>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-mono">
                    {selectedRecord.salaryRange}
                  </Badge>
                  <Badge className="bg-white/5 text-white/50 border-white/5 text-xs">
                    {selectedRecord.experience}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedRecord.jobTitle}</h3>
                <div className="text-sm text-indigo-400 font-medium">
                  {selectedRecord.company} • {selectedRecord.role}
                </div>
                <div className="flex items-center gap-3 text-xs text-white/40 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedRecord.location}, {selectedRecord.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Posted: {selectedRecord.postingDate}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-6 text-sm">
                {selectedRecord.description && (
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {selectedRecord.description}
                    </p>
                  </div>
                )}

                {/* Responsibilities */}
                {selectedRecord.responsibilities && (
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Responsibilities</h4>
                    <p className="text-white/80 leading-relaxed bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                      {selectedRecord.responsibilities}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {selectedRecord.skills && selectedRecord.skills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {selectedRecord.benefits && (
                  <div>
                    <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Perks & Benefits</h4>
                    <p className="text-white/70 text-xs leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      {selectedRecord.benefits}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleToggleSave(selectedRecord.id)}
                  className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors"
                >
                  {savedIds.includes(selectedRecord.id) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-400">Saved to Profile</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4" />
                      <span>Save for Later</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <GlassButton
                    onClick={() => setSelectedRecord(null)}
                    className="bg-white/5 hover:bg-white/10 border-white/10 text-xs text-white"
                  >
                    Close
                  </GlassButton>
                  <GlassButton
                    onClick={() => handleApply(selectedRecord)}
                    disabled={appliedIds.includes(selectedRecord.id)}
                    className={`text-xs ${
                      appliedIds.includes(selectedRecord.id)
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {appliedIds.includes(selectedRecord.id) ? (
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Applied
                      </span>
                    ) : (
                      'Apply to this Role'
                    )}
                  </GlassButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
