import { NextResponse } from 'next/server'
import { getProfile } from '@/lib/queries'
import { seedProfile } from '@/lib/seed-data'

export async function GET() {
  try {
    const profile = await getProfile()
    return NextResponse.json({ data: profile ?? seedProfile })
  } catch {
    return NextResponse.json({ data: seedProfile })
  }
}
