import { useState, useEffect } from 'react'
import Input from '@/shared/ui/input'

interface SearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  debounceTime?: number
}

export default function Search({ placeholder = 'Поиск...', onSearch, debounceTime = 300 }: SearchProps) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query)
    }, debounceTime)

    return () => clearTimeout(handler)
  }, [query, onSearch, debounceTime])

  return (
    <div className="relative w-full max-w-md">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
    </div>
  )
}
