import UserCreateForm from '@/entities/user-create-form/ui'

export default function UserCreatePage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Создание пользователя</h1>
      <UserCreateForm />
    </div>
  )
}
