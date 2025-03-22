'use client'
import { useEffect, useState } from 'react'
import { getTest, solveTest } from '@/shared/api'
import { AssignedTopic } from '@/shared/lib/types'
import Textarea from '@/shared/ui/textarea'
import SingleAnswer from '@/entities/single-answer/ui'
import MultipleAnswer from '@/entities/multiple-answer/ui'
import GradeAnswer from '@/entities/grade-answer/ui'
import Button from '@/shared/ui/button'
import { useRouter } from 'next/navigation'
import { useSolvedStore } from '@/entities/test/model/store'

export default function Test({ testId, topicId }: { testId: string; topicId: string }) {
  const [topic, setTopic] = useState<AssignedTopic | null>(null)
  const router = useRouter()

  const { questions, setAnswer } = useSolvedStore()

  useEffect(() => {
    const fetchTest = async () => {
      const { topic } = await getTest(testId, topicId)
      if (topic) setTopic(topic)
    }
    fetchTest()
  }, [testId, topicId])

  const handleSubmit = async () => {
    const data = {
      testId: testId,
      topicId: topicId,
      questions: questions,
    }
    try {
      await solveTest(data)
      router.replace('/profile')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {topic?.questions.map((q) => {
        const currentAnswer = questions.find((question) => question.questionId === q.id)?.answer || []
        return (
          <div key={q.id} className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-xl">{q.text}</h2>
            {q.answerType === 0 && (
              <Textarea placeholder="Введите ответ" onChange={(e) => setAnswer(q.id, [e.target.value])} />
            )}
            {q.answerType === 1 && (
              <SingleAnswer
                answers={q.answers.map((a) => a.text)}
                questionId={q.id}
                selected={currentAnswer[0] || ''}
                onChange={(e) => setAnswer(q.id, [e])}
              />
            )}
            {q.answerType === 2 && (
              <MultipleAnswer
                answers={q.answers.map((a) => a.text)}
                questionId={q.id}
                selected={currentAnswer}
                onChange={(e) => setAnswer(q.id, e)}
              />
            )}
            {q.answerType === 3 && <GradeAnswer onChange={(e) => setAnswer(q.id, [e.toString()])} />}
          </div>
        )
      })}
      <Button text="Отправить" buttonType="primary" onClick={handleSubmit} />
    </div>
  )
}
