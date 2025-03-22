import { useState, useEffect } from 'react'
import Checkbox from '@/shared/ui/checkbox'

export default function MultipleAnswer({
  answers,
  questionId,
  selected = [],
  onChange,
}: {
  answers: string[]
  questionId: string
  selected?: string[]
  onChange: (e: string[]) => void
}) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(selected)

  useEffect(() => {
    setSelectedAnswers(selected)
  }, [selected])

  const handleCheckboxChange = (answer: string, checked: boolean) => {
    const newAnswers = checked ? [...selectedAnswers, answer] : selectedAnswers.filter((a) => a !== answer)

    setSelectedAnswers(newAnswers)
    onChange(newAnswers)
  }

  return (
    <div className="flex flex-col gap-2">
      {answers.map((answer, index) => (
        <Checkbox
          key={index}
          name={questionId}
          option={answer}
          checked={selectedAnswers.includes(answer)}
          onChange={(e) => handleCheckboxChange(answer, e)}
        />
      ))}
    </div>
  )
}
