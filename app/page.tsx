'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Sparkles, ArrowRight, Target, Zap, TrendingUp,
    BrainCircuit, ShieldCheck, ChevronRight, FileText,
    Briefcase, Compass, Mail, MessageSquare, Star,
    DollarSign, BarChart3
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { GlassButton } from '@/components/ui/glass-button'
import { BackgroundPaths } from '@/components/ui/background-paths'
import { OrbitalStats } from '@/components/landing/orbital-stats'
import { DatasetExplorer } from '@/components/landing/dataset-explorer'

const ALL_FEATURES = [
    {
        title: 'Resume Upload & Analysis',
        desc: 'Upload PDF, DOCX, or TXT. AI extracts skills, education, experience, projects, certifications, and achievements with 95%+ accuracy.',
        icon: FileText,
        color: 'from-blue-500 to-indigo-600',
        href: '/dashboard/upload-resume',
        badge: 'Core',
    },
    {
        title: 'Smart Job Matching',
        desc: 'AI compares your resume with job descriptions and recommends roles based on skills, experience, location, salary, and tech stack.',
        icon: Target,
        color: 'from-purple-500 to-pink-600',
        href: '/jobs',
        badge: 'AI-Powered',
    },
    {
        title: 'AI Resume Score',
        desc: 'Get your ATS score, resume quality score, skill strength analysis, missing keyword detection, and detailed improvement suggestions.',
        icon: TrendingUp,
        color: 'from-indigo-500 to-blue-600',
        href: '/resume-score',
        badge: 'Analytics',
    },
    {
        title: 'Resume Improvement Suggestions',
        desc: 'AI suggests better project descriptions, missing technical skills, professional summary improvements, strong action words, and industry keywords.',
        icon: Sparkles,
        color: 'from-violet-500 to-purple-600',
        href: '/resume-score',
        badge: 'AI Coach',
    },
    {
        title: 'AI Interview Preparation',
        desc: 'Mock interviews with HR and technical questions, coding assessments, and real-time AI feedback on your answers.',
        icon: BrainCircuit,
        color: 'from-pink-500 to-rose-600',
        href: '/interview-prep',
        badge: 'Practice',
    },
    {
        title: 'Personalized Career Guidance',
        desc: 'AI recommends your best career path, required skills, learning roadmaps, certifications, and trending technologies for 2026.',
        icon: Compass,
        color: 'from-amber-500 to-orange-600',
        href: '/career-guidance',
        badge: 'Roadmap',
    },
    {
        title: 'Auto Job Application Support',
        desc: 'Generate cover letters instantly, track applied jobs, get alerts for new matches, and manage your entire hiring pipeline.',
        icon: Briefcase,
        color: 'from-emerald-500 to-teal-600',
        href: '/applications',
        badge: 'Automation',
    },
    {
        title: 'ATS Simulator',
        desc: 'Simulate real company ATS systems like Workday or Greenhouse. Know your resume selection probability before applying.',
        icon: ShieldCheck,
        color: 'from-teal-500 to-emerald-600',
        href: '/ats-simulator',
        badge: 'ATS Sim',
    },
    {
        title: 'Salary Predictor',
        desc: 'AI-powered compensation estimates based on your skills, experience, and location. Get an edge in salary negotiations.',
        icon: DollarSign,
        color: 'from-amber-500 to-yellow-600',
        href: '/salary-predictor',
        badge: 'Compensation',
    },
    {
        title: 'Skill Gap Analyzer',
        desc: 'Compare your current profile with modern job market requirements. Identify missing skills and get curated learning paths.',
        icon: BarChart3,
        color: 'from-rose-500 to-pink-600',
        href: '/skill-gap',
        badge: 'Skill Gap',
    },
    {
        title: 'Market Trends Dashboard',
        desc: 'Live hiring metrics showing highly demanded skills, salary scales, trending technologies, and top-hiring firms in 2026.',
        icon: TrendingUp,
        color: 'from-purple-500 to-indigo-600',
        href: '/market-trends',
        badge: 'Market Intelligence',
    },
]

const WORKFLOW_STEPS = [
    { step: '01', label: 'Upload Resume', desc: 'PDF, DOCX, or TXT', icon: FileText },
    { step: '02', label: 'AI Extracts Data', desc: 'Skills, experience, projects', icon: BrainCircuit },
    { step: '03', label: 'Jobs Matched', desc: 'Semantic AI matching', icon: Target },
    { step: '04', label: 'Score Generated', desc: 'ATS & quality analysis', icon: TrendingUp },
    { step: '05', label: 'Suggestions', desc: 'Actionable improvements', icon: Sparkles },
    { step: '06', label: 'Apply Smarter', desc: 'Cover letters & tracking', icon: Briefcase },
]

const ADVANTAGES = [
    'Faster job searching',
    'Smart career recommendations',
    'Better resume optimization',
    'Higher hiring chances',
    'Personalized AI guidance',
    'Time-saving recruitment process',
]

export default function Home() {
    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 overflow-x-hidden">

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <BackgroundPaths title="" />
                </div>
                <div className="orbit-glow glow-indigo top-[20%] left-[-10%] animate-float" />
                <div className="orbit-glow glow-purple bottom-[10%] right-[-10%] animate-float" style={{ animationDelay: '-10s' }} />

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    >
                        <div className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-xs font-bold text-white/80 tracking-[0.2em] uppercase">AI-Powered Career Intelligence Platform</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-bold tracking-tighter mb-10 leading-[0.9]"
                    >
                        Navigate Your <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Career Orbit
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
                    >
                        Upload your resume. Get AI-powered job matches, ATS scores, interview prep, career roadmaps, and cover letters — all in one platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/dashboard/upload-resume">
                            <GlassButton className="h-16 px-12 text-lg bg-indigo-500 hover:bg-indigo-600 border-indigo-400/50 shadow-[0_20px_50px_rgba(99,102,241,0.3)]">
                                <span className="flex items-center gap-2">Upload Resume <ArrowRight className="w-5 h-5" /></span>
                            </GlassButton>
                        </Link>
                        <Link href="/jobs">
                            <GlassButton className="h-16 px-12 text-lg bg-white/5 hover:bg-white/10 border-white/20 backdrop-blur-2xl">
                                Explore Jobs
                            </GlassButton>
                        </Link>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex flex-wrap items-center justify-center gap-6 mt-16"
                    >
                        {['NLP Resume Parsing', 'Semantic Job Matching', 'Generative AI', 'ML Recommendations'].map((tag) => (
                            <div key={tag} className="flex items-center gap-2 text-white/30 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                {tag}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Workflow Steps */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1.5 text-sm">How It Works</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">From Resume to Hired</h2>
                        <p className="text-white/40 text-lg max-w-xl mx-auto">A seamless AI-powered workflow that transforms your job search.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {WORKFLOW_STEPS.map((s, i) => {
                            const Icon = s.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative text-center p-6 premium-glass rounded-[1.5rem] border border-white/5 group hover:border-indigo-500/30 transition-all"
                                >
                                    <div className="text-[10px] font-bold text-indigo-400/60 tracking-widest mb-4">{s.step}</div>
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div className="font-bold text-sm mb-1">{s.label}</div>
                                    <div className="text-[11px] text-white/30">{s.desc}</div>
                                    {i < WORKFLOW_STEPS.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-white/10">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 7 Features Grid */}
            <section id="features" className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-1.5 text-sm">Platform Features</Badge>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Everything You Need to Get Hired</h2>
                        <p className="text-white/40 text-xl max-w-2xl mx-auto">Seven AI-powered modules working together to maximize your career success.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ALL_FEATURES.map((f, i) => {
                            const Icon = f.icon
                            const isLast = i === ALL_FEATURES.length - 1
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    whileHover={{ y: -8 }}
                                    className={isLast ? 'md:col-span-2 lg:col-span-1' : ''}
                                >
                                    <Link href={f.href} className="block h-full">
                                        <div className="h-full p-8 premium-glass rounded-[2rem] border border-white/5 hover:border-indigo-500/30 transition-all group cursor-pointer">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                                    <Icon className="w-7 h-7 text-white" />
                                                </div>
                                                <Badge className="bg-white/5 text-white/40 border-white/5 text-[10px]">{f.badge}</Badge>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">{f.title}</h3>
                                            <p className="text-white/50 leading-relaxed text-sm">{f.desc}</p>
                                            <div className="mt-6 flex items-center gap-2 text-indigo-400/60 text-sm font-bold group-hover:text-indigo-400 transition-colors">
                                                Explore <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <OrbitalStats />

            {/* Interactive Job Dataset Explorer */}
            <DatasetExplorer />

            {/* Advantages */}
            <section className="py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 text-sm">Why HireOrbit</Badge>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Your Unfair Advantage in the Job Market</h2>
                            <p className="text-white/40 text-lg mb-10">While others send generic applications, you launch precision-targeted campaigns backed by AI intelligence.</p>
                            <Link href="/signup">
                                <GlassButton className="h-14 px-10 bg-indigo-500 hover:bg-indigo-600 border-indigo-400">
                                    Start Free Today <ArrowRight className="w-5 h-5 ml-2" />
                                </GlassButton>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {ADVANTAGES.map((adv, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 premium-glass rounded-2xl border border-white/5">
                                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <Star className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <span className="text-sm font-medium text-white/70">{adv}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl mx-auto p-16 premium-glass rounded-[3rem] border border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden"
                    >
                        <div className="orbit-glow glow-indigo top-[-50%] left-[-20%] opacity-30" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-8">
                                <Zap className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to Launch Your Career?</h2>
                            <p className="text-white/50 text-lg mb-10">
                                Join thousands of professionals who use HireOrbit to land their dream jobs faster with AI-powered precision.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/dashboard/upload-resume">
                                    <GlassButton className="h-14 px-10 bg-indigo-500 hover:bg-indigo-600 border-indigo-400 text-lg">
                                        Upload Resume Free <ArrowRight className="w-5 h-5 ml-2" />
                                    </GlassButton>
                                </Link>
                                <Link href="/jobs">
                                    <GlassButton className="h-14 px-10 bg-white/5 border-white/10 hover:bg-white/10 text-lg">
                                        Browse Jobs
                                    </GlassButton>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
