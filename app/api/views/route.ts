import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

export async function POST() {
  try {
    const db = getDb()
    await db.execute('UPDATE og_views SET count = count + 1 WHERE id = 1')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
