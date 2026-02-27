import { getDb } from './db'
import type { Profile, Experience, Project, Skill } from './types'

function parseTechStack(raw: string | null): string[] {
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return raw.split(',').map((s) => s.trim())
  }
}

export async function getProfile(): Promise<Profile | null> {
  const db = getDb()
  const result = await db.execute('SELECT * FROM profile WHERE id = 1 LIMIT 1')
  if (result.rows.length === 0) return null
  const row = result.rows[0]
  return {
    id: Number(row.id),
    name: String(row.name),
    title: String(row.title),
    tagline: String(row.tagline ?? ''),
    bio: String(row.bio ?? ''),
    email: String(row.email ?? ''),
    github: String(row.github ?? ''),
    linkedin: String(row.linkedin ?? ''),
    twitter: row.twitter ? String(row.twitter) : undefined,
    location: String(row.location ?? ''),
    avatar_url: row.avatar_url ? String(row.avatar_url) : undefined,
    years_experience: Number(row.years_experience ?? 0),
    projects_count: Number(row.projects_count ?? 0),
  }
}

export async function getExperience(): Promise<Experience[]> {
  const db = getDb()
  const result = await db.execute(
    'SELECT * FROM experience ORDER BY sort_order ASC'
  )
  return result.rows.map((row) => ({
    id: Number(row.id),
    company: String(row.company),
    role: String(row.role),
    start_date: String(row.start_date),
    end_date: row.end_date ? String(row.end_date) : undefined,
    description: String(row.description ?? ''),
    tech_stack: parseTechStack(row.tech_stack as string | null),
    is_current: Boolean(row.is_current),
    sort_order: Number(row.sort_order),
    company_url: row.company_url ? String(row.company_url) : undefined,
    logo_color: row.logo_color ? String(row.logo_color) : undefined,
  }))
}

export async function getProjects(): Promise<Project[]> {
  const db = getDb()
  const result = await db.execute(
    'SELECT * FROM projects ORDER BY sort_order ASC'
  )
  return result.rows.map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    description: String(row.description),
    tech_stack: parseTechStack(row.tech_stack as string | null),
    github_url: row.github_url ? String(row.github_url) : undefined,
    live_url: row.live_url ? String(row.live_url) : undefined,
    image_url: row.image_url ? String(row.image_url) : undefined,
    featured: Boolean(row.featured),
    color: String(row.color ?? '#D97706'),
    sort_order: Number(row.sort_order),
    year: Number(row.year ?? 2024),
  }))
}

export async function getSkills(): Promise<Skill[]> {
  const db = getDb()
  const result = await db.execute(
    'SELECT * FROM skills ORDER BY category ASC, sort_order ASC'
  )
  return result.rows.map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    category: String(row.category),
    icon: row.icon ? String(row.icon) : undefined,
    proficiency: Number(row.proficiency ?? 0),
    sort_order: Number(row.sort_order),
  }))
}
