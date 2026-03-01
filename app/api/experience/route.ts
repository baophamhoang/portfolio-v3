import { NextResponse } from 'next/server'
import { getExperience } from '@/lib/queries'
import { seedExperience } from '@/lib/seed-data'

export async function GET() {
  try {
    const experience = await getExperience()
    return NextResponse.json({ data: experience.length ? experience : seedExperience })
  } catch {
    return NextResponse.json({ data: seedExperience })
  }
}
