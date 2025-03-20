import UsersTable from '@/entities/users-table/ui'
import ButtonLink from '@/shared/ui/button-link'

export default function UsersPage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h1 className="font-bold text-2xl">Список пользователей</h1>
        <ButtonLink href="/dashboard/users/create" text="Создать пользователя" />
      </div>
      <UsersTable />
    </div>
  )
}
