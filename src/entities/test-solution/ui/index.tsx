'use client'
import { useEffect, useState } from 'react'
import { getSolution } from '@/shared/api'
import { Solution } from '@/shared/lib/types'

export default function TestSolution({ testId, userId }: { testId: string; userId: string }) {
  const [solution, setSolution] = useState<Solution>()

  useEffect(() => {
    const fetchSolution = async () => {
      const { solution }: { solution: Solution } = await getSolution(testId, userId)
      if (solution) {
        setSolution(solution)
      }
    }
    fetchSolution()
  }, [testId, userId])

  if (!solution) return null

  return (
    <div className="mx-[5%] my-4 border border-gray-200 p-4 rounded-md flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Результат теста</h1>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">
        <h2 className="font-semibold">
          <span>Название теста:</span> <span className="opacity-50">{solution.name}</span>
        </h2>
        <p className="font-semibold">
          <span>Описание теста:</span> <span className="opacity-50">{solution.description}</span>
        </p>
      </div>
      {solution.topics.map((topic, index) => (
        <div key={index}>
          <h2>{topic.name}</h2>
          {topic.questions.map((question, index) => (
            <div key={index}>
              <p>{question.text}</p>
              {question.answers.map((answer, index) => (
                <p key={index}>{answer.text}</p>
              ))}
            </div>
          ))}
        </div>
      ))}
      {/*{solution.questions.map((question, index) => (*/}
      {/*  <div key={index} className="flex flex-col gap-2 border border-gray-200 rounded-md p-4">*/}
      {/*    <h2 className="font-semibold text-xl">{topicName}</h2>*/}
      {/*    <p>*/}
      {/*      <span className="font-semibold">Вопрос:</span> {question.name}*/}
      {/*    </p>*/}
      {/*    {question.answers.map((answer, index) => (*/}
      {/*      <p key={index}>*/}
      {/*        <span className="font-semibold">Ответ {++index}:</span> {answer.text}*/}
      {/*      </p>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*))}*/}
    </div>
  )
}
