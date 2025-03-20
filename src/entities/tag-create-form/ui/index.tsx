'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import { useTagStore } from '@/entities/tag-create-form/model/store'

export default function TagCreateForm() {
  const store = useTagStore()

  const handleSubmit = async () => {
    await store.submit()
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Создать новый тег</h2>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <Input
          placeholder="Введите название тега"
          onChange={(event) => store.setName(event.target.value)}
        />
        <div>
          <Button text="Создать тег" buttonType="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
