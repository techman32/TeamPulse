'use client'
import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import DropdownUsers from '@/entities/dropdown-users/ui'
import { useGroupStore } from '@/entities/group-create-form/model/store'

export default function GroupCreateForm() {
  const store = useGroupStore()

  const handleSubmit = async () => {
    await store.submit()
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Создать новую группу</h2>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <Input
          placeholder="Введите название группы"
          onChange={(event) => {
            store.setName(event.target.value)
          }}
        />
        <DropdownUsers
          selected={store.employees.map(String)}
          onSelectAction={(selected) => store.setEmployees(selected)}
        />
        <div>
          <Button text="Создать группу" buttonType="primary" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
