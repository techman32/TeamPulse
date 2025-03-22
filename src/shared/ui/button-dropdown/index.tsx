import { useState, useRef, useEffect } from 'react'
import Button from '@/shared/ui/button'
import Select from '@/shared/ui/select'

interface ButtonDropdownProps<T> {
  options: T[]
  selected: T[]
  getLabel: (option: T) => string
  getValue: (option: T) => string
  onChange: (selected: T[]) => void
  buttonText?: string
}
// @typescript-eslint/no-explicit-any
export default function ButtonDropdown<T extends Record<string, any>>({
  options,
  selected,
  getLabel,
  getValue,
  onChange,
  buttonText = 'Выбрать',
}: ButtonDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleOption(option: T) {
    const value = getValue(option)
    const newSelected = selected.some((item) => getValue(item) === value)
      ? selected.filter((item) => getValue(item) !== value)
      : [...selected, option]

    onChange(newSelected)
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button text={buttonText} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <Select
          options={options}
          selected={selected.map(getValue)}
          getLabel={getLabel}
          getValue={getValue}
          onSelect={toggleOption}
        />
      )}
    </div>
  )
}
