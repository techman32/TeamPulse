'use client'
import { useEffect, useRef, useState } from 'react'
import DateInput from '@/shared/ui/date-input'
import Calendar from '@/shared/ui/calendar'

interface DatePickerProps {
  onChange: (date: Date | null) => void
}

export default function DatePicker({ onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [date, setDate] = useState<Date | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDate = (year: number, month: number, day: number) => {
    const selectedDate = new Date(year, month, day)
    setDate(selectedDate)
    onChange(selectedDate)
  }

  return (
    <div className={'relative'} ref={selectRef}>
      <DateInput
        placeholder={'Выберите дату'}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        value={date ? date.toLocaleDateString('ru-RU') : ''}
      />
      {isOpen && (
        <Calendar className={'absolute z-10 mt-1'} onChange={handleDate} />
      )}
    </div>
  )
}
