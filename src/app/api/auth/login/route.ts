import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { login, password } = await req.json()

  try {
    const response = await fetch('http://193.164.150.39/api/v1/auth/logins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })

    const json = await response.json()

    if (response.status === 200) {
      const { success, error, data } = json

      if (error) {
        return NextResponse.json({ error, success })
      }

      const res = NextResponse.json({ success })
      res.cookies.set({
        name: 'auth_token',
        value: data.token,
        httpOnly: true,
        expires: new Date(data.expirationDate * 1000),
        // secure: process.env.NODE_ENV === 'production', // Только по HTTPS в проде
        // sameSite: 'strict', // Только с того же сайта
        path: '/',
      })

      res.cookies.set({
        name: 'user_role',
        value: data.role,
        httpOnly: true,
        expires: new Date(data.expirationDate * 1000),
        path: '/',
      })

      return res
    }

    return NextResponse.json({
      success: false,
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    })
  }
}
