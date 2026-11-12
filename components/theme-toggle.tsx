'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ThemeMode = 'dark' | 'light' | 'system'

export function ThemeToggle() {
    const [theme, setTheme] = useState<ThemeMode>('dark')
    const [mounted, setMounted] = useState(false)

    function resolveTheme(mode: ThemeMode): 'dark' | 'light' {
        if (mode === 'system') {
            if (typeof window !== 'undefined' && window.matchMedia) {
                return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
            }
            return 'dark'
        }
        return mode
    }

    function applyToHtml(resolved: 'dark' | 'light') {
        const html = document.documentElement
        html.classList.remove('light', 'dark')
        html.classList.add(resolved)
    }

    useEffect(() => {
        // Read stored preference
        const stored = (localStorage.getItem('hireorbit_theme') as ThemeMode) || 'dark'
        setTheme(stored)
        applyToHtml(resolveTheme(stored))
        setMounted(true)

        // 1. Cross-tab sync via storage event
        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'hireorbit_theme') {
                const newMode = (e.newValue as ThemeMode) || 'dark'
                setTheme(newMode)
                applyToHtml(resolveTheme(newMode))
            }
        }
        window.addEventListener('storage', handleStorage)

        // 2. System theme preference changes
        const mql = window.matchMedia('(prefers-color-scheme: light)')
        const handleMqlChange = () => {
            const currentStored = (localStorage.getItem('hireorbit_theme') as ThemeMode) || 'dark'
            if (currentStored === 'system') {
                applyToHtml(resolveTheme('system'))
            }
        }
        mql.addEventListener('change', handleMqlChange)

        return () => {
            window.removeEventListener('storage', handleStorage)
            mql.removeEventListener('change', handleMqlChange)
        }
    }, [])

    const cycleTheme = () => {
        // Cycle: dark -> light -> system -> dark
        const nextMode: ThemeMode = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
        setTheme(nextMode)
        localStorage.setItem('hireorbit_theme', nextMode)
        applyToHtml(resolveTheme(nextMode))
    }

    if (!mounted) return (
        <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5" />
    )

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            aria-label={`Current theme: ${theme}. Click to change.`}
            title={`Theme: ${theme.toUpperCase()} (Click to toggle Dark / Light / System)`}
            className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white/70 hover:text-white relative group"
        >
            {theme === 'dark' && (
                <Sun className="h-4 w-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            )}
            {theme === 'light' && (
                <Moon className="h-4 w-4 text-indigo-500 group-hover:-rotate-12 transition-transform" />
            )}
            {theme === 'system' && (
                <Laptop className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            )}
            <span className="sr-only">Switch theme (current: {theme})</span>
        </Button>
    )
}
