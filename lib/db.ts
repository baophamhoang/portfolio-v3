import { createClient } from '@libsql/client'

let client: ReturnType<typeof createClient> | null = null

export function getDb() {
  if (!client) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    if (!url) {
      throw new Error('TURSO_DATABASE_URL environment variable is required')
    }

    client = createClient({
      url,
      authToken,
    })
  }
  return client
}

export async function initDb() {
  const db = getDb()

  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      tagline TEXT,
      bio TEXT,
      email TEXT,
      github TEXT,
      linkedin TEXT,
      twitter TEXT,
      location TEXT,
      avatar_url TEXT,
      years_experience INTEGER DEFAULT 0,
      projects_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      role TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT,
      description TEXT,
      tech_stack TEXT,
      is_current INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      company_url TEXT,
      logo_color TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tech_stack TEXT,
      github_url TEXT,
      live_url TEXT,
      image_url TEXT,
      featured INTEGER DEFAULT 0,
      color TEXT DEFAULT '#D97706',
      sort_order INTEGER DEFAULT 0,
      year INTEGER DEFAULT 2024
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      icon TEXT,
      proficiency INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    );
  `)
}
