'use client'
import Table from '@/shared/ui/table'
import Pagination from '@/entities/pagination/ui'
import { Template } from '@/shared/lib/types'
import { useEffect, useState } from 'react'
import { getTemplates } from '@/shared/api'
import Search from '@/entities/search/ui'

export default function TemplatesTable() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const itemsPerPage = 10

  useEffect(() => {
    fetchTemplates(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const fetchTemplates = async (page: number, query: string) => {
    const offset = (page - 1) * itemsPerPage
    const { total, templates } = await getTemplates(itemsPerPage, offset, query)
    if (templates) {
      setTemplates(templates)
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

  const columns = ['Название', 'Описание', 'Статус', 'Автор', 'Дата создания', 'Дата обновления']

  return (
    <div className="flex flex-col gap-4">
      <Search onSearch={setSearchQuery} />
      <Table
        columns={columns}
        data={
          loading
            ? Array(3).fill({})
            : templates.map((template) => ({
                'Название': template.name,
                'Описание': template.description,
                'Статус': template.status === 'done' ? 'Готовый' : 'Черновик',
                'Автор': template.authorLogin,
                'Дата создания': new Date(template.createdAt).toLocaleString(),
                'Дата обновления': new Date(template.updatedAt).toLocaleString(),
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
