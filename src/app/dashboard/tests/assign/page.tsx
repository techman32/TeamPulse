import TestAssignForm from '@/entities/test-assign-form/ui'

export default function TestAssignPage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Назначение теста</h1>
      <TestAssignForm />
    </div>
  )
}
