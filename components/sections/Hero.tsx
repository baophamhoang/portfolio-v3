'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, MapPin, Mail } from 'lucide-react'
import type { Profile } from '@/lib/types'

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
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden dot-grid py-12 lg:py-16 min-h-[90vh] flex items-center">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-300/8 dark:bg-violet-500/4 rounded-full blur-3xl pointer-events-none" />

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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to new opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <p className="text-sm font-mono text-ink-400 dark:text-dark-muted mb-1 tracking-widest uppercase">
                Hello, I&apos;m
              </p>
              <h1 className="font-display font-bold text-ink-900 dark:text-dark-text leading-[1.05] tracking-tight text-7xl sm:text-8xl lg:text-8xl">
                {profile.name}
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div variants={item}>
              <p className="font-display text-xl sm:text-2xl font-semibold text-amber-600 dark:text-amber-500">
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
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 dark:bg-amber-500 text-white font-medium text-sm shadow-sm hover:bg-amber-700 dark:hover:bg-amber-600 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                View my work
                <ArrowDown size={14} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cream-300 dark:border-dark-border text-ink-600 dark:text-dark-text-secondary font-medium text-sm hover:bg-cream-100 dark:hover:bg-dark-surface transition-all duration-200 hover:-translate-y-0.5"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-cream-300 dark:border-dark-border text-ink-600 dark:text-dark-text-secondary font-medium text-sm hover:bg-cream-100 dark:hover:bg-dark-surface transition-all duration-200 hover:-translate-y-0.5"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
            </motion.div>

            {/* Meta info row */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4 pt-2 text-xs text-ink-400 dark:text-dark-muted font-mono"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={11} className="text-amber-500" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={11} className="text-amber-500" />
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
            {/* Decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-cream-300 dark:border-dark-border animate-spin-slow opacity-50" />

            <div className="w-full h-full">
              <RobotScene />
            </div>

            {/* Floating label */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 left-2 px-3 py-1.5 rounded-lg bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border shadow-sm text-xs font-mono text-ink-500 dark:text-dark-text-secondary"
            >
              👆 Hover &amp; click me
            </motion.div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex items-center gap-3"
        >
          <div className="h-px flex-1 max-w-xs bg-cream-200 dark:bg-dark-border" />
          <a
            href="#work"
            className="flex items-center gap-1.5 text-xs font-mono text-ink-300 dark:text-dark-muted hover:text-amber-500 transition-colors"
          >
            scroll down
            <ArrowDown size={11} className="animate-bounce-soft" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
