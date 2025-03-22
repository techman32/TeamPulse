'use client'
import { useEffect, useState } from 'react'
import { getTests } from '@/shared/api'
import { AssignedTest } from '@/shared/lib/types'
import Link from 'next/link'

const statusMap: Record<string, string> = {
  not_passed: 'Не решено',
  passed: 'Решено',
  expired: 'Просрочен',
  in_progress: 'В процессе',
}

const getStatusText = (status: string): string => statusMap[status] || 'Неизвестный статус'

export default function AssignedTestsList() {
  const [tests, setTests] = useState<AssignedTest[]>([])

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    const { tests } = await getTests(1000, 0)
    console.log(tests)
    if (tests) setTests(tests)
  }
  return (
    <div className="border border-gray-200 rounded-md p-4 flex flex-col gap-4">
      {tests.map((test, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4 flex flex-col gap-2">
          <h2 className="font-semibold text-xl">{test.name}</h2>
          <p className="opacity-80">{test.description}</p>
          <p className="italic opacity-50 text-sm">Дедлайн: {new Date(test.endDate).toLocaleString()}</p>
          {test.topics.map((topic, index) => (
            <Link
              href={`/profile/test/${test.id}+${topic.id}`}
              key={index}
              className="cursor-pointer border border-gray-200 p-2 rounded-md hover:shadow-sm flex justify-between"
            >
              <span>
                {topic.name}{' '}
                {test.subjectFullName ? ` – ${test.subjectFullName.firstName} ${test.subjectFullName.lastName}` : ''}
              </span>
              <span>{getStatusText(topic.completionStatus)}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
