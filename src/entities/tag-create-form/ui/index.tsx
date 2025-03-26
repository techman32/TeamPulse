'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import { useTagStore } from '@/entities/tag-create-form/model/store'
import { useState } from 'react'

export default function TagCreateForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const store = useTagStore()

  const handleSubmit = async () => {
    setLoading(true)
    const response = await store.submit()
    if (response.success) {
      store.reset()
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Создать новый тег</h2>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <Input placeholder="Введите название тега" value={store.name} onChange={(event) => store.setName(event.target.value)} />
        <div>
          <Button text="Создать тег" buttonType="primary" onClick={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  )
}
