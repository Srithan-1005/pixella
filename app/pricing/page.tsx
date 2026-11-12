'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check, Sparkles, Zap, Shield,
  ArrowRight, HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)

  const plans = [
    {
      name: 'Starter Orbit',
      price: '$0',
      period: 'forever',
      desc: 'Essential AI toolkit for active job seekers and recent graduates.',
      features: [
        '3 Resume ATS Audits / month',
        'Basic semantic job matching',
        '5 AI Mock Interview practice questions',
        'Standard cover letter template',
        'Community Discord access'
      ],
      cta: 'Get Started Free',
      href: '/signup',
      highlighted: false
    },
    {
      name: 'Orbit Pro',
      price: annual ? '$15' : '$19',
      period: 'per month',
      desc: 'Supercharge your hiring velocity with unrestricted AI intelligence.',
      features: [
        'Unlimited AI Resume Scans & ATS audits',
        'Real-time Workday & Greenhouse simulation',
        'Unlimited AI Mock Interviews with STAR grading',
        'Automated custom cover letters for every role',
        'Direct recruiter inbox delivery alerts',
        'Priority semantic ranking in candidate search',
        'Salary negotiation scripts & compensation bands'
      ],
      cta: 'Start 7-Day Free Trial',
      href: '/signup',
      highlighted: true
    },
    {
      name: 'Enterprise / Recruiter',
      price: '$149',
      period: 'per seat / month',
      desc: 'For high-growth talent acquisition teams and engineering managers.',
      features: [
        'Post unlimited technical job openings',
        'AI semantic candidate auto-shortlisting',
        'Automated technical skill vetting assessments',
        'Applicant tracking system (ATS) integration',
        'Dedicated account manager & SLA'
      ],
      cta: 'Contact Sales',
      href: '/signup',
      highlighted: false
    }
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] right-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] left-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-4 py-1 text-xs">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Invest in Your Next Career Leap
          </h1>
          <p className="text-white/50 text-base">
            Land your dream role 5x faster with advanced AI resume optimization and interview intelligence.
          </p>

          {/* Billing Switch */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-semibold ${!annual ? 'text-white' : 'text-white/50'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setAnnual(!annual)}
              className="w-12 h-6 rounded-full bg-white/10 p-0.5 relative transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-500 transition-transform ${
                  annual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${annual ? 'text-white' : 'text-white/50'}`}>
              Annually
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                Save 25%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all relative ${
                p.highlighted
                  ? 'bg-gradient-to-b from-indigo-950/60 to-purple-950/40 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 md:-translate-y-2'
                  : 'premium-glass border-white/10'
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-[11px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-white/50 mb-6">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl md:text-5xl font-black text-white">{p.price}</span>
                  <span className="text-xs text-white/40">/{p.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/10 text-xs">
                  {p.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-white/70">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6">
                <Link href={p.href} className="block">
                  <Button
                    className={`w-full h-11 text-xs font-semibold rounded-xl ${
                      p.highlighted
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    {p.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div className="premium-glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-6 text-xs text-white/70">
            <div>
              <h4 className="font-bold text-white mb-1.5">How does the ATS score calculation work?</h4>
              <p className="text-white/50 leading-relaxed">
                Our parser runs simulated Workday and Greenhouse tokenization algorithms, checking section hierarchies, keyword densities, and metrics clarity against 10,000+ benchmarked resumes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1.5">Can I cancel my subscription anytime?</h4>
              <p className="text-white/50 leading-relaxed">
                Yes. You can cancel with a single click from your account dashboard. You will retain access until the end of your billing cycle with no extra fees.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1.5">Is my resume data kept private?</h4>
              <p className="text-white/50 leading-relaxed">
                Absolutely. Your uploaded files are processed in ephemeral memory and encrypted with AES-256. We never share or sell personal data to third parties.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-1.5">Does HireOrbit support international currencies?</h4>
              <p className="text-white/50 leading-relaxed">
                Yes, our payment processor automatically handles local currency conversion in 135+ countries without hidden foreign transaction charges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
