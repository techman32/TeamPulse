'use client'
import { useState } from 'react'
import { Star } from 'lucide-react'

export default function GradeAnswer({ onChange }: { onChange: (e: number) => void }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const handleRating = (value: number) => {
    setRating(value)
    onChange?.(value)
  }

  return (
    <div className="flex gap-1">
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={starValue}
            size={24}
            className={starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-400'}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        )
      })}
    </div>
  )
}
