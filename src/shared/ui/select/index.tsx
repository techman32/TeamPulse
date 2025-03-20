import cn from 'classnames'

interface SelectProps<T> {
  options: T[]
  selected: string[]
  getLabel: (option: T) => string
  getValue: (option: T) => string
  onSelect: (option: T) => void
}

export default function Select<T>({
  options,
  selected,
  getLabel,
  getValue,
  onSelect,
}: SelectProps<T>) {
  return (
    <ul className="absolute bg-white w-full border border-gray-200 rounded-md shadow-sm mt-1 z-10 left-0 top-full origin-top">
      {options.map((option) => {
        const value = getValue(option)
        return (
          <li
            key={value}
            className={cn('p-2 hover:bg-gray-100 cursor-pointer', {
              'text-black/40': selected.includes(value),
            })}
            onClick={() => onSelect(option)}
          >
            {getLabel(option)}
          </li>
        )
      })}
    </ul>
  )
}
