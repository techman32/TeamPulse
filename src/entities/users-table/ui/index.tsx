'use client'
import Table from '@/shared/ui/table'
import { useEffect, useState } from 'react'
import { User } from '@/shared/lib/types'
import { getUsers } from '@/shared/api'
import Pagination from '@/entities/pagination/ui'
import Search from '@/entities/search/ui'

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers(currentPage, searchQuery)
  }, [currentPage, searchQuery])

  const fetchUsers = async (page: number, query: string) => {
    const offset = (page - 1) * itemsPerPage
    const { total, users }: { total: number; users: User[] } = await getUsers(itemsPerPage, offset, query)
    if (users) {
      setUsers(users)
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

  const columns = ['Фамилия Имя', 'Имя пользователя', 'Email', 'Роль', 'Дата создания']

  return (
    <div className="flex flex-col gap-4">
      <Search onSearch={setSearchQuery} />
      <Table
        columns={columns}
        data={
          loading
            ? Array(3).fill({})
            : users.map((user) => ({
                'Фамилия Имя': `${user.fullName.lastName} ${user.fullName.firstName}`,
                'Имя пользователя': user.login,
                'Email': user.email,
                'Роль': user.role === 'employee' ? 'Сотрудник' : 'Администратор',
                'Дата создания': user.createdAt ? new Date(user.createdAt).toLocaleString() : '',
                'id': user.id || '',
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
