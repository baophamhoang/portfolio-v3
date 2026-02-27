import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/queries'
import { seedProjects } from '@/lib/seed-data'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ data: projects.length ? projects : seedProjects })
  } catch {
    return NextResponse.json({ data: seedProjects })
  }
}
