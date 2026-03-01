'use client'

import { motion } from 'framer-motion'
import type { Skill, Profile } from '@/lib/types'

const ease = [0.16, 1, 0.3, 1] as const

const categoryOrder = ['Frontend', 'Backend', 'Cloud/DevOps', 'AI/Integrations']

interface SkillsProps {
  skills: Skill[]
  profile: Profile
}

export function Skills({ skills, profile }: SkillsProps) {
  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  const sortedCategories = categoryOrder.filter((c) => grouped[c])

  return (
    <section id="skills" className="relative min-h-full py-10 px-6">
      {/* Decorative watermark */}
      <div className="absolute top-4 right-6 font-pixel text-[8rem] leading-none text-ink-900/[0.05] dark:text-white/[0.04] select-none pointer-events-none">
        04
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-pixel text-2xl text-amber-600 dark:text-amber-500 leading-none">04.</span>
          <h2 className="font-pixel text-4xl sm:text-5xl text-ink-900 dark:text-dark-text">
            Skills
          </h2>
          <div className="flex-1 h-px bg-amber-200/60 dark:bg-dark-border ml-4 max-w-xs" />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="text-lg text-ink-600 dark:text-dark-text-secondary leading-relaxed max-w-xl mb-10"
        >
          {profile.bio}
        </motion.p>

        {/* Skills table */}
        <div className="divide-y divide-ink-100/60 dark:divide-dark-border">
          {sortedCategories.map((category, i) => {
            const catSkills = grouped[category]
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.07, ease }}
                className="flex items-baseline gap-8 py-5"
              >
                <span className="w-28 shrink-0 font-pixel text-base text-amber-600 dark:text-amber-500">
                  {category}
                </span>
                <span className="text-sm text-ink-600 dark:text-dark-text-secondary leading-relaxed">
                  {catSkills.map((s) => s.name).join(' · ')}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
