'use client'
import Dropdown from '@/shared/ui/dropdown'
import { useEffect, useState } from 'react'
import { getUsers } from '@/shared/api'
import { User } from '@/shared/lib/types'

interface DropdownGroupsProps {
  selected: string[]
  multiple?: boolean
  onSelectAction: (values: string[]) => void
}

export default function DropdownUsers({ selected, onSelectAction, multiple = true }: DropdownGroupsProps) {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const { users } = await getUsers(10, 0, '')
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      displayKey={['firstName', 'lastName']}
      valueKey="id"
      multiple={multiple}
      onSelectAction={onSelectAction}
    />
  )
}
