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

export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
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
