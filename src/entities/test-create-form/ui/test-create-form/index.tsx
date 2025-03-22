'use client'
import Input from '@/shared/ui/input'
import Textarea from '@/shared/ui/textarea'
import Button from '@/shared/ui/button'
import TemplateCreateForm from '@/entities/test-create-form/ui/template-create-form'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

export default function TestCreateForm() {
  const store = useTestTemplateStore()

  const handleSubmit = async (status: string) => {
    store.setStatus(status)
    await store.submit()
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
    </>
  )
}
