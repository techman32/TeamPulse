'use client'
import Table from '@/shared/ui/table'
import Pagination from '@/entities/pagination/ui'
import { AssignedTest } from '@/shared/lib/types'
import { useEffect, useState } from 'react'
import { getTests } from '@/shared/api'
import Search from '@/entities/search/ui'

export default function TestsTable() {
  const [tests, setTests] = useState<AssignedTest[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const itemsPerPage = 10

  useEffect(() => {
    fetchTests(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const fetchTests = async (page: number, query: string) => {
    const offset = (page - 1) * itemsPerPage
    const { total, tests } = await getTests(itemsPerPage, offset, query)
    if (tests) {
      setTests(tests)
      setTotal(total)
    }
    setLoading(false)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(total / itemsPerPage)) setCurrentPage(currentPage + 1)
  }

  const columns = ['Название', 'Описание', 'Дата начала', 'Дата окончания', 'Субъект', 'Назначенные']

  return (
    <div className="flex flex-col gap-4">
      <Search onSearch={setSearchQuery} />
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
                'Субъект': test.subjectFullName
                  ? `${test.subjectFullName.firstName} ${test.subjectFullName.lastName}`
                  : '',
                'Назначенные': 'Посмотреть',
                'id': test.id,
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
