'use client'

import { useEffect } from 'react'

export function ViewTracker() {
  useEffect(() => {
    fetch('/api/views', { method: 'POST' })
  }, [])

  return null
}
