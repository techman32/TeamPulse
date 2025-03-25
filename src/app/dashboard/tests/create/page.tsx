import TestCreateForm from '@/entities/test-create-form/ui/test-create-form'

export default function TestCreatePage() {
  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="font-bold text-2xl">Создание теста</h1>
      </div>
      <TestCreateForm />
    </>
  )
}
