import { PortfolioShell } from '@/components/layout/PortfolioShell'
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
    <PortfolioShell
      profile={profile}
      experience={experience}
      projects={projects}
      skills={skills}
    />
  )
}
