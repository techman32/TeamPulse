'use client'
import Dropdown from '@/shared/ui/dropdown'
import { useEffect, useState } from 'react'
import { getUsers } from '@/shared/api'
import { User } from '@/shared/lib/types'

interface DropdownGroupsProps {
  selected: string[]
  onSelectAction: (values: string[]) => void
}

export default function DropdownUsers({ selected, onSelectAction }: DropdownGroupsProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const { users } = await getUsers(10, 0)
    const formattedUsers = users.map((user: User) => ({
      ...user,
      firstName: user.fullName.firstName,
      lastName: user.fullName.lastName,
    }))
    if (users) setUsers(formattedUsers)
  }

  return (
    <Dropdown
      placeholder="Выберите сотрудников"
      options={users}
      selected={selected}
      // @ts-ignore
      displayKey={['firstName', 'lastName']}
      valueKey="id"
      multiple
      onSelectAction={onSelectAction}
    />
  )
}
