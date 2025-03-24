'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginFormState } from '@/entities/login-form/model/store'
import { logIn } from '@/shared/api'

export default function LogInForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { login, password, setPassword, setLogin } = useLoginFormState()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const response = await logIn(login, password)
    if (!response.success) {
      setError(response.error)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-96 w-full">
      <p className="font-semibold text-xl text-center">Вход</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
        <Input
          placeholder="Логин"
          onChange={(e) => {
            setError('')
            setLogin(e.target.value)
          }}
        />
        <Input
          placeholder="Пароль"
          type="password"
          onChange={(e) => {
            setError('')
            setPassword(e.target.value)
          }}
        />
        <Button
          block
          text="Войти"
          buttonType="primary"
          onClick={handleSubmit}
          loading={loading}
          disabled={!login || !password}
        />
      </form>
      {error && (
        <p className="text-xs text-red-500">
          {error === 'username' && 'Пользователя не существует'}
          {error === 'password' && 'Неверный пароль'}
          {error === 'empty' && 'Введите данные'}
        </p>
      )}
      <Link href="/">
        <span className="text-xs hover:underline underline-offset-4">Забыли пароль?</span>
      </Link>
      <p className="text-xs opacity-50">Нет данных для входа? Обратитесь к своему администратору</p>
    </div>
  )
}
