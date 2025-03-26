'use client'
import Dropdown from '@/shared/ui/dropdown'
import { useEffect, useState } from 'react'
import { Template } from '@/shared/lib/types'
import { getTemplates } from '@/shared/api'

interface DropdownTemplatesProps {
  selected: string[]
  onSelectAction: (values: string[]) => void
}

export default function DropdownTemplates({ selected, onSelectAction }: DropdownTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([])

  useEffect(() => {
    fetchGroups()
  }, [])

  const fetchGroups = async () => {
    const { templates } = await getTemplates(10, 0, '')
    if (templates) setTemplates(templates)
  }

  return (
    <Dropdown
      placeholder="Выберите тест"
      options={templates}
      selected={selected}
      displayKey={['name']}
      valueKey="id"
      onSelectAction={onSelectAction}
    />
  )
}
