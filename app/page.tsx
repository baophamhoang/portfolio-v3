import { Sidebar } from '@/components/layout/Sidebar'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import {
  seedProfile,
  seedExperience,
  seedProjects,
  seedSkills,
} from '@/lib/seed-data'

async function getData() {
  // Try live DB first, fall back to seed data
  try {
    const { getProfile, getExperience, getProjects, getSkills } = await import('@/lib/queries')
    const [profile, experience, projects, skills] = await Promise.all([
      getProfile(),
      getExperience(),
      getProjects(),
      getSkills(),
    ])
    return {
      profile: profile ?? seedProfile,
      experience: experience.length ? experience : seedExperience,
      projects: projects.length ? projects : seedProjects,
      skills: skills.length ? skills : seedSkills,
    }
  } catch {
    return {
      profile: seedProfile,
      experience: seedExperience,
      projects: seedProjects,
      skills: seedSkills,
    }
  }
}

export default async function Home() {
  const { profile, experience, projects, skills } = await getData()

  return (
    <div className="flex min-h-screen bg-cream-100 dark:bg-dark-bg">
      <Sidebar />
      <main className="flex-1 lg:ml-[240px] overflow-x-hidden">
        <Hero profile={profile} />
        <Work experience={experience} projects={projects} />
        <Skills skills={skills} profile={profile} />
        <Contact profile={profile} />
      </main>
    </div>
  )
}
