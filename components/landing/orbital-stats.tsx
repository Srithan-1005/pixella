'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Zap, Target, ShieldCheck, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const STATS = [
    {
        label: 'ATS Pass Rate',
        value: '98.4%',
        desc: 'Candidate resumes pass top enterprise ATS filters on first submission',
        icon: ShieldCheck,
        color: 'from-emerald-400 to-teal-500',
        badge: 'Industry Leading',
    },
    {
        label: 'Active Job Matches',
        value: '500K+',
        desc: 'Semantic-analyzed openings indexed across top tech and engineering companies',
        icon: Target,
        color: 'from-indigo-400 to-purple-500',
        badge: 'Live Database',
    },
    {
        label: 'AI Match Speed',
        value: '120ms',
        desc: 'Real-time vector embeddings and semantic scoring engine latency',
        icon: Zap,
        color: 'from-purple-400 to-pink-500',
        badge: 'Ultra Fast',
    },
    {
        label: 'Candidate Trust Score',
        value: '4.95 / 5',
        desc: 'Rated by over 45,000 job seekers and career switchers worldwide',
        icon: TrendingUp,
        color: 'from-amber-400 to-orange-500',
        badge: 'Verified Feedback',
    },
]

export function OrbitalStats() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Ambient Orbital Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1.5 text-sm">
                            Platform Intelligence & Impact
                        </Badge>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
                    >
                        Measured in Real{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Career Milestones
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/40 text-lg max-w-xl mx-auto"
                    >
                        Empowering job seekers with enterprise-grade machine learning and real-time job market telemetry.
                    </motion.p>
                </div>

                {/* Central Orbital Graphic with Metric Rings */}
                <div className="relative max-w-5xl mx-auto mb-16 flex items-center justify-center">
                    {/* Concentric Rotating Orbit Rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Outer Ring */}
                        <div className="w-[580px] h-[580px] rounded-full border border-indigo-500/10 border-dashed animate-[spin_60s_linear_infinite]" />
                        {/* Middle Ring */}
                        <div className="w-[420px] h-[420px] rounded-full border border-purple-500/20 animate-[spin_40s_linear_infinite_reverse]" />
                        {/* Inner Ring */}
                        <div className="w-[260px] h-[260px] rounded-full border border-white/10 animate-[spin_25s_linear_infinite]" />
                        
                        {/* Orbital Nodes */}
                        <div className="absolute w-[420px] h-[420px] animate-[spin_30s_linear_infinite]">
                            <div className="w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8] absolute -top-1.5 left-1/2 -translate-x-1/2" />
                        </div>
                        <div className="absolute w-[580px] h-[580px] animate-[spin_45s_linear_infinite_reverse]">
                            <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] absolute top-1/2 -right-1.5 -translate-y-1/2" />
                        </div>
                    </div>

                    {/* Central Core Globe */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-900/60 via-purple-900/40 to-black/80 border border-white/15 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)] my-12"
                    >
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-1">
                            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                        </div>
                        <span className="text-[11px] font-bold tracking-widest text-indigo-300 uppercase">HireOrbit</span>
                        <span className="text-[9px] text-white/40 tracking-wider">AI ENGINE</span>
                    </motion.div>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {STATS.map((stat, idx) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                className="group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(99,102,241,0.15)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-indigo-500/20 transition-all" />
                                
                                <div className="flex items-center justify-between mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-400/30 transition-transform">
                                        <Icon className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <Badge className="bg-white/5 text-white/50 border-white/5 text-[10px] font-medium">
                                        {stat.badge}
                                    </Badge>
                                </div>

                                <div className={`text-4xl md:text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                                    {stat.value}
                                </div>

                                <div className="text-base font-bold text-white/90 mb-2">
                                    {stat.label}
                                </div>

                                <p className="text-xs text-white/40 leading-relaxed font-normal">
                                    {stat.desc}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
