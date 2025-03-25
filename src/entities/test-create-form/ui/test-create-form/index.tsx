'use client'
import Input from '@/shared/ui/input'
import Textarea from '@/shared/ui/textarea'
import Button from '@/shared/ui/button'
import Topics from '@/entities/test-create-form/ui/topics'
import { useTemplateStore } from '@/entities/test-create-form/model/store'
import { FormEvent, useState } from 'react'

export default function TestCreateForm() {
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { name, description, setName, setDescription, setStatus, createTemplate, reset } = useTemplateStore()

  const createTest = async (e: FormEvent, status: string) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setErrors([])
    setStatus(status)
    const { success, errors } = await createTemplate()
    if (!success) {
      setErrors(errors)
    } else {
      setSuccess(success)
      reset()
    }
    setLoading(false)
  }

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Название</h2>
        <Input
          placeholder="Введите название"
          value={name}
          onClick={() => setSuccess(false)}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Описание</h2>
        <Textarea
          placeholder="Введите описание"
          value={description}
          onClick={() => setSuccess(false)}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Topics />
      <div className="flex gap-4 items-center">
        <Button
          text="Создать"
          loading={loading}
          type="submit"
          buttonType="primary"
          onClick={(e) => createTest(e, 'done')}
        />
        <Button text="Добавить в черновик" type="button" loading={loading} onClick={(e) => createTest(e, 'draft')} />
        {success && <p className="text-sm accent-green-500">Тест успешно создан!</p>}
      </div>
      <div>
        {errors.length > 0 &&
          errors.map((error, index) => (
            <p key={index} className="text-xs text-red-500">
              {error === 'topics' && 'Не заполнено поле "Тема"'}
              {error === 'name' && 'Не заполнено поле "Название"'}
              {error === 'questions' && 'Не добавлены поля "Вопросы"'}
              {error === 'answers' && 'Не заполнены поля "Ответы"'}
              {error === 'text' && 'Не заполнены поля "Вопросы"'}
            </p>
          ))}
      </div>
    </form>
  )
}
