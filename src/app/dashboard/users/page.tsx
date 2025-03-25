import UsersTable from '@/entities/users-table/ui'
import ButtonLink from '@/shared/ui/button-link'
import UsersImport from '@/entities/users-import/ui'

export default function UsersPage() {
  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="font-bold text-2xl">Список пользователей</h1>
        <div className="flex gap-2 flex-wrap">
          <ButtonLink href="/dashboard/users/create" text="Создать пользователя" />
          <UsersImport />
        </div>
      </div>
      <UsersTable />
    </>
  )
}
