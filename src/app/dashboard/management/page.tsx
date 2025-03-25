import TagCreateForm from '@/entities/tag-create-form/ui'
import GroupCreateForm from '@/entities/group-create-form/ui'
import TemplatesTable from '@/entities/templates-table/ui'

export default function ManagementPage() {
  return (
    <>
      <h1 className="font-bold text-2xl">Управление</h1>
      <TemplatesTable />
      <TagCreateForm />
      <GroupCreateForm />
    </>
  )
}
