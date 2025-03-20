import Input from '@/shared/ui/input'
import Button from '@/shared/ui/button'
import { useTestTemplateStore } from '@/entities/test-create-form/model/store'

interface AnswersProps {
  testId: string
  questionId: string
}

export default function Answers({ testId, questionId }: AnswersProps) {
  const store = useTestTemplateStore()
  const test = store.tests.find((test) => test.id === testId)
  const question = test?.questions?.find((question) => question.id === questionId)

  if (!question) return null

  return (
    <div className="flex flex-col gap-2">
      {question && question.answers.length > 0 && (
        <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
          <h2 className="font-semibold">Ответы</h2>
          {question &&
            question.answers.map((answer, index) => (
              <div key={index} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
                <h2 className="font-semibold">Ответ {++index}</h2>
                <Input
                  placeholder="Введите ответ"
                  onChange={(event) => {
                    store.updateQuestion(testId, question.id, {
                      answers: question.answers.map((a) =>
                        a.id === answer.id ? { ...a, text: event.target.value } : a,
                      ),
                    })
                  }}
                />
                {question.tags.length > 0 &&
                  question.tags.map((tag, index) => (
                    <div key={index} className="grid grid-cols-[auto_140px] gap-2">
                      <Input value={tag} readOnly />
                      <Input
                        placeholder="Баллы"
                        type="number"
                        onChange={(e) => {
                          const points = Number(e.target.value)
                          store.updateQuestion(testId, question.id, {
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
            ))}
        </div>
      )}
      <div className="flex gap-2">
        <Button
          text="Добавить ответ"
          color="secondary"
          onClick={() => {
            store.updateQuestion(testId, questionId, {
              answers: [
                ...question.answers,
                {
                  id: crypto.randomUUID(),
                  text: '',
                  points: [],
                },
              ],
            })
          }}
        />
      </div>
    </div>
  )
}
