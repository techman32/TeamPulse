import cn from 'classnames'
import { ChevronDown, ChevronsUpDown } from 'lucide-react'

interface ButtonSelectProps {
  isOpen: boolean
  selectedText: string
  selected: boolean
  onClick: () => void
  multiple?: boolean
}

export default function ButtonSelect({
  selectedText,
  onClick,
  multiple,
  selected,
}: ButtonSelectProps) {
  return (
    <button
      type="button"
      className="border text-left border-gray-200 rounded-md w-full p-2 text-base outline-none transition-colors hover:border-gray-400 focus-visible:border-black"
      onClick={onClick}
    >
      <span className={cn({ 'text-gray-500': !selected })}>{selectedText || 'Выберите...'}</span>
      {multiple ? (
        <ChevronsUpDown
          size={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      ) : (
        <ChevronDown
          size={20}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      )}
    </button>
  )
}
