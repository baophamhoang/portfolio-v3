'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PanelId } from '@/components/layout/PortfolioShell'

const navLinks: { label: string; id: PanelId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

const panelOrder: PanelId[] = ['home', 'work', 'projects', 'skills', 'contact']

interface SidebarProps {
  activePanel: PanelId
  setActivePanel: (id: PanelId) => void
}

interface NavLinksProps {
  layoutIdSuffix: string
  activePanel: PanelId
  onNavigate: (id: PanelId) => void
}

function NavLinks({ layoutIdSuffix, activePanel, onNavigate }: NavLinksProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      {navLinks.map((link) => (
        <button
          type="button"
          key={link.id}
          onClick={() => onNavigate(link.id)}
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
}

function SocialIcons() {
  return (
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
}

export function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  const handleNav = (id: PanelId) => {
    setActivePanel(id)
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="fixed top-0 left-0 z-30 h-screen w-[240px] hidden lg:flex flex-col bg-cream-50 dark:bg-dark-surface border-r border-cream-200 dark:border-amber-900/60 px-4 py-6">
        {/* Logo */}
        <button type="button" onClick={() => handleNav('home')} className="flex items-center gap-3 mb-8 group text-left">
          <div className="w-10 h-10 bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white font-mono font-bold text-sm shrink-0 border-2 border-amber-800 dark:border-amber-400">
            BP
          </div>
          <div>
            <div className="font-pixel text-lg text-ink-900 dark:text-dark-text leading-tight">
              bao<span className="text-amber-600 dark:text-amber-500">.</span>pham
            </div>
            <div className="text-xs text-ink-400 dark:text-dark-muted font-mono leading-tight">
              engineer
            </div>
          </div>
        </button>

        {/* Nav */}
        <NavLinks layoutIdSuffix="desktop" activePanel={activePanel} onNavigate={handleNav} />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom: socials + theme toggle */}
        <div className="flex items-center justify-between">
          <SocialIcons />

          <motion.button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text hover:bg-cream-200/60 dark:hover:bg-dark-surface-2 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={resolvedTheme ?? 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {resolvedTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </aside>

      {/* ── Mobile: ▲▼ buttons only ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-50 lg:hidden flex flex-col gap-2 items-center"
      >
        {(() => {
          const idx = panelOrder.indexOf(activePanel)
          const btnClass = "w-12 h-12 font-pixel text-xl bg-amber-600 dark:bg-amber-500 text-white border-2 border-amber-800 dark:border-amber-300 shadow-[3px_3px_0px_#1C1815] dark:shadow-[3px_3px_0px_#F0EDE8] flex items-center justify-center"
          const tapProps = { whileTap: { x: 3, y: 3, boxShadow: '0px 0px 0px #1C1815' }, transition: { duration: 0 } } as const
          return (
            <>
              <motion.button
                onClick={() => { if (idx > 0) setActivePanel(panelOrder[idx - 1]) }}
                className={btnClass}
                {...tapProps}
                aria-label="Previous panel"
              >
                ▲
              </motion.button>
              <motion.button
                onClick={() => { if (idx < panelOrder.length - 1) setActivePanel(panelOrder[idx + 1]) }}
                className={btnClass}
                {...tapProps}
                aria-label="Next panel"
              >
                ▼
              </motion.button>
            </>
          )
        })()}
      </motion.div>
    </>
  )
}
