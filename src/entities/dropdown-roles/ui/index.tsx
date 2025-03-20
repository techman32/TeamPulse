import Dropdown from '@/shared/ui/dropdown'

const roles = [
  { id: 'admin', name: 'Администратор' },
  { id: 'employee', name: 'Сотрудник' },
]

interface DropdownRolesProps {
  selected: string
  onSelect: (value: string) => void
}

export default function DropdownRoles({ selected, onSelect }: DropdownRolesProps) {
  return (
    <Dropdown
      placeholder="Выберите роль"
      options={roles}
      selected={selected ? [selected] : []}
      displayKey={['name']}
      valueKey="id"
      onSelectAction={(values) => onSelect(values[0] || '')}
    />
  )
}
