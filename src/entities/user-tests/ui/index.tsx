'use client'
import Table from '@/shared/ui/table'
import Pagination from '@/entities/pagination/ui'
import { useEffect, useState } from 'react'
import { getUserTests } from '@/shared/api'

type AssignedTest = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  completionStatus: string
  result: boolean
}

export default function UserTests({ userId }: { userId: string }) {
  const [tests, setTests] = useState<AssignedTest[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTests = async (page: number) => {
      const offset = (page - 1) * itemsPerPage
      const { total, tests } = await getUserTests(userId, itemsPerPage, offset)
      if (tests) {
        setTests(tests)
        setTotal(total)
      }
      setLoading(false)
    }
    fetchTests(currentPage)
  }, [currentPage, userId])

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(total / itemsPerPage)) setCurrentPage(currentPage + 1)
  }

  const columns = ['Название', 'Описание', 'Дата начала', 'Дата окончания', 'Результат']

  return (
    <div className="flex flex-col gap-4">
      <Table
        columns={columns}
        data={
          loading
            ? Array(3).fill({})
            : tests.map((test) => ({
                'Название': test.name,
                'Описание': test.description,
                'Дата начала': new Date(test.startDate).toLocaleString(),
                'Дата окончания': new Date(test.endDate).toLocaleString(),
                'Результат': test.result ? 'Посмотреть' : 'Недоступен',
                'id': test.id,
                'userId': userId,
              }))
        }
      />
      <Pagination
        totalPages={total}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
      />
    </div>
  )
}
