'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'
import type { Experience } from '@/lib/types'

const ease = [0.16, 1, 0.3, 1] as const

// ── Date helpers ──────────────────────────────────────────────────────────────

function formatDate(date: string): string {
  const [year, month] = date.split('-')
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[parseInt(month) - 1]} ${year}`
}

function getDuration(start: string, end?: string): string {
  const startDate = new Date(start)
  const endDate = end ? new Date(end) : new Date()
  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() - startDate.getMonth()
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) return `${remainingMonths}mo`
  if (remainingMonths === 0) return `${years}yr`
  return `${years}yr ${remainingMonths}mo`
}

// ── Experience Row (accordion) ────────────────────────────────────────────────

function ExperienceRow({
  exp,
  index,
  isActive,
  onToggle,
}: {
  exp: Experience
  index: number
  isActive: boolean
  onToggle: (id: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease }}
      className="relative pl-5"
      style={{
        borderLeft: `2px solid ${exp.is_current ? '#D97706' : 'rgba(209,207,201,0.5)'}`,
      }}
    >
      {/* Timeline dot */}
      <div
        className="absolute -left-[5px] top-[13px] w-2.5 h-2.5 rounded-full bg-[#F0EDE8] dark:bg-[#141210] border-2 transition-colors"
        style={{ borderColor: exp.is_current ? '#D97706' : 'rgba(209,207,201,0.6)' }}
      />

      {/* Clickable header */}
      <button
        onClick={() => onToggle(String(exp.id))}
        className="w-full text-left flex items-center gap-4 py-5 group"
      >
        <span className="text-xs font-mono text-ink-300 dark:text-dark-muted shrink-0 w-44">
          {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Present'}
          {' · '}{getDuration(exp.start_date, exp.end_date)}
        </span>
        <span className="font-display text-sm font-bold text-ink-900 dark:text-dark-text flex-1 text-left">
          {exp.role}
          <span className="font-normal text-amber-600 dark:text-amber-500 ml-1.5">
            @ {exp.company}
          </span>
        </span>
        <motion.span animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={14} className="text-ink-300 group-hover:text-amber-500 transition-colors" />
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-0 pr-4">
              <p className="text-[13px] text-ink-500 dark:text-dark-text-secondary leading-relaxed mb-2.5">
                {exp.description}
              </p>
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-mono text-ink-300 dark:text-dark-muted flex-1">
                  {exp.tech_stack.slice(0, 6).join(' · ')}
                </p>
                {exp.company_url && (
                  <a
                    href={exp.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-300 hover:text-amber-500 transition-colors"
                  >
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Work Panel ────────────────────────────────────────────────────────────────

interface WorkProps {
  experience: Experience[]
}

export function Work({ experience }: WorkProps) {
  const [activeId, setActiveId] = useState<string | null>(experience[0] ? String(experience[0].id) : null)

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id))

  return (
    <section id="work" className="relative min-h-full py-10 px-6">
      {/* Decorative watermark */}
      <div className="absolute top-4 right-6 font-display font-black text-[8rem] leading-none text-ink-900/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
        02
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-sm text-amber-600 dark:text-amber-500">02.</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-dark-text">
            Work
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-dark-border ml-4 max-w-xs" />
        </motion.div>

        {/* Experience accordion */}
        <div className="mb-10">
          <p className="section-sub-header">Experience</p>
          <div className="flex flex-col gap-3">
            {experience.map((exp, i) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={i}
                isActive={activeId === String(exp.id)}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
