'use client'
import Input from '@/shared/ui/input'
import Textarea from '@/shared/ui/textarea'
import Button from '@/shared/ui/button'
import TemplateCreateForm from '@/entities/test-create-form/ui/template-create-form'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TestCreateForm() {
  const [errors, setErrors] = useState<boolean>(false)
  const store = useTestTemplateStore()
  const router = useRouter()

  const handleSubmit = async (status: string) => {
    store.setStatus(status)
    const response = await store.submit()
    if (!response.success) {
      setErrors(true)
    } else {
      store.reset()
      router.push('/dashboard/management')
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Название</h2>
        <Input
          placeholder="Введите название"
          value={store.name}
          onChange={(event) => store.setName(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Описание</h2>
        <Textarea
          placeholder="Введите описание"
          value={store.description}
          onChange={(event) => store.setDescription(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Тест</h2>
        <TemplateCreateForm />
      </div>
      <div className="flex gap-4 items-center">
        <Button text="Создать" buttonType="primary" onClick={() => handleSubmit('done')} />
        <Button text="Добавить в черновик" onClick={() => handleSubmit('draft')} />
      </div>
      {errors && <p className="text-red-500 opacity-70 italic">Произошла ошибка, попробуйте отправить еще раз!</p>}
    </>
  )
}
