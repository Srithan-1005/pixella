'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Sparkles, Menu, X, ArrowRight, Briefcase, FileText, BrainCircuit, LogOut, User } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

const NAV_LINKS = [
    { label: 'Jobs', href: '/jobs', icon: Briefcase },
    { label: 'Dataset', href: '/#dataset-explorer' },
    { label: 'Resume ATS Score', href: '/resume-score', icon: FileText },
    { label: 'Interview Prep', href: '/interview-prep', icon: BrainCircuit },
    { label: 'Features', href: '/#features' },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<{ fullName?: string; email?: string } | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    // Read user from localStorage (client-side only)
    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem('hireorbit_user')
                setUser(stored ? JSON.parse(stored) : null)
            } catch {
                setUser(null)
            }
        }
        syncUser()
        // Listen for storage changes from other tabs / pages
        window.addEventListener('storage', syncUser)
        // Also poll briefly after navigation changes for same-tab updates
        const interval = setInterval(syncUser, 500)
        return () => {
            window.removeEventListener('storage', syncUser)
            clearInterval(interval)
        }
    }, [pathname])

    const handleLogout = () => {
        localStorage.removeItem('hireorbit_user')
        localStorage.removeItem('hireorbit_resume_data')
        setUser(null)
        router.push('/')
        setMobileMenuOpen(false)
    }

    // Get initials for avatar
    const initials = user?.fullName
        ? user.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'SK'

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.08]">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Brand / Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                        <div className="w-full h-full bg-[#0b0b0f] rounded-[11px] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                            Hire<span className="text-indigo-400">Orbit</span>
                        </span>
                        <span className="text-[9px] tracking-widest uppercase text-white/40 font-semibold -mt-1">
                            AI Career Cloud
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />

                    {user ? (
                        // ── Logged-in state ──
                        <>
                            <Link href="/profile">
                                <Button variant="ghost" className="text-sm font-medium text-white/80 hover:text-white flex items-center gap-1.5 px-3">
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold shadow-lg shadow-indigo-500/25">
                                        {initials}
                                    </div>
                                    <span className="max-w-[100px] truncate">{user.fullName?.split(' ')[0] || 'Profile'}</span>
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="text-sm font-medium text-white/60 hover:text-red-400 flex items-center gap-1.5 px-3 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </Button>
                        </>
                    ) : (
                        // ── Logged-out state ──
                        <>
                            <Link href="/login">
                                <Button variant="ghost" className="text-sm font-medium text-white/80 hover:text-white">
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-indigo-500/25 border-0">
                                    Get Started
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
                    <div className="flex flex-col space-y-3">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-medium text-white/80 hover:text-indigo-400 transition-colors py-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                        {user ? (
                            <>
                                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center border-indigo-500/30 text-indigo-300 gap-2">
                                        <User className="w-4 h-4" />
                                        {user.fullName?.split(' ')[0] || 'Profile'}
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                    className="w-full justify-center border-red-500/30 text-red-400 hover:text-red-300 gap-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center bg-indigo-600 hover:bg-indigo-500">
                                        Get Started Free
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
