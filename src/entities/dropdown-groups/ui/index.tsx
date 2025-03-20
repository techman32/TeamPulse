'use client'
import Dropdown from '@/shared/ui/dropdown'
import { useEffect, useState } from 'react'
import { Group } from '@/shared/lib/types'
import { getGroups } from '@/shared/api'

interface DropdownGroupsProps {
  selected: string[]
  onSelectAction: (values: string[]) => void
}

export default function DropdownGroups({ selected, onSelectAction }: DropdownGroupsProps) {
  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const { groups } = await getGroups(10, 0)
    if (groups) setGroups(groups)
  }

  return (
    <Dropdown
      placeholder="Выберите группы"
      options={groups}
      selected={selected}
      displayKey={['name']}
      valueKey="id"
      multiple
      onSelectAction={onSelectAction}
    />
  )
}
