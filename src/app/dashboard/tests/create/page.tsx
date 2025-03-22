import TestCreateForm from '@/entities/test-create-form/ui/test-create-form'
import TemplateImport from '@/entities/template-import/ui'

export default function TestCreatePage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h1 className="font-bold text-2xl">Создание теста</h1>
        <TemplateImport />
      </div>
      <TestCreateForm />
    </div>
  )
}
