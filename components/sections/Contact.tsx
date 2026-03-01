'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Github, Linkedin, Twitter, CheckCircle } from 'lucide-react'
import type { Profile } from '@/lib/types'

const ease = [0.16, 1, 0.3, 1] as const

interface ContactProps {
  profile: Profile
}

export function Contact({ profile }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
      }, 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputClass =
    'w-full px-3 py-2 bg-transparent border-b-2 border-ink-300 dark:border-dark-border text-ink-900 dark:text-[#F0EDE8] font-pixel text-lg placeholder:text-ink-300 dark:placeholder:text-dark-muted focus:outline-none focus:border-amber-600 dark:focus:border-amber-500 transition-colors duration-100'

  return (
    <section id="contact" className="relative min-h-full py-10 px-6">
      {/* Ambient glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/5 dark:bg-amber-900/10 blur-3xl pointer-events-none" />

      {/* Decorative watermark */}
      <div className="absolute top-4 right-6 font-pixel text-[8rem] leading-none text-ink-900/[0.05] dark:text-white/[0.04] select-none pointer-events-none">
        05
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-pixel text-2xl text-amber-600 dark:text-amber-500 leading-none">05.</span>
          <h2 className="font-pixel text-4xl sm:text-5xl text-ink-900 dark:text-dark-text">
            Get in touch
          </h2>
          <div className="flex-1 h-px bg-cream-200 dark:bg-[#3A3228] ml-4 max-w-xs hidden sm:block" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: CTA + email + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="font-pixel text-4xl sm:text-5xl text-ink-900 dark:text-dark-text mb-4 leading-tight">
                Let&apos;s build something.
              </h3>
              <p className="text-base text-ink-600 dark:text-dark-text-secondary leading-relaxed">
                I&apos;m currently open to new opportunities. Whether you have a project in mind,
                want to collaborate, or just want to say hello — my inbox is always open.
              </p>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg text-amber-600 dark:text-[#F59E0B] hover:text-amber-700 dark:hover:text-[#FBBF24] transition-colors w-fit"
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
                className="w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-[#221E1C] border-2 border-ink-300 dark:border-dark-border text-ink-500 dark:text-[#B0A498] hover:border-amber-500 dark:hover:border-amber-600 hover:text-ink-900 dark:hover:text-[#F7F3EC] transition-colors duration-100"
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
                className="w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-[#221E1C] border-2 border-ink-300 dark:border-dark-border text-ink-500 dark:text-[#B0A498] hover:border-amber-500 dark:hover:border-amber-600 hover:text-ink-900 dark:hover:text-[#F7F3EC] transition-colors duration-100"
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
                className="w-10 h-10 flex items-center justify-center bg-white/70 dark:bg-[#221E1C] border-2 border-ink-300 dark:border-dark-border text-ink-500 dark:text-[#B0A498] hover:border-amber-500 dark:hover:border-amber-600 hover:text-ink-900 dark:hover:text-[#F7F3EC] transition-colors duration-100"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={17} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/50 dark:bg-[#221E1C] retro-border p-5 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-1.5 field-pixel-cursor">
                <label htmlFor="contact-name" className="text-xs font-medium text-ink-500 dark:text-[#7A6E66] uppercase tracking-wider">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5 field-pixel-cursor">
                <label htmlFor="contact-email" className="text-xs font-medium text-ink-500 dark:text-[#7A6E66] uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5 field-pixel-cursor">
                <label htmlFor="contact-message" className="text-xs font-medium text-ink-500 dark:text-[#7A6E66] uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="contact-message"
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
                className="btn-retro w-full justify-center disabled:opacity-70"
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
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
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

              <p className="text-xs text-center text-ink-400 dark:text-[#7A6E66]">
                I typically respond within 24 hours ✌️
              </p>
            </form>
          </motion.div>
        </div>

        {/* Footer strip */}
        <div className="mt-14 pt-6 border-t border-cream-200 dark:border-[#2C2520] flex justify-between items-center text-base font-pixel text-ink-500 dark:text-[#7A6E66]">
          <span>$ built by Bao Pham</span>
          <span>&lt;/portfolio.v3&gt;</span>
        </div>
      </div>
    </section>
  )
}
