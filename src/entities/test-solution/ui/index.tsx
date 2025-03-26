'use client'
import { useEffect, useState } from 'react'
import { getSolution } from '@/shared/api'
import { Solution } from '@/shared/lib/types'
import BarChart from '@/entities/bar-chart/ui'

export default function TestSolution({ testId, userId }: { testId: string; userId: string }) {
  const [solution, setSolution] = useState<Solution>()
  const [hasPoints, setHasPoints] = useState<boolean>(false)

  useEffect(() => {
    const fetchSolution = async () => {
      const { solution }: { solution: Solution } = await getSolution(testId, userId)
      if (solution) {
        setSolution(solution)
      }
    }
    fetchSolution()
  }, [testId, userId])

  useEffect(() => {
    if (solution) {
      const pointsExist = solution.topics.some((topic) =>
        topic.questions.some((question) =>
          question.answers.some((answer) => answer.points && answer.points.length > 0),
        ),
      )
      setHasPoints(pointsExist)
    }
  }, [solution])

  if (!solution) return <p className="italic">Загрузка...</p>

  return (
    <>
      <h1 className="font-bold text-2xl">Результат теста</h1>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <h2 className="font-semibold">
          <span>Название теста:</span> <span className="opacity-50">{solution.name}</span>
        </h2>
        <p className="font-semibold">
          <span>Описание теста:</span> <span className="opacity-50">{solution.description}</span>
        </p>
        {solution.minPercentage && solution.rightPercentage ? (
          <>
            <p className="font-semibold">
              <span>Минимальный процент прохождения:</span>{' '}
              <span className="opacity-50">{solution.minPercentage}%</span>
            </p>
            <p className="font-semibold">
              <span>Результат прохождения:</span> <span className="opacity-50">{solution.rightPercentage}% / 100%</span>
            </p>
            <p className="font-semibold">
              <span>Статус прохождения:</span>{' '}
              <span className="opacity-50">
                {solution.rightPercentage > solution.minPercentage ? 'Пройден' : 'Не пройден'}
              </span>
            </p>
          </>
        ) : (
          <p className="opacity-50 italic">Тест без оценивания</p>
        )}
      </div>
      {solution.topics.map((topic, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">{topic.name}</h2>
          {topic.questions.map((question, index) => (
            <div key={index} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
              {question.tags.map((tag) => (
                <div key={tag} className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-300 rounded-full">{tag}</span>
                </div>
              ))}
              <p>
                <span className="font-semibold">Вопрос:</span> {question.text}
              </p>
              {question.answers.map((answer, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Ответ {++index}: </span>
                      <span>{answer.text}</span>
                    </div>
                    {solution.minPercentage && solution.rightPercentage ? (
                      <span className="italic opacity-50">{answer.isRight ? 'Верный' : 'Неверный'}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  {answer.points && answer.points.length > 0 && (
                    <div className="border border-gray-200 rounded-md p-4">
                      {answer.points.map((point, index) => (
                        <p key={index}>
                          {point.name}: {point.points}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      {hasPoints && (
        <BarChart
          solutionData={{
            ...solution,
            topics: solution.topics.map((topic) => ({
              ...topic,
              questions: topic.questions.map((question) => ({
                ...question,
                answers: question.answers.map((answer) => ({
                  ...answer,
                  points: answer.points?.map((point) => ({
                    ...point,
                    points: String(point.points),
                  })),
                })),
              })),
            })),
          }}
        />
      )}
    </>
  )
}
