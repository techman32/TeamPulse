'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import DropdownUsers from '@/entities/dropdown-users/ui'
import { useGroupStore } from '@/entities/group-create-form/model/store'
import { useState } from 'react'

export default function GroupCreateForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const store = useGroupStore()

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
      <h2 className="font-semibold text-xl">Создать новую группу</h2>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <Input
          placeholder="Введите название группы"
          value={store.name}
          onChange={(event) => {
            store.setName(event.target.value)
          }}
        />
        <DropdownUsers
          selected={store.employees.map(String)}
          onSelectAction={(selected) => store.setEmployees(selected)}
        />
        <div>
          <Button text="Создать группу" buttonType="primary" onClick={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  )
}
