export interface Profile {
  id: number
  name: string
  title: string
  tagline: string
  bio: string
  email: string
  github: string
  linkedin: string
  twitter?: string
  location: string
  avatar_url?: string
  years_experience: number
  projects_count: number
}

export interface Experience {
  id: number
  company: string
  role: string
  start_date: string
  end_date?: string
  description: string
  tech_stack: string[]
  is_current: boolean
  sort_order: number
  company_url?: string
  logo_color?: string
}

export interface Project {
  id: number
  title: string
  description: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  featured: boolean
  color: string
  sort_order: number
  year: number
  type: 'company' | 'personal'
  company_name?: string
}

export interface Skill {
  id: number
  name: string
  category: string
  icon?: string
  proficiency: number
  sort_order: number
}

export interface ApiResponse<T> {
  data: T
  error?: string
}
