'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface BackgroundPathsProps {
    title?: string
    className?: string
}

export function BackgroundPaths({ title, className = '' }: BackgroundPathsProps) {
    // Generate organic curved paths
    const paths = [
        {
            d: "M-100 200 C 300 100, 500 600, 1200 400 S 1600 200, 2000 500",
            duration: 18,
            delay: 0,
            opacity: 0.25,
            stroke: "url(#orbit-grad-1)",
            width: 1.5,
        },
        {
            d: "M-100 400 C 400 300, 600 100, 1100 500 S 1700 700, 2100 300",
            duration: 22,
            delay: 2,
            opacity: 0.2,
            stroke: "url(#orbit-grad-2)",
            width: 2,
        },
        {
            d: "M-50 600 C 350 700, 750 300, 1300 600 S 1800 400, 2200 650",
            duration: 26,
            delay: 4,
            opacity: 0.15,
            stroke: "url(#orbit-grad-3)",
            width: 1.5,
        },
        {
            d: "M0 100 C 500 350, 900 200, 1400 450 S 1900 300, 2300 400",
            duration: 20,
            delay: 1,
            opacity: 0.2,
            stroke: "url(#orbit-grad-1)",
            width: 1,
        },
        {
            d: "M-100 800 C 450 500, 950 850, 1500 550 S 1950 750, 2400 600",
            duration: 24,
            delay: 3,
            opacity: 0.18,
            stroke: "url(#orbit-grad-2)",
            width: 1.5,
        },
    ]

    return (
        <div className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 1080"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="orbit-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="orbit-grad-3" x1="0%" y1="50%" x2="100%" y2="50%">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                        <stop offset="70%" stopColor="#c084fc" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f472b6" stopOpacity="0.1" />
                    </linearGradient>
                </defs>

                {paths.map((p, idx) => (
                    <motion.path
                        key={idx}
                        d={p.d}
                        stroke={p.stroke}
                        strokeWidth={p.width}
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0.2, pathOffset: 0, opacity: p.opacity }}
                        animate={{
                            pathOffset: [0, 1],
                            pathLength: [0.2, 0.45, 0.2],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay,
                        }}
                    />
                ))}
            </svg>

            {/* Subtle orbital radial glow in center */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#030303]/40 to-[#030303]" />

            {title && (
                <div className="relative z-10 flex items-center justify-center h-full">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90">
                        {title}
                    </h2>
                </div>
            )}
        </div>
    )
}
