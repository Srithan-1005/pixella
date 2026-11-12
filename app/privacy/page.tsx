'use client'

import React from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>

        <div className="premium-glass p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-xs text-white/70 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-white mb-2">1. Information We Collect</h3>
            <p>
              We collect information you provide directly, such as your contact details, resume documents, employment history, and practice interview recordings. When you upload a resume, it is parsed strictly in encrypted, ephemeral runtime memory to generate match embeddings and ATS scores.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">2. How We Use Your Information</h3>
            <p>
              Your data is solely used to deliver personalized career recommendations, calculate ATS compatibility, and simulate interview evaluations. We never sell your personal information or resume documents to third-party data brokers.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">3. Data Security & Encryption</h3>
            <p>
              All transit communications use TLS 1.3 encryption, and resting assets are protected with AES-256 standard encryption. You may request permanent deletion of your profile and uploaded resumes at any time from your settings.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2">4. Contact Privacy Team</h3>
            <p>
              For privacy-related inquiries or GDPR/CCPA data export requests, please email privacy@hireorbit.dev.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
