import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarNavigationProps {
  onChange: (dir: number) => void
  text: string
}

export default function CalendarNavigation({
  text,
  onChange,
}: CalendarNavigationProps) {
  return (
    <div
      className={'border border-gray-200 rounded-md p-1 flex justify-between'}
    >
      <button onClick={() => onChange(-1)}>
        <ChevronLeft size={16} />
      </button>
      <p>{text}</p>
      <button onClick={() => onChange(1)}>
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
