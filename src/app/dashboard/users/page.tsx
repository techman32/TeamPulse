import UsersTable from '@/entities/users-table/ui'

export default function UsersPage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Список пользователей</h1>
      <UsersTable />
    </div>
  )
}
