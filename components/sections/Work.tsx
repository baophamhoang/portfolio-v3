'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import type { Experience, Project } from '@/lib/types'

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

// ── Experience Card ───────────────────────────────────────────────────────────

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const visibleTech = exp.tech_stack.slice(0, 4)
  const overflow = exp.tech_stack.length - visibleTech.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="bg-white/70 dark:bg-dark-surface/60 border border-cream-200/80 dark:border-dark-border rounded-2xl overflow-hidden hover:border-amber-200 dark:hover:border-amber-500/30 hover:shadow-md transition-all duration-300"
    >
      {/* Current accent bar */}
      {exp.is_current && (
        <div className="h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700" />
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
            style={{ backgroundColor: exp.logo_color || '#D97706' }}
          >
            {exp.company[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display font-bold text-ink-900 dark:text-dark-text text-base leading-tight">
                {exp.role}
              </h3>
              {exp.is_current && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 tracking-wider uppercase">
                  Now
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-medium text-amber-600 dark:text-amber-500">
                {exp.company}
              </span>
              {exp.company_url && (
                <a
                  href={exp.company_url}
                  target="_blank"
                  rel="noopener noreferrer"
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

        {/* Description */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-left w-full"
        >
          <p className={`text-xs text-ink-500 dark:text-dark-text-secondary leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
            {exp.description}
          </p>
          {!expanded && exp.description.length > 120 && (
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-500 mt-0.5 block">
              more →
            </span>
          )}
        </button>

        {/* Tech */}
        <div className="flex flex-wrap gap-1 mt-3">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono rounded bg-cream-100/80 dark:bg-dark-surface-2 text-ink-500 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border"
            >
              {tech}
            </span>
          ))}
          {overflow > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cream-100/80 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-muted border border-cream-200 dark:border-dark-border">
              +{overflow} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Featured Project Card ─────────────────────────────────────────────────────

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const visibleTech = project.tech_stack.slice(0, 5)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      className="group relative bg-white/70 dark:bg-dark-surface/60 border border-cream-200/80 dark:border-dark-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl cursor-default"
      style={{ '--card-color': project.color } as React.CSSProperties}
    >
      {/* Top color bar */}
      <div
        className="h-1.5 w-full transition-opacity duration-300"
        style={{ backgroundColor: project.color, opacity: hovered ? 1 : 0.6 }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}, transparent 70%)` }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: project.color,
                boxShadow: hovered ? `0 0 10px ${project.color}80` : 'none',
              }}
            />
            <span className="text-[10px] font-mono text-ink-300 dark:text-dark-muted">
              {project.year}
            </span>
          </div>
          <AnimatePresence>
            {hovered && (project.live_url || project.github_url) && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.15 }}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${project.color}20` }}
              >
                <ArrowUpRight size={13} style={{ color: project.color }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <h3
          className="font-display text-base font-bold text-ink-900 dark:text-dark-text mb-2 transition-colors duration-200"
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-ink-500 dark:text-dark-text-secondary leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cream-100/80 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border"
            >
              {tech}
            </span>
          ))}
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
    </motion.article>
  )
}

// ── Compact Project Card ──────────────────────────────────────────────────────

function CompactProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const visibleTech = project.tech_stack.slice(0, 2)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -2 }}
      className="group relative bg-white/70 dark:bg-dark-surface/60 border border-cream-200/80 dark:border-dark-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md cursor-default"
    >
      <div
        className="h-0.5 w-full transition-opacity duration-300"
        style={{ backgroundColor: project.color, opacity: hovered ? 1 : 0.4 }}
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: project.color }}
          />
          <span className="text-[9px] font-mono text-ink-300 dark:text-dark-muted">
            {project.year}
          </span>
        </div>

        <h3
          className="font-display text-sm font-bold text-ink-900 dark:text-dark-text mb-1 line-clamp-1 transition-colors duration-200"
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.title}
        </h3>

        <p className="text-[11px] text-ink-500 dark:text-dark-text-secondary leading-relaxed mb-2.5 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-cream-100/80 dark:bg-dark-surface-2 text-ink-400 dark:text-dark-text-secondary border border-cream-200 dark:border-dark-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {(project.live_url || project.github_url) && (
          <div className="flex items-center gap-2 mt-2.5">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[9px] font-medium text-ink-400 dark:text-dark-muted hover:text-ink-700 dark:hover:text-dark-text transition-colors"
              >
                <Github size={9} />
                Source
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[9px] font-medium transition-colors"
                style={{ color: project.color }}
              >
                <ExternalLink size={9} />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  )
}

// ── Work Panel ────────────────────────────────────────────────────────────────

interface WorkProps {
  experience: Experience[]
  projects: Project[]
}

export function Work({ experience, projects }: WorkProps) {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2)
  const otherProjects = projects.filter((p) => !p.featured).slice(0, 4)
  // If fewer than 2 featured, fill from non-featured
  const displayFeatured = featuredProjects.length >= 2
    ? featuredProjects
    : [...featuredProjects, ...projects.filter((p) => !p.featured)].slice(0, 2)
  const displayOther = projects
    .filter((p) => !displayFeatured.includes(p))
    .slice(0, 4)

  return (
    <section id="work" className="relative min-h-full py-10 px-6">
      {/* Decorative watermark */}
      <div className="absolute top-4 right-6 font-display font-black text-[8rem] leading-none text-ink-900/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
        02
      </div>

      <div className="relative max-w-6xl mx-auto">
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

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">

          {/* Left: Experience */}
          <div>
            <p className="section-sub-header">Experience</p>
            <div className="flex flex-col gap-4">
              {experience.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} />
              ))}
            </div>
          </div>

          {/* Right: Projects */}
          <div>
            <p className="section-sub-header">Projects</p>

            {/* Featured row */}
            {displayFeatured.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {displayFeatured.map((project, i) => (
                  <FeaturedProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}

            {/* Compact grid */}
            {displayOther.length > 0 && (
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {displayOther.map((project, i) => (
                  <CompactProjectCard key={project.id} project={project} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
