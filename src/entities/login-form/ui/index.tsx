'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginFormState } from '@/entities/login-form/model/store'

export default function LogInForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const store = useLoginFormState()
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    const success = await store.submit()
    setLoading(false)
    if (success) {
      router.replace('/dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 max-w-96 w-full">
      <p className="font-semibold text-xl text-center">Вход</p>
      <Input placeholder="Логин" onChange={(e) => store.setLogin(e.target.value)} />
      <Input
        placeholder="Пароль"
        type="password"
        onChange={(e) => store.setPassword(e.target.value)}
      />
      <Button block text="Войти" buttonType="primary" onClick={handleSubmit} loading={loading} />
      {error && <p className="text-xs text-red-500">Произошла ошибка!</p>}
      <Link href="/">
        <span className="text-xs hover:underline underline-offset-4">Забыли пароль?</span>
      </Link>
      <p className="text-xs opacity-50">Нет данных для входа? Обратитесь к своему администратору</p>
    </div>
  )
}
