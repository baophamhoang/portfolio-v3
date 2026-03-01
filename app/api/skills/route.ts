import { NextResponse } from 'next/server'
import { getSkills } from '@/lib/queries'
import { seedSkills } from '@/lib/seed-data'

export async function GET() {
  try {
    const skills = await getSkills()
    return NextResponse.json({ data: skills.length ? skills : seedSkills })
  } catch {
    return NextResponse.json({ data: seedSkills })
  }
}
