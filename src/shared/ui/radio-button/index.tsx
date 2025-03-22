interface RadioButtonProps {
  name: string
  label: string
  selected?: string
  onChange: (option: string) => void
}

export default function RadioButton({ name, label, selected, onChange }: RadioButtonProps) {
  return (
    <label className={'flex items-center gap-1'}>
      <div
        className={
          'h-4 w-4 border border-gray-400 rounded-full flex items-center justify-center transition-all hover:border-black'
        }
      >
        {selected === label && <div className={'h-2.5 w-2.5 bg-black rounded-full'}></div>}
      </div>
      <input
        type={'radio'}
        name={name}
        className={'hidden'}
        checked={selected === label}
        onChange={() => onChange(label)}
      />
      <span>{label}</span>
    </label>
  )
}
