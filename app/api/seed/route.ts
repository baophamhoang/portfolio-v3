import { NextResponse } from 'next/server'
import { initDb, getDb } from '@/lib/db'
import { seedProfile, seedExperience, seedProjects, seedSkills } from '@/lib/seed-data'

export async function POST() {
  try {
    await initDb()
    const db = getDb()

    // Seed profile
    await db.execute({
      sql: `INSERT OR REPLACE INTO profile (id, name, title, tagline, bio, email, github, linkedin, twitter, location, years_experience, projects_count)
            VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        seedProfile.name,
        seedProfile.title,
        seedProfile.tagline,
        seedProfile.bio,
        seedProfile.email,
        seedProfile.github,
        seedProfile.linkedin,
        seedProfile.twitter ?? null,
        seedProfile.location,
        seedProfile.years_experience,
        seedProfile.projects_count,
      ],
    })

    // Seed experience
    await db.execute('DELETE FROM experience')
    for (const exp of seedExperience) {
      await db.execute({
        sql: `INSERT INTO experience (company, role, start_date, end_date, description, tech_stack, is_current, sort_order, company_url, logo_color)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          exp.company,
          exp.role,
          exp.start_date,
          exp.end_date ?? null,
          exp.description,
          JSON.stringify(exp.tech_stack),
          exp.is_current ? 1 : 0,
          exp.sort_order,
          exp.company_url ?? null,
          exp.logo_color ?? null,
        ],
      })
    }

    // Seed projects
    await db.execute('DELETE FROM projects')
    for (const project of seedProjects) {
      await db.execute({
        sql: `INSERT INTO projects (title, description, tech_stack, github_url, live_url, image_url, featured, color, sort_order, year)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          project.title,
          project.description,
          JSON.stringify(project.tech_stack),
          project.github_url ?? null,
          project.live_url ?? null,
          project.image_url ?? null,
          project.featured ? 1 : 0,
          project.color,
          project.sort_order,
          project.year,
        ],
      })
    }

    // Seed skills
    await db.execute('DELETE FROM skills')
    for (const skill of seedSkills) {
      await db.execute({
        sql: `INSERT INTO skills (name, category, proficiency, sort_order) VALUES (?, ?, ?, ?)`,
        args: [skill.name, skill.category, skill.proficiency, skill.sort_order],
      })
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
