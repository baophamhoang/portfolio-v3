'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Github, Linkedin, MapPin, Mail } from 'lucide-react'
import type { Profile } from '@/lib/types'
import type { PanelId } from '@/components/layout/PortfolioShell'

const RobotScene = dynamic(() => import('@/components/three/RobotScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
    </div>
  ),
})

const ease = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

interface HeroProps {
  profile: Profile
  setActivePanel: (id: PanelId) => void
}

export function Hero({ profile, setActivePanel }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden h-full flex items-center py-12 lg:py-16">
      {/* Single amber glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-300/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-12 items-center">

          {/* ── TEXT CONTENT ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5 order-1"
          >
            {/* Status badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1 font-pixel text-lg text-green-600 dark:text-green-400 border-2 border-green-500/50 dark:border-green-500/30">
                <span className="w-2 h-2 bg-green-500 animate-pulse" />
                [ONLINE] Open to new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <p className="text-sm font-mono text-ink-400 dark:text-dark-muted mb-1 tracking-widest uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="font-pixel text-ink-900 dark:text-dark-text leading-[1.05] text-7xl sm:text-8xl lg:text-8xl glow-amber">
                {profile.name}
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={item}>
              <p className="font-pixel text-2xl sm:text-3xl text-amber-600 dark:text-amber-500">
                {profile.title}
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-ink-500 dark:text-dark-text-secondary leading-relaxed max-w-lg"
            >
              {profile.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => setActivePanel('work')}
                className="btn-retro"
              >
                View my work
              </button>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-retro-ghost"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-retro-ghost"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </motion.div>

            {/* Meta info row */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 pt-2 text-sm text-ink-600 dark:text-dark-text-secondary font-mono"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-amber-500" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-amber-500" />
                {profile.email}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-500">⚡</span>
                {profile.years_experience}+ yrs exp
              </span>
            </motion.div>
          </motion.div>

          {/* ── ROBOT — desktop only ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="relative hidden lg:block order-2 h-[400px]"
          >
            <div className="w-full h-full">
              <RobotScene />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
