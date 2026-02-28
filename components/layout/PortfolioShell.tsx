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

interface PortfolioShellProps {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
}

const ease = [0.16, 1, 0.3, 1] as const
const panelOrder: PanelId[] = ['home', 'work', 'projects', 'skills', 'contact']

export function PortfolioShell({ profile, experience, projects, skills }: PortfolioShellProps) {
  const [activePanel, setActivePanel] = useState<PanelId>('home')
  const switchLockedRef = useRef(false)
  const accDeltaRef = useRef(0)
  const lastWheelRef = useRef(0)

  // Reset accumulator whenever the active panel changes so leftover
  // momentum events from the previous panel don't carry over.
  useEffect(() => {
    accDeltaRef.current = 0
  }, [activePanel])

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
      <main className="flex-1 lg:ml-[240px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activePanel === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
              className="absolute inset-0 overflow-y-auto bg-[#F7F3EC] dark:bg-[#0E0D0C]"
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
              className="absolute inset-0 overflow-y-auto bg-[#F0EDE8] dark:bg-[#141210]"
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
              className="absolute inset-0 overflow-y-auto bg-[#ECEBE6] dark:bg-[#131211]"
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
              className="absolute inset-0 overflow-y-auto bg-[#FFFBEB] dark:bg-[#110F0E]"
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
              className="absolute inset-0 overflow-y-auto bg-[#EDE8DF] dark:bg-[#1A1917]"
              onWheel={handleWheel}
            >
              <Contact profile={profile} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
