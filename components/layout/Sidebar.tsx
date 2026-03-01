'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X, Github, Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PanelId } from '@/components/layout/PortfolioShell'

const navLinks: { label: string; id: PanelId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

interface SidebarProps {
  activePanel: PanelId
  setActivePanel: (id: PanelId) => void
}

export function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  // Body lock when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }
    return () => document.body.classList.remove('sidebar-open')
  }, [mobileOpen])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  const handleNav = (id: PanelId) => {
    setActivePanel(id)
    setMobileOpen(false)
  }

  const NavLinks = ({ layoutIdSuffix }: { layoutIdSuffix: string }) => (
    <nav className="flex flex-col gap-0.5">
      {navLinks.map((link) => (
        <button
          type="button"
          key={link.id}
          onClick={() => handleNav(link.id)}
          className={cn(
            'relative flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 text-left',
            activePanel === link.id
              ? 'text-ink-900 dark:text-dark-text font-medium'
              : 'text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text-secondary'
          )}
        >
          {activePanel === link.id && (
            <motion.div
              layoutId={`nav-indicator-${layoutIdSuffix}`}
              className="absolute inset-0 rounded-none border-l-2 border-amber-600 bg-cream-200/80 dark:bg-dark-surface"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative z-10 font-pixel text-lg leading-none">{link.label}</span>
        </button>
      ))}
    </nav>
  )

  const SocialIcons = () => (
    <div className="flex items-center gap-1">
      <motion.a
        href="https://github.com/baopham"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Github size={15} />
      </motion.a>
      <motion.a
        href="https://linkedin.com/in/baopham"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Linkedin size={15} />
      </motion.a>
      <motion.a
        href="https://twitter.com/baopham"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Twitter size={15} />
      </motion.a>
    </div>
  )

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed top-0 left-0 z-30 h-screen w-[240px] hidden lg:flex flex-col bg-cream-50 dark:bg-dark-surface border-r border-cream-200 dark:border-dark-border px-4 py-6">
        {/* Logo */}
        <button type="button" onClick={() => handleNav('home')} className="flex items-center gap-3 mb-8 group text-left">
          <div className="w-10 h-10 bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white font-mono font-bold text-sm shrink-0 border-2 border-amber-800 dark:border-amber-400">
            BP
          </div>
          <div>
            <div className="font-display font-semibold text-ink-900 dark:text-dark-text text-sm tracking-tight leading-tight">
              bao<span className="text-amber-600 dark:text-amber-500">.</span>pham
            </div>
            <div className="text-xs text-ink-400 dark:text-dark-muted font-mono leading-tight">
              engineer
            </div>
          </div>
        </button>

        {/* Nav */}
        <NavLinks layoutIdSuffix="desktop" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: socials + theme toggle */}
        <div className="flex items-center justify-between">
          <SocialIcons />

          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface-2 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </aside>

      {/* ── Mobile: floating hamburger ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-amber-600 dark:bg-amber-500 text-white shadow-lg lg:hidden flex items-center justify-center hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors border-2 border-amber-800 dark:border-amber-300"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </motion.button>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 z-50 h-screen w-[260px] bg-cream-50 dark:bg-dark-surface border-r border-cream-200 dark:border-dark-border flex flex-col px-4 py-6 lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button type="button" onClick={() => handleNav('home')} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white font-mono font-bold text-sm border-2 border-amber-800 dark:border-amber-400">
                    BP
                  </div>
                  <div>
                    <div className="font-display font-semibold text-ink-900 dark:text-dark-text text-sm tracking-tight leading-tight">
                      bao<span className="text-amber-600 dark:text-amber-500">.</span>pham
                    </div>
                    <div className="text-xs text-ink-400 dark:text-dark-muted font-mono leading-tight">
                      engineer
                    </div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:bg-cream-200/60 dark:hover:bg-dark-surface-2"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav */}
              <NavLinks layoutIdSuffix="mobile" />

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom */}
              <div className="flex items-center justify-between">
                <SocialIcons />

                {mounted && (
                  <motion.button
                    onClick={toggleTheme}
                    className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface-2 transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Toggle theme"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={theme}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
