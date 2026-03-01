'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import type { Profile, Experience, Project, Skill } from '@/lib/types'

export type PanelId = 'home' | 'work' | 'projects' | 'skills' | 'contact'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
] as const

interface PortfolioShellProps {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
}

const ease = [0.16, 1, 0.3, 1] as const
const panelOrder: PanelId[] = ['home', 'work', 'projects', 'skills', 'contact']

export function PortfolioShell({ profile, experience, projects, skills }: PortfolioShellProps) {
  const [activePanel, setActivePanel] = useState<PanelId>(() => {
    if (typeof window === 'undefined') return 'home'
    const hash = window.location.hash.slice(1)
    return panelOrder.includes(hash as PanelId) ? (hash as PanelId) : 'home'
  })
  const switchLockedRef = useRef(false)
  const accDeltaRef = useRef(0)
  const lastWheelRef = useRef(0)
  const [konamiActive, setKonamiActive] = useState(false)
  const konamiUsedRef = useRef(false)
  const [shaking, setShaking] = useState(false)

  // On activePanel change — update URL
  useEffect(() => {
    const current = window.location.hash.slice(1)
    if (current === activePanel) return
    const url = activePanel === 'home' ? '/' : `#${activePanel}`
    history.pushState(null, '', url)
  }, [activePanel])

  // Browser back/forward — sync state from URL
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash.slice(1)
      const panel = panelOrder.includes(hash as PanelId) ? (hash as PanelId) : 'home'
      setActivePanel(panel)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Reset accumulator whenever the active panel changes so leftover
  // momentum events from the previous panel don't carry over.
  useEffect(() => {
    void activePanel
    accDeltaRef.current = 0
  }, [activePanel])

  // Konami code easter egg — one-shot per page load
  useEffect(() => {
    let idx = 0
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++
        if (idx === KONAMI.length) {
          if (!konamiUsedRef.current) {
            konamiUsedRef.current = true
            setShaking(true)
            setKonamiActive(true)
            setTimeout(() => setShaking(false), 500)
            setTimeout(() => setKonamiActive(false), 3000)
          }
          idx = 0
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (switchLockedRef.current) return

      const now = Date.now()
      // If more than 200ms have passed since the last event, it's a new
      // gesture — reset the accumulator so momentum tails don't add up.
      if (now - lastWheelRef.current > 200) {
        accDeltaRef.current = 0
      }
      lastWheelRef.current = now
      accDeltaRef.current += e.deltaY

      const el = e.currentTarget
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 4
      const atTop = el.scrollTop < 4
      const idx = panelOrder.indexOf(activePanel)

      // Require a meaningful accumulated delta (60px) to switch panels.
      // This filters out small momentum tails after the lock releases.
      if (accDeltaRef.current > 60 && atBottom && idx < panelOrder.length - 1) {
        switchLockedRef.current = true
        accDeltaRef.current = 0
        setActivePanel(panelOrder[idx + 1])
        setTimeout(() => {
          switchLockedRef.current = false
        }, 1000)
      } else if (accDeltaRef.current < -60 && atTop && idx > 0) {
        switchLockedRef.current = true
        accDeltaRef.current = 0
        setActivePanel(panelOrder[idx - 1])
        setTimeout(() => {
          switchLockedRef.current = false
        }, 1000)
      }
    },
    [activePanel],
  )

  return (
    <div className="h-[100dvh] overflow-hidden flex">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className={`flex-1 lg:ml-[240px] relative overflow-hidden${shaking ? ' animate-shake' : ''}`}>
        <AnimatePresence mode="wait">
          {activePanel === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#F7F3EC] dark:bg-[#0E0D0C] scanlines"
              onWheel={handleWheel}
            >
              <Hero profile={profile} setActivePanel={setActivePanel} />
            </motion.div>
          )}
          {activePanel === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#F0EDE8] dark:bg-[#141210] scanlines"
              onWheel={handleWheel}
            >
              <Work experience={experience} />
            </motion.div>
          )}
          {activePanel === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#ECEBE6] dark:bg-[#131211] scanlines"
              onWheel={handleWheel}
            >
              <Projects projects={projects} />
            </motion.div>
          )}
          {activePanel === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#FFFBEB] dark:bg-[#110F0E] scanlines"
              onWheel={handleWheel}
            >
              <Skills skills={skills} profile={profile} />
            </motion.div>
          )}
          {activePanel === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#EDE8DF] dark:bg-[#1A1917] scanlines"
              onWheel={handleWheel}
            >
              <Contact profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Konami code toast */}
        <AnimatePresence>
          {konamiActive && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.25, ease }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-[#1A1917] border-2 border-amber-500 shadow-[4px_4px_0px_#D97706] pointer-events-none"
            >
              <span className="font-pixel text-2xl text-amber-400 whitespace-nowrap">
                &gt; CHEAT CODE ACTIVATED: +9999 XP
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
