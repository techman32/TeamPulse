import { User } from '@/shared/lib/types'

export const logIn = async (login: string, password: string) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при авторизации: ', error)
  }
}

export const getUsers = async (limit: number, offset: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка пользователей: ', error)
  }
}

export const getGroups = async (limit: number, offset: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/groups?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка групп: ', error)
  }
}

export const setUser = async (data: User) => {
  try {
    const response = await fetch(`http://localhost:3000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при создании пользователя: ', error)
  }
}
