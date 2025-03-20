import TagCreateForm from '@/entities/tag-create-form/ui'
import GroupCreateForm from '@/entities/group-create-form/ui'
import TemplatesTable from '@/entities/templates-table/ui'

export default function ManagementPage() {
  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Управление</h1>
      <TemplatesTable />
      <TagCreateForm />
      <GroupCreateForm />
    </div>
  )
}
