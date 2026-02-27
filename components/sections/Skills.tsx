'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Skill, Profile } from '@/lib/types'

const categoryConfig: Record<string, { emoji: string; color: string }> = {
  Frontend: { emoji: '🎨', color: '#D97706' },
  Backend: { emoji: '⚙️', color: '#7C3AED' },
  Languages: { emoji: '💻', color: '#0891B2' },
  Tools: { emoji: '🔧', color: '#059669' },
}

function SkillChip({ skill, delay = 0 }: { skill: Skill; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const config = categoryConfig[skill.category] || categoryConfig.Frontend

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border cursor-default transition-all duration-200 hover:border-transparent hover:shadow-md"
      style={{ '--chip-color': config.color } as React.CSSProperties}
    >
      {/* Hover border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ border: `1px solid ${config.color}40`, background: `${config.color}05` }}
      />

      {/* Proficiency dot */}
      <div
        className="w-2 h-2 rounded-full shrink-0"
        style={{ backgroundColor: config.color }}
      />

      <span className="text-sm font-medium text-ink-700 dark:text-dark-text relative z-10">
        {skill.name}
      </span>
    </motion.div>
  )
}

interface SkillsProps {
  skills: Skill[]
  profile: Profile
}

export function Skills({ skills, profile }: SkillsProps) {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })
  const bioRef = useRef(null)
  const bioInView = useInView(bioRef, { once: true, margin: '-60px' })

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const categoryOrder = ['Frontend', 'Backend', 'Languages', 'Tools']
  const sortedCategories = categoryOrder.filter((c) => grouped[c])

  const allSkillNames = skills.map((s) => s.name)

  return (
    <section id="skills" className="relative section-padding bg-cream-100/50 dark:bg-dark-surface/20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-sm text-amber-600 dark:text-amber-500">03.</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-dark-text">
            Skills
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-dark-border ml-4 max-w-xs" />
        </motion.div>

        {/* Bio block */}
        <motion.div
          ref={bioRef}
          initial={{ opacity: 0, y: 16 }}
          animate={bioInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <p className="text-base text-ink-600 dark:text-dark-text-secondary leading-relaxed max-w-2xl mb-4">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-xs font-mono text-ink-500 dark:text-dark-text-secondary">
              {profile.years_experience}+ years
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-xs font-mono text-ink-500 dark:text-dark-text-secondary">
              {profile.projects_count}+ projects
            </span>
            <span className="px-3 py-1 rounded-full bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-xs font-mono text-ink-500 dark:text-dark-text-secondary">
              {profile.location}
            </span>
          </div>
        </motion.div>

        {/* Horizontal skill rows */}
        <div className="divide-y divide-cream-100 dark:divide-dark-border">
          {sortedCategories.map((category, i) => {
            const catSkills = grouped[category]
            const config = categoryConfig[category] || categoryConfig.Frontend
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 py-4"
              >
                <div className="w-[110px] shrink-0 flex items-center gap-2 pt-1">
                  <span className="text-base leading-none">{config.emoji}</span>
                  <span className="text-xs font-semibold text-ink-600 dark:text-dark-text-secondary">
                    {category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {catSkills.map((skill, j) => (
                    <SkillChip key={skill.id} skill={skill} delay={j * 0.04} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Scrolling skills marquee */}
        <div className="mt-10 overflow-hidden">
          <div className="relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:bg-gradient-to-r before:from-cream-100/50 dark:before:from-dark-surface/20 before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:bg-gradient-to-l after:from-cream-100/50 dark:after:from-dark-surface/20 after:z-10">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {[...allSkillNames, ...allSkillNames].map((name, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-xs font-mono text-ink-400 dark:text-dark-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 dark:bg-amber-500" />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
