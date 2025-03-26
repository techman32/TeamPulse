import { CreatedTemplate, CreatedTest, SolvedTest, Tag, User } from '@/shared/lib/types'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const logIn = async (login: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при авторизации: ', error)
  }
}

export const logOut = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'GET',
      credentials: 'include',
    })

    if (response.redirected) {
      window.location.href = response.url
    }
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error)
  }
}

export const getUsers = async (limit: number, offset: number, query: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/users?limit=${limit}&offset=${offset}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка пользователей: ', error)
  }
}

export const getGroups = async (limit: number, offset: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка групп: ', error)
  }
}

export const getTags = async (limit: number, offset: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/tags?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка тегов: ', error)
  }
}

export const getTemplates = async (limit: number, offset: number, query: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/templates?limit=${limit}&offset=${offset}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка шаблонов: ', error)
  }
}

export const setUser = async (data: User) => {
  try {
    const response = await fetch(`${baseUrl}/api/users`, {
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

export const setTest = async (data: CreatedTest) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests/assign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при назначении теста: ', error)
  }
}

export const getTests = async (limit?: number, offset?: number, query?: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests?limit=${limit}&offset=${offset}&query=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка тестов: ', error)
  }
}

export const getUserTests = async (userId: string, limit?: number, offset?: number) => {
  try {
    const response = await fetch(`${baseUrl}/api/users/${userId}/tests?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении списка тестов: ', error)
  }
}

export const setTag = async (data: Tag) => {
  try {
    const response = await fetch(`${baseUrl}/api/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при создании тега: ', error)
  }
}

export const setGroup = async (data: Tag) => {
  try {
    const response = await fetch(`${baseUrl}/api/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при создании группы: ', error)
  }
}

export const setTemplate = async (data: CreatedTemplate) => {
  try {
    const response = await fetch(`${baseUrl}/api/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при создании шаблона: ', error)
  }
}

export const getUser = async (id?: string) => {
  try {
    if (id) {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      return response.json()
    }

    const response = await fetch(`${baseUrl}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
    })
    return response.json()
  } catch (error) {
    console.error(`Произошла ошибка при получении пользователя: ${error}`)
  }
}

export const getTest = async (testId: string, topicId: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests/${testId}?topicId=${topicId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении теста: ', error)
  }
}

export const solveTest = async (data: SolvedTest) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при отправке решения: ', error)
  }
}

export const getTestUsers = async (id: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests/${id}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении пользователей назначенных на тест: ', error)
  }
}

export const getSolution = async (testId: string, userId: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/tests/solution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testId, userId }),
      credentials: 'include',
    })

    return await response.json()
  } catch (error) {
    console.error('Ошибка при получении результатов: ', error)
  }
}

export const parseUsers = async (data: FormData) => {
  try {
    const response = await fetch(`${baseUrl}/api/parse-users`, {
      method: 'POST',
      body: data,
    })

    const text = await response.text()
    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  } catch (error) {
    console.error('Ошибка при импорте пользователей: ', error)
  }
}
