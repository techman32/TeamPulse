import RadioGroup from '@/shared/ui/radio-group'

export default function SingleAnswer({
  answers,
  questionId,
  selected,
  onChange,
}: {
  answers: string[]
  questionId: string
  selected: string
  onChange: (e: string) => void
}) {
  return <RadioGroup name={questionId} labels={answers} selected={selected} onChange={(e) => onChange(e)} />
}
