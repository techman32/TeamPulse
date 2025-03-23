'use client'
import Link from 'next/link'
import AssignedUsersModal from '@/entities/assigned-users-modal/ui'
import { useState } from 'react'

interface TableProps {
  columns: string[]
  data: Record<string, string>[]
}

export default function Table({ columns, data }: TableProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  return (
    <div className="overflow-x-auto xl:overflow-hidden">
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column, index) => (
                <th key={index} className="font-semibold p-2 text-center">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50 text-center">
                {columns.map((column, columnIndex) => {
                  const text = row[column] || '-'
                  const isLong = text.length > 40
                  const displayText = isLong ? text.slice(0, 40) + '...' : text

                  if (column === 'Имя пользователя') {
                    return (
                      <td key={columnIndex} className="p-1 text-sm">
                        <Link href={`/dashboard/users/${row['id']}`} className="hover:underline underline-offset-4">
                          {displayText}
                        </Link>
                      </td>
                    )
                  }

                  if (column === 'Назначенные') {
                    return (
                      <td key={columnIndex} className="p-1 text-sm">
                        <button
                          className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md transition-all outline-none"
                          onClick={() => setSelectedTemplateId(row['id'])}
                        >
                          {text}
                        </button>
                      </td>
                    )
                  }

                  return (
                    <td key={columnIndex} className="p-1 text-sm" title={isLong ? text : undefined}>
                      {displayText}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedTemplateId && (
        <AssignedUsersModal
          templateId={selectedTemplateId}
          isOpen={!!selectedTemplateId}
          onCloseAction={() => setSelectedTemplateId(null)}
        />
      )}
    </div>
  )
}
