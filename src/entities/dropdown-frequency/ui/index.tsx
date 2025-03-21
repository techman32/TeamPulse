import Dropdown from '@/shared/ui/dropdown'

const frequency = [
  { id: '0', name: 'Без повторений' },
  { id: '1', name: 'Каждый день' },
  { id: '2', name: 'Каждый месяц' },
  { id: '3', name: 'Каждые полгода' },
  { id: '4', name: 'Каждый год' },
]

interface DropdownFrequencyProps {
  selected: string
  onSelect: (value: string) => void
}

export default function DropdownFrequency({ selected, onSelect }: DropdownFrequencyProps) {
  return (
    <Dropdown
      placeholder="Выберите периодичность"
      options={frequency}
      selected={selected ? [selected] : []}
      displayKey={['name']}
      valueKey="name"
      onSelectAction={(values) => onSelect(values[0] || '')}
    />
  )
}
