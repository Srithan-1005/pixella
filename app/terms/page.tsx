'use client'

import React from 'react'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative">
      <div className="container mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <Badge className="mb-3 bg-indigo-500/10 text-indigo-400 border-indigo-500/20 px-3 py-1 text-xs">
          Last Updated: October 2026
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
          Terms of Service
        </h1>

        <div className="premium-glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-xs text-white/70 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-white mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing or using the HireOrbit platform (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, you may not access or use the Service.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">2. Use of AI Coaching & ATS Predictions</h3>
            <p>
              ATS score calculations, simulated interview assessments, and salary predictions are provided for educational and optimization purposes. HireOrbit does not guarantee job placement or specific hiring outcomes with third-party employers.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">3. User Conduct</h3>
            <p>
              You agree not to upload fraudulent resumes, misrepresent qualifications, or attempt to reverse-engineer proprietary matching algorithms or scrapers.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">4. Subscriptions & Billing</h3>
            <p>
              Paid subscriptions renew automatically each month or year unless cancelled prior to the renewal date. Refund requests are subject to our 14-day money-back guarantee policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
