import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookiesStore = await cookies()
  try {
    cookiesStore.delete('auth_token')
    cookiesStore.delete('user_role')
    return NextResponse.redirect(new URL('/auth', req.url), { status: 302 })
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 })
  }
}
