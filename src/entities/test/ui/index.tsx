'use client'
import { useEffect, useState } from 'react'
import { getTest } from '@/shared/api'
import { AssignedTopic } from '@/shared/lib/types'

export default function Test({ testId, topicId }: { testId: string; topicId: string }) {
  const [topic, setTopic] = useState<AssignedTopic | null>(null)
  useEffect(() => {
    const fetchTest = async () => {
      const { topic } = await getTest(testId, topicId)
      console.log(topic)
      if (topic) setTopic(topic)
    }
    fetchTest()
  }, [])

  return <div>{topic?.questions.map((q) => <div key={q.id}>{q.text}</div>)}</div>
}
