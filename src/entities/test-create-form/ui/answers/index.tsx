import { Question, useTemplateStore } from '@/entities/test-create-form/model/store'
import Button from '@/shared/ui/button'
import { ArrowDownLeft, ArrowDownRight } from 'lucide-react'
import { useState } from 'react'
import Textarea from '@/shared/ui/textarea'
import Checkbox from '@/shared/ui/checkbox'
import Input from '@/shared/ui/input'

export default function Answers({ topicId, question }: { topicId: string; question: Question }) {
  const { updateQuestion, deleteAnswer } = useTemplateStore()
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null)

  const toggleAnswer = (id: string) => {
    setActiveAnswer((prev) => (prev === id ? null : id))
  }

  const handleCheckboxChange = (answerId: string, checked: boolean) => {
    const updatedAnswers = question.answers.map((answer) => {
      if (question.type === 1) {
        return { ...answer, isRight: answer.id === answerId ? checked : false }
      } else if (question.type === 2) {
        return answer.id === answerId ? { ...answer, isRight: checked } : answer
      }
      return answer
    })

    updateQuestion(topicId, question.id, { answers: updatedAnswers })
  }

  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
      {question.answers.length > 0 &&
        question.answers.map((answer) => (
          <div key={answer.id} className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
            <button
              type="button"
              className="w-full text-left font-semibold flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(answer.id)}
            >
              {answer.text || `Ответ`}
              <span className="opacity-50">
                {activeAnswer === answer.id ? <ArrowDownLeft size={20} /> : <ArrowDownRight size={20} />}
              </span>
            </button>

            {activeAnswer === answer.id && (
              <div className="flex flex-col gap-2">
                <Textarea
                  placeholder="Введите ответ"
                  value={answer.text}
                  onChange={(e) =>
                    updateQuestion(topicId, question.id, {
                      answers: question.answers.map((a) => (a.id === answer.id ? { ...a, text: e.target.value } : a)),
                    })
                  }
                />
                <Checkbox
                  option="Пометить как правильный"
                  checked={answer.isRight}
                  onChange={(checked) => handleCheckboxChange(answer.id, checked)}
                />
                {question.tags.length > 0 &&
                  question.tags.map((tag, index) => (
                    <div key={index} className="grid grid-cols-[auto_140px] gap-2">
                      <Input value={tag} readOnly />
                      <Input
                        placeholder="Баллы"
                        type="number"
                        value={answer.points.find((p) => p.name === tag)?.points || ''}
                        onChange={(e) => {
                          const points = Number(e.target.value)
                          updateQuestion(topicId, question.id, {
                            answers: question.answers.map((a) =>
                              a.id === answer.id
                                ? {
                                    ...a,
                                    points: a.points.some((p) => p.name === tag)
                                      ? a.points.map((p) => (p.name === tag ? { ...p, points } : p))
                                      : [...a.points, { name: tag, points }],
                                  }
                                : a,
                            ),
                          })
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      <div className="flex flex-wrap justify-stretch gap-2">
        <Button
          text="Добавить ответ"
          type="button"
          onClick={() => {
            updateQuestion(topicId, question.id, {
              answers: [
                ...question.answers,
                {
                  id: crypto.randomUUID(),
                  text: '',
                  isRight: false,
                  points: [],
                },
              ],
            })
          }}
        />
        {activeAnswer && (
          <Button
            text="Удалить выбранный ответ"
            buttonType="danger"
            onClick={() => {
              deleteAnswer(topicId, question.id, activeAnswer)
              setActiveAnswer(null)
            }}
            type="button"
          />
        )}
      </div>
    </div>
  )
}
