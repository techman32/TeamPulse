import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const token = req.cookies.get('auth_token')?.value

  if (!token) {
    const response = NextResponse.redirect(new URL('/auth', req.url), { status: 302 })
    response.cookies.delete('auth_token')
    response.cookies.delete('user_role')
    return response
  }

  try {
    const response = await fetch(`http://193.164.150.39/api/v1/users/subject-stats`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    if (response.status === 401) {
      return await fetch('/api/auth/logout', {
        method: 'GET',
      })
    }

    return NextResponse.json({ success: result.success, errors: result.errors, data: result.stats })
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    })
  }
}
