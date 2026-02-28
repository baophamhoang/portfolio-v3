'use client'

import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import type { Project } from '@/lib/types'

const ease = [0.16, 1, 0.3, 1] as const
const spring = { type: 'spring', stiffness: 350, damping: 30 } as const

// Tailwind class safety — keep as object literals so v4 doesn't purge
const colsMap = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' } as const
const miniColsMap = { 1: 'grid-cols-1', 2: 'grid-cols-2' } as const

type ExpandDir = 'left' | 'center' | 'right'

function getDefaultCols(count: number): 2 | 3 | 4 {
  if (count <= 4) return 2
  if (count <= 9) return 3
  return 4
}

function getExpandDir(cardIndex: number, cols: number): ExpandDir {
  const col = cardIndex % cols
  if (col === 0) return 'left'
  if (col === cols - 1) return 'right'
  return 'center'
}

// Returns per-card height classes for a side column in center-expand mode.
// n=1 → fixed 180px; n=2 → first fixed 180px + last stretches; n>=3 → all flex-1
function columnHeights(n: number): ('fixed' | 'grow')[] {
  if (n <= 0) return []
  if (n === 1) return ['fixed']
  const naturalH = n * 180 + (n - 1) * 8
  if (naturalH <= 460) return [...Array(n - 1).fill('fixed'), 'grow']
  return Array(n).fill('grow')
}

// ── Card content: collapsed (grid + mini-grid) ────────────────────────────────

function CollapsedCard({ project }: { project: Project }) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-1 shrink-0" style={{ background: project.color }} />
      <div className="p-4 flex flex-col gap-1 flex-1 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <span className="font-display font-bold text-sm text-ink-900 dark:text-dark-text truncate leading-snug">
            {project.title}
          </span>
          {project.featured && (
            <Star size={11} className="text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
          )}
        </div>
        <span className="font-mono text-[11px] text-ink-300 dark:text-dark-muted">
          {project.year}
        </span>
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {project.tech_stack.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[10px] font-mono rounded
                bg-cream-100/80 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Card content: expanded ────────────────────────────────────────────────────

function ExpandedCard({ project }: { project: Project }) {
  return (
    <div className="h-full flex flex-col">
      <div className="h-1 shrink-0" style={{ background: project.color }} />
      <div className="p-6 flex flex-col gap-3 flex-1 overflow-y-auto min-h-0">
        <span className="font-mono text-[11px] text-ink-300 dark:text-dark-muted">
          {project.year}
        </span>
        <div className="flex items-center gap-2">
          <h3 className="font-display font-bold text-xl text-ink-900 dark:text-dark-text leading-tight">
            {project.title}
          </h3>
          {project.featured && (
            <Star size={16} className="text-amber-500 fill-amber-500 shrink-0" />
          )}
        </div>
        <p className="text-[13px] text-ink-500 dark:text-dark-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono rounded-md
                bg-cream-100/80 dark:bg-dark-surface-2 text-ink-500 dark:text-dark-text-secondary
                border border-cream-200/60 dark:border-dark-border"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-700 dark:hover:text-dark-text transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={12} />
              Source
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ color: project.color }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {!project.github_url && !project.live_url && (
            <span className="text-xs font-mono text-ink-300 dark:text-dark-muted italic">
              Private
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-ink-300 dark:text-dark-muted">
          ↩ click to collapse
        </span>
      </div>
    </div>
  )
}

// ── Mini grid: non-active cards on left or right pane ────────────────────────

function OthersMiniGrid({
  others,
  setActiveId,
}: {
  others: Project[]
  setActiveId: (id: string | null) => void
}) {
  const miniCols: 1 | 2 = others.length <= 2 ? 1 : 2
  const lastAlone = miniCols === 2 && others.length % 2 !== 0
  return (
    <div className={`flex-1 grid gap-2 ${miniColsMap[miniCols]} auto-rows-[1fr] min-h-0`}>
      {others.map((p, i) => (
        <motion.article
          key={p.id}
          layoutId={`proj-${p.id}`}
          className={`rounded-2xl overflow-hidden cursor-pointer
            bg-cream-50 dark:bg-dark-surface-2
            border border-cream-200/60 dark:border-dark-border
            ${lastAlone && i === others.length - 1 ? 'col-span-2' : ''}`}
          onClick={() => setActiveId(String(p.id))}
          whileHover={{ scale: 1.02 }}
          transition={spring}
        >
          <CollapsedCard project={p} />
        </motion.article>
      ))}
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

// ── Main component ────────────────────────────────────────────────────────────

interface ProjectsProps {
  projects: Project[]
}

const cardBase =
  'rounded-2xl overflow-hidden bg-cream-50 dark:bg-dark-surface-2 border border-cream-200/60 dark:border-dark-border'

export function Projects({ projects: rawProjects }: ProjectsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const projects = rawProjects.slice(0, 12)
  const cols = getDefaultCols(projects.length)

  const activeIndex = activeId ? projects.findIndex((p) => String(p.id) === activeId) : -1
  const activeProject = activeIndex !== -1 ? projects[activeIndex] : null

  const activeCol = activeIndex !== -1 ? activeIndex % cols : -1
  const leftOthers = activeIndex !== -1
    ? projects.filter((_, i) => i !== activeIndex && i % cols < activeCol)
    : []
  const rightOthers = activeIndex !== -1
    ? projects.filter((_, i) => i !== activeIndex && i % cols >= activeCol)
    : []
  const others = projects.filter((p) => String(p.id) !== activeId)

  // Determine expand direction, falling back if one side is empty
  const rawDir: ExpandDir | null =
    activeId && activeIndex !== -1 ? getExpandDir(activeIndex, cols) : null
  const expandDir: ExpandDir | null =
    rawDir === 'center'
      ? leftOthers.length === 0
        ? 'left'
        : rightOthers.length === 0
          ? 'right'
          : 'center'
      : rawDir

  return (
    <section id="projects" className="relative min-h-full py-10 px-6">
      {/* Decorative watermark */}
      <div className="absolute top-4 right-6 font-display font-black text-[8rem] leading-none text-ink-900/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
        03
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-sm text-amber-600 dark:text-amber-500">03.</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-dark-text">
            Projects
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-dark-border ml-4 max-w-xs" />
        </motion.div>

        {/* ── Mode 1: Grid (no active card) ── */}
        {!activeId && (
          <div className={`grid grid-cols-2 lg:${colsMap[cols]} gap-3 auto-rows-[160px] lg:auto-rows-[180px]`}>
            {projects.map((p, i) => (
              <motion.article
                key={p.id}
                layoutId={`proj-${p.id}`}
                className={`${cardBase} cursor-pointer`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ layout: spring, default: { duration: 0.35, delay: i * 0.05 } }}
                onClick={() => setActiveId(String(p.id))}
                whileHover={{ scale: 1.015 }}
              >
                <CollapsedCard project={p} />
              </motion.article>
            ))}
          </div>
        )}

        <LayoutGroup>
          {/* ── Mode Mobile: full-width stacked (< lg) ── */}
          {activeId && isMobile && (
            <div className="flex flex-col gap-3">
              <motion.article
                key={activeId}
                layoutId={`proj-${activeId}`}
                className={`${cardBase} cursor-pointer w-full`}
                style={{ height: 340 }}
                onClick={() => setActiveId(null)}
                transition={spring}
              >
                {activeProject && <ExpandedCard project={activeProject} />}
              </motion.article>
              <div className="grid grid-cols-2 gap-2 auto-rows-[160px]">
                {others.map((p, i) => {
                  const lastAlone = others.length % 2 !== 0 && i === others.length - 1
                  return (
                    <motion.article
                      key={p.id}
                      layoutId={`proj-${p.id}`}
                      className={`${cardBase} cursor-pointer ${lastAlone ? 'col-span-2' : ''}`}
                      onClick={() => setActiveId(String(p.id))}
                      whileHover={{ scale: 1.02 }}
                      transition={spring}
                    >
                      <CollapsedCard project={p} />
                    </motion.article>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── Mode 2: LEFT or RIGHT expanded (desktop only) ── */}
          {activeId && !isMobile && expandDir !== 'center' && (
            <div className="flex gap-3" style={{ height: 460 }}>
              {expandDir === 'right' && (
                <OthersMiniGrid others={others} setActiveId={setActiveId} />
              )}

              <motion.article
                key={activeId}
                layoutId={`proj-${activeId}`}
                className={`${cardBase} cursor-pointer flex-none`}
                style={{ width: '58%' }}
                onClick={() => setActiveId(null)}
                transition={spring}
              >
                {activeProject && <ExpandedCard project={activeProject} />}
              </motion.article>

              {expandDir === 'left' && (
                <OthersMiniGrid others={others} setActiveId={setActiveId} />
              )}
            </div>
          )}

          {/* ── Mode 3: CENTER expanded (desktop only) ── */}
          {activeId && !isMobile && expandDir === 'center' && (
            <div className="flex gap-3" style={{ height: 460 }}>
              {/* Left column: cards in columns < active column */}
              <div className="flex-1 flex flex-col gap-2 min-h-0">
                {leftOthers.map((p, i) => {
                  const heights = columnHeights(leftOthers.length)
                  return (
                    <motion.article
                      key={p.id}
                      layoutId={`proj-${p.id}`}
                      className={`${cardBase} cursor-pointer ${
                        heights[i] === 'fixed' ? 'h-[180px] shrink-0' : 'flex-1 min-h-0'
                      }`}
                      onClick={() => setActiveId(String(p.id))}
                      whileHover={{ scale: 1.02 }}
                      transition={spring}
                    >
                      <CollapsedCard project={p} />
                    </motion.article>
                  )
                })}
              </div>

              {/* Center: expanded active card */}
              <motion.article
                key={activeId}
                layoutId={`proj-${activeId}`}
                className={`${cardBase} cursor-pointer flex-none`}
                style={{ width: '50%' }}
                onClick={() => setActiveId(null)}
                transition={spring}
              >
                {activeProject && <ExpandedCard project={activeProject} />}
              </motion.article>

              {/* Right column: cards in columns >= active column (excluding active) */}
              <div className="flex-1 flex flex-col gap-2 min-h-0">
                {rightOthers.map((p, i) => {
                  const heights = columnHeights(rightOthers.length)
                  return (
                    <motion.article
                      key={p.id}
                      layoutId={`proj-${p.id}`}
                      className={`${cardBase} cursor-pointer ${
                        heights[i] === 'fixed' ? 'h-[180px] shrink-0' : 'flex-1 min-h-0'
                      }`}
                      onClick={() => setActiveId(String(p.id))}
                      whileHover={{ scale: 1.02 }}
                      transition={spring}
                    >
                      <CollapsedCard project={p} />
                    </motion.article>
                  )
                })}
              </div>
            </div>
          )}
        </LayoutGroup>
      </div>
    </section>
  )
}
