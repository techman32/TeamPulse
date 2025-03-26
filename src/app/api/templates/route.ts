import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const offset = searchParams.get('offset') || ''
  const limit = searchParams.get('limit') || ''
  const query = searchParams.get('query') || ''
  const token = req.cookies.get('auth_token')?.value

  if (!token) {
    const response = NextResponse.redirect(new URL('/auth', req.url), { status: 302 })
    response.cookies.delete('auth_token')
    response.cookies.delete('user_role')
    return response
  }

  try {
    const response = await fetch(`http://193.164.150.39/api/v1/templates?limit=${limit}&offset=${offset}&q=${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      const data = await response.json()
      return NextResponse.json(data)
    }

    if (response.status === 401) {
      const response = NextResponse.redirect(new URL('/auth', req.url), { status: 302 })
      response.cookies.delete('auth_token')
      response.cookies.delete('user_role')
      return response
    }

    return NextResponse.json({
      message: 'Ошибка при получении списка шаблонов',
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    })
  }
}

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
    const response = await fetch(`http://193.164.150.39/api/v1/templates`, {
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

    return NextResponse.json({ success: result.success, errors: result.errors })
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    })
  }
}
