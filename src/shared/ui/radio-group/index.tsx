import RadioButton from '@/shared/ui/radio-button'

interface RadioGroupProps {
  name: string
  labels: string[]
  selected?: string
  onChange: (option: string) => void
}

export default function RadioGroup({ name, labels, selected, onChange }: RadioGroupProps) {
  return (
    <div className={'flex flex-col gap-0.5'}>
      {labels.map((label) => (
        <RadioButton key={label} name={name} label={label} selected={selected} onChange={onChange} />
      ))}
    </div>
  )
}
