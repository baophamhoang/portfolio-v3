'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import type { Project } from '@/lib/types'

const ease = [0.16, 1, 0.3, 1] as const

interface ProjectsProps {
  projects: Project[]
}

function ProjectRow({
  project,
  index,
  isActive,
  onToggle,
}: {
  project: Project
  index: number
  isActive: boolean
  onToggle: (id: string) => void
}) {
  const id = String(project.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      className="relative pl-4"
      style={{ borderLeft: `3px solid ${project.color}` }}
    >
      {/* Clickable header row */}
      <button
        onClick={() => onToggle(id)}
        className="w-full text-left flex items-center gap-4 py-4 group"
      >
        {/* Title */}
        <span className="font-display font-bold text-sm text-ink-900 dark:text-dark-text flex-1 min-w-0 truncate">
          {project.title}
        </span>

        {/* Year */}
        <span className="font-mono text-xs text-ink-300 dark:text-dark-muted shrink-0">
          {project.year}
        </span>

        {/* Tech preview (first 3) */}
        <span className="hidden sm:block font-mono text-xs text-ink-400 dark:text-dark-text-secondary shrink-0 w-52 text-right truncate">
          {project.tech_stack.slice(0, 3).join(' · ')}
        </span>

        {/* Chevron */}
        <motion.span
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronRight
            size={14}
            className="text-ink-300 group-hover:text-amber-500 transition-colors"
          />
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
            <div className="pb-5 pr-4">
              <p className="text-[13px] text-ink-500 dark:text-dark-text-secondary leading-relaxed mb-3">
                {project.description}
              </p>

              {/* All tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
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

              {/* Links */}
              <div className="flex items-center gap-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-ink-400 hover:text-ink-700 dark:hover:text-dark-text transition-colors"
                  >
                    <Github size={11} />
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
                  >
                    <ExternalLink size={11} />
                    Live
                  </a>
                )}
                {!project.github_url && !project.live_url && (
                  <span className="text-xs font-mono text-ink-300 dark:text-dark-muted italic">
                    Private
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Projects({ projects }: ProjectsProps) {
  const [activeId, setActiveId] = useState<string>(
    projects[0] ? String(projects[0].id) : ''
  )

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? '' : id))

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

        {/* Accordion list */}
        <div className="divide-y divide-cream-200/60 dark:divide-dark-border">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              isActive={activeId === String(project.id)}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
