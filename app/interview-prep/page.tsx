'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit, Sparkles, CheckCircle2, ChevronRight,
  HelpCircle, Lightbulb, Play, RotateCcw, Award,
  ArrowRight, MessageSquare, Volume2, Mic, BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { INTERVIEW_QUESTIONS } from '@/lib/mock-data'

export default function InterviewPrepPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number
    strengths: string[]
    improvements: string[]
  } | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Technical' | 'System Design' | 'Behavioral'>('All')

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(
    (q) => categoryFilter === 'All' || q.category === categoryFilter
  )

  const currentQ = filteredQuestions[currentIdx] || INTERVIEW_QUESTIONS[0]

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return
    setIsEvaluating(true)
    setFeedback(null)

    setTimeout(() => {
      setIsEvaluating(false)
      const lengthBonus = Math.min(2, userAnswer.length / 150)
      const baseScore = 7.5 + lengthBonus
      setFeedback({
        score: Math.min(9.6, Number(baseScore.toFixed(1))),
        strengths: [
          'Directly addressed the core architectural concept',
          'Demonstrated clear conceptual understanding and terminology',
          'Good logical flow between trade-offs and real-world implications'
        ],
        improvements: [
          'Add a specific quantifiable metric or latency benchmark from a past project',
          'Explicitly mention failure recovery and edge-case handling'
        ]
      })
    }, 900)
  }

  const handleNext = () => {
    setFeedback(null)
    setUserAnswer('')
    setShowHint(false)
    setCurrentIdx((prev) => (prev + 1) % filteredQuestions.length)
  }

  const handlePrev = () => {
    setFeedback(null)
    setUserAnswer('')
    setShowHint(false)
    setCurrentIdx((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#030303] text-white relative overflow-hidden">
      <div className="orbit-glow glow-indigo top-[10%] left-[-15%] opacity-35 pointer-events-none" />
      <div className="orbit-glow glow-purple bottom-[15%] right-[-15%] opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge className="mb-3 bg-pink-500/10 text-pink-400 border-pink-500/20 px-4 py-1 text-xs">
            Interactive AI Mock Interview Coach
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Ace Technical & Behavioral Interviews
          </h1>
          <p className="text-white/50 text-base">
            Practice real enterprise interview questions, receive instant AI evaluations, identify gaps, and study gold-standard model answers.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(['All', 'Technical', 'System Design', 'Behavioral'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat)
                setCurrentIdx(0)
                setFeedback(null)
                setUserAnswer('')
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat} Questions
            </button>
          ))}
        </div>

        {/* Interactive Question Card */}
        <div className="premium-glass p-8 rounded-3xl border border-white/10 shadow-2xl relative mb-8">
          {/* Top metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-500/15 text-indigo-300 border-indigo-500/30 text-xs">
                {currentQ.category}
              </Badge>
              <Badge className="bg-white/5 text-white/60 border-white/10 text-xs">
                {currentQ.role}
              </Badge>
            </div>
            <div className="text-xs text-white/40 font-mono">
              Question {currentIdx + 1} of {filteredQuestions.length}
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
            &quot;{currentQ.question}&quot;
          </h2>

          {/* Hint Toggle */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400/90 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? 'Hide Hint' : 'Need a hint on what to emphasize?'}
            </button>
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed"
                >
                  💡 <strong>Interviewer expectation:</strong> {currentQ.hint}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Answer Text Area */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows={5}
                placeholder="Draft or dictate your response here (include relevant algorithms, trade-offs, or STAR scenarios)..."
                className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 text-sm text-white placeholder:text-white/30 transition-all resize-none leading-relaxed"
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2 text-xs text-white/40">
                <span>{userAnswer.length} chars</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  variant="outline"
                  size="sm"
                  className="text-xs border-white/10"
                >
                  Next Question <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>

              <Button
                onClick={handleEvaluate}
                disabled={!userAnswer.trim() || isEvaluating}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-xs h-10 px-6 rounded-xl shadow-lg shadow-pink-500/25 cursor-pointer disabled:opacity-50"
              >
                {isEvaluating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing Response...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Evaluate with AI
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* AI Feedback & Score Output */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-white/10 space-y-6"
              >
                {/* Score Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 font-black text-xl">
                      {feedback.score}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">AI Evaluation Score</div>
                      <div className="text-xs text-white/50">
                        {feedback.score >= 9.0 ? 'Exemplary Response' : 'Solid Answer with Room for Polish'}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">
                    Passed Threshold
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  {/* Strengths */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                    <span className="text-emerald-400 font-bold block uppercase tracking-wider text-[10px]">
                      Key Strengths Identified
                    </span>
                    <ul className="space-y-1 text-emerald-200">
                      {feedback.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas for Improvement */}
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-2">
                    <span className="text-amber-400 font-bold block uppercase tracking-wider text-[10px]">
                      Recommendations to Elevate
                    </span>
                    <ul className="space-y-1 text-amber-200">
                      {feedback.improvements.map((imp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Model Benchmark Answer */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" /> Gold-Standard Model Answer
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed whitespace-pre-line bg-black/40 p-4 rounded-xl border border-white/5 font-mono">
                    {currentQ.modelAnswer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Launch Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/resume-score" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all">
              <Sparkles className="w-5 h-5 text-indigo-400 mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Audit Resume First</h4>
              <p className="text-xs text-white/40">Ensure your resume clears ATS before interview rounds.</p>
            </div>
          </Link>

          <Link href="/career-guidance" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all">
              <BrainCircuit className="w-5 h-5 text-purple-400 mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Career Roadmaps</h4>
              <p className="text-xs text-white/40">Explore skills needed for principal & staff promotions.</p>
            </div>
          </Link>

          <Link href="/jobs" className="block">
            <div className="premium-glass p-5 rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all">
              <Award className="w-5 h-5 text-pink-400 mb-2" />
              <h4 className="text-sm font-bold text-white mb-1">Apply to Matching Jobs</h4>
              <p className="text-xs text-white/40">Put your interview practice into action with live roles.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
