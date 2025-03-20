import Dropdown from '@/shared/ui/dropdown'

const answerTypes = [
  { name: 'Развернутый ответ' },
  { name: 'Одиночный выбор' },
  { name: 'Множественный выбор' },
  { name: 'Оценка (1-10)' },
  { name: 'Распределение баллов' },
]

interface DropdownAnswerTypesProps {
  selected: number
  onSelect: (index: number) => void
}

export default function DropdownAnswerTypes({ selected, onSelect }: DropdownAnswerTypesProps) {
  return (
    <Dropdown
      placeholder="Выберите тип ответа"
      options={answerTypes}
      selected={[answerTypes[selected].name]}
      displayKey={['name']}
      valueKey="name"
      onSelectAction={(values) => {
        const selectedIndex = answerTypes.findIndex((item) => item.name === values[0])
        if (selectedIndex !== -1) {
          onSelect(selectedIndex)
        }
      }}
    />
  )
}
