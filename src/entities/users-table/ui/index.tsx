'use client'
import Table from '@/shared/ui/table'
import { useEffect, useState } from 'react'
import { User } from '@/shared/lib/types'
import { getUsers } from '@/shared/api'
import Pagination from '@/entities/pagination/ui'

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  const fetchUsers = async (page: number) => {
    const offset = (page - 1) * itemsPerPage
    const { total, users }: { total: number; users: User[] } = await getUsers(itemsPerPage, offset)
    if (users) {
      setUsers(users)
      setTotal(total)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(total / itemsPerPage)) setCurrentPage(currentPage + 1)
  }

  const columns = ['Фамилия Имя', 'Имя пользователя', 'Email', 'Роль', 'Дата создания']
  const formattedData = users.map((user) => ({
    'Фамилия Имя': `${user.fullName.lastName} ${user.fullName.firstName}`,
    'Имя пользователя': user.login,
    'Email': user.email,
    'Роль': user.role === 'employee' ? 'Сотрудник' : 'Администратор',
    'Дата создания': new Date(user.createdAt).toLocaleString(),
    'id': user.id || '',
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
