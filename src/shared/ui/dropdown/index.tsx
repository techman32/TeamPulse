'use client'
import { useEffect, useRef, useState } from 'react'
import ButtonSelect from '@/shared/ui/button-select'
import Select from '@/shared/ui/select'

interface DropdownProps<T> {
  placeholder: string
  options: T[]
  selected: string[]
  displayKey: (keyof T)[]
  valueKey: keyof T
  multiple?: boolean
  onSelectAction: (values: string[]) => void
}
// @typescript-eslint/no-explicit-any
export default function Dropdown<T extends Record<string, any>>({
  placeholder,
  options,
  selected = [],
  displayKey,
  valueKey,
  multiple = false,
  onSelectAction,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const getLabel = (option: T) =>
    Array.isArray(displayKey) ? displayKey.map((key) => option[key]).join(' ') : String(option[displayKey])

  const getValue = (option: T) => String(option[valueKey])

  const handleSelect = (option: T) => {
    const optionValue = getValue(option)
    const values = multiple
      ? selected.includes(optionValue)
        ? selected.filter((v) => v !== optionValue)
        : [...selected, optionValue]
      : [optionValue]
    onSelectAction(values)
    if (!multiple) setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={selectRef}>
      <ButtonSelect
        isOpen={isOpen}
        selected={selected.length > 0}
        selectedText={
          selected.length > 0
            ? selected
                .map((value) => {
                  const foundOption = options.find((o) => getValue(o) === value)
                  return foundOption ? getLabel(foundOption) : placeholder
                })
                .join(', ')
            : placeholder
        }
        onClick={() => setIsOpen(!isOpen)}
        multiple={multiple}
      />
      {isOpen && (
        <Select options={options} selected={selected} getLabel={getLabel} getValue={getValue} onSelect={handleSelect} />
      )}
    </div>
  )
}
