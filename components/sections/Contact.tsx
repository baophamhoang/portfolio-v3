'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react'
import type { Profile } from '@/lib/types'

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', message: '' })
    }, 4000)
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-sm text-ink-800 dark:text-dark-text placeholder:text-ink-300 dark:placeholder:text-dark-muted focus:outline-none focus:border-amber-400 dark:focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 dark:focus:ring-amber-500/20 transition-all duration-200'

  return (
    <section id="contact" className="relative section-padding bg-cream-50 dark:bg-dark-bg overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pixel-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-amber-100/30 dark:bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-sm text-amber-600 dark:text-amber-500">04.</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 dark:text-dark-text">
            Get in touch
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-dark-border ml-4 max-w-xs hidden sm:block" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: CTA + email + socials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-display text-4xl sm:text-5xl font-bold text-ink-900 dark:text-dark-text mb-4 leading-tight">
                Let&apos;s build something.
              </h3>
              <p className="text-base text-ink-500 dark:text-dark-text-secondary leading-relaxed">
                I&apos;m currently open to new opportunities. Whether you have a project in mind,
                want to collaborate, or just want to say hello — my inbox is always open.
              </p>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors w-fit"
            >
              {profile.email}
            </a>

            {/* Icon-only social buttons */}
            <div className="flex items-center gap-2">
              <motion.a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-ink-500 dark:text-dark-text-secondary hover:border-amber-200 dark:hover:border-amber-500/30 hover:text-ink-700 dark:hover:text-dark-text transition-all duration-200 hover:shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={17} />
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-ink-500 dark:text-dark-text-secondary hover:border-amber-200 dark:hover:border-amber-500/30 hover:text-ink-700 dark:hover:text-dark-text transition-all duration-200 hover:shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={17} />
              </motion.a>
              <motion.a
                href={profile.twitter || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border text-ink-500 dark:text-dark-text-secondary hover:border-amber-200 dark:hover:border-amber-500/30 hover:text-ink-700 dark:hover:text-dark-text transition-all duration-200 hover:shadow-sm"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={17} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-dark-surface border border-cream-200 dark:border-dark-border rounded-2xl p-5 flex flex-col gap-5 shadow-sm"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-500 dark:text-dark-muted uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-500 dark:text-dark-muted uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-ink-500 dark:text-dark-muted uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="relative flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-medium text-sm text-white bg-amber-600 dark:bg-amber-500 hover:bg-amber-700 dark:hover:bg-amber-600 disabled:opacity-70 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden"
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
              >
                {status === 'idle' && (
                  <>
                    <Send size={15} />
                    Send message
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                )}
                {status === 'sent' && (
                  <>
                    <CheckCircle size={15} />
                    Message sent!
                  </>
                )}
                {status === 'error' && 'Try again'}
              </motion.button>

              <p className="text-xs text-center text-ink-300 dark:text-dark-muted">
                I typically respond within 24 hours ✌️
              </p>
            </form>
          </motion.div>
        </div>

        {/* Inline footer strip */}
        <div className="mt-14 pt-6 border-t border-cream-200 dark:border-dark-border flex justify-between items-center text-xs font-mono text-ink-300 dark:text-dark-muted">
          <span>$ built by Bao Pham</span>
          <span>&lt;/portfolio.v3&gt;</span>
        </div>
      </div>
    </section>
  )
}
