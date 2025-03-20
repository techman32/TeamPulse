import TestCreateForm from '@/entities/test-create-form/ui/test-create-form'

export default function TestCreatePage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Создание теста</h1>
      <TestCreateForm />
    </div>
  )
}
