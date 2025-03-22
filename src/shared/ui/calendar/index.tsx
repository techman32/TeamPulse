'use client'
import cn from 'classnames'
import CalendarNavigation from '@/shared/ui/calendar-navigation'
import { useState } from 'react'
import { getDaysInMonth, months } from '@/shared/lib/calendar'

interface CalendarProps {
  className?: string
  onChange: (year: number, month: number, day: number) => void
}

export default function Calendar({ className, onChange }: CalendarProps) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(new Date().getMonth())
  const days = getDaysInMonth(year, month)

  const changeYear = (dir: number) => {
    setYear((prevYear) => prevYear + dir)
  }

  const changeMonth = (dir: number) => {
    setMonth((prevMonth) => {
      let newMonth = prevMonth + dir
      if (newMonth < 0) newMonth = 11
      if (newMonth > 11) newMonth = 0
      return newMonth
    })
  }

  return (
    <div
      className={`min-w-60 max-w-96 bg-white border border-gray-200 rounded-md flex flex-col gap-2 p-2 ${className}`}
    >
      <CalendarNavigation onChange={changeYear} text={year.toString()} />
      <CalendarNavigation onChange={changeMonth} text={months[month]} />
      <div
        className={`border border-gray-200 rounded-md shadow-xs grid grid-cols-7 p-2 w-full`}
      >
        {days.map((day, index) => {
          const isToday =
            day === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()

          return (
            <button
              key={index}
              className={cn('text-center rounded-full', {
                'hover:bg-black hover:text-white': day,
                'bg-red-500 text-white': isToday,
                'cursor-pointer': day || isToday,
              })}
              onClick={() => onChange(year, month, day ? day : 0)}
            >
              {day || ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}
