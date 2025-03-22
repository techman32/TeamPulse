import { CreatedTemplate, CreatedTest, SolvedTest, Tag, User } from '@/shared/lib/types'

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
    const response = await fetch(`http://localhost:3000/api/users?limit=${limit}&offset=${offset}`, {
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
    const response = await fetch(`http://localhost:3000/api/groups?limit=${limit}&offset=${offset}`, {
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
    const response = await fetch(`http://localhost:3000/api/tags?limit=${limit}&offset=${offset}`, {
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

export const getTemplates = async (limit: number, offset: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/templates?limit=${limit}&offset=${offset}`, {
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

export const setTest = async (data: CreatedTest) => {
  try {
    const response = await fetch(`http://localhost:3000/api/tests/assign`, {
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

export const getTests = async (limit?: number, offset?: number) => {
  try {
    const response = await fetch(`http://localhost:3000/api/tests?limit=${limit}&offset=${offset}`, {
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
    const response = await fetch(`http://localhost:3000/api/tags`, {
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
    const response = await fetch(`http://localhost:3000/api/groups`, {
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
    const response = await fetch(`http://localhost:3000/api/templates`, {
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
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      return response.json()
    }

    const response = await fetch(`http://localhost:3000/api/users/me`, {
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
    const response = await fetch(`http://localhost:3000/api/tests/${testId}?topicId=${topicId}`, {
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
    const response = await fetch(`http://localhost:3000/api/tests/solve`, {
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
