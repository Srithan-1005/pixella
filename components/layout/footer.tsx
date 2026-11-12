import React from 'react'
import Link from 'next/link'
import { Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react'

export function Footer() {
    return (
        <footer className="relative bg-[#020204] border-t border-white/[0.08] text-white/60 text-sm overflow-hidden">
            {/* Top subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
                    {/* Brand Info */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
                                <div className="w-full h-full bg-[#0b0b0f] rounded-[11px] flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-indigo-400" />
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Hire<span className="text-indigo-400">Orbit</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm max-w-sm mb-6 leading-relaxed">
                            The intelligent career launchpad. AI-powered resume analytics, semantic job matching, ATS simulation, and personalized interview coaching.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                AI Models Operational
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Platform</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/dashboard/upload-resume" className="hover:text-white transition-colors">Resume Parser</Link></li>
                            <li><Link href="/jobs" className="hover:text-white transition-colors">Smart Job Matches</Link></li>
                            <li><Link href="/resume-score" className="hover:text-white transition-colors">ATS Score Checker</Link></li>
                            <li><Link href="/interview-prep" className="hover:text-white transition-colors">Interview Prep</Link></li>
                            <li><Link href="/ats-simulator" className="hover:text-white transition-colors">ATS Simulator</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Resources</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/career-guidance" className="hover:text-white transition-colors">Career Roadmaps</Link></li>
                            <li><Link href="/salary-predictor" className="hover:text-white transition-colors">Salary Predictor</Link></li>
                            <li><Link href="/market-trends" className="hover:text-white transition-colors">Market Trends 2026</Link></li>
                            <li><Link href="/skill-gap" className="hover:text-white transition-colors">Skill Gap Analysis</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} HireOrbit. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
