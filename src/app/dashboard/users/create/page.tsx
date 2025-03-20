'use client'
import Input from '@/shared/ui/input'
import DropdownRoles from '@/entities/dropdown-roles/ui'
import { useUserCreateStore } from '@/entities/user-create-form/model/store'
import Button from '@/shared/ui/button'
import DropdownGroups from '@/entities/dropdown-groups/ui'

export default function UserCreatePage() {
  const store = useUserCreateStore()

  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Создание пользователя</h1>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-semibold text-xl">Имя</h2>
          <Input
            placeholder="Имя"
            onChange={(e) => store.updateField('firstName', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h2 className="font-semibold text-xl">Фамилия</h2>
          <Input
            placeholder="Фамилия"
            onChange={(e) => store.updateField('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Имя пользователя</h2>
        <Input
          placeholder="Имя пользователя"
          onChange={(e) => store.updateField('login', e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Email</h2>
        <Input placeholder="Email" onChange={(e) => store.updateField('email', e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Роль</h2>
        <DropdownRoles
          selected={store.user.role}
          onSelect={(value) => store.updateField('role', value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-xl">Группы</h2>
        <DropdownGroups
          selected={store.user.groups.map((group) => group.id)}
          onSelectAction={(values) =>
            store.updateField(
              'groups',
              values.map((id) => ({
                id,
                name: store.user.groups.find((g) => g.id === id)?.name || '',
              })),
            )
          }
        />
      </div>
      <Button text={'Создать'} buttonType="primary" onClick={() => store.submit()} />
    </div>
  )
}
