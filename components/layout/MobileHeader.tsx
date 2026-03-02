'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PanelId } from '@/components/layout/PortfolioShell'

const sections = [
  { id: 'home' as PanelId, label: 'HOME', num: '01' },
  { id: 'work' as PanelId, label: 'WORK', num: '02' },
  { id: 'projects' as PanelId, label: 'PROJECTS', num: '03' },
  { id: 'skills' as PanelId, label: 'SKILLS', num: '04' },
  { id: 'contact' as PanelId, label: 'CONTACT', num: '05' },
]

interface MobileHeaderProps {
  activePanel: PanelId
  setActivePanel: (id: PanelId) => void
}

export function MobileHeader({ activePanel, setActivePanel }: MobileHeaderProps) {
  const [open, setOpen] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  const current = sections.find(s => s.id === activePanel) ?? sections[0]

  const handleNav = (id: PanelId) => {
    setActivePanel(id)
    setOpen(false)
  }

  return (
    <>
      {/* Fixed bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-11 lg:hidden flex items-center justify-between px-3
        bg-[#F7F3EC]/95 dark:bg-[#0E0D0C]/95 backdrop-blur-sm border-b-2 border-amber-600">

        {/* Left: BP logo → home */}
        <button type="button" onClick={() => handleNav('home')} aria-label="Go to home"
          className="w-8 h-8 bg-amber-600 dark:bg-amber-500 flex items-center justify-center
            text-white font-mono font-bold text-xs border border-amber-800 dark:border-amber-400 shrink-0">
          BP
        </button>

        {/* Center: tappable section indicator */}
        <button type="button" onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1 font-pixel text-xs text-amber-600 dark:text-amber-500 absolute left-1/2 -translate-x-1/2">
          <span>{current.num} · {current.label}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} />
          </motion.span>
        </button>

        {/* Right: theme toggle */}
        <button type="button" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          className="w-8 h-8 flex items-center justify-center text-ink-400 dark:text-dark-muted shrink-0"
          aria-label="Toggle theme">
          {resolvedTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </header>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-ink-900/20 lg:hidden"
              onClick={() => setOpen(false)}
            />
            {/* List */}
            <motion.nav
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-11 left-0 right-0 z-50 lg:hidden
                bg-[#F7F3EC] dark:bg-[#0E0D0C] border-b-2 border-amber-600
                shadow-[0_4px_0px_#D97706] dark:shadow-[0_4px_0px_#92400E]"
            >
              {sections.map(s => (
                <button key={s.id} type="button" onClick={() => handleNav(s.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-amber-600/10 last:border-b-0 font-pixel transition-colors',
                    activePanel === s.id
                      ? 'text-amber-600 dark:text-amber-500'
                      : 'text-ink-700 dark:text-dark-text hover:text-amber-600 dark:hover:text-amber-500'
                  )}
                >
                  <span className="text-xs text-amber-600/50 dark:text-amber-500/50 w-5">{s.num}</span>
                  {activePanel === s.id && <span className="text-xs">›</span>}
                  <span className="text-lg">{s.label}</span>
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
