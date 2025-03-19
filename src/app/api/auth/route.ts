import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { login, password } = await req.json()

  try {
    const response = await fetch('http://193.164.150.39/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })

    if (response.ok) {
      const data = await response.json()
      const { token, expirationDate, role } = data

      if (!token) {
        return NextResponse.json({ message: 'Не удалось получить токен', status: response.status })
      }

      const res = NextResponse.json({ success: true })
      res.cookies.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        expires: new Date(expirationDate * 1000),
        // secure: process.env.NODE_ENV === 'production', // Только по HTTPS в проде
        // sameSite: 'strict', // Только с того же сайта
        path: '/',
      })

      res.cookies.set({
        name: 'user_role',
        value: role,
        httpOnly: true,
        expires: new Date(expirationDate * 1000),
        path: '/',
      })

      return res
    }

    return NextResponse.json({
      message: 'Произошла ошибка при авторизации',
      status: response.status,
    })
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    })
  }
}
