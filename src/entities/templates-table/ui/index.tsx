'use client'
import Table from '@/shared/ui/table'
import Pagination from '@/entities/pagination/ui'
import { Template } from '@/shared/lib/types'
import { useEffect, useState } from 'react'
import { getTemplates } from '@/shared/api'

export default function TemplatesTable() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchTemplates(currentPage)
  }, [currentPage])

  const fetchTemplates = async (page: number) => {
    const offset = (page - 1) * itemsPerPage
    const { total, templates }: { total: number; templates: Template[] } = await getTemplates(itemsPerPage, offset)
    if (templates) {
      setTemplates(templates)
      setTotal(total)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(total / itemsPerPage)) setCurrentPage(currentPage + 1)
  }

  const columns = ['Название', 'Описание', 'Статус', 'Автор', 'Дата создания', 'Дата обновления']
  const formattedData = templates.map((template) => ({
    'Название': template.name,
    'Описание': template.description,
    'Статус': template.status,
    'Автор': template.authorLogin,
    'Дата создания': new Date(template.createdAt).toLocaleString(),
    'Дата обновления': new Date(template.updatedAt).toLocaleString(),
  }))
  return (
    <div className="flex flex-col gap-4">
      <Table columns={columns} data={formattedData} />
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
