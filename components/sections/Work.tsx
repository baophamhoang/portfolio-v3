'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronDown, Github, ArrowUpRight, Star } from 'lucide-react'
import type { Experience, Project } from '@/lib/types'

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

// ── Experience Card ───────────────────────────────────────────────────────────

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border rounded-2xl overflow-hidden cursor-pointer hover:border-amber-200 dark:hover:border-amber-500/30 hover:shadow-md transition-all duration-300"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent */}
      {exp.is_current && (
        <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700" />
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
              style={{ backgroundColor: exp.logo_color || '#D97706' }}
            >
              {exp.company[0]}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-semibold text-ink-900 dark:text-dark-text text-sm leading-tight">
                  {exp.role}
                </h3>
                {exp.is_current && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 tracking-wider uppercase">
                    Now
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-medium text-amber-600 dark:text-amber-500">
                  {exp.company}
                </span>
                {exp.company_url && (
                  <a
                    href={exp.company_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-ink-300 dark:text-dark-muted hover:text-amber-500"
                  >
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <div className="text-[10px] font-mono text-ink-300 dark:text-dark-muted mt-0.5">
                {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                {' · '}{getDuration(exp.start_date, exp.end_date)}
              </div>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-ink-300 dark:text-dark-muted shrink-0 mt-1"
          >
            <ChevronDown size={15} />
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-3 mt-3 border-t border-cream-100 dark:border-dark-border">
                <p className="text-xs text-ink-500 dark:text-dark-text-secondary leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {exp.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-cream-100 dark:bg-dark-surface-2 text-ink-500 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const visibleTech = project.tech_stack.slice(0, 3)
  const overflow = project.tech_stack.length - visibleTech.length

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      className="group relative bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl cursor-default"
      style={{ '--card-color': project.color } as React.CSSProperties}
    >
      {/* Top color bar */}
      <div
        className="h-0.5 w-full transition-opacity duration-300"
        style={{ backgroundColor: project.color, opacity: hovered ? 1 : 0.5 }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 70%)` }}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: project.color,
                boxShadow: hovered ? `0 0 10px ${project.color}80` : 'none',
              }}
            />
            {project.featured && (
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
                <Star size={8} fill="currentColor" />
                Featured
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono text-ink-300 dark:text-dark-muted">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h3
          className="font-display text-sm font-bold text-ink-900 dark:text-dark-text mb-1.5 group-hover:transition-colors duration-200"
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-ink-500 dark:text-dark-text-secondary leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-3">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cream-100 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border"
            >
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cream-100 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border">
              +{overflow}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-medium text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text transition-colors"
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
              className="flex items-center gap-1 text-[10px] font-medium transition-colors"
              style={{ color: project.color }}
            >
              <ExternalLink size={11} />
              Live
            </a>
          )}
        </div>
      </div>

      {/* Hover corner arrow */}
      <AnimatePresence>
        {hovered && (project.live_url || project.github_url) && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            transition={{ duration: 0.18 }}
            className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${project.color}20` }}
          >
            <ArrowUpRight size={13} style={{ color: project.color }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

// ── Work Section ──────────────────────────────────────────────────────────────

interface WorkProps {
  experience: Experience[]
  projects: Project[]
}

export function Work({ experience, projects }: WorkProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section id="work" className="relative section-padding bg-cream-100/50 dark:bg-dark-surface/30 overflow-hidden">
      <div className="absolute inset-0 pixel-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-sm text-amber-600 dark:text-amber-500">02.</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-dark-text">
            Work
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-dark-border ml-4 max-w-xs" />
        </motion.div>

        {/* Experience sub-section */}
        <div className="mb-10">
          <p className="section-sub-header">Experience</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experience.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Projects sub-section */}
        <div>
          <p className="section-sub-header">Projects</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
